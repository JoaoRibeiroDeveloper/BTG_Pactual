## Desafio Técnico - Estágio PTG-Pactual

Bem-Vindo ao meu desafio, feito com muito carrinho.

Eu sou o João Victor e vou explicar como está o projeto, o mesmo foi feito com **Node.js**, **Express.js**, **Typescript**, **TypeORM** e **PostgresSQL**

## Estrutura

O projeto está dividido em API/diagrama_entidade_relacionamento

**API** - Nessa pasta contém a API proposta, nela o **DDL** fica dentro das migrations e o **DML** fica no repository. Para iniciar o projeto da API, precisa ter o Node.js, npm/yarn e o postgreSQL rodando na máquina, na raiz da pasta tem a .dov.example coloque as variáveis de acordo com sua configuração.

**diagrama_entidade_relacionamento** - o DER foi feito com MySQL Workbench, e tem seu arquivo mwb dentro, caso não tenha instalado pode ver o DER no formato de imagem, o modelo foi feito seguindo o MER de James Martin (também conhecida como a notação pé de galinha).


## Iniciando a API
Exemplo feito com npm, mas pode usar yarn. Clone ou baixe o projeto do git.

Baixando as Dependências
```shell
npm install
```
Rodar as Migrations
```shell
npm run typeorm -- -d /src/shared/infra/typeorm/index.ts migration:run
```
Rodar as Seeds
```shell
npm run seed:init
```
Executar o Projeto
```shell
npm run dev
```
O projeto da API não foi concluído, tendo apenas as rotas de CREATE/UPDATE/SELECT do client, conta e movimentação, faltou rotas e useCases, mas suas entity e repository foram feitas.

## Redes Sociais

[LinkedIn](https://www.linkedin.com/in/jo%C3%A3o-victor-809b94246/)
