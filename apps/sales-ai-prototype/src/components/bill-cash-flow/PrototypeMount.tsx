"use client";

import PrototypeHome from "../../../prototypes/payments-agents/src/app/page";
import { RobbShell } from "@/components/prototype-shell/RobbShell";

/**
 * First-load welcome modal (`WelcomePopup` via `RobbShell`).
 * Set to `true` to show it again (e.g. after user testing).
 */
const SHOW_DASHBOARD_WELCOME_ON_LOAD = false;

export function PrototypeMount() {
  return (
    <RobbShell showWelcome={SHOW_DASHBOARD_WELCOME_ON_LOAD}>
      <PrototypeHome />
    </RobbShell>
  );
}

