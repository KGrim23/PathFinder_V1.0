import { z } from "zod";

// Schema for the structured coaching response
export const CoachingResponseSchema = z.object({
  paragraph: z.string().describe("Main content of the coaching response"),
  heading: z.string().optional().describe("Optional heading for the response"),
  steps: z
    .array(
      z.object({
        step_number: z.number(),
        instruction: z.string(),
      })
    )
    .optional()
    .describe("Optional steps for the response"),
});
