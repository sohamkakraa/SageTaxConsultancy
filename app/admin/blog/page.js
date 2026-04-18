'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import AdminLayout from '@/components/admin/AdminLayout'
import AutoTranslateButton from '@/components/admin/AutoTranslateButton'
import Toast from '@/components/admin/Toast'

const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function BlogManager() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [expandedId, setExpandedId] = useState(null)
  const [showNewForm, setShowNewForm] = useState(false)
  const [editData, setEditData] = useState({})
  const [saving, setSaving] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [toast, setToast] = useState(null)
  const supabase = createClient()

  const newPostTemplate = {
    title_en: '',
    title_ar: '',
    slug: '',
    excerpt_en: '',
    excerpt_ar: '',
    content_en: '',
    content_ar: '',
    category: '',
    is_published: false,
  }

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user || null)
      if (session?.user) {
        await loadPosts()
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
      setEditData({})
    } catch (err) {
      console.error('Error loading posts:', err)
      showToast('Error loading posts', 'error')
    }
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleExpandToggle = (id) => {
    setExpandedId(expandedId === id ? null : id)
    if (!editData[id] && expandedId !== id) {
      const post = posts.find((p) => p.id === id)
      setEditData((prev) => ({
        ...prev,
        [id]: { ...post },
      }))
    }
  }

  // Fixed: spread operator was missing on prev — was overwriting all edit state
  const handleEditChange = (id, field, value) => {
    setEditData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }))
  }

  const handleNewPostChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      new: {
        ...prev.new,
        [field]: value,
      },
    }))
  }

  const handleTitleChange = (id, lang, value) => {
    const slug = lang === 'en' && !editData[id]?.slug ? generateSlug(value) : undefined
    handleEditChange(id, `title_${lang}`, value)
    if (slug) {
      handleEditChange(id, 'slug', slug)
    }
  }

  const handleSavePost = async (id) => {
    setSaving(id)
    try {
      const data = editData[id]

      if (!data.title_en || !data.slug) {
        showToast('Please fill in required fields', 'error')
        setSaving(null)
        return
      }

      const { error } = await supabase
        .from('blog_posts')
        .update({
          title_en: data.title_en,
          title_ar: data.title_ar,
          slug: data.slug,
          excerpt_en: data.excerpt_en,
          excerpt_ar: data.excerpt_ar,
          content_en: data.content_en,
          content_ar: data.content_ar,
          category: data.category,
          is_published: data.is_published,
        })
        .eq('id', id)

      if (error) throw error

      await loadPosts()
      setExpandedId(null)
      showToast('Post updated successfully', 'success')
    } catch (err) {
      console.error('Error saving post:', err)
      showToast('Error saving post', 'error')
    } finally {
      setSaving(null)
    }
  }

  const handleCreatePost = async () => {
    setSaving('new')
    try {
      const data = editData.new || newPostTemplate

      if (!data.title_en || !data.slug) {
        showToast('Please fill in required fields', 'error')
        setSaving(null)
        return
      }

      const { error } = await supabase.from('blog_posts').insert({
        title_en: data.title_en,
        title_ar: data.title_ar,
        slug: data.slug,
        excerpt_en: data.excerpt_en,
        excerpt_ar: data.excerpt_ar,
        content_en: data.content_en,
        content_ar: data.content_ar,
        category: data.category,
        is_published: data.is_published,
        published_at: data.is_published ? new Date().toISOString() : null,
      })

      if (error) throw error

      await loadPosts()
      setShowNewForm(false)
      setEditData((prev) => {
        const updated = { ...prev }
        delete updated.new
        return updated
      })
      showToast('Post created successfully', 'success')
    } catch (err) {
      console.error('Error creating post:', err)
      showToast('Error creating post', 'error')
    } finally {
      setSaving(null)
    }
  }

  const handleDeletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return
    }

    setDeleting(id)
    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id)

      if (error) throw error

      await loadPosts()
      setExpandedId(null)
      showToast('Post deleted successfully', 'success')
    } catch (err) {
      console.error('Error deleting post:', err)
      showToast('Error deleting post', 'error')
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
            <p className="text-slate-600">Loading posts...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (!user) {
    return null
  }

  const newPostData = editData.new || newPostTemplate

  return (
    <AdminLayout user={user}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Blog Posts</h1>
            <p className="mt-1 text-slate-600">Create and manage blog content</p>
          </div>
          <button
            onClick={() => setShowNewForm(!showNewForm)}
            className="rounded-lg bg-[#6b8e6f] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a7a5f] transition-colors"
          >
            + New Post
          </button>
        </div>

        {/* New Post Form */}
        {showNewForm && (
          <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900">Create New Post</h2>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Title (English) *
                  </label>
                  <input
                    type="text"
                    value={newPostData.title_en}
                    onChange={(e) =>
                      handleNewPostChange(
                        'title_en',
                        e.target.value
                      ) ||
                      (newPostData.slug === '' &&
                        handleNewPostChange('slug', generateSlug(e.target.value)))
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                    placeholder="Post title..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Title (Arabic)
                  </label>
                  <input
                    type="text"
                    value={newPostData.title_ar}
                    onChange={(e) => handleNewPostChange('title_ar', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10 text-right"
                    dir="rtl"
                    placeholder="عنوان المقالة"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  value={newPostData.slug}
                  onChange={(e) => handleNewPostChange('slug', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10 font-mono text-sm"
                  placeholder="slug-format"
                />
                <p className="mt-1 text-xs text-slate-500">Auto-generated from English title</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Excerpt (English)
                  </label>
                  <textarea
                    value={newPostData.excerpt_en}
                    onChange={(e) => handleNewPostChange('excerpt_en', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                    rows="2"
                    placeholder="Short excerpt..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Excerpt (Arabic)
                  </label>
                  <textarea
                    value={newPostData.excerpt_ar}
                    onChange={(e) => handleNewPostChange('excerpt_ar', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10 text-right"
                    rows="2"
                    dir="rtl"
                    placeholder="ملخص قصير..."
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Content (English)
                  </label>
                  <textarea
                    value={newPostData.content_en}
                    onChange={(e) => handleNewPostChange('content_en', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                    rows="6"
                    placeholder="Full post content..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Content (Arabic)
                  </label>
                  <textarea
                    value={newPostData.content_ar}
                    onChange={(e) => handleNewPostChange('content_ar', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10 text-right"
                    rows="6"
                    dir="rtl"
                    placeholder="محتوى المقالة الكامل..."
                  />
                </div>
              </div>

              <AutoTranslateButton
                fields={{
                  title_ar: newPostData.title_en,
                  excerpt_ar: newPostData.excerpt_en,
                  content_ar: newPostData.content_en,
                }}
                onTranslated={(translated) => {
                  Object.entries(translated).forEach(([key, value]) => {
                    handleNewPostChange(key, value)
                  })
                }}
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={newPostData.category || ''}
                  onChange={(e) => handleNewPostChange('category', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                  placeholder="e.g., tax-tips, regulations"
                />
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newPostData.is_published || false}
                  onChange={(e) => handleNewPostChange('is_published', e.target.checked)}
                  className="rounded border-slate-300"
                />
                <span className="text-sm font-medium text-slate-700">Publish immediately</span>
              </label>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={handleCreatePost}
                  disabled={saving === 'new'}
                  className="rounded-lg bg-[#6b8e6f] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a7a5f] disabled:opacity-50 transition-colors"
                >
                  {saving === 'new' ? 'Creating...' : 'Create Post'}
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

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
            <p className="text-slate-600">No posts found yet. Create your first post!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => {
              const data = editData[post.id] || post
              const isExpanded = expandedId === post.id

              return (
                <div key={post.id} className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                  <button
                    onClick={() => handleExpandToggle(post.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-slate-900">{post.title_en}</h3>
                      <div className="mt-2 flex items-center gap-3 text-sm text-slate-600">
                        <span>{post.category}</span>
                        {post.is_published && (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                            Published
                          </span>
                        )}
                        {post.is_auto_fetched && (
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                            Auto-fetched
                          </span>
                        )}
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
                            Title (English)
                          </label>
                          <input
                            type="text"
                            value={data.title_en || ''}
                            onChange={(e) =>
                              handleTitleChange(post.id, 'en', e.target.value)
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Title (Arabic)
                          </label>
                          <input
                            type="text"
                            value={data.title_ar || ''}
                            onChange={(e) =>
                              handleTitleChange(post.id, 'ar', e.target.value)
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10 text-right"
                            dir="rtl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Slug
                        </label>
                        <input
                          type="text"
                          value={data.slug || ''}
                          onChange={(e) =>
                            handleEditChange(post.id, 'slug', e.target.value)
                          }
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10 font-mono text-sm"
                        />
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Excerpt (English)
                          </label>
                          <textarea
                            value={data.excerpt_en || ''}
                            onChange={(e) =>
                              handleEditChange(
                                post.id,
                                'excerpt_en',
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Excerpt (Arabic)
                          </label>
                          <textarea
                            value={data.excerpt_ar || ''}
                            onChange={(e) =>
                              handleEditChange(
                                post.id,
                                'excerpt_ar',
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10 text-right"
                            rows="2"
                            dir="rtl"
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Content (English)
                          </label>
                          <textarea
                            value={data.content_en || ''}
                            onChange={(e) =>
                              handleEditChange(
                                post.id,
                                'content_en',
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                            rows="6"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Content (Arabic)
                          </label>
                          <textarea
                            value={data.content_ar || ''}
                            onChange={(e) =>
                              handleEditChange(
                                post.id,
                                'content_ar',
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10 text-right"
                            rows="6"
                            dir="rtl"
                          />
                        </div>
                      </div>

                      <AutoTranslateButton
                        fields={{
                          title_ar: data.title_en,
                          excerpt_ar: data.excerpt_en,
                          content_ar: data.content_en,
                        }}
                        onTranslated={(translated) => {
                          Object.entries(translated).forEach(([key, value]) => {
                            handleEditChange(post.id, key, value)
                          })
                        }}
                      />

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Category
                        </label>
                        <input
                          type="text"
                          value={data.category || ''}
                          onChange={(e) =>
                            handleEditChange(post.id, 'category', e.target.value)
                          }
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                        />
                      </div>

                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={data.is_published || false}
                          onChange={(e) =>
                            handleEditChange(
                              post.id,
                              'is_published',
                              e.target.checked
                            )
                          }
                          className="rounded border-slate-300"
                        />
                        <span className="text-sm font-medium text-slate-700">
                          Published
                        </span>
                      </label>

                      <div className="flex gap-3 pt-4 border-t border-slate-200">
                        <button
                          onClick={() => handleSavePost(post.id)}
                          disabled={saving === post.id}
                          className="rounded-lg bg-[#6b8e6f] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a7a5f] disabled:opacity-50 transition-colors"
                        >
                          {saving === post.id ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          disabled={deleting === post.id}
                          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
                        >
                          {deleting === post.id ? 'Deleting...' : 'Delete'}
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
