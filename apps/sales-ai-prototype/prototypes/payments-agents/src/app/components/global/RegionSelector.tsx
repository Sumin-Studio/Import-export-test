"use client";

import { REGIONS } from "../../lib/regions";
import { useRegion } from "@/app/contexts/RegionContext";
import { Select, Field, Label } from "@headlessui/react";

export function RegionSelector() {
  const { region, setRegion } = useRegion();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(event.target.value);
  };

  return (
    <Field className="flex items-center space-x-2">
      <Label className="text-sm font-medium">Region:</Label>
      <Select
        value={region}
        onChange={handleChange}
        className="w-[160px] cursor-pointer border border-border-primary rounded pl-2 py-1"
      >
        <option value={REGIONS.UK}>United Kingdom</option>
        <option value={REGIONS.USA}>United States</option>
        <option value={REGIONS.CA}>Canada</option>
        <option value={REGIONS.NZ}>New Zealand</option>
        <option value={REGIONS.AU}>Australia</option>
      </Select>
    </Field>
  );
}
