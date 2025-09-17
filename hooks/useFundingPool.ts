"use client";

import { useFundingPoolContext } from "@/providers/FundingPoolProvider";

export function useFundingPool() {
  return useFundingPoolContext();
}
