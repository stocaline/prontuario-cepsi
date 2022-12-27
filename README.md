# prontuario-cepsi

>Status: em produção

## Descrição📘:
Prontuario eletrônico para a CEPSI desenvolvido para tornar o processo de cadastro de paciente mais eficente e pratico, usando tecnologias como Node.js, React.js, Next.js e Typescript.

## Rodando o Projeto⚙️:
### Backend:
Na pasta backend execute o comando ```` npm install ````

Feito isso, crie um arquivo .env com as seguintes linhas
````
PORT= (Porta que a aplicação será rodada. Exemplo: 3333)
MYSQL_HOST= (Porta que o banco está rodando Exemplo: localhost ou 127.0.0.1)
MYSQL_USER= (Usuario do mysql. Exemplo: root)
MYSQL_PASSWORD= (Senha do mysql. Exemplo: root)
MYSQL_DB= (Nome do database. Exemplo: banco)
````
Com a instalação completa, basta rodar o comando ````npm run dev````

### Frontend🖥️:
Na pasta frontend, execute o comando ````yarn install````

Com a instalação completa, basta rodar o comando ````yarn dev````


# Newsletter📰:
+ Nome de usuário desaparece ao reiniciar a pagina
+ Cadastro de paciente menor de idade
+ Validação na criação de usuário e paciente, para que não seja possivel duplicar ambos
+ Definir o que é nescessario para se cadastrar com usuário
+ Usuário conseguir editar seus dados
+ Usuário conseguir editar as informações do paciente
+ Divisão entre Usuário: professor e aluno
+ Ajuste na exibição das Tabelas (Richard)
+ Ajustar erros do typescript
+ Fazer a altenticação no backend para usar endpoints
Lista de correções - 26/12/2022:
+ Tirar obrigatoriedade de preencher todos os campos da ficha do paciente
+ Os campos com box dropdown devem vir com um valor default setado
+ Inserir a tabela/form de insercao no CEPSI
+ Nos prontuarios identificar pelo login quem está preenchendo o prontuário
+ data de nacimento está pegando dia atual (Richard)
+ No prontuario colocar os campos de data, horario e responsavel pelo atendimento (pegar lista dos usuarios)
+ editar os historicos de prontuario
+ Sair do cadastro do paciente para a lista de pacientes do usuario
+ trocar os tipo int par BIGINT no MySQL nos campos do Cadastro do PAciente
+ Apresentar a lista dos prontuarios em ordem de data decrescente
+ imprimir ficha dos prontuarios e paciente separadas
+ organizar layout de apresentacao das listas de pacientes e dos prontuarios
+ permitir editar os pacientes (Richard) e prontuarios.
