export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { assertRequiredEnv } = await import("@/lib/infrastructure/env");
    assertRequiredEnv();

    const { assertDatabaseConnectivity } =
      await import("@/lib/infrastructure/persistence/drizzle/assertDatabaseConnectivity");
    await assertDatabaseConnectivity();
  }
}
