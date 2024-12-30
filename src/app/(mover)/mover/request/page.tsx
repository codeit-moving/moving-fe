import RequestForm from "./RequestForm";

import { getMovingRequestListByMover } from "@/api/movingRequest";
import { MOVING_REQUEST_DEFAULT_PAGE_SIZE } from "@/variables/movingRequest";

export default async function RequestListPage({}) {
  try {
    // const initialData = await getMovingRequestListByMover({
    //   keyword: "",
    //   smallMove: true,
    //   houseMove: true,
    //   officeMove: true,
    //   isDesignated: null,
    //   orderBy: "recent",
    //   limit: MOVING_REQUEST_DEFAULT_PAGE_SIZE,
    //   cursor: null,
    // });

    // console.log("Initial Data:", initialData);

    // return initialData ? (
    //   <RequestForm initialData={initialData} />
    // ) : (
    //   <div>No Data</div>
    // );
    return <RequestForm />;
  } catch (error) {
    console.error("RequestListPage Error:", error);
    return <div>Error Loading Data</div>;
  }
}
