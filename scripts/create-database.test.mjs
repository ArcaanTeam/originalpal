import { describe, expect, it, vi } from "vitest";
import {
  createDatabase,
  getDatabaseConnectionInfo,
  quoteIdentifier,
} from "./create-database.mjs";

function createClient({ rows = [], errors = [] } = {}) {
  const queries = [];
  return {
    queries,
    Client: class {
      async connect() {}
      async end() {}
      async query(text, values) {
        queries.push({ text, values });
        const error = errors[queries.length - 1];
        if (error) throw error;
        return { rowCount: rows[queries.length - 1] ?? 0 };
      }
    },
  };
}

const quietLogger = { log: vi.fn() };

describe("db:create", () => {
  it("connects to postgres while retaining URL credentials and options", () => {
    expect(
      getDatabaseConnectionInfo(
        "postgresql://user:p%40ss@db.example:5432/originalpal?sslmode=require",
      ),
    ).toEqual({
      databaseName: "originalpal",
      adminConnectionString:
        "postgresql://user:p%40ss@db.example:5432/postgres?sslmode=require",
    });
  });

  it("quotes database identifiers safely", () => {
    expect(quoteIdentifier('shop"db')).toBe('"shop""db"');
  });

  it("creates the configured database when it does not exist", async () => {
    const mock = createClient();
    const result = await createDatabase({
      databaseUrl: "postgres://user:pass@localhost:5432/shop",
      Client: mock.Client,
      logger: quietLogger,
    });

    expect(result).toEqual({ created: true, databaseName: "shop" });
    expect(mock.queries).toEqual([
      {
        text: "SELECT 1 FROM pg_database WHERE datname = $1",
        values: ["shop"],
      },
      { text: 'CREATE DATABASE "shop"', values: undefined },
    ]);
  });

  it("does not attempt to recreate an existing database", async () => {
    const mock = createClient({ rows: [1] });
    const result = await createDatabase({
      databaseUrl: "postgres://user:pass@localhost/shop",
      Client: mock.Client,
      logger: quietLogger,
    });

    expect(result).toEqual({ created: false, databaseName: "shop" });
    expect(mock.queries).toHaveLength(1);
  });

  it("rejects a URL without a database name", () => {
    expect(() => getDatabaseConnectionInfo("postgres://localhost/")).toThrow(
      "DATABASE_URL must include the database name",
    );
  });
});
