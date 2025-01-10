/**
 * 숫자를 한국 원화 형식으로 변환하는 함수
 * @param amount 변환할 금액
 * @param options Intl.NumberFormat 옵션
 * @returns 원화 형식의 문자열 (예: ₩1,000)
 */
export const formatCost = (
  amount: number,
  options: Intl.NumberFormatOptions = {}
): string => {
  return new Intl.NumberFormat("ko-KR", {
    style: "decimal",
    ...options,
  }).format(amount);
};

// 사용 예시:
// formatCost(1000)  // "1,000"
// formatCost(1000000)  // "1,000,000"
