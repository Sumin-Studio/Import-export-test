export function pickSelectValue(f: unknown): string {
  if (f && typeof f === "object" && "value" in f) return String((f as { value: string }).value ?? "");
  return "";
}

export function pickCascadeLabels(f: unknown): string[] {
  if (!f || typeof f !== "object") return [];
  const o = f as { value?: string; child?: { value?: string } };
  const out: string[] = [];
  if (o.value) out.push(o.value);
  if (o.child?.value) out.push(o.child.value);
  return out;
}

export function pickTeam(f: unknown): { id: string; name: string } | null {
  if (!f || typeof f !== "object") return null;
  const o = f as { id?: string; name?: string };
  if (!o.id || !o.name) return null;
  const id = String(o.id).replace(/-\d+$/, "");
  return { id, name: o.name };
}
