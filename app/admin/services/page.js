'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import AdminLayout from '@/components/admin/AdminLayout'
import Toast from '@/components/admin/Toast'

export default function ServicesManager() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState([])
  const [expandedId, setExpandedId] = useState(null)
  const [editData, setEditData] = useState({})
  const [saving, setSaving] = useState(null)
  const [toast, setToast] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user || null)
      if (session?.user) {
        await loadServices()
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const loadServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('sort_order')

      if (error) throw error
      setServices(data || [])
      setEditData({})
    } catch (err) {
      console.error('Error loading services:', err)
      showToast('Error loading services', 'error')
    }
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleExpandToggle = (id) => {
    setExpandedId(expandedId === id ? null : id)
    if (!editData[id] && expandedId !== id) {
      const service = services.find((s) => s.id === id)
      setEditData((prev) => ({
        ...prev,
        [id]: { ...service },
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

  const handleAddFeature = (id) => {
    setEditData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        features: [
          ...(prev[id]?.features || []),
          { title_en: '', title_ar: '', description_en: '', description_ar: '' },
        ],
      },
    }))
  }

  const handleRemoveFeature = (id, index) => {
    setEditData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        features: prev[id].features.filter((_, i) => i !== index),
      },
    }))
  }

  const handleFeatureChange = (id, index, field, value) => {
    setEditData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        features: prev[id].features.map((f, i) =>
          i === index ? { ...f, [field]: value } : f
        ),
      },
    }))
  }

  const handleSaveService = async (id) => {
    setSaving(id)
    try {
      const data = editData[id]
      const { error } = await supabase
        .from('services')
        .update({
          name_en: data.name_en,
          name_ar: data.name_ar,
          description_en: data.description_en,
          description_ar: data.description_ar,
          long_description_en: data.long_description_en,
          long_description_ar: data.long_description_ar,
          is_active: data.is_active,
          features: data.features || [],
        })
        .eq('id', id)

      if (error) throw error

      await loadServices()
      setExpandedId(null)
      showToast('Service updated successfully', 'success')
    } catch (err) {
      console.error('Error saving service:', err)
      showToast('Error saving service', 'error')
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
            <p className="text-slate-600">Loading services...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (!user) {
    return null
  }

  return (
    <AdminLayout user={user}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Services</h1>
          <p className="mt-1 text-slate-600">Manage all services and their details</p>
        </div>

        {services.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
            <p className="text-slate-600">No services found yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {services.map((service) => {
              const data = editData[service.id] || service
              const isExpanded = expandedId === service.id

              return (
                <div key={service.id} className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                  <button
                    onClick={() => handleExpandToggle(service.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-slate-900">{service.name_en}</h3>
                      <p className="text-sm text-slate-600 mt-1">{service.category}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          service.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {service.is_active ? 'Active' : 'Inactive'}
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
                      {/* Basic Info */}
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-4">Basic Information</h4>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Service Name (English)
                            </label>
                            <input
                              type="text"
                              value={data.name_en || ''}
                              onChange={(e) =>
                                handleEditChange(service.id, 'name_en', e.target.value)
                              }
                              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Service Name (Arabic)
                            </label>
                            <input
                              type="text"
                              value={data.name_ar || ''}
                              onChange={(e) =>
                                handleEditChange(service.id, 'name_ar', e.target.value)
                              }
                              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10 text-right"
                              dir="rtl"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-4">Description</h4>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Short Description (English)
                            </label>
                            <textarea
                              value={data.description_en || ''}
                              onChange={(e) =>
                                handleEditChange(
                                  service.id,
                                  'description_en',
                                  e.target.value
                                )
                              }
                              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                              rows="3"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Short Description (Arabic)
                            </label>
                            <textarea
                              value={data.description_ar || ''}
                              onChange={(e) =>
                                handleEditChange(
                                  service.id,
                                  'description_ar',
                                  e.target.value
                                )
                              }
                              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10 text-right"
                              rows="3"
                              dir="rtl"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Long Description */}
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-4">Long Description</h4>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Long Description (English)
                            </label>
                            <textarea
                              value={data.long_description_en || ''}
                              onChange={(e) =>
                                handleEditChange(
                                  service.id,
                                  'long_description_en',
                                  e.target.value
                                )
                              }
                              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                              rows="5"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Long Description (Arabic)
                            </label>
                            <textarea
                              value={data.long_description_ar || ''}
                              onChange={(e) =>
                                handleEditChange(
                                  service.id,
                                  'long_description_ar',
                                  e.target.value
                                )
                              }
                              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10 text-right"
                              rows="5"
                              dir="rtl"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-slate-900">Features</h4>
                          <button
                            onClick={() => handleAddFeature(service.id)}
                            className="text-sm text-[#6b8e6f] hover:text-[#5a7a5f] font-medium"
                          >
                            + Add Feature
                          </button>
                        </div>
                        <div className="space-y-4">
                          {(data.features || []).map((feature, index) => (
                            <div
                              key={index}
                              className="rounded-lg border border-slate-300 p-4 bg-white"
                            >
                              <div className="grid gap-4 md:grid-cols-2 mb-4">
                                <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Title (English)
                                  </label>
                                  <input
                                    type="text"
                                    value={feature.title_en || ''}
                                    onChange={(e) =>
                                      handleFeatureChange(
                                        service.id,
                                        index,
                                        'title_en',
                                        e.target.value
                                      )
                                    }
                                    className="w-full rounded border border-slate-300 px-2 py-1 text-sm text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-1 focus:ring-[#6b8e6f]/10"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Title (Arabic)
                                  </label>
                                  <input
                                    type="text"
                                    value={feature.title_ar || ''}
                                    onChange={(e) =>
                                      handleFeatureChange(
                                        service.id,
                                        index,
                                        'title_ar',
                                        e.target.value
                                      )
                                    }
                                    className="w-full rounded border border-slate-300 px-2 py-1 text-sm text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-1 focus:ring-[#6b8e6f]/10 text-right"
                                    dir="rtl"
                                  />
                                </div>
                              </div>
                              <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Description (English)
                                  </label>
                                  <textarea
                                    value={feature.description_en || ''}
                                    onChange={(e) =>
                                      handleFeatureChange(
                                        service.id,
                                        index,
                                        'description_en',
                                        e.target.value
                                      )
                                    }
                                    className="w-full rounded border border-slate-300 px-2 py-1 text-sm text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-1 focus:ring-[#6b8e6f]/10"
                                    rows="2"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Description (Arabic)
                                  </label>
                                  <textarea
                                    value={feature.description_ar || ''}
                                    onChange={(e) =>
                                      handleFeatureChange(
                                        service.id,
                                        index,
                                        'description_ar',
                                        e.target.value
                                      )
                                    }
                                    className="w-full rounded border border-slate-300 px-2 py-1 text-sm text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-1 focus:ring-[#6b8e6f]/10 text-right"
                                    rows="2"
                                    dir="rtl"
                                  />
                                </div>
                              </div>
                              <button
                                onClick={() => handleRemoveFeature(service.id, index)}
                                className="mt-3 text-sm text-red-600 hover:text-red-700 font-medium"
                              >
                                Remove Feature
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Status */}
                      <div>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={data.is_active || false}
                            onChange={(e) =>
                              handleEditChange(
                                service.id,
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
                      </div>

                      {/* Save Button */}
                      <div className="flex gap-3 pt-4 border-t border-slate-200">
                        <button
                          onClick={() => handleSaveService(service.id)}
                          disabled={saving === service.id}
                          className="rounded-lg bg-[#6b8e6f] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a7a5f] disabled:opacity-50 transition-colors"
                        >
                          {saving === service.id ? 'Saving...' : 'Save Changes'}
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
