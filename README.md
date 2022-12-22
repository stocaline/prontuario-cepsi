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
+ Ajuste na exibição das Tabelas
+ Ajustar erros do typescript
+ Fazer a altenticação no backend para usar endpoints
