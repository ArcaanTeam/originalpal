import { queryOptions } from "@tanstack/react-query";
import { userKeys } from "@/lib/presentation/data/feature/user/keys";
import type { UserSummaryDto } from "@/lib/presentation/data/feature/user/types";
import type { JsonRequestFn } from "./json-request";

export function usersQueryOptions(fetchJson: JsonRequestFn) {
  return queryOptions({
    queryKey: userKeys.list(),
    queryFn: async () => {
      const body = await fetchJson<{ users: UserSummaryDto[] }>("/api/users");
      return body.users;
    },
  });
}
