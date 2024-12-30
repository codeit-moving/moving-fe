import { cookies } from "next/headers";

import RequestForm from "./RequestForm";
import { getMovingRequestListByMover } from "@/api/movingRequest";

import { MOVING_REQUEST_DEFAULT_PAGE_SIZE } from "@/variables/movingRequest";

export default async function RequestListPage() {
  try {
    const cookieStore = await cookies();
    const cookie = `accessToken=${cookieStore.get("accessToken")?.value}`;

    const initialData = await getMovingRequestListByMover({
      cookie: cookie,
      keyword: "",
      smallMove: true,
      houseMove: true,
      officeMove: true,
      isDesignated: null,
      orderBy: "recent",
      limit: MOVING_REQUEST_DEFAULT_PAGE_SIZE,
      cursor: null,
    });

    return <RequestForm initialData={initialData} />;
  } catch (error) {
    console.error("RequestListPage Error:", error);
    return <div>Error Loading Data</div>;
  }
}
