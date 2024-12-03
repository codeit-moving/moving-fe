import InfoEdit from "@/components/infoEdit/InfoEdit";

const styles = {
  container: `flex flex-col items-center w-full mt-[57px]
    tablet:w-[327px] mx-auto px-0
    pc:w-[1200px] pc:mt-[26px] pc:px-[24px] pc:py-[32px]`,
};

export default function InfoEditPage() {
  const userData = {
    name: "홍길동",
    email: "test@test.com",
    phoneNumber: "01012345678",
    currentPassword: "test1234",
  };
  return (
    <div className={styles.container}>
      <InfoEdit isUser={false} userData={userData} />
    </div>
  );
}
