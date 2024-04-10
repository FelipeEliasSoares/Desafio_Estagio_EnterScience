# Tutorial de Instalação - Desafio Estágio EnterScience

Este guia fornecerá instruções passo a passo para configurar e executar o projeto Desafio Estágio EnterScience em seu ambiente local.

## Pré-requisitos

Antes de começar, verifique se você possui o npm e o composer instalados em seu computador.

- [npm](https://www.npmjs.com/get-npm)
- [Composer](https://getcomposer.org/download/)

## Passo a Passo

1. Clone o repositório Desafio Estágio EnterScience em sua máquina local:

   ```bash
   git clone https://github.com/FelipeEliasSoares/Desafio_Estagio_EnterScience.git

    Navegue até o diretório do repositório clonado:

    bash

cd Desafio_Estagio_EnterScience

Dentro do diretório do repositório, instale as dependências PHP e JavaScript usando o Composer e o npm:

bash

composer install
npm install

Navegue até o diretório desafio_estagio:

bash

cd desafio_estagio

Dentro do diretório desafio_estagio, instale novamente as dependências PHP e JavaScript:

bash

composer install
npm install

Execute o servidor PHP usando o Artisan:

bash

php artisan serve

Em outro terminal, execute o comando npm para compilar os assets:

bash

npm run dev
