import { supabase } from './supabaseClient.js';

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert('Login error: ' + error.message);
  } else {
    alert('Successfully logged in as ' + data.user.email);
    console.log('User Session:', data.session);
  }
});
