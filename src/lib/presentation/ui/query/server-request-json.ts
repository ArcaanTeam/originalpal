import { cookies, headers } from "next/headers";
import "server-only";
import {
  ApiClientError,
  parseApiErrorBody,
} from "@/lib/presentation/ui/feedback/api-error";

async function getRequestOrigin(): Promise<string> {
  const headerList = await headers();
  const host =
    headerList.get("x-forwarded-host") ??
    headerList.get("host") ??
    "localhost:3000";
  const protocol = headerList.get("x-forwarded-proto") ?? "http";
  return `${protocol}://${host}`;
}

async function toAbsoluteUrl(input: RequestInfo | URL): Promise<string> {
  if (typeof input === "string") {
    if (input.startsWith("http://") || input.startsWith("https://")) {
      return input;
    }
    const path = input.startsWith("/") ? input : `/${input}`;
    return `${await getRequestOrigin()}${path}`;
  }

  if (input instanceof URL) {
    return input.toString();
  }

  return input.url;
}

export async function serverRequestJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((entry) => `${entry.name}=${entry.value}`)
    .join("; ");

  const response = await fetch(await toAbsoluteUrl(input), {
    ...init,
    headers: {
      ...init?.headers,
      ...(cookieHeader ? { cookie: cookieHeader } : {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await parseApiErrorBody(response);
    throw new ApiClientError(body);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
