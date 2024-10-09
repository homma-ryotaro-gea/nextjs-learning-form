import { z } from "zod";

export const schema = z.object({
  first: z.string().trim().min(1, {
    message: "姓は必須です",
  }),
  last: z.string().trim().min(1, {
    message: "名は必須です",
  }),
  email: z.string().email({
    message: "メールアドレスの形式が無効です",
  }),
});
