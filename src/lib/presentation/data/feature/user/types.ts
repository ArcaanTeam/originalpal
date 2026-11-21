export type UserRoleDto = "Admin" | "Member";

export interface UserSummaryDto {
  id: string;
  username: string;
  role: UserRoleDto;
  created_at: string;
}
