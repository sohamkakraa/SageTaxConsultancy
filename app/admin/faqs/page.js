'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import AdminLayout from '@/components/admin/AdminLayout'
import Toast from '@/components/admin/Toast'

export default function FAQsManager() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [faqs, setFaqs] = useState([])
  const [expandedId, setExpandedId] = useState(null)
  const [showNewForm, setShowNewForm] = useState(false)
  const [editData, setEditData] = useState({})
  const [saving, setSaving] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [toast, setToast] = useState(null)
  const [filterCategory, setFilterCategory] = useState(null)
  const supabase = createClient()

  const newFaqTemplate = {
    question_en: '',
    question_ar: '',
    answer_en: '',
    answer_ar: '',
    category: '',
    is_active: true,
    sort_order: 0,
  }

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user || null)
      if (session?.user) {
        await loadFaqs()
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const loadFaqs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('sort_order')

      if (error) throw error
      setFaqs(data || [])
      setEditData({})
    } catch (err) {
      console.error('Error loading FAQs:', err)
      showToast('Error loading FAQs', 'error')
    }
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleExpandToggle = (id) => {
    setExpandedId(expandedId === id ? null : id)
    if (!editData[id] && expandedId !== id) {
      const faq = faqs.find((f) => f.id === id)
      setEditData((prev) => ({
        ...prev,
        [id]: { ...faq },
      }))
    }
  }

  const handleEditChange = (id, field, value) => {
    setEditData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }))
  }

  const handleNewChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      new: {
        ...prev.new,
        [field]: value,
      },
    }))
  }

  const handleSaveFaq = async (id) => {
    setSaving(id)
    try {
      const data = editData[id]

      if (!data.question_en || !data.answer_en) {
        showToast('Please fill in required fields', 'error')
        setSaving(null)
        return
      }

      const { error } = await supabase
        .from('faqs')
        .update({
          question_en: data.question_en,
          question_ar: data.question_ar,
          answer_en: data.answer_en,
          answer_ar: data.answer_ar,
          category: data.category,
          is_active: data.is_active,
          sort_order: data.sort_order,
        })
        .eq('id', id)

      if (error) throw error

      await loadFaqs()
      setExpandedId(null)
      showToast('FAQ updated successfully', 'success')
    } catch (err) {
      console.error('Error saving FAQ:', err)
      showToast('Error saving FAQ', 'error')
    } finally {
      setSaving(null)
    }
  }

  const handleCreateFaq = async () => {
    setSaving('new')
    try {
      const data = editData.new || newFaqTemplate

      if (!data.question_en || !data.answer_en) {
        showToast('Please fill in required fields', 'error')
        setSaving(null)
        return
      }

      const { error } = await supabase.from('faqs').insert({
        question_en: data.question_en,
        question_ar: data.question_ar,
        answer_en: data.answer_en,
        answer_ar: data.answer_ar,
        category: data.category,
        is_active: data.is_active,
        sort_order: faqs.length,
      })

      if (error) throw error

      await loadFaqs()
      setShowNewForm(false)
      setEditData((prev) => {
        const updated = { ...prev }
        delete updated.new
        return updated
      })
      showToast('FAQ created successfully', 'success')
    } catch (err) {
      console.error('Error creating FAQ:', err)
      showToast('Error creating FAQ', 'error')
    } finally {
      setSaving(null)
    }
  }

  const handleDeleteFaq = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) {
      return
    }

    setDeleting(id)
    try {
      const { error } = await supabase.from('faqs').delete().eq('id', id)

      if (error) throw error

      await loadFaqs()
      setExpandedId(null)
      showToast('FAQ deleted successfully', 'success')
    } catch (err) {
      console.error('Error deleting FAQ:', err)
      showToast('Error deleting FAQ', 'error')
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#6b8e6f] mx-auto"></div>
            <p className="text-slate-600">Loading FAQs...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (!user) {
    return null
  }

  const newData = editData.new || newFaqTemplate
  const categories = [...new Set(faqs.map((f) => f.category).filter(Boolean))]
  const filteredFaqs = filterCategory
    ? faqs.filter((f) => f.category === filterCategory)
    : faqs

  return (
    <AdminLayout user={user}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">FAQs</h1>
            <p className="mt-1 text-slate-600">Manage frequently asked questions</p>
          </div>
          <button
            onClick={() => setShowNewForm(!showNewForm)}
            className="rounded-lg bg-[#6b8e6f] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a7a5f] transition-colors"
          >
            + Add FAQ
          </button>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilterCategory(null)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filterCategory === null
                  ? 'bg-[#6b8e6f] text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-[#6b8e6f]'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  filterCategory === category
                    ? 'bg-[#6b8e6f] text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-[#6b8e6f]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* New FAQ Form */}
        {showNewForm && (
          <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900">Add New FAQ</h2>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Question (English) *
                  </label>
                  <input
                    type="text"
                    value={newData.question_en}
                    onChange={(e) => handleNewChange('question_en', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                    placeholder="Question..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Question (Arabic)
                  </label>
                  <input
                    type="text"
                    value={newData.question_ar}
                    onChange={(e) => handleNewChange('question_ar', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10 text-right"
                    dir="rtl"
                    placeholder="السؤال..."
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Answer (English) *
                  </label>
                  <textarea
                    value={newData.answer_en}
                    onChange={(e) => handleNewChange('answer_en', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                    rows="4"
                    placeholder="Answer..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Answer (Arabic)
                  </label>
                  <textarea
                    value={newData.answer_ar}
                    onChange={(e) => handleNewChange('answer_ar', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10 text-right"
                    rows="4"
                    dir="rtl"
                    placeholder="الإجابة..."
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newData.category}
                    onChange={(e) => handleNewChange('category', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                    placeholder="e.g., General, Tax Planning..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={newData.sort_order || 0}
                    onChange={(e) =>
                      handleNewChange('sort_order', parseInt(e.target.value) || 0)
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newData.is_active || false}
                  onChange={(e) => handleNewChange('is_active', e.target.checked)}
                  className="rounded border-slate-300"
                />
                <span className="text-sm font-medium text-slate-700">Active</span>
              </label>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={handleCreateFaq}
                  disabled={saving === 'new'}
                  className="rounded-lg bg-[#6b8e6f] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a7a5f] disabled:opacity-50 transition-colors"
                >
                  {saving === 'new' ? 'Creating...' : 'Add FAQ'}
                </button>
                <button
                  onClick={() => {
                    setShowNewForm(false)
                    setEditData((prev) => {
                      const updated = { ...prev }
                      delete updated.new
                      return updated
                    })
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FAQs List */}
        {filteredFaqs.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
            <p className="text-slate-600">
              {filterCategory ? `No FAQs found in ${filterCategory} category.` : 'No FAQs found yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const data = editData[faq.id] || faq
              const isExpanded = expandedId === faq.id

              return (
                <div
                  key={faq.id}
                  className="rounded-lg border border-slate-200 bg-white overflow-hidden"
                >
                  <button
                    onClick={() => handleExpandToggle(faq.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-slate-900">{faq.question_en}</h3>
                      <div className="mt-1 flex items-center gap-3 text-sm text-slate-600">
                        {faq.category && <span>{faq.category}</span>}
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            faq.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          {faq.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <svg
                      className={`h-5 w-5 text-slate-400 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-slate-200 bg-slate-50 p-6 space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Question (English)
                          </label>
                          <input
                            type="text"
                            value={data.question_en || ''}
                            onChange={(e) =>
                              handleEditChange(faq.id, 'question_en', e.target.value)
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Question (Arabic)
                          </label>
                          <input
                            type="text"
                            value={data.question_ar || ''}
                            onChange={(e) =>
                              handleEditChange(faq.id, 'question_ar', e.target.value)
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10 text-right"
                            dir="rtl"
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Answer (English)
                          </label>
                          <textarea
                            value={data.answer_en || ''}
                            onChange={(e) =>
                              handleEditChange(faq.id, 'answer_en', e.target.value)
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                            rows="4"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Answer (Arabic)
                          </label>
                          <textarea
                            value={data.answer_ar || ''}
                            onChange={(e) =>
                              handleEditChange(faq.id, 'answer_ar', e.target.value)
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10 text-right"
                            rows="4"
                            dir="rtl"
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Category
                          </label>
                          <input
                            type="text"
                            value={data.category || ''}
                            onChange={(e) =>
                              handleEditChange(faq.id, 'category', e.target.value)
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Sort Order
                          </label>
                          <input
                            type="number"
                            value={data.sort_order || 0}
                            onChange={(e) =>
                              handleEditChange(
                                faq.id,
                                'sort_order',
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                          />
                        </div>
                      </div>

                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={data.is_active || false}
                          onChange={(e) =>
                            handleEditChange(faq.id, 'is_active', e.target.checked)
                          }
                          className="rounded border-slate-300"
                        />
                        <span className="text-sm font-medium text-slate-700">Active</span>
                      </label>

                      <div className="flex gap-3 pt-4 border-t border-slate-200">
                        <button
                          onClick={() => handleSaveFaq(faq.id)}
                          disabled={saving === faq.id}
                          className="rounded-lg bg-[#6b8e6f] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a7a5f] disabled:opacity-50 transition-colors"
                        >
                          {saving === faq.id ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          onClick={() => handleDeleteFaq(faq.id)}
                          disabled={deleting === faq.id}
                          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
                        >
                          {deleting === faq.id ? 'Deleting...' : 'Delete'}
                        </button>
                        <button
                          onClick={() => setExpandedId(null)}
                          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </AdminLayout>
  )
}
