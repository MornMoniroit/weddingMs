'use client';

import { WeddingSummary } from '@/types';
import { TrendingUp } from 'lucide-react';

interface SummaryCardProps {
  summary: WeddingSummary;
  guestCount: number;
}

export default function SummaryCard({ summary, guestCount }: SummaryCardProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5" style={{ color: '#b76e79' }} />
        <h3 className="font-bold text-lg" style={{ color: '#8b4f58' }}>Gift Summary</h3>
        <span className="ml-auto text-sm px-3 py-0.5 rounded-full font-medium" style={{ background: '#fdf2f4', color: '#b76e79' }}>
          {guestCount} guests
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Bride Side */}
        <div className="summary-card" style={{ background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)' }}>
          <div className="text-2xl mb-1">💐</div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#be185d' }}>Bride's Side</div>
          <div className="space-y-1">
            <div className="font-bold text-lg" style={{ color: '#be185d' }}>
              ${summary.bride_usd.toLocaleString()}
            </div>
            <div className="text-sm font-medium" style={{ color: '#9d174d' }}>
              {summary.bride_khr.toLocaleString()} ៛
            </div>
          </div>
        </div>

        {/* Groom Side */}
        <div className="summary-card" style={{ background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)' }}>
          <div className="text-2xl mb-1">🤵</div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#1d4ed8' }}>Groom's Side</div>
          <div className="space-y-1">
            <div className="font-bold text-lg" style={{ color: '#1d4ed8' }}>
              ${summary.groom_usd.toLocaleString()}
            </div>
            <div className="text-sm font-medium" style={{ color: '#1e40af' }}>
              {summary.groom_khr.toLocaleString()} ៛
            </div>
          </div>
        </div>
      </div>

      {/* Total */}
      <div
        className="summary-card py-4"
        style={{ background: 'linear-gradient(135deg, #8b4f58, #b76e79)', color: 'white' }}
      >
        <div className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-80">Total Collected</div>
        <div className="flex items-center justify-center gap-6">
          <div>
            <div className="font-bold text-2xl">${summary.total_usd.toLocaleString()}</div>
            <div className="text-xs opacity-70">US Dollars</div>
          </div>
          <div className="h-10 w-px opacity-30 bg-white" />
          <div>
            <div className="font-bold text-2xl">{summary.total_khr.toLocaleString()}</div>
            <div className="text-xs opacity-70">Cambodian Riel ៛</div>
          </div>
        </div>
      </div>
    </div>
  );
}
