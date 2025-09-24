"use client";

import dynamic from "next/dynamic";
import * as React from "react";

const Providers = dynamic(() => import("@/app/providers").then(m => m.Providers), {
  ssr: false,
});

const GenesisProgress = dynamic(() => import("@/components/GenesisProgress"), {
  ssr: false,
});

export default function GenesisProgressIsland({ compact = false }: { compact?: boolean }) {
  return (
    <Providers>
      <GenesisProgress compact={compact} />
    </Providers>
  );
}


