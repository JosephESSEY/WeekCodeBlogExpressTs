import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthRepository } from "../auth.repository";
import pool from "../../../shared/database/client";
import { User } from "../../users/users.model";

vi.mock("../../../shared/database/client");

const FIND_BY_EMAIL_QUERY = "SELECT id, name, email, password, role, created_at, updated_at FROM users WHERE email = $1";
const CREATE_USER_QUERY = `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, role, created_at, updated_at`;

describe("AuthRepository", () => {
  let authRepository: AuthRepository;
  let mockPool: any;

  beforeEach(() => {
    authRepository = new AuthRepository();
    mockPool = vi.mocked(pool);
    vi.clearAllMocks();
  });

  describe("findByEmail", () => {
    it("doit retrouver un utilisateur à partir de son email", async () => {
      const mockUser: User = {
        id: "user-123",
        name: "Joseph",
        email: "joseph@example.com",
        password: "hashed-password",
        role: "visitor",
        created_at: new Date("2024-01-01T10:00:00Z"),
        updated_at: new Date("2024-01-01T10:00:00Z"),
      };

      mockPool.query.mockResolvedValue({ rows: [mockUser] });

      const result = await authRepository.findByEmail("joseph@example.com");

      expect(mockPool.query).toHaveBeenCalledWith(
        FIND_BY_EMAIL_QUERY,
        ["joseph@example.com"]
      );

      expect(result).toEqual(mockUser);
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("email");
      expect(result).toHaveProperty("role");
      expect(result?.email).toBe("joseph@example.com");
    });

    it("doit retourner null si aucun utilisateur n'est trouvé", async () => {
      mockPool.query.mockResolvedValue({ rows: [] });

      const result = await authRepository.findByEmail("notfound@example.com");

      expect(mockPool.query).toHaveBeenCalledWith(
        FIND_BY_EMAIL_QUERY,
        ["notfound@example.com"]
      );
      expect(result).toBeNull();
    });

    it("doit gérer les erreurs de base de données", async () => {
      const mockError = new Error("Database connection failed");
      mockPool.query.mockRejectedValue(mockError);

      await expect(
        authRepository.findByEmail("test@example.com")
      ).rejects.toThrow("Database connection failed");
    });
  });

  describe("createUser", () => {
    it("doit créer un nouvel utilisateur", async () => {
      const mockNewUser: Partial<User> = {
        id: "user-456",
        email: "new@example.com",
        role: "visitor",
        created_at: new Date("2024-01-01T10:00:00Z"),
        updated_at: new Date("2024-01-01T10:00:00Z"),
      };

      mockPool.query.mockResolvedValue({ rows: [mockNewUser] });

      const result = await authRepository.createUser(
        "New User",
        "new@example.com",
        "hashed123"
      );

      expect(mockPool.query).toHaveBeenCalledWith(
        CREATE_USER_QUERY,
        ["New User", "new@example.com", "hashed123", "visitor"]
      );

      expect(result).toEqual(mockNewUser);
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("email");
      expect(result).toHaveProperty("role");
      expect(result?.email).toBe("new@example.com");
    });

  });
});