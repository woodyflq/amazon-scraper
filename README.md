# Amazon Scraper

Projeto simples para retornar itens da amazon com base na pesquisa por uma palavra. O projeto usa **Bun + Express + JSDOM** no backend e **Vite + HTML/CSS/JS puro** no frontend.

---

## Funcionalidades

- Scraper de produtos da Amazon.
- Retorna: **título**, **avaliação em estrelas**, **número de avaliações** e **imagem**.
- Frontend básico, responsivo e com paginação.
- Tratamento de erros tanto no frontend quanto no backend.
- Endpoint para requisições JSON

---

## Backend (Bun + Express)

### Pré-requisitos
- [Instale o Bun](https://bun.sh) caso ainda não tenha instalado:
  ```bash
  curl -fsSL https://bun.sh/install | bash
  ```

### Instruções

1. Acesse a pasta `backend/` e instale as dependências:
   ```bash
   cd backend
   ```
   ```bash
   bun install
   ```

3. Inicie o servidor:
   ```bash
   bun index.ts
   ```

> O backend ficará disponível em: [http://localhost:3000](http://localhost:3000)

---

## Frontend (Vite + HTML/CSS/JS)

### Instruções

1. Acesse a pasta `frontend/` e instale as dependências:
   ```bash
   cd frontend
   ```
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   npm run dev
   ```

> Acesse via navegador: [http://localhost:5173](http://localhost:5173)

---

## Como usar

1. Digite o nome do produto no campo de busca (ex: `Iphone`).
2. Clique em **Search**.
3. Os produtos encontrados serão exibidos com imagem, avaliação e número de reviews.
4. Use os botões **Next / Previous** para navegar.

---

## Estrutura do Projeto

```
amazon-scraper/
├── backend/
│   ├── index.ts
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── main.js
│   └── style.css
└── README.md
```