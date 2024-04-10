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



2. Navegue até o diretório do repositório clonado:
```bash
  cd Desafio_Estagio_EnterScience


3. Dentro do diretório do repositório, instale as dependências PHP e JavaScript usando o Composer e o npm:
```bash
  composer install
  npm install


4. Navegue até o diretório `desafio_estagio`:
```bash
cd desafio_estagio


5. Dentro do diretório `desafio_estagio`, instale novamente as dependências PHP e JavaScript:
```bash
  composer install
  npm install


6. Execute o servidor PHP usando o Artisan:
```bash
  php artisan serve


7. Em outro terminal, execute o comando npm para compilar os assets:
```bash
  npm run dev


## Acessando a Aplicação

Após a conclusão dos passos acima, você pode acessar a aplicação em seu navegador da web visitando o endereço:
```bash
  http://localhost:8000


## Fazendo Login

Para fazer login na aplicação, utilize as seguintes credenciais:

- **Email:** user@example.com
- **Senha:** password123

Agora você está pronto para explorar e trabalhar no Desafio Estágio EnterScience localmente em seu ambiente de desenvolvimento. Divirta-se!
