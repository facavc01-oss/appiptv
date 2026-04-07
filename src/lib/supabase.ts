import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ghtjqjenlyvtnivvbxdq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdodGpxamVubHl2dG5pdnZieGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MTgzNDksImV4cCI6MjA5MTA5NDM0OX0.rNIV1TyJQ3UNtll-dcBIGCSYT-feezZJy1hEfgwrMLw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
