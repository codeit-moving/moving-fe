import { cookies } from "next/headers";

import { getSentQuoteDetail } from "@/api/quote";
import SentQuoteDetail from "./SentQuoteDetail";

export interface MyQuotesDetailPageProps {
  params: Promise<{
    quoteId: string;
  }>;
}

export default async function MyQuoteDetailPage({
  params,
}: MyQuotesDetailPageProps) {
  const { quoteId } = await params;

  const cookieStore = await cookies();
  const cookie = `accessToken=${cookieStore.get("accessToken")?.value}`;

  const data = await getSentQuoteDetail({ cookie, quoteId: Number(quoteId) });

  const styles = {
    constainer: `flex flex-col items-center w-full`,
    topBar: `flex flex-row gap-2.5 items-center justify-center min-w-[328px] w-full h-[54px] 
      tablet:min-w-[600px] 
      pc:max-w-[1400px] pc:h-[96px]`,
    barItem: `flex flex-row items-center w-full h-full 
      text-2lg text-[#2b2b2b] font-semibold 
      pc:text-2xl`,
  };

  return (
    <div className={styles.constainer}>
      <div className={styles.topBar}>
        <div className={styles.barItem}>견적 상세</div>
      </div>
      <SentQuoteDetail data={data} />
    </div>
  );
}
