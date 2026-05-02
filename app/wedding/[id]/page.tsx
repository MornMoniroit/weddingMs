'use client';

import { useState, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Plus, UserPlus } from 'lucide-react';
import { useWedding } from '@/context/WeddingContext';
import GuestTable from '@/components/GuestTable';
import SummaryCard from '@/components/SummaryCard';
import { Guest, WeddingSummary } from '@/types';

interface GuestForm {
  name: string;
  side: 'bride' | 'groom';
  currency: 'USD' | 'KHR';
  amount: string;
}

interface GuestFormErrors {
  name?: string;
  amount?: string;
}

export default function WeddingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getWedding, getWeddingGuests, addGuest, deleteGuest } = useWedding();

  const wedding = getWedding(id);
  if (!wedding) return notFound();

  const guests = getWeddingGuests(id);

  const [form, setForm] = useState<GuestForm>({
    name: '',
    side: 'bride',
    currency: 'USD',
    amount: '',
  });
  const [errors, setErrors] = useState<GuestFormErrors>({});
  const [showForm, setShowForm] = useState(false);

  // Compute summary
  const summary: WeddingSummary = guests.reduce(
    (acc, g) => {
      if (g.side === 'bride' && g.currency === 'USD') acc.bride_usd += g.amount;
      if (g.side === 'bride' && g.currency === 'KHR') acc.bride_khr += g.amount;
      if (g.side === 'groom' && g.currency === 'USD') acc.groom_usd += g.amount;
      if (g.side === 'groom' && g.currency === 'KHR') acc.groom_khr += g.amount;
      if (g.currency === 'USD') acc.total_usd += g.amount;
      if (g.currency === 'KHR') acc.total_khr += g.amount;
      return acc;
    },
    { bride_usd: 0, bride_khr: 0, groom_usd: 0, groom_khr: 0, total_usd: 0, total_khr: 0 }
  );

  const validate = (): boolean => {
    const newErrors: GuestFormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Guest name is required';
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      newErrors.amount = 'Enter a valid positive amount';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addGuest({
      wedding_id: id,
      name: form.name.trim(),
      side: form.side,
      currency: form.currency,
      amount: Number(form.amount),
    });
    setForm({ name: '', side: 'bride', currency: 'USD', amount: '' });
    setErrors({});
    setShowForm(false);
  };

  const formattedDate = new Date(wedding.wedding_date).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div>
      {/* Back */}
      <Link href="/" className="inline-flex items-center gap-2 mb-6 text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: '#b76e79' }}>
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Wedding Header Card */}
      <div className="card mb-8">
        <div className="h-2" style={{ background: 'linear-gradient(90deg, #b76e79, #e8b4b8, #b76e79)' }} />
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1" style={{ color: '#4a5568' }}>
                {wedding.bride_name} <span style={{ color: '#b76e79' }}>&</span> {wedding.groom_name}
              </h1>
              <div className="flex flex-wrap gap-4 mt-3">
                <div className="flex items-center gap-1.5 text-sm" style={{ color: '#718096' }}>
                  <Calendar className="w-4 h-4" style={{ color: '#b76e79' }} />
                  {formattedDate}
                </div>
                <div className="flex items-center gap-1.5 text-sm" style={{ color: '#718096' }}>
                  <MapPin className="w-4 h-4" style={{ color: '#b76e79' }} />
                  {wedding.location}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary whitespace-nowrap"
            >
              <UserPlus className="w-4 h-4" />
              Add Guest
            </button>
          </div>
        </div>
      </div>

      {/* Add Guest Form */}
      {showForm && (
        <div className="card mb-6 border-2" style={{ borderColor: '#e8b4b8' }}>
          <div className="p-6">
            <h2 className="font-bold text-lg mb-5 flex items-center gap-2" style={{ color: '#8b4f58' }}>
              <Plus className="w-5 h-5" />
              Add Guest & Gift
            </h2>
            <form onSubmit={handleAddGuest}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Name */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: '#4a5568' }}>Guest Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Uncle Chea"
                    value={form.name}
                    onChange={(e) => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: undefined })); }}
                    className={`input-field ${errors.name ? 'border-red-400' : ''}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Side */}
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: '#4a5568' }}>Guest Side</label>
                  <select
                    value={form.side}
                    onChange={(e) => setForm(p => ({ ...p, side: e.target.value as 'bride' | 'groom' }))}
                    className="input-field"
                  >
                    <option value="bride">💐 Bride's Side</option>
                    <option value="groom">🤵 Groom's Side</option>
                  </select>
                </div>

                {/* Currency */}
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: '#4a5568' }}>Currency</label>
                  <select
                    value={form.currency}
                    onChange={(e) => setForm(p => ({ ...p, currency: e.target.value as 'USD' | 'KHR' }))}
                    className="input-field"
                  >
                    <option value="USD">🇺🇸 USD – US Dollar</option>
                    <option value="KHR">🇰🇭 KHR – Cambodian Riel</option>
                  </select>
                </div>

                {/* Amount */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: '#4a5568' }}>
                    Gift Amount (ចំណាយ / Chnang Dai)
                  </label>
                  <input
                    type="number"
                    placeholder={form.currency === 'USD' ? 'e.g. 100' : 'e.g. 400000'}
                    value={form.amount}
                    min="0"
                    onChange={(e) => { setForm(p => ({ ...p, amount: e.target.value })); setErrors(p => ({ ...p, amount: undefined })); }}
                    className={`input-field ${errors.amount ? 'border-red-400' : ''}`}
                  />
                  {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                </div>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1 justify-center">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1 justify-center">
                  <Plus className="w-4 h-4" />
                  Add Guest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Guest Ledger */}
        <div className="lg:col-span-2 card">
          <div className="p-6 border-b" style={{ borderColor: '#f0ddd5' }}>
            <h2 className="font-bold text-lg" style={{ color: '#8b4f58' }}>
              Guest Ledger
              <span className="ml-2 text-sm font-normal px-2.5 py-0.5 rounded-full" style={{ background: '#fdf2f4', color: '#b76e79' }}>
                {guests.length} guests
              </span>
            </h2>
          </div>
          <GuestTable guests={guests} onDelete={deleteGuest} />
        </div>

        {/* Summary */}
        <div className="card">
          <div className="p-6">
            <SummaryCard summary={summary} guestCount={guests.length} />
          </div>
        </div>
      </div>
    </div>
  );
}
