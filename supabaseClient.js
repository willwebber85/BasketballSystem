import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// The base project URL (without /rest/v1/)
const supabaseUrl = 'https://tghmcurtatoucygxbern.supabase.co';

// Replace this with the full Publishable key you copied from your dashboard
const supabaseKey = 'sb_publishable_xa0BkDhtZZ9KKhSIriBbDw_fACC1...'; 

export const supabase = createClient(supabaseUrl, supabaseKey);
