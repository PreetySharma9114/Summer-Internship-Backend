import { z } from "zod";

import { ApplicationStatus } from "../../../common/enums/application-status.enum.js";

export const updateApplicationStatusSchema = z.object({
  status: z.nativeEnum(ApplicationStatus),
});

export type UpdateApplicationStatusDto =
  z.infer<typeof updateApplicationStatusSchema>;