import { http, HttpResponse } from "msw";
import {
  SENT_QUOTE_LIST,
  REJECTED_QUOTE_LIST,
  SENT_QUOTE_DETAIL,
} from "../data/quote";

export const quoteHandlers = [
  http.get("/mock/quotes/mover", () => {
    return HttpResponse.json(SENT_QUOTE_LIST);
  }),
  http.get("/mock/quotes/mover/rejected", () => {
    return HttpResponse.json(REJECTED_QUOTE_LIST);
  }),
  http.get("/mock/quotes/mover/:quoteId", ({ params }) => {
    const { quoteId } = params;
    const quote = SENT_QUOTE_DETAIL;

    if (!quote) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(quote);
  }),
];
