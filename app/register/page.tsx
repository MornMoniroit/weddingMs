'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, ArrowLeft, Calendar, MapPin, User } from 'lucide-react';
import { useWedding } from '@/context/WeddingContext';
import Link from 'next/link';

interface FormData {
  bride_name: string;
  groom_name: string;
  wedding_date: string;
  location: string;
}

interface FormErrors {
  bride_name?: string;
  groom_name?: string;
  wedding_date?: string;
  location?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const { addWedding } = useWedding();

  const [form, setForm] = useState<FormData>({
    bride_name: '',
    groom_name: '',
    wedding_date: '',
    location: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.bride_name.trim()) newErrors.bride_name = "Bride's name is required";
    if (!form.groom_name.trim()) newErrors.groom_name = "Groom's name is required";
    if (!form.wedding_date) newErrors.wedding_date = 'Wedding date is required';
    if (!form.location.trim()) newErrors.location = 'Location is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    const wedding = addWedding(form);
    router.push(`/wedding/${wedding.id}`);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="max-w-xl mx-auto">
      {/* Back */}
      <Link href="/" className="inline-flex items-center gap-2 mb-6 text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: '#b76e79' }}>
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="card">
        <div className="h-2" style={{ background: 'linear-gradient(90deg, #b76e79, #e8b4b8, #b76e79)' }} />
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #b76e79, #8b4f58)' }}>
              <Heart className="w-7 h-7 text-white fill-white" />
            </div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: '#4a5568' }}>Register New Wedding</h1>
            <p className="text-sm" style={{ color: '#718096' }}>Fill in the details to create a wedding entry</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Bride Name */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#4a5568' }}>
                <User className="inline w-4 h-4 mr-1" style={{ color: '#b76e79' }} />
                Bride's Name
              </label>
              <input
                type="text"
                placeholder="e.g. Sophea Chan"
                value={form.bride_name}
                onChange={(e) => handleChange('bride_name', e.target.value)}
                className={`input-field ${errors.bride_name ? 'border-red-400' : ''}`}
              />
              {errors.bride_name && <p className="text-red-500 text-xs mt-1">{errors.bride_name}</p>}
            </div>

            {/* Groom Name */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#4a5568' }}>
                <User className="inline w-4 h-4 mr-1" style={{ color: '#b76e79' }} />
                Groom's Name
              </label>
              <input
                type="text"
                placeholder="e.g. Dara Kim"
                value={form.groom_name}
                onChange={(e) => handleChange('groom_name', e.target.value)}
                className={`input-field ${errors.groom_name ? 'border-red-400' : ''}`}
              />
              {errors.groom_name && <p className="text-red-500 text-xs mt-1">{errors.groom_name}</p>}
            </div>

            {/* Wedding Date */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#4a5568' }}>
                <Calendar className="inline w-4 h-4 mr-1" style={{ color: '#b76e79' }} />
                Wedding Date
              </label>
              <input
                type="date"
                value={form.wedding_date}
                onChange={(e) => handleChange('wedding_date', e.target.value)}
                className={`input-field ${errors.wedding_date ? 'border-red-400' : ''}`}
              />
              {errors.wedding_date && <p className="text-red-500 text-xs mt-1">{errors.wedding_date}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#4a5568' }}>
                <MapPin className="inline w-4 h-4 mr-1" style={{ color: '#b76e79' }} />
                Location / Venue
              </label>
              <input
                type="text"
                placeholder="e.g. Raffles Hotel, Phnom Penh"
                value={form.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className={`input-field ${errors.location ? 'border-red-400' : ''}`}
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <Link href="/" className="btn-secondary flex-1 justify-center">
                Cancel
              </Link>
              <button type="submit" disabled={submitting} className="btn-primary flex-1 justify-center">
                {submitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Registering…
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4" />
                    Register Wedding
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
