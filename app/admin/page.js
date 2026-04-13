'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [stats, setStats] = useState({
    services: 0,
    blogPosts: 0,
    unreadMessages: 0,
    testimonials: 0,
  })
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()
        if (session) {
          setUser(session.user)
          loadStats()
        }
        setLoading(false)
      } catch (err) {
        console.error('Auth check error:', err)
        setLoading(false)
      }
    }

    checkAuth()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null)
        if (session?.user) {
          loadStats()
        }
      }
    )

    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  const loadStats = async () => {
    try {
      const [
        { count: servicesCount },
        { count: postsCount },
        { count: unreadCount },
        { count: testimonialsCount },
      ] = await Promise.all([
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
        supabase
          .from('contact_submissions')
          .select('id', { count: 'exact', head: true })
          .eq('is_read', false),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
      ])

      setStats({
        services: servicesCount || 0,
        blogPosts: postsCount || 0,
        unreadMessages: unreadCount || 0,
        testimonials: testimonialsCount || 0,
      })
    } catch (err) {
      console.error('Error loading stats:', err)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    setIsSigningIn(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setLoginError(error.message)
      } else {
        setEmail('')
        setPassword('')
      }
    } catch (err) {
      setLoginError('An unexpected error occurred')
      console.error('Login error:', err)
    } finally {
      setIsSigningIn(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#6b8e6f] mx-auto"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">Sage CMS</h1>
            <p className="mt-2 text-sm text-slate-600">Admin Panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                placeholder="admin@example.com"
                required
                disabled={isSigningIn}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6b8e6f] focus:outline-none focus:ring-2 focus:ring-[#6b8e6f]/10"
                placeholder="••••••••"
                required
                disabled={isSigningIn}
              />
            </div>

            {loginError && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSigningIn}
              className="w-full rounded-lg bg-[#6b8e6f] py-2 font-medium text-white hover:bg-[#5a7a5f] disabled:opacity-50 transition-colors"
            >
              {isSigningIn ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <AdminLayout user={user}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-slate-600">Welcome back to Sage CMS</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/admin/services">
            <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Services</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {stats.services}
                  </p>
                </div>
                <div className="rounded-lg bg-blue-100 p-3">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/admin/blog">
            <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Blog Posts</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {stats.blogPosts}
                  </p>
                </div>
                <div className="rounded-lg bg-purple-100 p-3">
                  <svg
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2m2 2a2 2 0 002-2m-2 2v-6a2 2 0 012-2h.932a2 2 0 011.932 2.684l-.5 2.5H21"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/admin/messages">
            <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Unread Messages</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {stats.unreadMessages}
                  </p>
                </div>
                <div className="rounded-lg bg-amber-100 p-3">
                  <svg
                    className="h-6 w-6 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/admin/testimonials">
            <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Testimonials</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {stats.testimonials}
                  </p>
                </div>
                <div className="rounded-lg bg-green-100 p-3">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Links</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/admin/content"
              className="flex items-center justify-between rounded-lg border border-slate-200 p-4 hover:border-[#6b8e6f] hover:bg-slate-50 transition-colors"
            >
              <span className="font-medium text-slate-900">Site Content</span>
              <svg
                className="h-5 w-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>

            <Link
              href="/admin/faqs"
              className="flex items-center justify-between rounded-lg border border-slate-200 p-4 hover:border-[#6b8e6f] hover:bg-slate-50 transition-colors"
            >
              <span className="font-medium text-slate-900">FAQs</span>
              <svg
                className="h-5 w-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
