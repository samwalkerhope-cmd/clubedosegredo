# Clube — nova versão (azul e dourado)

App de membros com login por telefone, jornada de 21 dias com progresso, registro de evolução (peso), área de presentes e perfil. Feito com React, Vite, Tailwind e Supabase.

## 1. Rodar no computador

Precisa do Node.js 18 ou mais novo.

```bash
npm install
npm run dev
```

Sem configurar o Supabase, o app abre em **modo demonstração**: qualquer telefone com DDD entra e os dados ficam só no navegador. Serve para ver o visual e testar a navegação.

## 2. Colocar seu conteúdo

Tudo fica em **`src/content.js`**:

- `APP`: nome do app, frase da tela de entrada, nome do plano e número do WhatsApp.
- `DIAS`: os 21 dias (título, resumo e blocos com itens). Hoje estão com texto de exemplo.
- `PRESENTES`: materiais bônus. Coloque os PDFs em `public/presentes/` e escreva o caminho em `arquivo` (ex.: `/presentes/meu-material.pdf`).

O título da aba do navegador fica em `index.html` (`<title>`).

## 3. Mudar as cores

As cores ficam em **`tailwind.config.js`**, em `colors` (`azul`, `ouro`, `creme`). Trocar os valores ali muda o app inteiro.

## 4. Banco de dados (Supabase)

1. Crie um projeto em supabase.com.
2. Em **SQL Editor**, cole e rode o arquivo `supabase/schema.sql`.
3. Em **Authentication > Sign In / Providers > Email**, desligue **Confirm email**. O login usa o telefone transformado em um e-mail interno, então não há e-mail real para confirmar.
4. Em **Project Settings > API**, copie a URL do projeto e a chave `anon`.
5. Copie `.env.example` para `.env` e preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.

### Quem pode criar conta

Só cria conta quem tem o telefone na lista de acessos liberados. O bloqueio é feito pelo próprio banco, não só pela tela.

Para criar a primeira administradora (você), rode no **SQL Editor**, trocando pelo seu número:

```sql
insert into public.acessos (telefone, nome) values ('85999999999', 'Seu nome');
```

Crie sua conta no app com esse telefone e depois rode:

```sql
update public.profiles set admin = true where telefone = '85999999999';
```

Saia e entre de novo no app. Em **Perfil > Administração** você libera os telefones das clientes (após a compra), remove acessos e acompanha quantos dias cada uma concluiu.

Use sempre o mesmo formato de telefone (só dígitos, com DDD) ao liberar e ao criar a conta.

## 5. Publicar (GitHub + Vercel)

```bash
git init
git add .
git commit -m "Primeira versão"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

Na Vercel: **Add New > Project**, escolha o repositório, mantenha o preset **Vite** e cadastre em **Environment Variables** as mesmas variáveis do `.env`. Depois clique em **Deploy**.

## Outros recursos

- **Receitas:** ficam em `RECEITAS`, no `src/content.js`, separadas por `CATEGORIAS`. Em `RECEITA_DO_DIA` você escolhe qual receita aparece como sugestão em cada dia.
- **Lista de compras:** fica em `LISTA_COMPRAS`, no `src/content.js`. As marcações ficam salvas no aparelho de cada pessoa.
- **Instalar no celular:** o app tem ícone e manifesto (`public/icone.svg` e `public/manifest.webmanifest`). No celular, use "Adicionar à tela de início" no navegador. Troque o nome no manifesto junto com o do `content.js`.

## O que ainda não existe nesta versão

- Recuperação de senha (o login por telefone não tem e-mail real). Por enquanto, quem esquecer a senha precisa que você redefina no painel do Supabase, em Authentication > Users.
- Liberação automática ligada ao checkout: hoje você libera cada telefone pelo painel depois da compra.
- Fotos na evolução (hoje só peso e anotação).
- Envio de avisos para as usuárias.
