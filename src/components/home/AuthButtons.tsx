import Link from "next/link";

export default function AuthButtons() {
  return (
    <div className="flex flex-col pc:flex-row items-center justify-center gap-4">
      <Link
        className="w-full mobile:w-[340px] p-4 bg-pr-blue-300 text-white font-semibold rounded-3xl hover:bg-blue-600 text-center"
        href="/auth/login"
        passHref
      >
        <div>로그인</div>
      </Link>
      <Link
        className="w-full mobile:w-[340px] p-4 border border-solid border-pr-blue-300 text-[#2D8EFF] font-semibold rounded-3xl hover:bg-blue-100 text-center"
        href="/auth/register"
        passHref
      >
        <div>회원가입</div>
      </Link>
    </div>
  );
}
