import { supabase } from "./client";

// Register new user
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  return { data, error };
}

// Login
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

// Logout
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// Get current user session
export function getUser() {
  return supabase.auth.getUser();
}
