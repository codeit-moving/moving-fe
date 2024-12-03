"use client";

import MoverExperience from "../common/card/MoverExperience";
import ProfileImage from "../common/card/ProfileImage";
import GrayLabel from "../common/card/GrayLabel";
import { type ProfileData, type FullMoverData } from "@/types/mover";
import { cva } from "class-variance-authority";
import Button from "../common/Button";
import cn from "@/config/clsx";
import { getRegionText } from "@/utils/utilFunctions";

interface MoverProfileCardProps {
  data: FullMoverData & ProfileData;
  className?: string;
}

const moverProfileCardStyles = cva(
  "flex flex-col border-solid border-[0.5px] gap-4 border-grayscale-100 bg-bg-100 rounded-[16px] py-4 px-3.5 min-w-[327px] pc:p-6 gap-6"
);

const innerContainerStyles = cva(
  "flex flex-col border-solid border-line-100 border-[1px] shadow-border rounded-[16px] gap-3.5 p-2.5 pc:flex-row pc:items-center pc:py-[26px] pc:px-[18px]"
);

const styles = {
  info: "flex items-center gap-1",
  text: "flex gap-1 text-md font-medium pc:text-2lg",
  button: "w-full tablet:w-[298px]",
  buttonContainer: "flex flex-wrap gap-2 pc:absolute pc:top-6 pc:right-6",
};

const MoverProfileCard = ({ data, className }: MoverProfileCardProps) => {
  return (
    <section className={cn("flex flex-col gap-4 relative", className)}>
      <section className={moverProfileCardStyles()}>
        <div className="flex items-center gap-4">
          <ProfileImage imgUrl={data.imageUrl} className="pc:hidden" />
          <div className="flex flex-col gap-1 pc:gap-2">
            <p className="text-lg font-semibold pc:text-2lg">{data.name}</p>
            <p className="text-md font-regular pc:text-lg text-grayscale-400 truncate">
              {data.introduction}
            </p>
          </div>
        </div>

        <div className={cn(innerContainerStyles(), "pc:relative")}>
          <ProfileImage imgUrl={data.imageUrl} className="hidden pc:block" />
          <div className="flex flex-col gap-3.5 pc:gap-4">
            <MoverExperience data={data} />
            <div className="flex flex-col gap-1 pc:gap-2 pc:flex-row">
              <div className="flex items-center gap-1">
                <GrayLabel>제공 서비스</GrayLabel>
                <div className={styles.text}>
                  {data.services.map((service) => (
                    <p key={service}>{service}</p>
                  ))}
                </div>
              </div>
              <div className={styles.info}>
                <GrayLabel>지역</GrayLabel>
                <div className={styles.text}>
                  {data.regions.map((code) => getRegionText(code)).join(", ")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.buttonContainer}>
        <Button variant="primary" withIcon className={styles.button}>
          내 프로필 수정
        </Button>

        <Button variant="gray" withIcon className={styles.button}>
          기본 정보 수정
        </Button>
      </div>
    </section>
  );
};

export default MoverProfileCard;
