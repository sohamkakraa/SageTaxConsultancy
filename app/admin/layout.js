export const metadata = {
  title: { absolute: 'Website editor · Sage Global Advisory' },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <div className="font-sans" dir="ltr" lang="en">{children}</div>;
}
