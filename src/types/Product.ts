import { z } from "zod";

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.string().transform((arg) => parseFloat(arg.replace(",", "."))),
  stock: z.string().transform((arg) => parseInt(arg)),
});

export type Product = z.output<typeof productSchema>;
