import z from "zod";

export const formSchema = z.object({
  url: z.url(),
  customShortenedUrl: z.string().optional(),
});

export type FormType = z.infer<typeof formSchema>;
