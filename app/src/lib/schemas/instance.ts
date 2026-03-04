import { z } from 'zod';

export const instanceSchema = z.object({
  title: z.string(),
  description: z.string(),
  canonical: z.url(),
  keywords: z.array(z.string()),
  images: z.array(
    z.object({
      url: z.string(),
      width: z.int(),
      height: z.int(),
      alt: z.string()
    })
  )
});

export type Config = z.infer<typeof instanceSchema>;