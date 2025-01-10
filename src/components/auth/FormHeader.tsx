import Image from "next/image";
import assets from "@/variables/images";

interface LoginComponentProps {
  isUser: boolean;
  signUp?: boolean;
}

const styles = {
  logo: `pc:w-[140px] pc:h-[80px] mb-[10px]`,
  linkDescription: `text-xs text-black-100 pc:text-xl pc:text-black-200`,
  link: `text-pr-blue-300 underline font-semibold`,
};

export default function FormHeader({
  isUser,
  signUp = false,
}: LoginComponentProps) {
  return (
    <>
      <Image
        src={assets.images.logoWordmark}
        alt="logo"
        width={112}
        height={64}
        className={styles.logo}
        priority
      />
      {isUser ? (
        <p className={styles.linkDescription}>
          기사님이신가요?{" "}
          {signUp ? (
            <a href="/mover/auth/register" className={styles.link}>
              기사님 전용 페이지
            </a>
          ) : (
            <a href="/mover/auth/login" className={styles.link}>
              기사님 전용 페이지
            </a>
          )}
        </p>
      ) : (
        <p className={styles.linkDescription}>
          일반 유저라면?{" "}
          {signUp ? (
            <a href="/auth/register" className={styles.link}>
              일반 유저 전용 페이지
            </a>
          ) : (
            <a href="/auth/login" className={styles.link}>
              일반 유저 전용 페이지
            </a>
          )}
        </p>
      )}
    </>
  );
}
