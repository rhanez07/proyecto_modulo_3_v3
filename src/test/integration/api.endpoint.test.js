import request from "supertest";
import app from "../../app.js";
import JwtService from "../../infrastructure/security/jwt.service.js";

describe("Integración - API Completa", () => {
  describe("1. Healthcheck Endpoint", () => {
    test("GET /api/health debería devolver 200 OK y estado", async () => {
      const response = await request(app).get("/api/health");

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("status", "OK");
    });
  });

  describe("2. Endpoints de Notas (Protegidos con JWT)", () => {
    test("GET /api/v1/notes debería fallar si no se envía Token (401)", async () => {
      const response = await request(app).get("/api/v1/notes");

      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty(
        "error",
        "Authorization header missing or invalid"
      );
    });

    test("POST /api/v1/notes debería fallar si falta el Título (400 o 500)", async () => {
      const validToken = JwtService.generateToken({
        id: "usuario_test_123",
        email: "test@example.com",
        role: "user",
      });

      const response = await request(app)
        .post("/api/v1/notes")
        .set("Authorization", `Bearer ${validToken}`)
        .send({
          content: "Contenido sin título",
        });

      expect([400, 500]).toContain(response.statusCode);
    });

    test("GET /api/v1/notes debería ser exitoso si se envía Token válido (200)", async () => {
      const validToken = JwtService.generateToken({
        id: "usuario_falso_123",
        email: "test@example.com",
        role: "user",
      });

      const response = await request(app)
        .get("/api/v1/notes")
        .set("Authorization", `Bearer ${validToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
    });
  });
});