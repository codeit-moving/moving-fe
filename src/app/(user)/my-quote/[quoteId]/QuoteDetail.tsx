"use client";

import Image from "next/image";
import { useState } from "react";

import MoverInfoCard from "@/components/cards/MoverInfoCard";
import LineSeparator from "@/components/common/LineSeparator";
import QuoteDetailInfo from "@/components/request/QuoteDetailInfo";
import QuoteButtonGroup from "@/components/common/QuoteButtonGroup";
import { addMoverFavorite, deleteMoverFavorite } from "@/api/mover";
import { confirmQuote } from "@/api/quote";
import ShareButtons from "@/components/common/ShareButtons";

import { GetQuoteApiResponseData } from "@/types/api";
import assets from "@/variables/images";

interface QuoteDetailProps {
  data: GetQuoteApiResponseData;
}

export default function QuoteDetail({ data }: QuoteDetailProps) {
  const [isCompleted, setIsCompleted] = useState<boolean>(
    data.movingRequest.isCompleted
  );
  const [confirmState, setConfirmState] = useState({
    isConfirmed: data.isConfirmed,
    confirmCount: data.mover.confirmCount,
  });
  const [favoriteState, setFavoriteState] = useState({
    isFavorite: data.mover.isFavorite,
    favoriteCount: data.mover.favoriteCount,
  });

  const cardData = {
    id: data.id,
    imageUrl: data.mover.imageUrl,
    nickname: data.mover.nickname,
    career: data.mover.career,
    rating: {
      "1": data.mover.rating["1"],
      "2": data.mover.rating["2"],
      "3": data.mover.rating["3"],
      "4": data.mover.rating["4"],
      "5": data.mover.rating["5"],
      average: data.mover.rating.average,
    },
    reviewCount: data.mover.reviewCount,
    confirmCount: confirmState.confirmCount,
    favoriteCount: favoriteState.favoriteCount,
    isFavorite: favoriteState.isFavorite,
    isDesignated: data.mover.isDesignated,
    isConfirmed: confirmState.isConfirmed,
    services: data.mover.services,
    regions: data.mover.regions,
    introduction: data.mover.introduction || "한 줄 소개",
  };

  const quoteInfoData = {
    requestDate: data.movingRequest.requestDate,
    service: data.movingRequest.service,
    movingDate: data.movingRequest.movingDate,
    pickupAddress: data.movingRequest.pickupAddress,
    dropOffAddress: data.movingRequest.dropOffAddress,
  };

  const styles = {
    container: `box-border flex flex-row justify-between w-full max-w-[1400px] mt-4 
      tablet:mt-6 
      pc:mt-6`,
    content: `box-border flex flex-col gap-[23.5px] min-w-[328px] w-full 
      pc:gap-[39.5px] pc:max-w-[955px]`,
    costSection: `flex flex-col justify-between w-full h-[74px] 
      tablet:h-[94px] 
      pc:h-[110px]`,
    costTitle: `text-black-400 font-semibold text-lg 
      pc:text-2xl`,
    costValue: `text-black-400 font-bold text-xl 
      pc:text-3xl`,
    commentSection: `flex flex-col justify-between w-full h-[74px] 
      tablet:h-[94px] 
      pc:h-[110px]`,
    commentTitle: `text-black-400 font-semibold text-lg 
      pc:text-2xl`,
    commentValue: `text-black-400 font-medium text-md 
      pc:text-xl`,
    shareBoxWrapper: `pc:hidden`,
    shareBoxSeparator: `pc:hidden`,
    quoteInfo: `flex flex-col justify-between w-full h-[242px] text-lg 
      tablet:h-[258px]  
      pc:h-[330px] pc:text-2xl`,
    warning: `box-border flex flex-row items-center p-6 gap-4 
      w-full h-[48px] 
      bg-pr-blue-100 border-solid border-[1px] border-pr-blue-200 rounded-[12px] 
      shadow-[inset_-2px_-2px_10px_rgba(46,46,46,0.04),_2px_2px_10px_rgba(46,46,46,0.04)] 
      text-sm font-semibold text-pr-blue-300
      pc:h-[74px] 
      pc:text-lg`,
    warningIcon: `relative w-4 h-4 
      pc:w-6 pc:h-6`,
    gap: {
      container: `w-[10px] hidden 
        tablet:hidden
        pc:block`,
    },
    sidebar: `box-border gap-6 w-[328px] hidden 
      tablet:hidden 
      pc:flex pc:flex-col`,
  };

  const handleFavoriteButtonClick = () => {
    data.mover.isFavorite
      ? deleteMoverFavorite(data.mover.id)
          .then((res) => {
            setFavoriteState((prev) => ({
              isFavorite: !prev.isFavorite,
              favoriteCount: prev.favoriteCount + (prev.isFavorite ? -1 : 1),
            }));
          })
          .catch((err) => {
            // 에러 처리
          })
      : addMoverFavorite(data.mover.id)
          .then((res) => {
            setFavoriteState((prev) => ({
              isFavorite: !prev.isFavorite,
              favoriteCount: prev.favoriteCount + (prev.isFavorite ? -1 : 1),
            }));
          })
          .catch((err) => {
            // 에러 처리
          });
  };

  const handleConfirmQuoteButtonClick = () => {
    confirmQuote(data.id)
      .then((res) => {
        if (!isCompleted) {
          setIsCompleted(true);
          setConfirmState((prev) => ({
            isConfirmed: true,
            confirmCount: prev.confirmCount + 1,
          }));
        }
      })
      .catch((err) => {
        // 에러 처리
      });
  };

  const buttonGroupProps = {
    isFavorite: favoriteState.isFavorite,
    disabled: isCompleted,
    onFavoriteClick: handleFavoriteButtonClick,
    onButtonClick: handleConfirmQuoteButtonClick,
    buttonText: isCompleted ? "견적 확정 완료" : "견적 확정하기",
    showLabel: false,
  };

  const quoteInfo = {
    cost: data.cost,
    pickupAddress: data.movingRequest.pickupAddress,
    dropOffAddress: data.movingRequest.dropOffAddress,
    movingDate: data.movingRequest.movingDate,
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <MoverInfoCard data={cardData} size="responsive" />
          <LineSeparator direction="horizontal" />
          <div className={styles.costSection}>
            <div className={styles.costTitle}>견적가</div>
            <div className={styles.costValue}>
              {Intl.NumberFormat("en-US").format(data.cost)}원
            </div>
          </div>
          <LineSeparator direction="horizontal" />
          <div className={styles.commentSection}>
            <div className={styles.commentTitle}>기사님 코멘트</div>
            <div className={styles.commentValue}>{data.comment}</div>
          </div>
          <LineSeparator direction="horizontal" />
          <div className={styles.shareBoxWrapper}>
            <ShareButtons variant="quote" quoteInfo={quoteInfo} />
          </div>
          <LineSeparator
            direction="horizontal"
            className={styles.shareBoxSeparator}
          />
          <div className={styles.quoteInfo}>
            <div className={styles.quoteInfo}>견적 정보</div>
            <QuoteDetailInfo data={quoteInfoData} />
          </div>
          {!data.movingRequest.isEstimateConfirmed &&
            !isCompleted &&
            !data.isConfirmed && (
              <div className={styles.warning}>
                <div className={styles.warningIcon}>
                  <Image src={assets.icons.info} alt="경고" fill />
                </div>
                확정하지 않은 견적이에요!
              </div>
            )}
        </div>
        <div className={styles.gap.container}></div>
        <div className={styles.sidebar}>
          <QuoteButtonGroup {...buttonGroupProps} isPc={true} />
          <ShareButtons variant="quote" quoteInfo={quoteInfo} />
        </div>
      </div>
      <QuoteButtonGroup {...buttonGroupProps} isPc={false} />
    </>
  );
}
