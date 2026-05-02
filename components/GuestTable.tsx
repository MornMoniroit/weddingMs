'use client';

import { Trash2, Users, DollarSign } from 'lucide-react';
import { Guest } from '@/types';

interface GuestTableProps {
  guests: Guest[];
  onDelete: (id: string) => void;
}

export default function GuestTable({ guests, onDelete }: GuestTableProps) {
  if (guests.length === 0) {
    return (
      <div className="text-center py-16">
        <Users className="w-12 h-12 mx-auto mb-3" style={{ color: '#e8b4b8' }} />
        <p className="font-medium" style={{ color: '#718096' }}>No guests recorded yet</p>
        <p className="text-sm mt-1" style={{ color: '#a0aec0' }}>Add your first guest using the form above</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ background: 'linear-gradient(135deg, #fdf2f4, #fdf6ec)' }}>
            <th className="text-left px-4 py-3 font-semibold rounded-tl-xl" style={{ color: '#8b4f58' }}>#</th>
            <th className="text-left px-4 py-3 font-semibold" style={{ color: '#8b4f58' }}>Guest Name</th>
            <th className="text-left px-4 py-3 font-semibold" style={{ color: '#8b4f58' }}>Side</th>
            <th className="text-left px-4 py-3 font-semibold" style={{ color: '#8b4f58' }}>Currency</th>
            <th className="text-right px-4 py-3 font-semibold" style={{ color: '#8b4f58' }}>Amount</th>
            <th className="text-center px-4 py-3 font-semibold rounded-tr-xl" style={{ color: '#8b4f58' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest, idx) => (
            <tr
              key={guest.id}
              className="border-t transition-colors hover:bg-rose-50/40"
              style={{ borderColor: '#f0ddd5' }}
            >
              <td className="px-4 py-3 text-xs font-medium" style={{ color: '#a0aec0' }}>
                {idx + 1}
              </td>
              <td className="px-4 py-3 font-medium" style={{ color: '#4a5568' }}>
                {guest.name}
              </td>
              <td className="px-4 py-3">
                <span className={guest.side === 'bride' ? 'badge-bride' : 'badge-groom'}>
                  {guest.side === 'bride' ? '💐 Bride' : '🤵 Groom'}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={guest.currency === 'USD' ? 'badge-usd' : 'badge-khr'}>
                  {guest.currency}
                </span>
              </td>
              <td className="px-4 py-3 text-right font-semibold" style={{ color: '#4a5568' }}>
                {guest.currency === 'USD' ? '$' : ''}
                {guest.amount.toLocaleString()}
                {guest.currency === 'KHR' ? ' ៛' : ''}
              </td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => onDelete(guest.id)}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full transition-all hover:bg-red-100 active:scale-95"
                  title="Remove guest"
                  style={{ color: '#e53e3e' }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
