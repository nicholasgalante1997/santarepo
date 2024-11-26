import {
  type GenerateContentRequest,
  type Part,
  type SingleRequestOptions,
} from "@google/generative-ai";

export type GenerateContentArgument =
  | GenerateContentRequest
  | string
  | Array<string | Part>;
export type GenerateContentOptions = SingleRequestOptions;
