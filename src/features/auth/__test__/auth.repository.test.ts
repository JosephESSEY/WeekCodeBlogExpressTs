import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthRepository } from "../auth.repository";
import db from "../../../shared/database/client";
import { QueryResult } from "pg";

describe("AuthRepository", () => {
  let repository: AuthRepository;

  beforeEach(() => {
    repository = new AuthRepository();
  });

  it("should find a user by email", async () => {
    const mockQueryResult: QueryResult<any> = {
      rows: [
        {
          id: "uuid-123",
          email: "test@example.com",
          password: "hashedpass",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      command: "",
      rowCount: 1,
      oid: 0,
      fields: [],
    };

    const mockQuery = vi
      .spyOn(db, "query")
      .mockResolvedValueOnce(
        mockQueryResult as unknown as ReturnType<typeof db.query>
      );

    const user = await repository.findByEmail("test@example.com");

    expect(mockQuery).toHaveBeenCalledWith(
      "SELECT id, email, password, role, created_at, updated_at FROM users WHERE email = $1",
      ["test@example.com"]
    );
    expect(user?.email).toBe("test@example.com");

    mockQuery.mockRestore();
  });

  it("should create a new user", async () => {
    const mockQueryResult: QueryResult<any> = {
      rows: [
        {
          id: "uuid-123",
          email: "test@example.com",
          role: "visitor",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      command: "",
      rowCount: 1,
      oid: 0,
      fields: [],
    };

    const mockQuery = vi
      .spyOn(db, "query")
      .mockResolvedValueOnce(
        mockQueryResult as unknown as ReturnType<typeof db.query>
      );

    const newUser = await repository.createUser(
      "john",
      "test@example.com",
      "hashedpass"
    );

    expect(mockQuery).toHaveBeenCalledWith(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, role, created_at, updated_at`,
      ["john", "test@example.com", "hashedpass", "visitor"]
    );
    expect(newUser?.email).toBe("test@example.com");

    mockQuery.mockRestore();
  });
});
