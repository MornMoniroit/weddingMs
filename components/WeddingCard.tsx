'use client';

import Link from 'next/link';
import { Calendar, MapPin, Trash2, Heart, Eye } from 'lucide-react';
import { Wedding } from '@/types';

interface WeddingCardProps {
  wedding: Wedding;
  onDelete: (id: string) => void;
}

export default function WeddingCard({ wedding, onDelete }: WeddingCardProps) {
  const formattedDate = new Date(wedding.wedding_date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm(`Delete ${wedding.bride_name} & ${wedding.groom_name}'s wedding?`)) {
      onDelete(wedding.id);
    }
  };

  return (
    <div className="card group">
      {/* Rose Gold Accent Bar */}
      <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #b76e79, #e8b4b8, #b76e79)' }} />

      <div className="p-6">
        {/* Names */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Heart className="w-4 h-4 fill-current" style={{ color: '#b76e79' }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#b76e79' }}>Wedding</span>
            </div>
            <h3 className="text-xl font-bold leading-tight" style={{ color: '#4a5568' }}>
              {wedding.bride_name}
            </h3>
            <div className="flex items-center gap-1 my-1">
              <div className="h-px flex-1" style={{ background: '#e8b4b8' }} />
              <span className="text-xs px-2" style={{ color: '#b76e79' }}>& </span>
              <div className="h-px flex-1" style={{ background: '#e8b4b8' }} />
            </div>
            <h3 className="text-xl font-bold leading-tight" style={{ color: '#4a5568' }}>
              {wedding.groom_name}
            </h3>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2 text-sm" style={{ color: '#718096' }}>
            <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: '#b76e79' }} />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: '#718096' }}>
            <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#b76e79' }} />
            <span className="truncate">{wedding.location}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/wedding/${wedding.id}`}
            className="btn-primary flex-1 justify-center text-sm py-2"
          >
            <Eye className="w-4 h-4" />
            View Details
          </Link>
          <button
            onClick={handleDelete}
            className="btn-danger px-3 py-2"
            title="Delete wedding"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
