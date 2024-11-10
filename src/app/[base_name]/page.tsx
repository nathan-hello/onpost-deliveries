import { decodeBaseHref } from "@/utils/supabase/db-utils";
import { getBaseDetails } from "@/utils/supabase/server";

export default async function Page({
  params,
}: {
  params: Promise<{ base_name: string }>;
}) {
  const p = await params;
  const { data: base, error } = await getBaseDetails(
    decodeBaseHref(p.base_name),
  );

  if (!base) {
    <>{error.message}</>;
  }

  return <>{JSON.stringify(base)}</>;
}
