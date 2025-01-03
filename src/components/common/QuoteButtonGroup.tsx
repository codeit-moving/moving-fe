import assets from "@/variables/images";
import Image from "next/image";
import Button, { ButtonProps } from "@/components/common/Button";

interface QuoteButtonGroupProps {
  isFavorite: boolean;
  disabled: boolean;
  isPc?: boolean;
  moverNickname?: string;
  buttonText?: string;
  showLabel?: boolean;
  onFavoriteClick: () => void;
  onButtonClick: () => void;
}

export default function QuoteButtonGroup({
  isFavorite,
  disabled,
  isPc = false,
  moverNickname,
  buttonText,
  showLabel = true,
  onFavoriteClick,
  onButtonClick,
}: QuoteButtonGroupProps) {
  const styles = {
    buttonContainer: isPc
      ? "hidden pc:flex pc:flex-col pc:gap-[32px] pc:justify-center pc:items-center"
      : "fixed bottom-0 right-0 bg-white border-solid border-t border-line-100 w-full flex flex-row gap-[8px] justify-center items-center py-[10px] p-6 px-[72px] z-[999] pc:hidden",
    likeIcon:
      "p-[15px] w-[54px] h-[54px] cursor-pointer border border-solid border-line-200 rounded-[16px] text-nowrap pc:w-full pc:text-xl pc:font-semibold pc:py-[11px] pc:flex pc:flex-row pc:gap-[8px] pc:items-center pc:justify-center",
    shareText: "text-lg font-semibold text-black-400 pc:text-xl",
  };

  const buttonProps: ButtonProps = {
    children: buttonText,
    variant: disabled ? "outlined" : "primary",
    width: "100%",
    onClick: onButtonClick,
  };

  return (
    <>
      {!isPc ? (
        <div className={styles.buttonContainer}>
          <button className={styles.likeIcon} onClick={onFavoriteClick}>
            <Image
              src={
                isFavorite ? assets.icons.likeActive : assets.icons.likeInactive
              }
              alt="mover-image"
              width={24}
              height={24}
            />
          </button>
          <Button {...buttonProps} />
        </div>
      ) : (
        <div className={styles.buttonContainer}>
          {showLabel ? (
            <p className={styles.shareText}>
              {moverNickname} 기사님에게 지정 견적을 요청해보세요!
            </p>
          ) : undefined}
          <button className={styles.likeIcon} onClick={onFavoriteClick}>
            <Image
              src={
                isFavorite ? assets.icons.likeActive : assets.icons.likeInactive
              }
              alt="mover-image"
              width={24}
              height={24}
            />
            기사님 찜하기
          </button>
          <Button {...buttonProps} />
        </div>
      )}
    </>
  );
}
