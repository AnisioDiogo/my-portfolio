# Portfólio — Anisio Diogo

Site de portfólio feito a partir do protótipo **"Portifolio Principal 2.0"** no Figma.
HTML, CSS e JavaScript puros: não precisa instalar nada nem rodar build.

## Estrutura

```
index.html            página única com todas as seções
assets/css/style.css  estilos (desktop baseado no Figma de 1884px + versão celular)
assets/js/config.js   ← EDITE AQUI: WhatsApp, redes, GitHub, projetos e depoimentos
assets/js/main.js     interações
assets/img/           imagens exportadas do Figma
```

## O que é interativo

- **Logo `{ }` da navbar**: ao passar o mouse, as chaves se abrem e aparece "dev Anísio".
- **Fone pendurado**: balança quando você rola a página (e ao passar o mouse ou clicar nele).
- **Botão `{☼}` lateral**: alterna entre tema claro e escuro e lembra a sua escolha.
- **Mande um Oi! / Vamos Conversar / Mande um oi!**: abrem o WhatsApp com uma mensagem pronta.
- **Cards de serviço**: abrem o WhatsApp já dizendo qual serviço interessa.
- **Projetos em Destaque**: os projetos fixos do `config.js` + repositórios do seu GitHub.
- **Depoimentos**: carrossel com pontos, setas e arrasto no celular.
- **Termos de Condição / Política de Privacidade**: abrem uma janela com o texto.

## Configurar (config.js)

1. `redes`: troque os `"#"` pelos links do LinkedIn, Instagram, Discord e GitHub.
2. `github.usuario`: coloque seu usuário. No GitHub, adicione o tópico **`portfolio`** nos
   repositórios que devem aparecer (em *About → Topics*). A imagem do card é a prévia que o
   próprio GitHub gera; o botão "Ver projeto" abre o site (*homepage* do repo) ou o repositório.
3. `projetos[0].link`: link do site da Paróquia.
4. `depoimentos`: adicione os outros clientes (nome, empresa, nota, foto e texto).

## Publicar no GitHub Pages

```bash
git init
git add .
git commit -m "Portfólio"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/portfolio.git
git push -u origin main
```

Depois, no repositório: **Settings → Pages → Branch: main / (root) → Save**.
O site fica em `https://SEU-USUARIO.github.io/portfolio/`.
