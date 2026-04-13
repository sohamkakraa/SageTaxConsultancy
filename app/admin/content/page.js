'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import AdminLayout from '@/components/admin/AdminLayout'
import Toast from '@/components/admin/Toast'

export default function ContentEditor() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(null)
  const [content, setContent] = useState({})
  const [changes, setChanges] = useState({})
  const [toast, setToast] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user || null)
      if (session?.user) {
        await loadContent()
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .order('section')

      if (error) throw error

      const grouped = {}
      data.forEach((item) => {
        if (!grouped[item.section]) {
          grouped[item.section] = []
        }
        grouped[item.section].push(item)
      })

      setContent(grouped)
      setChanges({})
    } catch (err) {
      console.error('Error loading content:', err)
      showToast('Error loading content', 'error')
    }
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleChange = (id, field, value) => {
    setChanges((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }))
  }

  const handleSaveSection = async (section) => {
    setSaving(section)
    try {
      const sectionItems = content[section] || []
      const updates = []

      for (const item of sectionItems) {
        const itemChanges = changes[item.id]
        if (itemChanges) {
          const updatePayload = {
            ...item,
            ...itemChanges,
            updated_at: new Date().toISOString(),
          }

          updates.push(
            supabase
              .from('site_content')
              .update(updatePayload)
              .eq('id', item.id)
          )
        }
      }

      if (updates.length > 0) {
        const results = await Promise.all(updates)
        const hasError = results.some((r) => r.error)

        if (hasError) {
          throw new Error('One or more updates failed')
        }
      }

      setChanges((prev) => {
        const updated = { ...prev }
        sectionItems.forEach((item) => {
          delete updated[item.id]
        })
        return updated
      })

      showToast(`${section} updated successfully`, 'success')
    } catch (err) {
      console.error('Error saving content:', err)
      showToast('Error saving content', 'error')
    } finally {
      setSaving(null)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#6b8e6f] mx-auto"></div>
            <p className="text-slate-600">Loading content...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (!user) {
    return null
  }

  const sections = Object.keys(content).sort()

  return (
    <AdminLayout user={user}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Site Content</h1>
          <p className="mt-1 text-slate-600">Edit all site content with English and Arabic translations</p>
        </div>

        {sections.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
            <p className="text-slate-600">No content found. Create content items to get started.</p>
          </div>
        ) : (
          sections.map((section) => (
            <div key={section} className="rounded-lg border border-slate-200 bg-white overflow-hidden">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900 capitalize">
                    {section}
                  </h2>
                  <button
                    onClick={() => handleSaveSection(section)}
                    disabled={
                      saving === section ||
                      !content[section].some((item) => changes[item.id])
                    }
                    className="rounded-lg bg-[#6b8e6f] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a7a5f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {saving === section ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>

              <div className="divide-y divide-slate-200">
                {(content[section] || []).map((item) => {
                  const itemChanges = changes[item.id] || {}
                  return (
                    <div key={item.id} className="p-6">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Key: {item.key}
                        </label>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            English
                          </label>
                          <textarea
                            value={itemChanges.value_en ?? item.value_en ?? ''}
                            onChange={(e) =>
                              handleChange(item.id, 'value_en', e.target.value)
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                            rows="4"
                            placeholder="Enter English content..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Arabic
                          </label>
                          <textarea
                            value={itemChanges.value_ar ?? item.value_ar ?? ''}
                            onChange={(e) =>
                              handleChange(item.id, 'value_ar', e.target.value)
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10 text-right"
                            rows="4"
                            placeholder="أدخل المحتوى بالعربية..."
                            dir="rtl"
                          />
                        </div>
                      </div>

                      {changes[item.id] && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-amber-700">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.487 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Unsaved changes
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </AdminLayout>
  )
}
