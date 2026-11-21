import { useQuery } from "@tanstack/react-query";
import { requestJson } from "@/lib/presentation/ui/feedback/request-json";
import { usersQueryOptions } from "@/lib/presentation/ui/query/options/users";
import type { UserSummaryDto } from "./types";

export interface UseGetUsersReturn {
  users: UserSummaryDto[];
  succeed: boolean | null;
  refetch: () => void;
}

export default function useGetUsers(): UseGetUsersReturn {
  const query = useQuery(usersQueryOptions(requestJson));

  return {
    users: query.data ?? [],
    succeed: query.isPending ? null : query.isError ? false : query.isSuccess,
    refetch: () => {
      void query.refetch();
    },
  };
}
