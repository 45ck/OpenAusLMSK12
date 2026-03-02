import type { Metadata } from 'next';
import Link from 'next/link';
import './styles.css';

export const metadata: Metadata = {
  title: 'OpenAusLMSK12',
  description: 'Monorepo scaffold for phase-1 implementation.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <nav className="site-nav">
          <Link href="/">Home</Link>
          <Link href="/modules">Module Catalog</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
