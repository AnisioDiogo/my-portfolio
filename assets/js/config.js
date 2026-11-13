/* ==========================================================================
   CONFIGURAÇÃO DO PORTFÓLIO
   Edite só este arquivo para trocar links, projetos e depoimentos.
   ========================================================================== */
window.PORTFOLIO_CONFIG = {
  /* Contato */
  whatsapp: {
    numero: "5599981851934", // DDI + DDD + número, só dígitos
    mensagem: "Olá, Anísio! Vi seu portfólio e gostaria de conversar.",
  },
  email: "devanisiodiogo@gmail.com",
  telefoneExibicao: "+55 (99)98185-1934",

  /* Redes sociais — troque "#" pelos seus links */
  redes: {
    linkedin: "https://www.linkedin.com/in/anisio-diogo-50b0542b1/",
    instagram: "https://www.instagram.com/dev_anisio/",
    discord: "https://discord.com/users/665882808337694724",
    github: "https://github.com/anisiodiogo/", // ex.: "https://github.com/seu-usuario"
  },

  /* Projetos do GitHub
     Preencha "usuario" e o site busca seus repositórios públicos sozinho.
     Para um repositório aparecer, adicione o tópico "portfolio" nele no GitHub
     (ou deixe somenteComTopico: false para mostrar os mais recentes). */
  github: {
    usuario: "anisiodiogo", // ex.: "anisiodiogo"
    somenteComTopico: true,
    topico: "portfolio",
    maximo: 3, // total de cards em "Projetos em Destaque" (manuais + GitHub)
  },

  /* Projetos fixos (aparecem primeiro). tecnologias: html, css, js, nodejs,
     python, sql, figma, powerbi, photoshop, illustrator, coreldraw */
  projetos: [
    {
      categoria: "Website Institucional",
      titulo: "Paróquia Nossa Senhora da Glória: Conectando a Comunidade.",
      descricao:
        "Um site desenvolvido para catalogar e organizar a programação da igreja. Criado com uma interface acessível e intuitiva, facilitando para os fiéis acompanharem todos os eventos e atividades paroquiais.",
      tecnologias: ["html", "css", "js"],
      imagem: "assets/img/projeto-paroquia.png",
      link: "#", // link do site ou do repositório
    },
  ],

  /* Depoimentos (o carrossel se ajusta à quantidade) */
  depoimentos: [
    {
      nome: "Luis H.",
      empresa: "Henrique Imports.",
      nota: "5.0",
      foto: "assets/img/depoimento-luis.png",
      texto:
        "“Trabalhar com o Dev Anisio na criação do meu site foi uma experiência incrível. Ele não só entendeu exatamente a identidade da minha marca, como trouxe soluções técnicas que eu nem sabia que precisava. O resultado foi um site rápido, bonito e que já está trazendo retorno. Recomendo de olhos fechados!”",
    },
  ],
};
