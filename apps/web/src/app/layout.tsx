import type { Metadata } from 'next';
import './styles.css';

export const metadata: Metadata = {
  title: 'OpenAusLMSK12',
  description: 'Monorepo scaffold for phase-1 implementation.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
