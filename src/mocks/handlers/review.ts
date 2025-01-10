import { http, HttpResponse } from "msw";
import {
  AVAILABLE_REVIEW_LIST,
  MY_REVIEW_LIST,
  MOVERS_REVIEW_LIST,
} from "../data/review";

export const reviewHandlers = [
  http.get("/mock/reviews/mover/:moverId", ({ params }) => {
    const { moverId } = params;
    return HttpResponse.json(MOVERS_REVIEW_LIST);
  }),
  http.get("/mock/reviews/me", () => {
    return HttpResponse.json(MY_REVIEW_LIST);
  }),

  http.get("/mock/reviews/available", () => {
    return HttpResponse.json(AVAILABLE_REVIEW_LIST);
  }),
];
