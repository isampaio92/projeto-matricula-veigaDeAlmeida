# Sistema de Matrículas On-line

Este projeto é um protótipo funcional de um sistema de matrículas para cursos on-line, desenvolvido como trabalho acadêmico para a disciplina de Desenvolvimento Backend do curso de Sistemas de Informação. 

O objetivo principal é demonstrar a integração entre um frontend reativo e um backend estruturado, focando em uma boa experiência de usuário (UX) e na construção de uma API segura.

## Tecnologias Utilizadas

**Frontend:**
* Vue.js (Reatividade e Componentização)
* CSS3 (Estilização e feedback visual)

**Backend:**
* Node.js
* Express (Roteamento da API)
* TypeScript (Tipagem estática e segurança)

## Funcionalidades Implementadas

* **Interface Responsiva e Acessível:** Formulário de matrícula com campos para nome, e-mail e seleção de curso.
* **UX Antecipada:** Validação imediata de formulários, mensagens de erro claras e feedback visual nos botões durante o processamento (simulação de carregamento).
* **API RESTful:**
  * `GET /cursos`: Retorna a lista de cursos disponíveis.
  * `POST /matricula`: Recebe, valida (via tipagem de interface no TypeScript) e armazena os dados do aluno em um banco de dados simulado em memória.
* **Integração Completa:** Comunicação assíncrona nativa usando `fetch` entre o cliente (Vue.js) e o servidor (Node.js).

## Como executar o projeto localmente

### Pré-requisitos
* [Node.js](https://nodejs.org/) instalado na máquina.
