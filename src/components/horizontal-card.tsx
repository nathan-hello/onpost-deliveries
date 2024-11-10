"use client";

import { Card, CardContent } from "@/components/ui/card";

interface HorizontalCardProps {
  title: string;
  subtitle: string;
  number: number;
}

export function HorizontalCard({
  title,
  subtitle,
  number,
}: HorizontalCardProps) {
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
