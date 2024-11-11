"use server";

import { BaseList } from "@/components/base-list";
import USA from "@/components/usa";
import { Suspense } from "react";

export default async function Index() {
  return (
    <main className="flex flex-col gap-6 px-4 w-full justify-center">
      <span className="text-2xl pb-12 border-b w-full font-semibold text-center">
        Food delivery. On base.
      </span>
      <USA />
      <Suspense fallback={<div>Loading..</div>}>
        <BaseList />
      </Suspense>
    </main>
  );
}
