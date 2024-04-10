markdown

# Tutorial de Instalação - Desafio Estágio EnterScience

Este guia fornecerá instruções passo a passo para configurar e executar o projeto Desafio Estágio EnterScience em seu ambiente local.

## Pré-requisitos

Antes de começar, verifique se você possui o npm e o composer instalados em seu computador.

- [npm](https://www.npmjs.com/get-npm)
- [Composer](https://getcomposer.org/download/)

## Passo a Passo

1. Clone o repositório Desafio Estágio EnterScience em sua máquina local:

git clone https://github.com/FelipeEliasSoares/Desafio_Estagio_EnterScience.git

arduino


2. Navegue até o diretório do repositório clonado:

cd Desafio_Estagio_EnterScience

csharp


3. Dentro do diretório do repositório, instale as dependências PHP e JavaScript usando o Composer e o npm:

composer install
npm install

markdown


4. Navegue até o diretório `desafio_estagio`:

cd desafio_estagio

javascript


5. Dentro do diretório `desafio_estagio`, instale novamente as dependências PHP e JavaScript:

composer install
npm install

markdown


6. Execute o servidor PHP usando o Artisan:

php artisan serve

lua


7. Em outro terminal, execute o comando npm para compilar os assets:

npm run dev

css


## Acessando a Aplicação

Após a conclusão dos passos acima, você pode acessar a aplicação em seu navegador da web visitando o endereço:

http://localhost:8000

markdown


## Fazendo Login

Para fazer login na aplicação, utilize as seguintes credenciais:

- **Email:** user@example.com
- **Senha:** password123
