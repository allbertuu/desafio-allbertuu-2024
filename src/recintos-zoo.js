class RecintosZoo {
  static recintos = [
    {
      numero: 1,
      bioma: "savana",
      tamanhoTotal: 10,
      animais: [{ especie: "macaco", quantidade: 3 }],
    },
    { numero: 2, bioma: "floresta", tamanhoTotal: 5, animais: [] },
    {
      numero: 3,
      bioma: "savana e rio",
      tamanhoTotal: 7,
      animais: [{ especie: "gazela", quantidade: 1 }],
    },
    { numero: 4, bioma: "rio", tamanhoTotal: 8, animais: [] },
    {
      numero: 5,
      bioma: "savana",
      tamanhoTotal: 9,
      animais: [{ especie: "leao", quantidade: 1 }],
    },
  ];

  static animais = [
    { especie: "leao", tamanho: 3, bioma: "savana" },
    { especie: "leopardo", tamanho: 2, bioma: "savana" },
    { especie: "crocodilo", tamanho: 3, bioma: "rio" },
    { especie: "macaco", tamanho: 1, bioma: "savana ou floresta" },
    { especie: "gazela", tamanho: 2, bioma: "savana" },
    { especie: "hipopotamo", tamanho: 4, bioma: "savana ou rio" },
  ];

  static animaisCarnivoros = ["leao", "leopardo", "crocodilo"];

  /**
   * Retorna true se a espécie do animal existe na lista permitida pelo Zoológico,
   * false caso contrário
   *  */
  existeEspecie(especie) {
    return RecintosZoo.animais.some(
      (animal) => animal.especie === especie.toLowerCase()
    );
  }

  obterRecintosComBiomaCompativelAoAnimal(animal) {
    const catalogoDoAnimalNoZoo = RecintosZoo.animais.find(
      (animalCatalogado) => animalCatalogado.especie === animal.toLowerCase()
    );
    const biomasDoAnimal = catalogoDoAnimalNoZoo.bioma.split(" ou ");

    return RecintosZoo.recintos.filter((recinto) => {
      return biomasDoAnimal.some((biomaDoAnimal) =>
        recinto.bioma.includes(biomaDoAnimal)
      );
    });
  }

  obterTamanhoEspecie(especie) {
    return RecintosZoo.animais.find(
      (animalCatalogado) => animalCatalogado.especie === especie
    ).tamanho;
  }

  calcularEspacoOcupado(recinto) {
    return recinto.animais.reduce((acc, animalDoRecinto) => {
      const tamanhoEspecie = this.obterTamanhoEspecie(animalDoRecinto.especie);
      return acc + animalDoRecinto.quantidade * tamanhoEspecie;
    }, 0);
  }

  formatarRecinto(recinto, espacoLivre) {
    return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`;
  }

  calcularEspacoLivre(recinto, animal, quantidade) {
    const espacoJaOcupado = this.calcularEspacoOcupado(recinto);
    const tamanhoAnimais =
      this.obterTamanhoEspecie(animal.toLowerCase()) * quantidade;
    return recinto.tamanhoTotal - espacoJaOcupado - tamanhoAnimais;
  }

  excluirRecintosComCarnivoros(recintos) {
    return recintos.filter(
      (recinto) =>
        !recinto.animais.some((animalDoRecinto) =>
          RecintosZoo.animaisCarnivoros.includes(animalDoRecinto.especie)
        )
    );
  }

  analisaRecintos(animal, quantidade) {
    if (typeof animal !== "string" || !this.existeEspecie(animal)) {
      return { erro: "Animal inválido" };
    }

    if (quantidade < 1 || typeof quantidade !== "number") {
      return { erro: "Quantidade inválida" };
    }

    const recintosComBiomaCompativelAoAnimal =
      this.obterRecintosComBiomaCompativelAoAnimal(animal);

    // FLUXO 1: animal é carnívoro
    if (RecintosZoo.animaisCarnivoros.includes(animal.toLowerCase())) {
      // retorna somente recintos que possuem a mesma espécie, ou nenhum animal
      const somenteMesmaEspecieOuVazio =
        recintosComBiomaCompativelAoAnimal.filter((recinto) =>
          recinto.animais.every(
            (animalDoRecinto) =>
              animalDoRecinto.especie === animal.toLowerCase()
          )
        );

      const recinto = somenteMesmaEspecieOuVazio[0];

      const espacoLivre = this.calcularEspacoLivre(recinto, animal, quantidade);

      if (espacoLivre < 0) {
        return { erro: "Não há recinto viável" };
      }

      return {
        recintosViaveis: [this.formatarRecinto(recinto, espacoLivre)],
      };
    }

    // FLUXO 2: animal não é carnívoro
    if (animal.toLowerCase() === "hipopotamo") {
      // sem carnívoros
      const recintosSemCarnivoros = this.excluirRecintosComCarnivoros(
        recintosComBiomaCompativelAoAnimal
      );
      // só deixa os de animais de espécies diferentes que são da savana e rio
      const recintos = recintosSemCarnivoros.filter((recinto) => {
        const ehSavanaERio =
          recinto.bioma.includes("savana") && recinto.bioma.includes("rio");
        const temEspeciesDiferentes = recinto.animais.some(
          (animalDoRecinto) => animalDoRecinto.especie !== animal.toLowerCase()
        );
        return !temEspeciesDiferentes || ehSavanaERio;
      });

      return {
        recintosViaveis: recintos.map((recinto) => {
          const espacoLivre = this.calcularEspacoLivre(
            recinto,
            animal,
            quantidade
          );

          return this.formatarRecinto(recinto, espacoLivre);
        }),
      };
    }

    if (animal.toLowerCase() === "macaco") {
      // sem carnívoros
      const recintosSemCarnivoros = this.excluirRecintosComCarnivoros(
        recintosComBiomaCompativelAoAnimal
      );

      // macaco não pode estar sozinho em um recinto
      const recintos = recintosSemCarnivoros.filter((recinto) => {
        if (quantidade === 1) {
          return recinto.animais.length > 0;
        }
        return true;
      });

      return {
        recintosViaveis: recintos.map((recinto) => {
          const espacoLivre = this.calcularEspacoLivre(
            recinto,
            animal,
            quantidade
          );

          return this.formatarRecinto(recinto, espacoLivre);
        }),
      };
    }

    // FLUXO 3: não é macaco nem hipopotamo
    // sem carnívoros
    const recintosSemCarnivoros = this.excluirRecintosComCarnivoros(
      recintosComBiomaCompativelAoAnimal
    );

    return {
      recintosViaveis: recintosSemCarnivoros.map((recinto) => {
        const espacoLivre = this.calcularEspacoLivre(
          recinto,
          animal,
          quantidade
        );

        return this.formatarRecinto(recinto, espacoLivre);
      }),
    };
  }
}

export { RecintosZoo as RecintosZoo };

