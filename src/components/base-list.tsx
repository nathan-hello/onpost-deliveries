"use server";

import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export async function BaseList() {
  const client = await createClient();
  const { data: bases } = await client.from("opd_bases").select().limit(5);

  console.table(bases);

  if (!bases) {
    return <div className="text-white">Error 500</div>;
  }

  return (
    <div className="flex flex-row gap-x-2 overflow-x-auto max-w-full">
      {bases.map((b) => (
        <Link className="w-96" key={`link-${b.id}`} href={`/base/${b.href}`}>
          <HorizontalCard
            key={b.id}
            title={b.name}
            subtitle={b.state}
            number={b.restaurants ? b.restaurants.length : 0}
          />
        </Link>
      ))}
      {bases.map((b) => (
        <Link className="w-96" key={`2link-${b.id}`} href={`/base/${b.href}`}>
          <HorizontalCard
            key={b.id + "2"}
            title={b.name}
            subtitle={b.state}
            number={b.restaurants ? b.restaurants.length : 0}
          />
        </Link>
      ))}
    </div>
  );
}

interface HorizontalCardProps {
  title: string;
  subtitle: string;
  number: number;
}

function HorizontalCard({ title, subtitle, number }: HorizontalCardProps) {
  return (
    <Card className="w-full max-w-2xl">
      <CardContent className="p-6">
        <div className="flex gap-x-4 items-center justify-between">
          <div className="space-y-2 flex-grow px-5">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <div className="text-2xl font-bold" aria-label={`Number: ${number}`}>
            {number}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
