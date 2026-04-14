'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import AdminLayout from '@/components/admin/AdminLayout'
import Toast from '@/components/admin/Toast'

const RESOURCE_TYPES = [
  { value: 'government-document', label: 'Government Document' },
  { value: 'law', label: 'Law / Regulation' },
  { value: 'guide', label: 'Guide' },
  { value: 'article', label: 'Article' },
  { value: 'external-link', label: 'External Link' },
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'whitepaper', label: 'Whitepaper' },
]

const CATEGORIES = [
  { value: 'vat', label: 'VAT' },
  { value: 'corporate-tax', label: 'Corporate Tax' },
  { value: 'excise-tax', label: 'Excise Tax' },
  { value: 'golden-visa', label: 'Golden Visa' },
  { value: 'company-registration', label: 'Company Registration' },
  { value: 'accounting', label: 'Accounting' },
  { value: 'trademark', label: 'Trademark' },
  { value: 'general', label: 'General' },
]

const ICON_TYPES = [
  { value: 'auto', label: 'Auto-detect' },
  { value: 'pdf', label: 'PDF Document' },
  { value: 'document', label: 'Document' },
  { value: 'link', label: 'External Link' },
  { value: 'law', label: 'Law / Legal' },
  { value: 'government', label: 'Government' },
  { value: 'newsletter', label: 'Newsletter' },
]

const newResourceTemplate = {
  title_en: '',
  title_ar: '',
  description_en: '',
  description_ar: '',
  resource_type: 'government-document',
  category: 'general',
  url: '',
  document_url: '',
  icon_type: 'auto',
  source_name: '',
  is_pinned: false,
  pin_to_homepage: false,
  is_active: true,
}

export default function ResourcesManager() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [resources, setResources] = useState([])
  const [expandedId, setExpandedId] = useState(null)
  const [showNewForm, setShowNewForm] = useState(false)
  const [editData, setEditData] = useState({})
  const [saving, setSaving] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [toast, setToast] = useState(null)
  const [filterType, setFilterType] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user || null)
      if (session?.user) {
        await loadResources()
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  const loadResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('published_at', { ascending: false })

      if (error) throw error
      setResources(data || [])
      setEditData({})
    } catch (err) {
      console.error('Error loading resources:', err)
      showToast('Error loading resources', 'error')
    }
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleExpandToggle = (id) => {
    setExpandedId(expandedId === id ? null : id)
    if (!editData[id] && expandedId !== id) {
      const resource = resources.find((r) => r.id === id)
      setEditData((prev) => ({
        ...prev,
        [id]: { ...resource },
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

  const handleSave = async (id) => {
    setSaving(id)
    try {
      const data = editData[id]
      if (!data.title_en) {
        showToast('Please fill in the title (English)', 'error')
        setSaving(null)
        return
      }

      const { error } = await supabase
        .from('resources')
        .update({
          title_en: data.title_en,
          title_ar: data.title_ar,
          description_en: data.description_en,
          description_ar: data.description_ar,
          resource_type: data.resource_type,
          category: data.category,
          url: data.url,
          document_url: data.document_url,
          icon_type: data.icon_type,
          source_name: data.source_name,
          is_pinned: data.is_pinned,
          pin_to_homepage: data.pin_to_homepage,
          is_active: data.is_active,
          sort_order: data.sort_order || 0,
        })
        .eq('id', id)

      if (error) throw error

      await loadResources()
      setExpandedId(null)
      showToast('Resource updated successfully', 'success')
    } catch (err) {
      console.error('Error saving resource:', err)
      showToast('Error saving resource', 'error')
    } finally {
      setSaving(null)
    }
  }

  const handleCreate = async () => {
    setSaving('new')
    try {
      const data = editData.new || newResourceTemplate
      if (!data.title_en) {
        showToast('Please fill in the title (English)', 'error')
        setSaving(null)
        return
      }

      const { error } = await supabase.from('resources').insert({
        title_en: data.title_en,
        title_ar: data.title_ar,
        description_en: data.description_en,
        description_ar: data.description_ar,
        resource_type: data.resource_type || 'government-document',
        category: data.category || 'general',
        url: data.url,
        document_url: data.document_url,
        icon_type: data.icon_type || 'auto',
        source_name: data.source_name,
        is_pinned: data.is_pinned || false,
        pin_to_homepage: data.pin_to_homepage || false,
        is_active: data.is_active !== false,
        sort_order: data.sort_order || 0,
        published_at: new Date().toISOString(),
      })

      if (error) throw error

      await loadResources()
      setShowNewForm(false)
      setEditData((prev) => {
        const updated = { ...prev }
        delete updated.new
        return updated
      })
      showToast('Resource created successfully', 'success')
    } catch (err) {
      console.error('Error creating resource:', err)
      showToast('Error creating resource', 'error')
    } finally {
      setSaving(null)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) return

    setDeleting(id)
    try {
      const { error } = await supabase.from('resources').delete().eq('id', id)
      if (error) throw error

      await loadResources()
      setExpandedId(null)
      showToast('Resource deleted successfully', 'success')
    } catch (err) {
      console.error('Error deleting resource:', err)
      showToast('Error deleting resource', 'error')
    } finally {
      setDeleting(null)
    }
  }

  const getTypeLabel = (type) => RESOURCE_TYPES.find((t) => t.value === type)?.label || type
  const getCategoryLabel = (cat) => CATEGORIES.find((c) => c.value === cat)?.label || cat

  const filteredResources = resources.filter((r) => {
    if (filterType && r.resource_type !== filterType) return false
    if (filterCategory && r.category !== filterCategory) return false
    return true
  })

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#6b8e6f] mx-auto"></div>
            <p className="text-slate-600">Loading resources...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (!user) return null

  const newData = editData.new || newResourceTemplate

  const renderForm = (id, data, isNew = false) => (
    <div className="p-6 space-y-6">
      {/* Titles */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Title (English) *</label>
          <input
            type="text"
            value={data.title_en || ''}
            onChange={(e) => isNew ? handleNewChange('title_en', e.target.value) : handleEditChange(id, 'title_en', e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
            placeholder="Resource title..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Title (Arabic)</label>
          <input
            type="text"
            value={data.title_ar || ''}
            onChange={(e) => isNew ? handleNewChange('title_ar', e.target.value) : handleEditChange(id, 'title_ar', e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10 text-right"
            dir="rtl"
            placeholder="عنوان المورد"
          />
        </div>
      </div>

      {/* Descriptions */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Description (English)</label>
          <textarea
            value={data.description_en || ''}
            onChange={(e) => isNew ? handleNewChange('description_en', e.target.value) : handleEditChange(id, 'description_en', e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
            rows="3"
            placeholder="Brief description..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Description (Arabic)</label>
          <textarea
            value={data.description_ar || ''}
            onChange={(e) => isNew ? handleNewChange('description_ar', e.target.value) : handleEditChange(id, 'description_ar', e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10 text-right"
            rows="3"
            dir="rtl"
            placeholder="وصف مختصر..."
          />
        </div>
      </div>

      {/* Type, Category, Icon */}
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Resource Type *</label>
          <select
            value={data.resource_type || 'government-document'}
            onChange={(e) => isNew ? handleNewChange('resource_type', e.target.value) : handleEditChange(id, 'resource_type', e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
          >
            {RESOURCE_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
          <select
            value={data.category || 'general'}
            onChange={(e) => isNew ? handleNewChange('category', e.target.value) : handleEditChange(id, 'category', e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Display Icon</label>
          <select
            value={data.icon_type || 'auto'}
            onChange={(e) => isNew ? handleNewChange('icon_type', e.target.value) : handleEditChange(id, 'icon_type', e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
          >
            {ICON_TYPES.map((i) => (
              <option key={i.value} value={i.value}>{i.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* URLs */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">External URL</label>
          <input
            type="url"
            value={data.url || ''}
            onChange={(e) => isNew ? handleNewChange('url', e.target.value) : handleEditChange(id, 'url', e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10 font-mono text-sm"
            placeholder="https://tax.gov.ae/..."
          />
          <p className="mt-1 text-xs text-slate-500">For external links and websites</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Document URL / File Link</label>
          <input
            type="url"
            value={data.document_url || ''}
            onChange={(e) => isNew ? handleNewChange('document_url', e.target.value) : handleEditChange(id, 'document_url', e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10 font-mono text-sm"
            placeholder="https://example.com/document.pdf"
          />
          <p className="mt-1 text-xs text-slate-500">Direct link to a downloadable document (PDF, etc.)</p>
        </div>
      </div>

      {/* Source & Sort */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Source Name</label>
          <input
            type="text"
            value={data.source_name || ''}
            onChange={(e) => isNew ? handleNewChange('source_name', e.target.value) : handleEditChange(id, 'source_name', e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
            placeholder="e.g., Federal Tax Authority, UAE Government"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Sort Order</label>
          <input
            type="number"
            value={data.sort_order || 0}
            onChange={(e) => isNew ? handleNewChange('sort_order', parseInt(e.target.value) || 0) : handleEditChange(id, 'sort_order', parseInt(e.target.value) || 0)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
            min="0"
          />
          <p className="mt-1 text-xs text-slate-500">Lower numbers appear first</p>
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.is_active !== false}
            onChange={(e) => isNew ? handleNewChange('is_active', e.target.checked) : handleEditChange(id, 'is_active', e.target.checked)}
            className="rounded border-slate-300"
          />
          <span className="text-sm font-medium text-slate-700">Active</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.is_pinned || false}
            onChange={(e) => isNew ? handleNewChange('is_pinned', e.target.checked) : handleEditChange(id, 'is_pinned', e.target.checked)}
            className="rounded border-slate-300"
          />
          <span className="text-sm font-medium text-slate-700">Pin to News Page</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.pin_to_homepage || false}
            onChange={(e) => {
              const handler = isNew ? handleNewChange : (f, v) => handleEditChange(id, f, v)
              handler('pin_to_homepage', e.target.checked)
              if (e.target.checked) handler('is_pinned', true)
            }}
            className="rounded border-slate-300"
          />
          <span className="text-sm font-medium text-slate-700">Pin to Homepage</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-slate-200">
        <button
          onClick={isNew ? handleCreate : () => handleSave(id)}
          disabled={saving === (isNew ? 'new' : id)}
          className="rounded-lg bg-[#6b8e6f] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a7a5f] disabled:opacity-50 transition-colors"
        >
          {saving === (isNew ? 'new' : id) ? 'Saving...' : isNew ? 'Create Resource' : 'Save Changes'}
        </button>
        {!isNew && (
          <button
            onClick={() => handleDelete(id)}
            disabled={deleting === id}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {deleting === id ? 'Deleting...' : 'Delete'}
          </button>
        )}
        <button
          onClick={() => {
            if (isNew) {
              setShowNewForm(false)
              setEditData((prev) => { const u = { ...prev }; delete u.new; return u })
            } else {
              setExpandedId(null)
            }
          }}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
        >
          {isNew ? 'Cancel' : 'Close'}
        </button>
      </div>
    </div>
  )

  return (
    <AdminLayout user={user}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Resources</h1>
            <p className="mt-1 text-slate-600">Manage government documents, laws, guides & external links</p>
          </div>
          <button
            onClick={() => setShowNewForm(!showNewForm)}
            className="rounded-lg bg-[#6b8e6f] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a7a5f] transition-colors"
          >
            + New Resource
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-[#6b8e6f] focus:outline-none"
          >
            <option value="">All Types</option>
            {RESOURCE_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-[#6b8e6f] focus:outline-none"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <span className="self-center text-sm text-slate-500">
            {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* New Resource Form */}
        {showNewForm && (
          <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900">Create New Resource</h2>
            </div>
            {renderForm('new', newData, true)}
          </div>
        )}

        {/* Resources List */}
        {filteredResources.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
            <p className="text-slate-600">No resources found. Create your first resource!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResources.map((resource) => {
              const data = editData[resource.id] || resource
              const isExpanded = expandedId === resource.id

              return (
                <div key={resource.id} className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                  <button
                    onClick={() => handleExpandToggle(resource.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-slate-900">{resource.title_en}</h3>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                          {getTypeLabel(resource.resource_type)}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                          {getCategoryLabel(resource.category)}
                        </span>
                        {resource.is_pinned && (
                          <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                            Pinned
                          </span>
                        )}
                        {resource.pin_to_homepage && (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Homepage
                          </span>
                        )}
                        {!resource.is_active && (
                          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                            Inactive
                          </span>
                        )}
                      </div>
                    </div>
                    <svg
                      className={`h-5 w-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-slate-200 bg-slate-50">
                      {renderForm(resource.id, data, false)}
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
