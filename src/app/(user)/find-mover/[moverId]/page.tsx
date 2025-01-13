import { Metadata } from "next";
import ClientMoverDetailPage from "./ClientPage";
import { SERVICE_TEXTS } from "@/variables/service";
import { REGION_TEXTS } from "@/variables/regions";

interface Props {
  params: Promise<{ moverId: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { moverId } = await params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/movers/${moverId}`
    );
    const data = await response.json();

    const regions = data.regions
      .slice(0, 3)
      .map(
        (region: number) => REGION_TEXTS[region as keyof typeof REGION_TEXTS]
      )
      .join(", ");

    const services = data.services
      .slice(0, 3)
      .map(
        (service: number) =>
          SERVICE_TEXTS[service as keyof typeof SERVICE_TEXTS]
      )
      .join(", ");

    const title = `${data.nickname} 기사님의 상세페이지`;

    const reviewInfo =
      data.rating.totalCount > 0
        ? `평균 평점 ${data.rating.average.toFixed(1)}점 (${
            data.rating.totalCount
          }개의 리뷰)`
        : "";

    const description = [
      `${data.description || data.introduction || ""}`,
      `경력 ${data.career}년`,
      `서비스 : ${services}`,
      `활동지역 : ${regions}`,
      reviewInfo,
    ]
      .filter(Boolean)
      .join(" | ");

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "profile",
        images: data.imageUrl ? [data.imageUrl] : [],
      },
      twitter: {
        card: "summary",
        title,
        description,
        images: data.imageUrl ? [data.imageUrl] : [],
      },
    };
  } catch (error) {
    return {
      title: "이사 전문가 프로필 - 무빙",
      description: "믿을 수 있는 이사 전문가를 찾아보세요",
    };
  }
}

export default async function MoverDetailPage({ params, searchParams }: Props) {
  const { moverId } = await params;
  return <ClientMoverDetailPage />;
}
