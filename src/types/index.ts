import { schema as registrationSchema } from "@/schema/registrationSchema";
import { z } from "zod";

export type FormType = z.infer<typeof registrationSchema>;
