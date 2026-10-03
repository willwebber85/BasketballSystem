import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// The base project URL (without /rest/v1/)
const supabaseUrl = 'https://tghmcurtatoucygxbern.supabase.co';

// Replace this with the full Publishable key you copied from your dashboard
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnaG1jdXJ0YXRvdWN5Z3hiZXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwMzMyNTksImV4cCI6MjEwNjYwOTI1OX0.t_YEdjZXiCVQhYhophHNE31dFzayZGFiLctmPuDZSI4'; 

export const supabase = createClient(supabaseUrl, supabaseKey);
