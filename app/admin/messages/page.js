'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import AdminLayout from '@/components/admin/AdminLayout'
import Toast from '@/components/admin/Toast'

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function MessagesManager() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [expandedId, setExpandedId] = useState(null)
  const [updating, setUpdating] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [toast, setToast] = useState(null)
  const [filterStatus, setFilterStatus] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user || null)
      if (session?.user) {
        await loadMessages()
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMessages(data || [])
    } catch (err) {
      console.error('Error loading messages:', err)
      showToast('Error loading messages', 'error')
    }
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleToggleRead = async (id, currentStatus) => {
    setUpdating(id)
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ is_read: !currentStatus })
        .eq('id', id)

      if (error) throw error

      await loadMessages()
      showToast(
        `Marked as ${!currentStatus ? 'read' : 'unread'}`,
        'success'
      )
    } catch (err) {
      console.error('Error updating message:', err)
      showToast('Error updating message', 'error')
    } finally {
      setUpdating(null)
    }
  }

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return
    }

    setDeleting(id)
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id)

      if (error) throw error

      await loadMessages()
      setExpandedId(null)
      showToast('Message deleted successfully', 'success')
    } catch (err) {
      console.error('Error deleting message:', err)
      showToast('Error deleting message', 'error')
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
            <p className="text-slate-600">Loading messages...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (!user) {
    return null
  }

  const unreadCount = messages.filter((m) => !m.is_read).length
  const filteredMessages = filterStatus === null
    ? messages
    : filterStatus === 'unread'
    ? messages.filter((m) => !m.is_read)
    : messages.filter((m) => m.is_read)

  return (
    <AdminLayout user={user}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Contact Messages</h1>
          <p className="mt-1 text-slate-600">
            {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterStatus(null)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filterStatus === null
                ? 'bg-[#6b8e6f] text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-[#6b8e6f]'
            }`}
          >
            All Messages ({messages.length})
          </button>
          <button
            onClick={() => setFilterStatus('unread')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filterStatus === 'unread'
                ? 'bg-[#6b8e6f] text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-[#6b8e6f]'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilterStatus('read')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filterStatus === 'read'
                ? 'bg-[#6b8e6f] text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-[#6b8e6f]'
            }`}
          >
            Read ({messages.filter((m) => m.is_read).length})
          </button>
        </div>

        {/* Messages List */}
        {filteredMessages.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
            <p className="text-slate-600">
              {filterStatus === 'unread'
                ? 'No unread messages.'
                : filterStatus === 'read'
                ? 'No read messages.'
                : 'No messages found.'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredMessages.map((message) => {
              const isExpanded = expandedId === message.id

              return (
                <div
                  key={message.id}
                  className={`rounded-lg border transition-all ${
                    message.is_read
                      ? 'border-slate-200 bg-white'
                      : 'border-amber-200 bg-amber-50'
                  }`}
                >
                  <button
                    onClick={() =>
                      setExpandedId(isExpanded ? null : message.id)
                    }
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-3">
                        {!message.is_read && (
                          <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                        )}
                        <h3 className={`font-${message.is_read ? 'normal' : 'semibold'} text-slate-900`}>
                          {message.name}
                        </h3>
                      </div>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-slate-600">
                          <span className="font-medium">Subject:</span> {message.subject}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>{message.email}</span>
                          {message.phone && <span>{message.phone}</span>}
                          <span>{formatDate(message.created_at)}</span>
                        </div>
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
                    <div className="border-t border-inherit bg-slate-50 p-6 space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-2">
                          Contact Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="font-medium text-slate-700">Name:</span>{' '}
                            <span className="text-slate-600">{message.name}</span>
                          </p>
                          <p>
                            <span className="font-medium text-slate-700">Email:</span>{' '}
                            <a
                              href={`mailto:${message.email}`}
                              className="text-[#6b8e6f] hover:underline"
                            >
                              {message.email}
                            </a>
                          </p>
                          {message.phone && (
                            <p>
                              <span className="font-medium text-slate-700">Phone:</span>{' '}
                              <a
                                href={`tel:${message.phone}`}
                                className="text-[#6b8e6f] hover:underline"
                              >
                                {message.phone}
                              </a>
                            </p>
                          )}
                          <p>
                            <span className="font-medium text-slate-700">Received:</span>{' '}
                            <span className="text-slate-600">
                              {formatDate(message.created_at)}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-2">
                          Subject
                        </h4>
                        <p className="text-sm text-slate-600">{message.subject}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-2">
                          Message
                        </h4>
                        <div className="rounded-lg bg-white p-4 border border-slate-200">
                          <p className="text-sm text-slate-600 whitespace-pre-wrap">
                            {message.message}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4 border-t border-slate-200">
                        <button
                          onClick={() =>
                            handleToggleRead(message.id, message.is_read)
                          }
                          disabled={updating === message.id}
                          className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300 disabled:opacity-50 transition-colors"
                        >
                          {updating === message.id
                            ? 'Updating...'
                            : message.is_read
                            ? 'Mark as Unread'
                            : 'Mark as Read'}
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(message.id)}
                          disabled={deleting === message.id}
                          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
                        >
                          {deleting === message.id ? 'Deleting...' : 'Delete'}
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
