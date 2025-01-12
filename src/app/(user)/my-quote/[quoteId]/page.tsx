import { cookies } from "next/headers";

import QuoteDetail from "./QuoteDetail";
import { getQuote } from "@/api/quote";
import EmptyList from "@/components/EmptyList";
import { AxiosError } from "axios";
import { Metadata, ResolvingMetadata } from "next";
import { formatDateWithDay } from "@/utils/utilFunctions";
type Props = {
  params: { quoteId: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { quoteId } = params;
  const cookieStore = await cookies();
  const cookie = `accessToken=${cookieStore.get("accessToken")?.value}`;

  try {
    const data = await getQuote({ cookie, quoteId: Number(quoteId) });

    const moveDate = formatDateWithDay(data.movingRequest.movingDate);

    const title = `${data.mover.nickname} 기사님의 이사 견적서 - ${moveDate}`;
    const description = `${data.mover.introduction}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        locale: "ko_KR",
        images: data.mover.imageUrl ? [data.mover.imageUrl] : [],
      },
      twitter: {
        card: "summary",
        title,
        description,
        images: data.mover.imageUrl ? [data.mover.imageUrl] : [],
      },
    };
  } catch (error) {
    return {
      title: "이사 견적서 상세 - 무빙",
      description: "이사 견적서를 확인해보세요",
    };
  }
}

export interface MyQuotesDetailPageProps {
  params: Promise<{
    quoteId: string;
  }>;
}

export default async function MyQuotesDetailPage({
  params,
}: MyQuotesDetailPageProps) {
  const { quoteId } = await params;

  const cookieStore = await cookies();
  const cookie = `accessToken=${cookieStore.get("accessToken")?.value}`;

  const styles = {
    constainer: `flex flex-col items-center w-full`,
    topBar: `flex flex-row gap-2.5 items-center justify-center min-w-[328px] w-full h-[54px] 
      tablet:min-w-[600px] 
      pc:max-w-[1400px] pc:h-[96px]`,
    barItem: `flex flex-row items-center w-full h-full 
      text-2lg text-[#2b2b2b] font-semibold 
      pc:text-2xl`,
  };

  try {
    const data = await getQuote({ cookie, quoteId: Number(quoteId) });

    return (
      <div className={styles.constainer}>
        <div className={styles.topBar}>
          <div className={styles.barItem}>견적 상세</div>
        </div>
        <QuoteDetail data={data} />
      </div>
    );
  } catch (err: any) {
    console.error(err);
    let text = "견적 상세 조회에 실패했습니다.";

    if (err.status === 404) {
      text = err.message || "견적을 찾을 수 없습니다.";
    }

    if (err instanceof AxiosError) {
      text = err.response?.data.message || "견적 상세 조회에 실패했습니다.";
    }

    return (
      <div className={styles.constainer}>
        <div className={styles.topBar}>
          <div className={styles.barItem}>견적 상세</div>
        </div>
        <EmptyList text="견적 상세 조회에 실패했습니다." />
      </div>
    );
  }
}
