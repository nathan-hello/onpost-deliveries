import { HorizontalCard } from "@/components/horizontal-card";
import { encodeBaseName } from "@/utils/supabase/db-utils";
import { getBases } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Index() {
  return (
    <main className="flex flex-col gap-6 px-4">
      <BaseList />
    </main>
  );
}

const BaseList: React.FC = async () => {
  "use server";
  const { data: bases } = await getBases();

  console.table(bases);

  if (!bases) {
    return <div className="text-white">Error 500</div>;
  }
  return (
    <>
      {bases
        .map((b) => {
          if (!b) {
            return null;
          }
          return (
            <Link href={`/${encodeBaseName(b.name)}`}>
              <HorizontalCard
                key={b.id}
                title={b.name}
                subtitle={b.state}
                number={b.restaurants ? b.restaurants.length : 0}
              />
            </Link>
          );
        })
        .filter((f) => f !== null)}
    </>
  );
};
