import { cookies } from "next/headers";

import QuoteDetail from "./QuoteDetail";
import { getQuote } from "@/api/quote";
import { GetQuoteApiResponseData } from "@/types/api";

export default async function MyQuotesDetailPage({ params }: any) {
  const { quoteId } = await params;

  const cookieStore = await cookies();
  const cookie = `accessToken=${cookieStore.get("accessToken")?.value}`;

  const data = await getQuote({ cookie, quoteId: Number(quoteId) });

  const styles = {
    constainer: `flex flex-col items-center w-full`,
    topBar: `flex flex-row gap-2.5 items-center justify-center w-[328px] h-[54px] 
      tablet:w-[600px] 
      pc:w-[1400px] pc:h-[96px]`,
    barItem: `flex flex-row items-center w-[328px] h-full 
      text-2lg text-[#2b2b2b] font-semibold 
      tablet:w-[600px] 
      pc:w-[1400px] pc:text-2xl`,
  };

  return (
    <div className={styles.constainer}>
      <div className={styles.topBar}>
        <div className={styles.barItem}>견적 상세</div>
      </div>
      <QuoteDetail data={data} />
    </div>
  );
}
