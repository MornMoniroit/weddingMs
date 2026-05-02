'use client';

import Link from 'next/link';
import { Plus, Heart, Search } from 'lucide-react';
import { useWedding } from '@/context/WeddingContext';
import WeddingCard from '@/components/WeddingCard';
import { useState } from 'react';

export default function DashboardPage() {
  const { weddings, deleteWedding } = useWedding();
  const [search, setSearch] = useState('');

  const filtered = weddings.filter(
    (w) =>
      w.bride_name.toLowerCase().includes(search.toLowerCase()) ||
      w.groom_name.toLowerCase().includes(search.toLowerCase()) ||
      w.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Hero Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-sm font-medium" style={{ background: '#fdf2f4', color: '#b76e79' }}>
          <Heart className="w-4 h-4 fill-current" />
          Wedding Management System
        </div>
        <h1 className="text-4xl font-bold mb-3" style={{ color: '#4a5568' }}>
          Your Wedding Registry
        </h1>
        <p className="text-lg max-w-xl mx-auto" style={{ color: '#718096' }}>
          Manage weddings, track guests, and monitor gifts — all in one elegant place.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#b76e79' }} />
          <input
            type="text"
            placeholder="Search by name or location…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <Link href="/register" className="btn-primary whitespace-nowrap">
          <Plus className="w-5 h-5" />
          Register New Wedding
        </Link>
      </div>

      {/* Count */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-px flex-1" style={{ background: '#f0ddd5' }} />
        <span className="text-sm font-medium px-3" style={{ color: '#b76e79' }}>
          {filtered.length} {filtered.length === 1 ? 'Wedding' : 'Weddings'}
        </span>
        <div className="h-px flex-1" style={{ background: '#f0ddd5' }} />
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((wedding) => (
            <WeddingCard key={wedding.id} wedding={wedding} onDelete={deleteWedding} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <Heart className="w-16 h-16 mx-auto mb-4" style={{ color: '#e8b4b8' }} />
          <h3 className="text-xl font-semibold mb-2" style={{ color: '#718096' }}>
            {search ? 'No weddings found' : 'No weddings yet'}
          </h3>
          <p className="mb-6" style={{ color: '#a0aec0' }}>
            {search ? 'Try a different search term.' : 'Register your first wedding to get started.'}
          </p>
          {!search && (
            <Link href="/register" className="btn-primary">
              <Plus className="w-5 h-5" />
              Register New Wedding
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
