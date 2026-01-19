// Supabase Configuration for Wine Guide
// 
// SETUP INSTRUCTIONS:
// 1. Create free account at https://supabase.com
// 2. Create new project
// 3. Go to Settings > API to get your URL and anon key
// 4. Replace the values below
// 5. Create a 'wines' table with the schema below
// 
// SQL to create wines table:
// 
// CREATE TABLE wines (
//   id SERIAL PRIMARY KEY,
//   slug TEXT UNIQUE NOT NULL,
//   name TEXT NOT NULL,
//   price DECIMAL(10,2) NOT NULL,
//   type TEXT NOT NULL CHECK (type IN ('red', 'white', 'rose', 'sparkling')),
//   category TEXT NOT NULL,
//   region TEXT NOT NULL,
//   grape TEXT NOT NULL,
//   winery TEXT NOT NULL,
//   alcohol DECIMAL(4,1),
//   vintage TEXT,
//   closure TEXT,
//   rating DECIMAL(2,1),
//   image TEXT,
//   description TEXT,
//   tasting_notes JSONB,
//   pairings TEXT[],
//   region_info TEXT,
//   pro_tips TEXT[],
//   where_to_buy TEXT[],
//   drinking_window JSONB,
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
//   updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
// );
// 
// -- Enable Row Level Security
// ALTER TABLE wines ENABLE ROW LEVEL SECURITY;
// 
// -- Allow public read access
// CREATE POLICY "Public wines are viewable by everyone" 
//   ON wines FOR SELECT USING (true);

import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

// Check if we're using real Supabase or falling back to local data
export const isSupabaseConfigured = 
  supabaseUrl !== 'YOUR_SUPABASE_URL' && 
  supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY';

// Create Supabase client (only if configured)
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Wine API functions
export async function fetchWines() {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }
  
  const { data, error } = await supabase
    .from('wines')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data;
}

export async function fetchWineBySlug(slug) {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }
  
  const { data, error } = await supabase
    .from('wines')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) throw error;
  return data;
}

export async function fetchWinesByCategory(category) {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }
  
  const { data, error } = await supabase
    .from('wines')
    .select('*')
    .eq('category', category)
    .order('name');
  
  if (error) throw error;
  return data;
}

export async function fetchWinesByType(type) {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }
  
  const { data, error } = await supabase
    .from('wines')
    .select('*')
    .eq('type', type)
    .order('name');
  
  if (error) throw error;
  return data;
}

export async function searchWines(query) {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }
  
  const { data, error } = await supabase
    .from('wines')
    .select('*')
    .or(`name.ilike.%${query}%,region.ilike.%${query}%,grape.ilike.%${query}%,winery.ilike.%${query}%`)
    .order('name');
  
  if (error) throw error;
  return data;
}

// Export helper to check if Supabase is available
export function useSupabase() {
  return {
    isConfigured: isSupabaseConfigured,
    client: supabase
  };
}
