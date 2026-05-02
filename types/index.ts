export interface Wedding {
  id: string;
  bride_name: string;
  groom_name: string;
  wedding_date: string;
  location: string;
  created_at: string;
}

export interface Guest {
  id: string;
  wedding_id: string;
  name: string;
  side: 'bride' | 'groom';
  currency: 'USD' | 'KHR';
  amount: number;
}

export interface WeddingSummary {
  bride_usd: number;
  bride_khr: number;
  groom_usd: number;
  groom_khr: number;
  total_usd: number;
  total_khr: number;
}
