import {
  draftSchema as registrationDraftSchema,
  schema as registrationSchema,
} from "@/schema/registrationSchema";
import { z } from "zod";

export type FormType = z.infer<typeof registrationSchema>;
export type DraftFormType = z.infer<typeof registrationDraftSchema>;
