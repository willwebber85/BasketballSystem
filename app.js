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
    .select('role')
    .eq('id', userId)
    .single();

  if (userError) {
    alert('Could not verify user role: ' + userError.message);
    return;
  }

  // 4. Redirect them to the correct GitHub Pages HTML file based on their role
  if (userData.role === 'admin') {
    window.location.href = 'admin-dashboard.html';
  } else if (userData.role === 'team_rep') {
    window.location.href = 'team-dashboard.html';
  } else {
    alert('Error: Account has no assigned role.');
  }
});
