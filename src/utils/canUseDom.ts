//client-side (running on browser) 인지 확인하는 변수
const CAN_USE_DOM =
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  typeof window.document.createElement !== "undefined";

export default CAN_USE_DOM;
