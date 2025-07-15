
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { Request, Response } from "express";

// Mock du service
vi.mock("../auth.service", () => ({
  AuthService: vi.fn().mockImplementation(() => ({
    register: vi.fn(),
    login: vi.fn(),
  })),
}));

describe("AuthController", () => {
  let controller: AuthController;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    controller = new AuthController();
    mockReq = { body: {} };
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    vi.clearAllMocks();
  });

  describe("register", () => {
    it("enregistre un utilisateur avec succès", async () => {
      const mockUser = { id: "1", email: "test@example.com", role: "visitor" };
      mockReq.body = {
        name: "Joe",
        email: "test@example.com",
        password: "password123",
      };
      (controller["authService"].register as any).mockResolvedValue(mockUser);

      await controller.register(mockReq as Request, mockRes as Response, vi.fn());

      expect(controller["authService"].register).toHaveBeenCalledWith(
        "Joe", "test@example.com", "password123"
      );
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "success",
        data: mockUser,
      });
    });

    it("gère une erreur d'inscription", async () => {
      const error = { statusCode: 400, message: "User already exists" };
      mockReq.body = { name: "Joe", email: "exists@example.com", password: "123" };
      (controller["authService"].register as any).mockRejectedValue(error);

      await controller.register(mockReq as Request, mockRes as Response, vi.fn());

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "User already exists",
      });
    });

    it("gère une erreur inconnue sans statusCode ni message", async () => {
    const unknownError = {};
    mockReq.body = { name: "Joe", email: "oops@example.com", password: "123" };
    (controller["authService"].register as any).mockRejectedValue(unknownError);

    await controller.register(mockReq as Request, mockRes as Response, vi.fn());

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
        error: "Internal Server Error",
    });
    });


  });

  describe("login", () => {
    it("connecte un utilisateur et retourne un token", async () => {
      const mockToken = "mocked.jwt.token";
      mockReq.body = {
        email: "user@example.com",
        password: "mypassword",
      };
      (controller["authService"].login as any).mockResolvedValue(mockToken);

      await controller.login(mockReq as Request, mockRes as Response, vi.fn());

      expect(controller["authService"].login).toHaveBeenCalledWith(
        "user@example.com",
        "mypassword"
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "success",
        data: mockToken,
      });
    });

    it("gère une erreur de login", async () => {
      const error = { statusCode: 401, message: "Incorrect Password" };
      mockReq.body = {
        email: "user@example.com",
        password: "wrongpass",
      };
      (controller["authService"].login as any).mockRejectedValue(error);

      await controller.login(mockReq as Request, mockRes as Response, vi.fn());

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Incorrect Password",
      });
    });

    it("gère une erreur inconnue sans statusCode ni message", async () => {
    const unknownError = {};
    mockReq.body = { email: "user@example.com", password: "wrongpass" };
    (controller["authService"].login as any).mockRejectedValue(unknownError);

    await controller.login(mockReq as Request, mockRes as Response, vi.fn());

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
        error: "Internal Server Error",
    });
    });

  });
});
