# Passos para desenvolver a solução

1. Ler bem a documentação e preparar o projeto para desenvolver a solução
2. Desenvolver usando TDD (Test Driven Development)
3. Extrair as condições, em linguagem natural, geradas pelas "regras para encontrar um recinto viável".
4. Identifique os "grandes módulos independentes" das condições, nesse caso: "Espaço do recinto", e "Recinto compatível".

Condições:

1. Recinto compatível  
   1.1 a especie não deve estar no bioma que ela não se adapta  
   1.2 leao, leopardo, crocodilo só podem estar com a mesma especie  
   1.3 um hipopotamo só fica com outra especie se estiver no recinto com savana e rio  
   1.5 um macaco não pode ficar sozinho em um recinto

2. Espaço do recinto  
   2.1 o espaço ocupado não deve ultrapassar o tamanho do recinto  
   2.2 quando há mais de uma espécie no mesmo recinto, 1 espaço extra já está ocupado  
   2.3 só adiciona uma especie ao recinto se todos os animais couberem (não é permitido trocas)

Erro na resposta valida no 3º recinto, o recinto 3 no espaço livre, que deveria ser esperado 3 ao invés de 2.
