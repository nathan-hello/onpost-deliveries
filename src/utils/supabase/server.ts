"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "@/utils/supabase/types";

export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};

export async function getAuthedUserAndProfile() {
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  if (user === null) {
    return null;
  }

  const { data: profile } = await client
    .from("opd_profiles")
    .select()
    .eq("id", user.id)
    .single();
  if (profile === null) {
    console.log("user was found but profile was not");
    console.table(user);
    console.table(profile);
    return null;
  }

  return { user, profile };
}

export async function getBases() {
  const client = await createClient();
  return await client.from("opd_bases").select().limit(5);
}

export async function getBaseDetailsByHref(base_href: string) {
  const client = await createClient();
  return await client.from("opd_bases").select().eq("href", base_href).single();
}
