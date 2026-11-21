import { connection } from "next/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderToReadableStream } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ServerQueryHydration } from "./server-query-hydration";

vi.mock("next/server", () => ({
  connection: vi.fn(async () => {}),
}));

describe("ServerQueryHydration", () => {
  beforeEach(() => {
    vi.mocked(connection).mockReset();
    vi.mocked(connection).mockResolvedValue(undefined);
  });

  it("waits for the incoming request before prefetching", async () => {
    const order: string[] = [];
    vi.mocked(connection).mockImplementation(async () => {
      order.push("connection");
    });

    const stream = await renderToReadableStream(
      <QueryClientProvider client={new QueryClient()}>
        <ServerQueryHydration
          fallback={null}
          prefetch={async () => {
            order.push("prefetch");
          }}
        >
          <p>ready</p>
        </ServerQueryHydration>
      </QueryClientProvider>,
    );
    await stream.allReady;

    expect(order).toEqual(["connection", "prefetch"]);
  });
});
