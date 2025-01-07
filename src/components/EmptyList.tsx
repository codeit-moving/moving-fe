import Image from "next/image";
import assets from "@/variables/images";

interface EmptyListProps {
  text: string;
}

export default function EmptyList({ text }: EmptyListProps) {
  const styles = {
    container: `flex flex-col items-center justify-center gap-[32px] 
        w-full h-[370px] 
        tablet:h-[656px] 
        pc:h-[656px]`,
    imageWrapper: `relative mx-auto w-[110px] h-[82px] 
        tablet:w-[184px] tablet:h-[136px] 
        pc:w-[184px] pc:h-[136px]`,
    heading: `text-xl font-medium mb-6 text-grayscale-300 
        tablet:text-2xl 
        pc:text-2xl`,
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image src={assets.icons.empty} alt="빈 폴더" fill />
      </div>
      <h3 className={styles.heading}>{text}</h3>
    </div>
  );
}
