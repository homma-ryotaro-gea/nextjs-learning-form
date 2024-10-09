import { validateZipCode } from "@/lib/serveractinos";
import { z } from "zod";

export const schema = z.object({
  first: z.string().trim().min(1, {
    message: "姓は必須です",
  }),
  last: z.string().trim().min(1, {
    message: "名は必須です",
  }),
  email: z
    .string()
    .min(1, {
      message: "メールアドレスは必須です",
    })
    .email({
      message: "メールアドレスの形式が無効です",
    }),
  zipcode: z
    .string()
    .trim()
    .min(1, {
      message: "郵便番号は必須です",
    })
    .refine(validateZipCode, {
      message: "郵便番号が無効です",
    }),
});

export const draftSchema = z.object({
  first: z.string().optional(),
  last: z.string().optional(),
  email: z
    .string()
    .trim() // 空白を除去
    .refine(
      (value) => value === "" || z.string().email().safeParse(value).success,
      {
        message: "無効なメールアドレス形式です",
      }
    ),
  zipcode: z.string().optional(),
});
