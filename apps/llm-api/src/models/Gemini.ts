import { GoogleGenerativeAI } from "@google/generative-ai";
import debug from "debug";

import { Metrics } from "@santarepo/metrics";

import {
  type GenerateContentArgument,
  type GenerateContentOptions,
} from "@/types/gemini";

class Gemini {
  private name = "santarepo:llm-api:models:gemini";
  private logger = debug(this.name);
  private metrics = Metrics.getMetricsEmitter(this.name);
  private client: GoogleGenerativeAI;

  constructor() {
    this.client = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
  }

  public async generate(
    configuration: GenerateContentArgument,
    options: GenerateContentOptions = {},
  ) {
    try {
      const model = this.client.getGenerativeModel({
        model: "gemini-1.5-flash-8b",
      });
      const content = await model.generateContent(configuration, options);
      return content;
    } catch (e) {
      this.logger("AI Model [Gemini] failed to produce content.");
      this.logger("Sending exception to ObsApi.");

      const pipe = this.metrics;
      const event = {
        sender: this.name,
        archtype: "exception",
        exception: e,
      };

      pipe(event);
    }
  }
}

export default Gemini;
