/* ==========================================================================
   Portfólio — Anisio Diogo · interações
   ========================================================================== */
(function () {
  "use strict";

  var C = window.PORTFOLIO_CONFIG || {};
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var ICONES = {
    html: "tec-html.png", css: "tec-css.png", js: "tec-js.png", javascript: "tec-js.png",
    typescript: "tec-js.png", nodejs: "tec-nodejs.png", node: "tec-nodejs.png",
    python: "tec-python.png", sql: "tec-sql.png", figma: "tec-figma.png",
    powerbi: "tec-powerbi.png", photoshop: "tec-photoshop.png",
    illustrator: "tec-illustrator.png", coreldraw: "tec-coreldraw.png",
  };
  var NOMES = { html: "HTML", css: "CSS", js: "JavaScript", javascript: "JavaScript", typescript: "TypeScript", nodejs: "Node.js", node: "Node.js", python: "Python", sql: "SQL", figma: "Figma", powerbi: "Power BI", photoshop: "Photoshop", illustrator: "Illustrator", coreldraw: "CorelDRAW" };

  /* ---------------------------------------------------- links de contato */
  function linkWhats(texto) {
    var w = C.whatsapp || {};
    return "https://wa.me/" + (w.numero || "") + "?text=" + encodeURIComponent(texto || w.mensagem || "Olá!");
  }
  $$(".js-whatsapp").forEach(function (a) { a.href = linkWhats(); });
  $$(".js-servico").forEach(function (a) {
    a.href = linkWhats("Olá, Anísio! Vi seu portfólio e tenho interesse em " + a.dataset.servico + ".");
    a.setAttribute("aria-label", a.querySelector("h3").textContent + " — pedir orçamento pelo WhatsApp");
  });
  $$(".js-email").forEach(function (a) { a.href = "mailto:" + C.email; a.textContent = C.email; });
  $$(".js-telefone").forEach(function (a) {
    a.href = "tel:+" + (C.whatsapp && C.whatsapp.numero);
    if (C.telefoneExibicao) a.textContent = C.telefoneExibicao;
  });
  $$(".js-rede").forEach(function (a) {
    var url = (C.redes || {})[a.dataset.rede];
    if (a.dataset.rede === "github" && (!url || url === "#") && C.github && C.github.usuario) {
      url = "https://github.com/" + C.github.usuario;
    }
    if (url && url !== "#") { a.href = url; } else { a.removeAttribute("target"); a.href = "#contato"; }
  });
  var ano = $("#ano"); if (ano) ano.textContent = new Date().getFullYear();

  /* ---------------------------------------------------- logo { dev Anísio } */
  var logo = $("#logo");
  if (logo && window.matchMedia("(hover: none)").matches) {
    logo.addEventListener("touchstart", function () { logo.classList.add("aberto"); }, { passive: true });
  }

  /* ---------------------------------------------------- menu mobile */
  var menuBtn = $("#menuBtn"), menu = $("#menu");
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      var aberto = menu.classList.toggle("aberto");
      menuBtn.setAttribute("aria-expanded", aberto);
      menuBtn.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    });
    $$("a", menu).forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("aberto"); menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* link ativo da navbar conforme a seção visível */
  if ("IntersectionObserver" in window) {
    var links = $$(".topo__links a");
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (l) { l.classList.toggle("ativo", l.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["sobre", "servicos", "projetos", "clientes", "contato"].forEach(function (id) {
      var el = document.getElementById(id); if (el) io.observe(el);
    });
  }

  /* ---------------------------------------------------- tema claro/escuro */
  var botaoTema = $("#tema");
  function aplicarTema(t) {
    document.documentElement.dataset.theme = t;
    botaoTema.setAttribute("aria-pressed", t === "dark");
    try { localStorage.setItem("tema", t); } catch (e) {}
  }
  if (botaoTema) {
    botaoTema.setAttribute("aria-pressed", document.documentElement.dataset.theme === "dark");
    botaoTema.addEventListener("click", function () {
      aplicarTema(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
    });
  }

  /* ---------------------------------------------------- fone balançando
     Pêndulo com mola: cada rolagem dá um "empurrão" proporcional à
     velocidade; a mola traz de volta e o amortecimento faz parar. */
  var fone = $("#fone");
  if (fone && !reduzMovimento) {
    var ang = 0, vel = 0, ultimoY = window.scrollY, rodando = false;
    var MOLA = 0.018, ATRITO = 0.045, MAX = 16;

    function passo() {
      vel += -MOLA * ang - ATRITO * vel;
      ang += vel;
      if (ang > MAX) { ang = MAX; vel *= -0.4; }
      if (ang < -MAX) { ang = -MAX; vel *= -0.4; }
      fone.style.transform = "rotate(" + ang.toFixed(3) + "deg)";
      if (Math.abs(ang) < 0.02 && Math.abs(vel) < 0.02) {
        ang = vel = 0; fone.style.transform = ""; rodando = false; return;
      }
      requestAnimationFrame(passo);
    }
    function empurrar(forca) {
      vel += forca;
      if (!rodando) { rodando = true; requestAnimationFrame(passo); }
    }
    window.addEventListener("scroll", function () {
      var y = window.scrollY, dy = y - ultimoY; ultimoY = y;
      var r = fone.getBoundingClientRect();
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return; // só quando perto da tela
      empurrar(Math.max(-1.2, Math.min(1.2, dy * 0.012)));
    }, { passive: true });
    fone.addEventListener("mouseenter", function () { empurrar(0.8); });
    fone.addEventListener("click", function () { empurrar(Math.random() > 0.5 ? 2.2 : -2.2); });
  }

  /* ---------------------------------------------------- projetos */
  var lista = $("#listaProjetos");

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }

  function cardProjeto(p, idx) {
    var art = el("article", "projeto");
    var info = el("div", "projeto__info");
    info.appendChild(el("p", "projeto__categoria", p.categoria || "Projeto"));
    info.appendChild(el("h3", "projeto__titulo", p.titulo));
    if (p.descricao) info.appendChild(el("p", "projeto__desc", p.descricao));

    var techs = el("ul", "projeto__techs");
    (p.tecnologias || []).slice(0, 8).forEach(function (t) {
      var chave = String(t).toLowerCase().replace(/[^a-z]/g, "");
      var li = el("li");
      li.title = NOMES[chave] || t;
      if (ICONES[chave]) {
        var img = el("img"); img.src = "assets/img/" + ICONES[chave]; img.alt = NOMES[chave] || t; li.appendChild(img);
      } else {
        li.textContent = String(t).slice(0, 2).toUpperCase();
      }
      techs.appendChild(li);
    });
    info.appendChild(techs);

    var btn = el("a", "btn-projeto", "Ver projeto");
    btn.href = p.link || "#";
    if (p.link && p.link !== "#") { btn.target = "_blank"; btn.rel = "noopener"; }
    btn.setAttribute("aria-label", "Ver projeto: " + p.titulo);
    var seta = el("img"); seta.src = "assets/img/seta-diagonal.png"; seta.alt = ""; btn.appendChild(seta);
    info.appendChild(btn);

    var fig = el("div", "projeto__imagem");
    if (p.imagem) {
      var im = el("img"); im.src = p.imagem; im.alt = "Prévia do projeto " + p.titulo; if (idx > 0) im.loading = "lazy";
      fig.appendChild(im);
    }
    art.appendChild(info); art.appendChild(fig);
    return art;
  }

  function nomeBonito(n) {
    return n.replace(/[-_]+/g, " ").replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }

  function renderProjetos(itens) {
    lista.innerHTML = "";
    if (!itens.length) {
      lista.appendChild(el("p", "projetos__vazio", "Em breve novos projetos por aqui."));
      return;
    }
    itens.forEach(function (p, i) { lista.appendChild(cardProjeto(p, i)); });
  }

  function carregarProjetos() {
    var fixos = (C.projetos || []).slice();
    var gh = C.github || {};
    var maximo = gh.maximo || 3;
    renderProjetos(fixos.slice(0, maximo));
    if (!gh.usuario || fixos.length >= maximo) return;

    var cacheKey = "gh-repos-" + gh.usuario;
    function usar(repos) {
      var filtrados = repos.filter(function (r) {
        if (r.fork || r.archived) return false;
        if (gh.somenteComTopico) return (r.topics || []).indexOf(gh.topico || "portfolio") !== -1;
        return true;
      });
      filtrados.sort(function (a, b) {
        return (b.stargazers_count - a.stargazers_count) || (new Date(b.pushed_at) - new Date(a.pushed_at));
      });
      var doGithub = filtrados.slice(0, maximo - fixos.length).map(function (r) {
        var topicos = (r.topics || []).filter(function (t) { return t !== (gh.topico || "portfolio"); });
        var techs = [];
        if (r.language) techs.push(r.language);
        topicos.forEach(function (t) { if (ICONES[t.replace(/[^a-z]/g, "")] && techs.indexOf(t) === -1) techs.push(t); });
        return {
          categoria: topicos.filter(function (t) { return !ICONES[t.replace(/[^a-z]/g, "")]; }).map(nomeBonito)[0] || "Projeto no GitHub",
          titulo: nomeBonito(r.name),
          descricao: r.description || "",
          tecnologias: techs,
          imagem: "https://opengraph.githubassets.com/1/" + r.full_name,
          link: r.homepage || r.html_url,
        };
      });
      renderProjetos(fixos.concat(doGithub));
    }

    try {
      var cache = JSON.parse(sessionStorage.getItem(cacheKey) || "null");
      if (cache) { usar(cache); return; }
    } catch (e) {}

    fetch("https://api.github.com/users/" + encodeURIComponent(gh.usuario) + "/repos?per_page=100&sort=pushed", {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (repos) {
        try { sessionStorage.setItem(cacheKey, JSON.stringify(repos)); } catch (e) {}
        usar(repos);
      })
      .catch(function () { /* sem internet ou limite da API: ficam os projetos fixos */ });
  }
  if (lista) carregarProjetos();

  /* ---------------------------------------------------- depoimentos (carrossel) */
  var trilho = $("#trilho"), pontos = $("#pontos"), ant = $("#anterior"), prox = $("#proximo");
  var deps = C.depoimentos || [];
  var pagina = 0;

  function porPagina() { return window.matchMedia("(max-width: 900px)").matches ? 1 : 2; }
  function totalPaginas() { return Math.max(1, Math.ceil(deps.length / porPagina())); }

  function montarDepoimentos() {
    if (!trilho) return;
    trilho.innerHTML = "";
    deps.forEach(function (d) {
      var li = el("li", "depo");
      var topo = el("div", "depo__topo");
      var foto = el("img", "depo__foto"); foto.src = d.foto; foto.alt = "Foto de " + d.nome;
      var txt = el("div");
      txt.appendChild(el("p", "depo__nome", d.nome));
      txt.appendChild(el("p", "depo__empresa", d.empresa));
      var nota = el("p", "depo__nota", d.nota || "5.0");
      nota.setAttribute("aria-label", "Nota " + (d.nota || "5.0") + " de 5");
      var est = el("img"); est.src = "assets/img/estrela.png"; est.alt = ""; nota.appendChild(est);
      topo.appendChild(foto); topo.appendChild(txt); topo.appendChild(nota);
      li.appendChild(topo);
      li.appendChild(el("blockquote", "depo__texto", d.texto));
      trilho.appendChild(li);
    });
    trilho.classList.toggle("um", deps.length < porPagina());
    montarPontos();
    irPara(0);
  }

  function montarPontos() {
    pontos.innerHTML = "";
    var n = totalPaginas();
    for (var i = 0; i < n; i++) {
      var b = el("button");
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "Página " + (i + 1) + " de " + n);
      b.addEventListener("click", irPara.bind(null, i));
      pontos.appendChild(b);
    }
    // o protótipo mostra 5 pontos; se houver poucos depoimentos, mostramos só os reais
  }

  function irPara(i) {
    var n = totalPaginas();
    pagina = Math.max(0, Math.min(n - 1, i));
    var item = trilho.children[0];
    var passo = item ? (item.getBoundingClientRect().width + parseFloat(getComputedStyle(trilho).columnGap || 0)) * porPagina() : 0;
    trilho.style.transform = "translateX(" + (-pagina * passo) + "px)";
    $$("button", pontos).forEach(function (b, k) { b.setAttribute("aria-selected", k === pagina); });
    ant.disabled = pagina === 0;
    prox.disabled = pagina >= n - 1;
  }

  if (trilho) {
    ant.addEventListener("click", function () { irPara(pagina - 1); });
    prox.addEventListener("click", function () { irPara(pagina + 1); });
    // arrastar no celular
    var x0 = null;
    trilho.addEventListener("pointerdown", function (e) { x0 = e.clientX; });
    window.addEventListener("pointerup", function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) irPara(pagina + (dx < 0 ? 1 : -1));
    });
    var pp = porPagina();
    window.addEventListener("resize", function () {
      if (porPagina() !== pp) { pp = porPagina(); montarDepoimentos(); } else { irPara(pagina); }
    });
    montarDepoimentos();
  }

  /* ---------------------------------------------------- modais */
  $$("[data-modal]").forEach(function (b) {
    b.addEventListener("click", function () {
      var m = document.getElementById("modal-" + b.dataset.modal);
      if (m && m.showModal) m.showModal();
    });
  });
  $$(".modal").forEach(function (m) {
    $(".modal__fechar", m).addEventListener("click", function () { m.close(); });
    m.addEventListener("click", function (e) { if (e.target === m) m.close(); });
  });
})();
