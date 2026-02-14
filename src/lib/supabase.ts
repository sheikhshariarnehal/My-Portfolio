import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

// Only create client if credentials are available
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;

// Helper functions for fetching data
export async function getSkills() {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
  return data;
}

export async function getProjects() {
  if (!supabase) {
    console.warn('Supabase client not initialized');
    return [] as Database['public']['Tables']['projects']['Row'][];
  }
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching projects:', error);
    return [] as Database['public']['Tables']['projects']['Row'][];
  }
  return data || [];
}

export async function getFeaturedProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('sort_order', { ascending: true })
    .limit(6);
  
  if (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
  return data;
}

export async function getExperience() {
  if (!supabase) {
    console.warn('Supabase client not initialized');
    return [];
  }
  const { data, error } = await supabase
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
  if (!supabase) {
    console.warn('Supabase client not initialized');
    return [];
  }
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching education:', error);
    return [];
  }
  return data;
}

export async function getHomepageSettings() {
  if (!supabase) {
    console.warn('Supabase client not initialized');
    return {
      hero: null,
      about: null,
      contact: null,
      seo: null
    };
  }
  const { data, error } = await supabase
    .from('homepage_settings')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching homepage settings:', error);
    return {
      hero: null,
      about: null,
      contact: null,
      seo: null
    };
  }
  
  // Convert array to object keyed by section
  const settings: Record<string, any> = {};
  data?.forEach(item => {
    settings[item.section] = item.content;
  });
  
  return settings;
}

export async function getHomepageSettingsBySection(section: string) {
  if (!supabase) {
    console.warn('Supabase client not initialized');
    return null;
  }
  const { data, error } = await supabase
    .from('homepage_settings')
    .select('*')
    .eq('section', section)
    .eq('is_active', true)
    .single();
  
  if (error) {
    console.error(`Error fetching ${section} settings:`, error);
    return null;
  }
  
  return data?.content || null;
}
