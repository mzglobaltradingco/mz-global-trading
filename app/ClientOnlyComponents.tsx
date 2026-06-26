"use client";

import dynamic from "next/dynamic";

export const ClientCookieConsent = dynamic(
  () => import("@/components/CookieConsent"),
  { ssr: false }
);

export const ClientRebrandPopup = dynamic(
  () => import("@/components/RebrandPopup"),
  { ssr: false }
);
