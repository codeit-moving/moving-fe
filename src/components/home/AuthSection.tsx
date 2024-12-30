"use client";

import { useAuth } from "@/hooks/useAuth";
import AuthButtons from "@/components/home/AuthButtons";

export default function AuthSection() {
  useAuth();

  return <AuthButtons />;
}
