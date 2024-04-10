Tutorial de Instalação
Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu computador:

    npm: Gerenciador de Pacotes do Node.js
    composer: Gerenciador de Dependências para PHP

Passos de Instalação

Siga estas etapas para configurar o projeto:

    Instale o npm:
        Se você ainda não tem o npm instalado, faça o download e instale-o a partir do site oficial do npm.
    Instale o composer:
        Se você ainda não tem o composer instalado, faça o download e instale-o a partir do site oficial do composer.
    Clone o repositório:
        Execute o seguinte comando no terminal para clonar o repositório:

        git clone https://github.com/FelipeEliasSoares/Desafio_Estagio_EnterScience.git

    Acesse a pasta do repositório:
        Navegue até o diretório do projeto:

        cd Desafio_Estagio_EnterScience

    Instale as dependências:
        Execute os seguintes comandos:

        composer install
        npm install

    Configure o ambiente:
        Crie um arquivo .env com as configurações necessárias para o seu projeto.
    Execute o projeto:
        Inicie o servidor local com o seguinte comando:

        php artisan serve

        Em outro terminal, execute:

        npm run dev

Para fazer login, utilize as seguintes credenciais:

    E-mail: user@example.com
    Senha: password123
