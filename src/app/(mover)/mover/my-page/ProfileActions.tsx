"use client";

import { useRouter } from "next/navigation";
import MoverProfileCard from "@/components/cards/MoverProfileCard";
import { type FullMoverData } from "@/types/mover";

export function ProfileActions({ data }: { data: FullMoverData }) {
  const router = useRouter();

  return (
    <MoverProfileCard
      data={data}
      onPrimaryClick={() => router.push("/mover/profile-edit")}
      onOutlinedClick={() => router.push("/mover/info-edit")}
    />
  );
}
