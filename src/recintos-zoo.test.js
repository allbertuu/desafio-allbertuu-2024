import { RecintosZoo } from "./recintos-zoo.js";

describe("Recintos do Zoologico", () => {
  describe("Validação de argumentos inválidos", () => {
    test("Deve rejeitar animal que o Zoológico não trata", () => {
      const resultado = new RecintosZoo().analisaRecintos("UNICORNIO", 1);

      expect(resultado.erro).toBe("Animal inválido");
      expect(resultado.recintosViaveis).toBeFalsy();
    });

    test("Deve aceitar animal com letras minúsculas", () => {
      const resultado = new RecintosZoo().analisaRecintos("macaco", 1);

      expect(resultado.erro).toBeFalsy();
      expect(resultado.recintosViaveis).toBeDefined();
    });

    test("Deve rejeitar animal nulo", () => {
      const resultado = new RecintosZoo().analisaRecintos(null, 1);

      expect(resultado.erro).toBe("Animal inválido");
      expect(resultado.recintosViaveis).toBeFalsy();
    });

    test("Deve rejeitar animal numérico", () => {
      const resultado = new RecintosZoo().analisaRecintos(10, 1);

      expect(resultado.erro).toBe("Animal inválido");
      expect(resultado.recintosViaveis).toBeFalsy();
    });

    test("Deve rejeitar passar somente quantidade, sem animal", () => {
      const resultado = new RecintosZoo().analisaRecintos(undefined, 1);

      expect(resultado.erro).toBe("Animal inválido");
      expect(resultado.recintosViaveis).toBeFalsy();
    });

    test("Deve rejeitar quantidade como texto", () => {
      const resultado = new RecintosZoo().analisaRecintos("MACACO", "dois");

      expect(resultado.erro).toBe("Quantidade inválida");
      expect(resultado.recintosViaveis).toBeFalsy();
    });

    test("Deve rejeitar quantidade nula", () => {
      const resultado = new RecintosZoo().analisaRecintos("MACACO", null);

      expect(resultado.erro).toBe("Quantidade inválida");
      expect(resultado.recintosViaveis).toBeFalsy();
    });

    test("Deve rejeitar quantidade 0", () => {
      const resultado = new RecintosZoo().analisaRecintos("MACACO", 0);

      expect(resultado.erro).toBe("Quantidade inválida");
      expect(resultado.recintosViaveis).toBeFalsy();
    });

    test("Deve rejeitar passar somente animal, sem quantidade", () => {
      const resultado = new RecintosZoo().analisaRecintos("MACACO", undefined);

      expect(resultado.erro).toBe("Quantidade inválida");
      expect(resultado.recintosViaveis).toBeFalsy();
    });
  });

  // implementar essa validação de espaço livre "pré-fluxos"
  test.skip("Não deve encontrar recintos para 10 macacos", () => {
    const resultado = new RecintosZoo().analisaRecintos("MACACO", 10);

    expect(resultado.erro).toBe("Não há recinto viável");
    expect(resultado.recintosViaveis).toBeFalsy();
  });

  test("Deve encontrar recintos não-vazios para 1 macaco", () => {
    const resultado = new RecintosZoo().analisaRecintos("MACACO", 1);

    expect(resultado.erro).toBeFalsy();
    expect(resultado).toEqual({
      recintosViaveis: [
        "Recinto 1 (espaço livre: 6 total: 10)",
        "Recinto 3 (espaço livre: 4 total: 7)",
      ],
    });
  });

  test("Deve encontrar recintos para 2 macacos", () => {
    const resultado = new RecintosZoo().analisaRecintos("MACACO", 2);

    expect(resultado.erro).toBeFalsy();
    expect(resultado).toEqual({
      recintosViaveis: [
        "Recinto 1 (espaço livre: 5 total: 10)",
        "Recinto 2 (espaço livre: 3 total: 5)",
        "Recinto 3 (espaço livre: 3 total: 7)",
      ],
    });
  });

  test("Deve encontrar recintos para 1 gazela", () => {
    const resultado = new RecintosZoo().analisaRecintos("GAZELA", 1);

    expect(resultado.erro).toBeFalsy();
    expect(resultado).toEqual({
      recintosViaveis: [
        "Recinto 1 (espaço livre: 5 total: 10)",
        "Recinto 3 (espaço livre: 3 total: 7)",
      ],
    });
  });

  test("Deve encontrar recinto para 1 leão, ao lado da mesma espécie", () => {
    const resultado = new RecintosZoo().analisaRecintos("LEAO", 1);

    expect(resultado.erro).toBeFalsy();
    expect(resultado).toEqual({
      recintosViaveis: ["Recinto 5 (espaço livre: 3 total: 9)"],
    });
  });

  test("Deve encontrar recinto para 1 hipopotamo, mas se tiver animais só é permitido na savana e rio", () => {
    const resultado = new RecintosZoo().analisaRecintos("HIPOPOTAMO", 1);

    expect(resultado.erro).toBeFalsy();
    expect(resultado).toEqual({
      recintosViaveis: [
        "Recinto 3 (espaço livre: 1 total: 7)",
        "Recinto 4 (espaço livre: 4 total: 8)",
      ],
    });
  });
});

