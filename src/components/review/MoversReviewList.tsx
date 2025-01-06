import { useGetMoversReviewList } from "@/api/query-hooks/review";
import Pagination from "../common/Pagination";
import RatingInfo, { type Ratings } from "../RatingInfo";
import CustomerReview, { type CustomerReviewData } from "./CustomerReview";
import { useState } from "react";
import Loader from "../common/Loader";
import EmptyReview from "@/app/(user)/me/review/EmptyReview";
import Message from "../common/Message";

export const MoversReviewList = ({
  totalRating,
  moverId,
}: {
  totalRating: Ratings;
  moverId: number;
}) => {
  const [pageNum, setPageNum] = useState<number>(1);

  const { data, isPending, isError } = useGetMoversReviewList({
    moverId,
    pageNum: 1,
    pageSize: 5,
  });
  const totalPages = Number(data?.totalPages);

  if (isPending) {
    return <Loader msg="리뷰 불러오는 중" />;
  }

  if (isError) return <Message msg="리뷰를 불러오는데 실패했습니다." />;

  return (
    <section>
      <h2 className="text-lg font-bold text-black-400 pc:my-[32px] pc:text-2xl mb-[32px]">
        리뷰 ({totalRating?.totalCount ?? 0})
      </h2>
      {totalRating?.totalCount === 0 ? (
        <EmptyReview />
      ) : (
        <>
          <article className="flex flex-col items-center">
            <RatingInfo
              rating={{
                "1": totalRating["1"],
                "2": totalRating["2"],
                "3": totalRating["3"],
                "4": totalRating["4"],
                "5": totalRating["5"],
                totalCount: totalRating.totalCount,
                totalSum: totalRating.totalSum,
                average: totalRating.average,
              }}
            />
          </article>

          <ul className="flex flex-col mt-[43px] mb-[20px] pc:mt-[40px] pc:w-[955px] pc:mb-[40px]">
            {data.list.map((review: CustomerReviewData) => (
              <CustomerReview data={review} key={review.id} />
            ))}
          </ul>
        </>
      )}
      <Pagination
        currentPage={pageNum}
        onPageChange={setPageNum}
        totalPages={totalPages}
      />
    </section>
  );
};

export default MoversReviewList;
