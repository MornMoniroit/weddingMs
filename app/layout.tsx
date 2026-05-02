import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { WeddingProvider } from '@/context/WeddingContext';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wedding Management System',
  description: 'Manage weddings, guests, and gifts with elegance',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-cream-50`}>
        <WeddingProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
        </WeddingProvider>
      </body>
    </html>
  );
}
