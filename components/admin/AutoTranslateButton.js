'use client'

import { useState } from 'react'

/**
 * Auto-translate button for CMS admin pages.
 *
 * @param {Object} props
 * @param {Object} props.fields - Map of { fieldName: englishValue } to translate
 * @param {Function} props.onTranslated - Callback with { fieldName: arabicValue } results
 * @param {string} [props.className] - Optional extra CSS classes
 */
export default function AutoTranslateButton({ fields, onTranslated, className = '' }) {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const handleTranslate = async () => {
    // Filter to only non-empty English fields
    const entries = Object.entries(fields).filter(([, value]) => value && value.trim())
    if (entries.length === 0) {
      setStatus({ type: 'warning', message: 'No English text to translate' })
      setTimeout(() => setStatus(null), 3000)
      return
    }

    setLoading(true)
    setStatus(null)

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts: entries.map(([, value]) => value) }),
      })

      if (!res.ok) {
        throw new Error('Translation API returned an error')
      }

      const data = await res.json()

      if (data.success && data.translations) {
        const result = {}
        entries.forEach(([key], idx) => {
          if (data.translations[idx]) {
            result[key] = data.translations[idx]
          }
        })

        onTranslated(result)
        setStatus({
          type: 'success',
          message: `Translated ${data.translated}/${data.total} fields`,
        })
      } else {
        setStatus({ type: 'error', message: 'Translation returned no results' })
      }
    } catch (error) {
      console.error('Translation error:', error)
      setStatus({ type: 'error', message: 'Translation failed — enter Arabic manually' })
    } finally {
      setLoading(false)
      setTimeout(() => setStatus(null), 4000)
    }
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        type="button"
        onClick={handleTranslate}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {loading ? (
          <>
            <svg className="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Translating...
          </>
        ) : (
          <>
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            Auto-Translate to Arabic
          </>
        )}
      </button>
      {status && (
        <span className={`text-xs font-medium ${
          status.type === 'success' ? 'text-green-600' :
          status.type === 'warning' ? 'text-amber-600' :
          'text-red-600'
        }`}>
          {status.message}
        </span>
      )}
    </div>
  )
}
