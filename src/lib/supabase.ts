import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eebexwcdmgyidtsjrsff.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlYmV4d2NkbWd5aWR0c2pyc2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyMzcyNjEsImV4cCI6MjA5MDgxMzI2MX0.u-l3cG1l5yekyWqIG_SioDd8acj53fHasYkJwwFO63w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
