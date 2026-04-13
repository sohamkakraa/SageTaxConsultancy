import '../../../app/globals.css'

export const metadata = {
  title: 'Sage Tax Consultancy - Admin',
  description: 'Admin panel for Sage Tax Consultancy',
}

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        <style jsx>{`
          :root {
            --navy: #0f172a;
            --sage: #6b8e6f;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
              'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
              sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        `}</style>
        {children}
      </body>
    </html>
  )
}
