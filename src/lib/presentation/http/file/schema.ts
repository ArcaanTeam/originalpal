import { z } from "zod";

export const FileIdParamSchema = z.string().uuid("invalid file id");

export const ListFilesQuerySchema = z.object({
  scope: z.enum(["own", "all"]).default("own"),
});
