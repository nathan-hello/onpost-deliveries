import { getBaseDetailsByHref } from "@/utils/supabase/server";

export default async function Page({
  params,
}: {
  params: Promise<{ base: string }>;
}) {
  const p = await params;
  const { data: base, error } = await getBaseDetailsByHref(p.base);

  if (!base) {
    <>{error && error.message}</>;
  }

  return <>{JSON.stringify(base)}</>;
}
