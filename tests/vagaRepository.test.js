const request = require("supertest");
const app = require("../server");

describe("Testes nos endpoints de Vagas", () => {
  test("Deve retornar uma lista vazia de vagas", async () => {
    const response = await request(app).get("/vagas").send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("Deve cadastrar uma nova vaga", async () => {
    const vaga = {
      descricao: "Desenvolvedor Full Stack",
      titulo: "Desenvolvedor Full Stack",
      dataCadastro: "2024-10-31",
      telefone: "112333444112",
      empresa: "Empresa Teste",
    };

    const response = await request(app).post("/vagas").send(vaga);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  test("Deve retornar uma lista de vagas", async () => {
    const vaga = {
      descricao: "Desenvolvedor Full Stack",
      titulo: "Desenvolvedor Full Stack",
      dataCadastro: "2024-10-31",
      telefone: "112333444112",
      empresa: "Empresa Teste",
    };

    await request(app).post("/vagas").send(vaga);

    const response = await request(app).get("/vagas").send();

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
