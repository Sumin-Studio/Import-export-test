"use client";
import type { ReactElement } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useRouter } from "next/navigation";
import { useRegion } from "@/app/contexts/RegionContext";
import { REGIONS } from "@/app/lib/regions";

export default function Hotkeys(): ReactElement | null {
  const router = useRouter();
  const { setRegion } = useRegion();

  useHotkeys(
    "alt+i, option+i",
    () => {
      router.push("/sales/invoices");
    },
    { enableOnFormTags: true }
  );
  useHotkeys(
    "ctrl+alt+i, meta+ctrl+i",
    () => {
      router.push("/sales/invoices/awaiting-payment");
    },
    { enableOnFormTags: true }
  );
  useHotkeys(
    "shift+space+i",
    () => {
      router.push("/sales/invoices/new-invoice");
    },
    { enableOnFormTags: true }
  );
  useHotkeys(
    "alt+r, option+r",
    () => {
      router.push("/reporting/all-reports");
    },
    { enableOnFormTags: true }
  );

  // Region switching shortcuts
  useHotkeys(
    "alt+1, option+1",
    () => {
      setRegion(REGIONS.UK);
    },
    { enableOnFormTags: true }
  );

  useHotkeys(
    "alt+2, option+2",
    () => {
      setRegion(REGIONS.USA);
    },
    { enableOnFormTags: true }
  );

  useHotkeys(
    "alt+3, option+3",
    () => {
      setRegion(REGIONS.CA);
    },
    { enableOnFormTags: true }
  );

  useHotkeys(
    "alt+4, option+4",
    () => {
      setRegion(REGIONS.NZ);
    },
    { enableOnFormTags: true }
  );

  useHotkeys(
    "alt+5, option+5",
    () => {
      setRegion(REGIONS.AU);
    },
    { enableOnFormTags: true }
  );

  return null;
}
