import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Proposta Comercial - Gráfica Digital',
  description: 'Apresentação comercial de serviços digitais para gráfica.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${inter.variable}`}>
      <body className="font-sans antialiased bg-zinc-950 text-zinc-50" suppressHydrationWarning>{children}</body>
    </html>
  );
}
