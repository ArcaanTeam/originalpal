export function usernameInitial(username: string): string {
  const trimmed = username.trim();
  if (!trimmed) {
    return "?";
  }
  return trimmed.slice(0, 1).toLocaleUpperCase("fa-IR");
}
