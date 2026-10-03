import { supabase } from './supabaseClient.js';

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  // 1. Log the user in via Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError) {
    alert('Login error: ' + authError.message);
    return; // Stop execution if login fails
  }

  // 2. Grab the unique ID of the user who just logged in
  const userId = authData.user.id;

  // 3. Look up their specific role in your custom 'users' table
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('role, team_id')
    .eq('id', userId)
    .single();

  // If they are an Admin or Team Rep (found in the 'users' table)
  if (!userError && userData) {
    if (userData.role === 'admin') {
      window.location.href = 'admin-dashboard.html';
      return;
    } else if (userData.role === 'team_rep') {
      localStorage.setItem('my_team_id', userData.team_id);
      window.location.href = 'team-dashboard.html';
      return;
    }
  }

  // 4. If not found in the 'users' table, check if they are a linked Player
  const { data: playerRecord, error: playerError } = await supabase
    .from('players')
    .select('id')
    .eq('auth_id', userId)
    .single();

  if (!playerError && playerRecord) {
    window.location.href = 'player-profile.html';
    return;
  }

  // 5. If they don't match any role or player profile, block login
  alert('Error: Account has no assigned role or linked player profile.');
  await supabase.auth.signOut();
});
