<h1 align="center">Prontuario Cepsi</h1>

<h4 align="center"> 
	🚧  🚀 Em construção...  🚧
</h4>

## Descrição📘:
Prontuario eletrônico para a CEPSI desenvolvido para tornar o processo de cadastro de paciente mais eficente e pratico, usando tecnologias como Node.js, React.js, Next.js e Typescript.

## Rodando o Projeto⚙️:
### Banco de dados:
Instalar o postgress

Na primeira vez que rodar a aplicaação, deve-se rodar o comando ```` npx prisma migrate dev ```` dentro da pasta do backend para fazer a configuração inicial do banco

### Backend:
Na pasta backend execute o comando ```` yarn install ````

Feito isso, crie um arquivo .env com as seguintes linhas
````
PORT= (Porta onde a aplicação será rodada. Exemplo: 3333)
DATABASE_URL= (postgresql://janedoe:mypassword@localhost:5432/mydb?schema=sample)
JWT_SECRET= (Chave unica para configurar JWT. Exemplo: chave)
````
Com a instalação completa, basta rodar o comando ````yarn dev````

### Frontend🖥️:
Na pasta frontend, execute o comando ````yarn install````

Com a instalação completa, basta rodar o comando ````yarn dev````


# Newsletter📰:

#### 1 Refatorar o backend, com typescript e adicionar o prisma para gestão e construção automática do banco de dados
+ Validação na criação de usuário e paciente, para que não seja possivel duplicar ambos
+ Definir o que é nescessario para se cadastrar com usuário
+ Usuário conseguir editar seus dados
+ Divisão entre Usuário: professor e aluno
+ Ajustar erros do typescript
+ Fazer a altenticação no backend para usar endpoints
+ Inserir a tabela/form de insercao no CEPSI
+ editar os historicos de prontuario
+ No prontuario colocar os campos de data, horario e responsavel pelo atendimento (pegar lista dos usuarios)
+ trocar os tipo int par BIGINT no MySQL nos campos do Cadastro do PAciente 
+ permitir editar prontuarios.
#### 2 Refatorar o Frontend, fazer as adaptações nescessarias para receber as informações novas do novo backend 
+ Apresentar a lista dos prontuarios em ordem de data decrescente
+ imprimir ficha dos prontuarios e paciente separadas
+ Usuário conseguir editar seus dados
+ Divisão entre Usuário: professor e aluno
+ Inserir a tabela/form de insercao no CEPSI
+ Nos prontuarios identificar pelo login quem está preenchendo o prontuário
+ permitir editar prontuarios.
+ No prontuario colocar os campos de data, horario e responsavel pelo atendimento (pegar lista dos usuarios)
#### 3 Refazer o header e dashboard da aplicação, com novo design e novas funções
+ Nome de usuário desaparece ao reiniciar a pagina
+ Usuário conseguir editar seus dados
