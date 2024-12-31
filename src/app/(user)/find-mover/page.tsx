import { cookies } from "next/headers";

import MoverList from "./moverList";
import { getMoverList } from "@/api/mover";

import { MOVER_DEFAULT_PAGE_SIZE } from "@/variables/mover";

export default async function FindMoverList() {
  try {
    const cookieStore = await cookies();
    const cookie = `accessToken=${cookieStore.get("accessToken")?.value}`;

    const initialData = await getMoverList({
      cookie: cookie,
      limit: MOVER_DEFAULT_PAGE_SIZE,
      nextCursorId: null,
    });

    return <MoverList initialData={initialData} />;
  } catch (error) {
    console.error("getMoverList Error:", error);
    return <div>Error Loading Data</div>;
  }
}
