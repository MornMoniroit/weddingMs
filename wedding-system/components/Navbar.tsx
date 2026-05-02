'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b shadow-sm" style={{ borderColor: '#f0ddd5' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-md" style={{ background: 'linear-gradient(135deg, #b76e79, #8b4f58)' }}>
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="font-bold text-lg" style={{ color: '#8b4f58' }}>
              Wedding<span style={{ color: '#b76e79' }}>MS</span>
            </span>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              href="/"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                pathname === '/' ? 'text-white shadow-md' : 'hover:bg-rose-50'
              }`}
              style={pathname === '/' ? { background: 'linear-gradient(135deg, #b76e79, #8b4f58)' } : { color: '#718096' }}
            >
              Dashboard
            </Link>
            <Link
              href="/register"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                pathname === '/register' ? 'text-white shadow-md' : 'hover:bg-rose-50'
              }`}
              style={pathname === '/register' ? { background: 'linear-gradient(135deg, #b76e79, #8b4f58)' } : { color: '#718096' }}
            >
              Register Wedding
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
