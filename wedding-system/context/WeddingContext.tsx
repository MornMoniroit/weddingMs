'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Wedding, Guest } from '@/types';

interface WeddingContextType {
  weddings: Wedding[];
  guests: Guest[];
  addWedding: (wedding: Omit<Wedding, 'id' | 'created_at'>) => Wedding;
  deleteWedding: (id: string) => void;
  getWedding: (id: string) => Wedding | undefined;
  addGuest: (guest: Omit<Guest, 'id'>) => void;
  deleteGuest: (id: string) => void;
  getWeddingGuests: (weddingId: string) => Guest[];
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

const MOCK_WEDDINGS: Wedding[] = [
  {
    id: '1',
    bride_name: 'Sophea Chan',
    groom_name: 'Dara Kim',
    wedding_date: '2025-06-15',
    location: 'Raffles Hotel, Phnom Penh',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    bride_name: 'Maly Pich',
    groom_name: 'Visal Ros',
    wedding_date: '2025-08-22',
    location: 'Sokha Beach Resort, Sihanoukville',
    created_at: new Date().toISOString(),
  },
];

const MOCK_GUESTS: Guest[] = [
  { id: 'g1', wedding_id: '1', name: 'Uncle Chea', side: 'bride', currency: 'USD', amount: 100 },
  { id: 'g2', wedding_id: '1', name: 'Aunt Srey', side: 'bride', currency: 'KHR', amount: 400000 },
  { id: 'g3', wedding_id: '1', name: 'Mr. Heng', side: 'groom', currency: 'USD', amount: 200 },
  { id: 'g4', wedding_id: '1', name: 'Ms. Nita', side: 'groom', currency: 'KHR', amount: 200000 },
];

export function WeddingProvider({ children }: { children: ReactNode }) {
  const [weddings, setWeddings] = useState<Wedding[]>(MOCK_WEDDINGS);
  const [guests, setGuests] = useState<Guest[]>(MOCK_GUESTS);

  const addWedding = (data: Omit<Wedding, 'id' | 'created_at'>): Wedding => {
    const wedding: Wedding = {
      ...data,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    };
    setWeddings((prev) => [wedding, ...prev]);
    return wedding;
  };

  const deleteWedding = (id: string) => {
    setWeddings((prev) => prev.filter((w) => w.id !== id));
    setGuests((prev) => prev.filter((g) => g.wedding_id !== id));
  };

  const getWedding = (id: string) => weddings.find((w) => w.id === id);

  const addGuest = (data: Omit<Guest, 'id'>) => {
    const guest: Guest = { ...data, id: Date.now().toString() };
    setGuests((prev) => [...prev, guest]);
  };

  const deleteGuest = (id: string) => {
    setGuests((prev) => prev.filter((g) => g.id !== id));
  };

  const getWeddingGuests = (weddingId: string) =>
    guests.filter((g) => g.wedding_id === weddingId);

  return (
    <WeddingContext.Provider
      value={{ weddings, guests, addWedding, deleteWedding, getWedding, addGuest, deleteGuest, getWeddingGuests }}
    >
      {children}
    </WeddingContext.Provider>
  );
}

export function useWedding() {
  const ctx = useContext(WeddingContext);
  if (!ctx) throw new Error('useWedding must be used within WeddingProvider');
  return ctx;
}
