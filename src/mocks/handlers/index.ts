import { moverHandlers } from "./mover";
import { quoteHandlers } from "./quote";
import { reviewHandlers } from "./review";
import { movingRequestHandlers } from "./movingRequest";

// 핸들러 여기에 등록
export const handlers = [
  ...moverHandlers,
  ...reviewHandlers,
  ...movingRequestHandlers,
  ...quoteHandlers,
];

export default handlers;
