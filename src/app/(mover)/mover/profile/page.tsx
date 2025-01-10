import { Suspense } from "react";
import ProfileContent from "./ProfileContent";

export default function ProfilePage() {
  const styles = {
    container: `flex flex-col items-center w-full`,
  };

  return (
    <div className={styles.container}>
      <Suspense fallback={<div>로딩중...</div>}>
        <ProfileContent />
      </Suspense>
    </div>
  );
}
