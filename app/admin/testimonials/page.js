'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import AdminLayout from '@/components/admin/AdminLayout'
import Toast from '@/components/admin/Toast'

export default function TestimonialsManager() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [testimonials, setTestimonials] = useState([])
  const [expandedId, setExpandedId] = useState(null)
  const [showNewForm, setShowNewForm] = useState(false)
  const [editData, setEditData] = useState({})
  const [saving, setSaving] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [toast, setToast] = useState(null)
  const supabase = createClient()

  const newTestimonialTemplate = {
    name: '',
    title: '',
    company: '',
    quote_en: '',
    quote_ar: '',
    rating: 5,
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
        await loadTestimonials()
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const loadTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('sort_order')

      if (error) throw error
      setTestimonials(data || [])
      setEditData({})
    } catch (err) {
      console.error('Error loading testimonials:', err)
      showToast('Error loading testimonials', 'error')
    }
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleExpandToggle = (id) => {
    setExpandedId(expandedId === id ? null : id)
    if (!editData[id] && expandedId !== id) {
      const testimonial = testimonials.find((t) => t.id === id)
      setEditData((prev) => ({
        ...prev,
        [id]: { ...testimonial },
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

  const handleSaveTestimonial = async (id) => {
    setSaving(id)
    try {
      const data = editData[id]

      if (!data.name || !data.quote_en) {
        showToast('Please fill in required fields', 'error')
        setSaving(null)
        return
      }

      const { error } = await supabase
        .from('testimonials')
        .update({
          name: data.name,
          title: data.title,
          company: data.company,
          quote_en: data.quote_en,
          quote_ar: data.quote_ar,
          rating: data.rating,
          is_active: data.is_active,
          sort_order: data.sort_order,
        })
        .eq('id', id)

      if (error) throw error

      await loadTestimonials()
      setExpandedId(null)
      showToast('Testimonial updated successfully', 'success')
    } catch (err) {
      console.error('Error saving testimonial:', err)
      showToast('Error saving testimonial', 'error')
    } finally {
      setSaving(null)
    }
  }

  const handleCreateTestimonial = async () => {
    setSaving('new')
    try {
      const data = editData.new || newTestimonialTemplate

      if (!data.name || !data.quote_en) {
        showToast('Please fill in required fields', 'error')
        setSaving(null)
        return
      }

      const { error } = await supabase.from('testimonials').insert({
        name: data.name,
        title: data.title,
        company: data.company,
        quote_en: data.quote_en,
        quote_ar: data.quote_ar,
        rating: data.rating,
        is_active: data.is_active,
        sort_order: testimonials.length,
      })

      if (error) throw error

      await loadTestimonials()
      setShowNewForm(false)
      setEditData((prev) => {
        const updated = { ...prev }
        delete updated.new
        return updated
      })
      showToast('Testimonial created successfully', 'success')
    } catch (err) {
      console.error('Error creating testimonial:', err)
      showToast('Error creating testimonial', 'error')
    } finally {
      setSaving(null)
    }
  }

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) {
      return
    }

    setDeleting(id)
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id)

      if (error) throw error

      await loadTestimonials()
      setExpandedId(null)
      showToast('Testimonial deleted successfully', 'success')
    } catch (err) {
      console.error('Error deleting testimonial:', err)
      showToast('Error deleting testimonial', 'error')
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
            <p className="text-slate-600">Loading testimonials...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (!user) {
    return null
  }

  const newData = editData.new || newTestimonialTemplate

  return (
    <AdminLayout user={user}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Testimonials</h1>
            <p className="mt-1 text-slate-600">Manage client testimonials</p>
          </div>
          <button
            onClick={() => setShowNewForm(!showNewForm)}
            className="rounded-lg bg-[#6b8e6f] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a7a5f] transition-colors"
          >
            + Add Testimonial
          </button>
        </div>

        {/* New Testimonial Form */}
        {showNewForm && (
          <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900">Add New Testimonial</h2>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={newData.name}
                    onChange={(e) => handleNewChange('name', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                    placeholder="Client name..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={newData.company}
                    onChange={(e) => handleNewChange('company', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                    placeholder="Company name..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Title / Position
                </label>
                <input
                  type="text"
                  value={newData.title}
                  onChange={(e) => handleNewChange('title', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                  placeholder="CEO, Finance Manager, etc."
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Quote (English) *
                  </label>
                  <textarea
                    value={newData.quote_en}
                    onChange={(e) => handleNewChange('quote_en', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                    rows="4"
                    placeholder="Client testimonial..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Quote (Arabic)
                  </label>
                  <textarea
                    value={newData.quote_ar}
                    onChange={(e) => handleNewChange('quote_ar', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10 text-right"
                    rows="4"
                    dir="rtl"
                    placeholder="شهادة العميل..."
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Rating (1-5)
                  </label>
                  <select
                    value={newData.rating}
                    onChange={(e) =>
                      handleNewChange('rating', parseInt(e.target.value))
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                  >
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
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
                  onClick={handleCreateTestimonial}
                  disabled={saving === 'new'}
                  className="rounded-lg bg-[#6b8e6f] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a7a5f] disabled:opacity-50 transition-colors"
                >
                  {saving === 'new' ? 'Creating...' : 'Add Testimonial'}
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

        {/* Testimonials List */}
        {testimonials.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
            <p className="text-slate-600">No testimonials found yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {testimonials.map((testimonial) => {
              const data = editData[testimonial.id] || testimonial
              const isExpanded = expandedId === testimonial.id

              return (
                <div
                  key={testimonial.id}
                  className="rounded-lg border border-slate-200 bg-white overflow-hidden"
                >
                  <button
                    onClick={() => handleExpandToggle(testimonial.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-slate-900">{testimonial.name}</h3>
                      <div className="mt-1 flex items-center gap-3 text-sm text-slate-600">
                        <span>{testimonial.company || 'No company'}</span>
                        <span className="flex items-center gap-1">
                          {'⭐'.repeat(testimonial.rating || 5)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          testimonial.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {testimonial.is_active ? 'Active' : 'Inactive'}
                      </span>
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
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-slate-200 bg-slate-50 p-6 space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            value={data.name || ''}
                            onChange={(e) =>
                              handleEditChange(testimonial.id, 'name', e.target.value)
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Company
                          </label>
                          <input
                            type="text"
                            value={data.company || ''}
                            onChange={(e) =>
                              handleEditChange(
                                testimonial.id,
                                'company',
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Title / Position
                        </label>
                        <input
                          type="text"
                          value={data.title || ''}
                          onChange={(e) =>
                            handleEditChange(
                              testimonial.id,
                              'title',
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                        />
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Quote (English)
                          </label>
                          <textarea
                            value={data.quote_en || ''}
                            onChange={(e) =>
                              handleEditChange(
                                testimonial.id,
                                'quote_en',
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                            rows="4"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Quote (Arabic)
                          </label>
                          <textarea
                            value={data.quote_ar || ''}
                            onChange={(e) =>
                              handleEditChange(
                                testimonial.id,
                                'quote_ar',
                                e.target.value
                              )
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
                            Rating
                          </label>
                          <select
                            value={data.rating || 5}
                            onChange={(e) =>
                              handleEditChange(
                                testimonial.id,
                                'rating',
                                parseInt(e.target.value)
                              )
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                          >
                            <option value="1">1 Star</option>
                            <option value="2">2 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="5">5 Stars</option>
                          </select>
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
                                testimonial.id,
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
                            handleEditChange(
                              testimonial.id,
                              'is_active',
                              e.target.checked
                            )
                          }
                          className="rounded border-slate-300"
                        />
                        <span className="text-sm font-medium text-slate-700">
                          Active
                        </span>
                      </label>

                      <div className="flex gap-3 pt-4 border-t border-slate-200">
                        <button
                          onClick={() => handleSaveTestimonial(testimonial.id)}
                          disabled={saving === testimonial.id}
                          className="rounded-lg bg-[#6b8e6f] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a7a5f] disabled:opacity-50 transition-colors"
                        >
                          {saving === testimonial.id ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(testimonial.id)}
                          disabled={deleting === testimonial.id}
                          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
                        >
                          {deleting === testimonial.id ? 'Deleting...' : 'Delete'}
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
