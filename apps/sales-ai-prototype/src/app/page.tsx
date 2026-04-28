import { redirect } from "next/navigation";

/**
 * Open `http://localhost:3000/` → land on bank rules (same as visiting `/accounting/bank-rules`).
 */
export default function HomePage() {
  redirect("/accounting/bank-rules");
}
