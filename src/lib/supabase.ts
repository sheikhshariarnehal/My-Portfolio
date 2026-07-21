import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

type SupabaseClient = ReturnType<typeof createClient<Database>>;

const rawUrl = import.meta.env.PUBLIC_SUPABASE_URL || (typeof process !== 'undefined' ? process.env.PUBLIC_SUPABASE_URL : undefined);
const rawKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || (typeof process !== 'undefined' ? process.env.PUBLIC_SUPABASE_ANON_KEY : undefined);

const supabaseUrl = rawUrl ? rawUrl.replace(/[\r\n]/g, '').trim() : undefined;
const supabaseAnonKey = rawKey ? rawKey.replace(/[\r\n]/g, '').trim() : undefined;

let warnedMissingConfig = false;

function warnMissingSupabaseConfig() {
  if (warnedMissingConfig) return;
  warnedMissingConfig = true;
  console.warn(
    'Supabase is not configured. Set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY to enable dynamic data.'
  );
}

function initSupabaseClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  try {
    return createClient<Database>(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
}

const supabase: SupabaseClient | null = initSupabaseClient();

export { supabase };

function getSupabaseClient(): SupabaseClient | null {
  if (!supabase) warnMissingSupabaseConfig();
  return supabase;
}

// Helper functions for fetching data
export async function getProjects() {
  const client = getSupabaseClient();
  if (!client) return [] as Database['public']['Tables']['projects']['Row'][];

  const { data, error } = await client
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching projects from Supabase DB:', error);
    return [] as Database['public']['Tables']['projects']['Row'][];
  }
  return data || [];
}

export async function getExperience() {
  const client = getSupabaseClient();
  if (!client) return [];

  const { data, error } = await client
    .from('experience')
    .select('*')
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching experience:', error);
    return [];
  }
  return data;
}

export async function getEducation() {
  const client = getSupabaseClient();
  if (!client) return [];

  const { data, error } = await client
    .from('education')
    .select('*')
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching education:', error);
    return [];
  }
  return data;
}

export async function getSkills() {
  const client = getSupabaseClient();
  if (!client) return [];

  const { data, error } = await client
    .from('skills')
    .select('*')
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
  return data;
}

// Fetch all homepage settings sections as a keyed object
export async function getHomepageSettings() {
  const client = getSupabaseClient();
  if (!client) return {} as Record<string, any>;

  const { data, error } = await client
    .from('homepage_settings')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching homepage settings:', error);
    return {} as Record<string, any>;
  }

  // Convert array to keyed object by section name
  const settings: Record<string, any> = {};
  if (data) {
    for (const row of data) {
      settings[row.section] = row.content;
    }
  }
  return settings;
}
