"use client";

import MoverExperience from "../common/card/MoverExperience";
import ProfileImage from "../common/card/ProfileImage";
import { type ProfileData, type FullMoverData } from "@/types/mover";
import { cva } from "class-variance-authority";
import Button from "../common/Button";
import cn from "@/config/cn";
import { getRegionText, getServiceText } from "@/utils/utilFunctions";
import TextWithGrayLabel from "../common/card/TextWithGrayLabel";
import { useUserStore } from "@/store/userStore";

interface MoverProfileCardProps {
  data: FullMoverData & Partial<ProfileData>;
  className?: string;
  onPrimaryClick?: () => void;
  onOutlinedClick?: () => void;
}

const styles = {
  container: cva(
    "flex flex-col border-solid border-[0.5px] gap-4 border-grayscale-100 bg-bg-100 rounded-[16px] py-4 px-3.5 min-w-[327px] pc:p-6 gap-6"
  ),
  innerContainer: cva(
    "flex flex-col border-solid border-line-100 border-[1px] shadow-border rounded-[16px] gap-3.5 p-2.5 pc:flex-row pc:items-center pc:py-[26px] pc:px-[18px]"
  ),
  info: "flex items-center gap-1",
  button: "w-full pc:w-[298px]",
  buttonContainer:
    "flex flex-col gap-2 tablet:flex-row pc:absolute pc:top-6 pc:right-6",
  topContainer: "flex items-center gap-4",
  nameContainer: "flex gap-2",
  nickname: "text-lg font-semibold pc:text-2lg",
  name: "text-md font-medium text-grayscale-500 pc:text-lg",
  topLeftContainer: "flex flex-col gap-1 pc:gap-2",
  introduction:
    "text-md font-regular text-grayscale-400 overflow-hidden line-clamp-1 text-ellipsis pc:text-lg",
  labelContainer: "flex flex-col gap-1 pc:gap-2 pc:flex-row",
};

const MoverProfileCard = ({
  data,
  className,
  onPrimaryClick,
  onOutlinedClick,
}: MoverProfileCardProps) => {
  const { isOAuth } = useUserStore();
  const serviceText = data.services
    .map((service) => getServiceText(service))
    .join(", ");
  const regionText = data.regions.map((code) => getRegionText(code)).join(", ");

  return (
    <section className={cn("flex flex-col gap-4 relative", className)}>
      <section className={styles.container()}>
        <div className={styles.topContainer}>
          <ProfileImage imgUrl={data.imageUrl} className="pc:hidden" />
          <div className={styles.topLeftContainer}>
            <span className={styles.nameContainer}>
              <p className={styles.nickname}>{data.nickname}</p>
              <p className={styles.name}>{data.name}</p>
            </span>

            <p className={styles.introduction}>{data.introduction}</p>
          </div>
        </div>

        <div className={cn(styles.innerContainer(), "pc:relative")}>
          <ProfileImage
            imgUrl={data.imageUrl}
            className="hidden pc:block"
            isLarge={true}
          />
          <div className="flex flex-col gap-3.5 pc:gap-4">
            <MoverExperience data={data} />

            <div className={styles.labelContainer}>
              <TextWithGrayLabel
                variant="border"
                label="제공 서비스"
                text={serviceText}
              />
              <TextWithGrayLabel
                variant="border"
                label="지역"
                text={regionText}
              />
            </div>
          </div>
        </div>
      </section>

      <div className={styles.buttonContainer}>
        <Button
          variant="primary"
          withIcon
          className={styles.button}
          onClick={onPrimaryClick}
        >
          내 프로필 수정
        </Button>

        <Button
          variant="gray"
          withIcon
          className={styles.button}
          onClick={onOutlinedClick}
          disabled={isOAuth}
        >
          기본 정보 수정
        </Button>
      </div>
    </section>
  );
};

export default MoverProfileCard;
