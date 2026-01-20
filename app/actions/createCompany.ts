// app/actions/createCompany.ts
"use server";

import { createClient } from "@supabase/supabase-js";

export async function createCompany(userId: string, name: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  await supabase.from("companies").insert({
    user_id: userId,
    name,
  });
}
