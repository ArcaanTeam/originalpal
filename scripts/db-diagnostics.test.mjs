import { describe, expect, it } from "vitest";
import { describeDatabaseUrl, formatDatabaseError } from "./db-diagnostics.mjs";

describe("database diagnostics", () => {
  it("describes the target without exposing DSN credentials", () => {
    expect(
      describeDatabaseUrl("postgres://alice:secret@db.example:5544/shop"),
    ).toEqual({
      endpoint: "db.example:5544",
      databaseName: "shop",
    });
    expect(
      formatDatabaseError(new Error("failed"), {
        databaseUrl: "postgres://alice:secret@db.example:5544/shop",
        operation: "run migrations",
      }),
    ).not.toContain("secret");
  });

  it("suggests database creation when the configured database is missing", () => {
    const error = Object.assign(new Error("database does not exist"), {
      code: "3D000",
    });
    expect(
      formatDatabaseError(error, {
        databaseUrl: "postgres://localhost/shop",
        operation: "apply migrations",
      }),
    ).toContain("pnpm db:create");
  });

  it("reports nested PostgreSQL causes from ORM wrappers", () => {
    const rootCause = Object.assign(
      new Error("connect ECONNREFUSED 127.0.0.1:65432"),
      {
        code: "ECONNREFUSED",
      },
    );
    const wrapped = new Error("Failed query: CREATE SCHEMA", {
      cause: rootCause,
    });
    const message = formatDatabaseError(wrapped, {
      databaseUrl: "postgres://localhost/shop",
      operation: "migrate",
    });

    expect(message).toContain("ECONNREFUSED");
    expect(message).toContain("Caused by: connect ECONNREFUSED");
    expect(message).toContain(
      "Check that the DATABASE_URL host and port are correct",
    );
  });

  it("gives connection checks for terminated connections", () => {
    const message = formatDatabaseError(
      new Error("Connection terminated unexpectedly"),
      {
        databaseUrl: "postgres://localhost/shop",
        operation: "seed",
      },
    );
    expect(message).toContain("PostgreSQL is running");
    expect(message).toContain("SSL");
  });
});
