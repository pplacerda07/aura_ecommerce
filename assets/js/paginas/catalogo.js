/*
  CATÁLOGO / LISTAGEM DE PRODUTOS
  Filtros combináveis pela URL (todos opcionais):
    categoria  slug de categoria ou subcategoria (janelas, venezianas...)
    linha      essencial,premium
    cor        chaves de AURA_CORES separadas por vírgula
    selo       pronta-entrega,novidade,mais-vendido
    abertura   tipo de abertura normalizado (correr, abrir, camarao...)
    preco      faixa de preço (ate-500, 500-1000, 1000-2000, 2000-4000, acima-4000)
    q          texto da busca
    ordem      relevancia | mais-vendidos | menor-preco | maior-preco | a-z
    favoritos  1 mostra só os favoritos salvos
  Lógica: OU dentro do mesmo filtro, E entre filtros diferentes.
  Cada opção mostra quantos produtos sobram considerando os OUTROS filtros ativos.
*/
(function () {
  'use strict';

  var Aura = window.Aura;
  if (!Aura || !Aura.produtos) return;

  var C = Aura.config;
  var esc = Aura.esc;
  var I = Aura.icon;

  var POR_PAGINA = (C.site && C.site.itensPorPagina) || 24;
  var POSICAO_PROMO = 6; // o card de desconto entra depois do 6º produto

  /* ---------- referências da página ---------- */

  var el = {
    catalogo: document.querySelector('[data-catalogo]'),
    migalhas: document.querySelector('[data-migalhas]'),
    eyebrow: document.querySelector('[data-eyebrow]'),
    titulo: document.querySelector('[data-titulo]'),
    descricao: document.querySelector('[data-descricao]'),
    subs: document.querySelector('[data-subs]'),
    visual: document.querySelector('[data-visual]'),
    painelTopo: document.querySelector('[data-topo-painel]'),
    drawer: document.getElementById('filtros'),
    painel: document.querySelector('.catalogo-filtros__painel'),
    facetas: document.querySelector('[data-facetas]'),
    contagem: document.querySelector('[data-contagem]'),
    filtrar: document.querySelector('[data-abrir-filtros]'),
    filtrosQtd: document.querySelector('[data-filtros-qtd]'),
    ordem: document.querySelector('[data-ordem]'),
    chips: document.querySelector('[data-chips]'),
    grade: document.querySelector('[data-grade]'),
    paginacao: document.querySelector('[data-paginacao]'),
    vazio: document.querySelector('[data-vazio]'),
    verProdutos: document.querySelector('[data-ver-produtos]'),
  };
  if (!el.grade || !el.facetas) return;

  /* ---------- dicionários dos filtros ---------- */

  var CHAVES_FACETA = ['linha', 'cor', 'selo', 'abertura', 'preco'];

  var TITULOS_FACETA = {
    categoria: 'Categoria',
    linha: 'Linha',
    cor: 'Cor',
    selo: 'Disponibilidade e destaque',
    abertura: 'Tipo de abertura',
    preco: 'Faixa de preço',
  };

  function semCentavos(v) {
    return Aura.brl(v).replace(/,00$/, '');
  }

  var FAIXAS_PRECO = [
    { chave: 'ate-500', min: 0, max: 500, nome: 'Até ' + semCentavos(500) },
    { chave: '500-1000', min: 500, max: 1000, nome: semCentavos(500) + ' a ' + semCentavos(1000) },
    { chave: '1000-2000', min: 1000, max: 2000, nome: semCentavos(1000) + ' a ' + semCentavos(2000) },
    { chave: '2000-4000', min: 2000, max: 4000, nome: semCentavos(2000) + ' a ' + semCentavos(4000) },
    { chave: 'acima-4000', min: 4000, max: Infinity, nome: 'Acima de ' + semCentavos(4000) },
  ];

  function faixaDoPreco(v) {
    for (var i = 0; i < FAIXAS_PRECO.length; i++) {
      if (v >= FAIXAS_PRECO[i].min && v < FAIXAS_PRECO[i].max) return FAIXAS_PRECO[i].chave;
    }
    return FAIXAS_PRECO[FAIXAS_PRECO.length - 1].chave;
  }

  function chaveAbertura(txt) {
    return Aura.normalizar(txt).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  // tipos de abertura que existem no catálogo, do mais comum para o menos comum
  var ABERTURAS = (function () {
    var mapa = {};
    Aura.produtos.forEach(function (p) {
      if (!p.abertura) return;
      var k = chaveAbertura(p.abertura);
      if (!mapa[k]) mapa[k] = { chave: k, nome: p.abertura, n: 0 };
      mapa[k].n++;
    });
    return Object.keys(mapa).map(function (k) { return mapa[k]; }).sort(function (a, b) { return b.n - a.n; });
  })();

  var ORDEM_SELOS = ['pronta-entrega', 'mais-vendido', 'novidade'].filter(function (s) { return Aura.selos[s]; })
    .concat(Object.keys(Aura.selos).filter(function (s) { return ['pronta-entrega', 'mais-vendido', 'novidade'].indexOf(s) === -1; }));

  // nome de cada opção, usado nos chips e nos títulos
  var NOMES = {
    linha: function (v) { return (Aura.linhas[v] && Aura.linhas[v].nome) || v; },
    cor: function (v) { return Aura.nomeCor(v); },
    selo: function (v) { return (Aura.selos[v] && Aura.selos[v].nome) || v; },
    abertura: function (v) {
      for (var i = 0; i < ABERTURAS.length; i++) if (ABERTURAS[i].chave === v) return ABERTURAS[i].nome;
      return v;
    },
    preco: function (v) {
      for (var i = 0; i < FAIXAS_PRECO.length; i++) if (FAIXAS_PRECO[i].chave === v) return FAIXAS_PRECO[i].nome;
      return v;
    },
  };

  var VALIDOS = {
    linha: Object.keys(Aura.linhas),
    cor: Object.keys(Aura.cores),
    selo: Object.keys(Aura.selos),
    abertura: ABERTURAS.map(function (a) { return a.chave; }),
    preco: FAIXAS_PRECO.map(function (f) { return f.chave; }),
  };

  var ORDENS = [
    { chave: 'relevancia', nome: 'Mais relevantes', soBusca: true },
    { chave: 'mais-vendidos', nome: 'Mais vendidos' },
    { chave: 'menor-preco', nome: 'Menor preço' },
    { chave: 'maior-preco', nome: 'Maior preço' },
    { chave: 'a-z', nome: 'Nome, de A a Z' },
  ];

  var TITULO_SELO = { 'pronta-entrega': 'Pronta entrega', 'mais-vendido': 'Mais vendidos', novidade: 'Novidades' };

  // "Pronta entrega" = produto com todas as medidas em estoque (o selo vem assim de produtos.js)
  var DESC_SELO = {
    'pronta-entrega': 'Todas as medidas em estoque, com envio em ' + Aura.prazoProntaEntrega + '. Para quem não pode deixar a obra parada esperando.',
    'mais-vendido': 'Os modelos que mais saem por aqui. Escolha certeira para quem quer comprar sem erro.',
    novidade: 'Os modelos que acabaram de chegar ao catálogo. Dá uma olhada no que tem de novo.',
  };

  var DESC_SUB = {
    'vitros-de-correr': 'O clássico que nunca dá errado. Vitrôs e janelas de correr que abrem sem ocupar espaço e chegam montados, com vidro instalado.',
    venezianas: 'Você escurece o quarto sem fechar a ventilação e dorme melhor de verdade. Vidro e veneziana na mesma janela.',
    'maxim-ar': 'Abre projetada para fora e deixa o ar circular mesmo com chuva fina. Ótima para banheiro, cozinha e área de serviço.',
    basculantes: 'Compactos e fáceis de operar. As palhetas giram juntas com uma alavanca só, perfeitos para banheiros e lavabos.',
    'persiana-integrada': 'A persiana fica dentro do quadro da janela, protegida de poeira e chuva. Escurece o ambiente sem cortina.',
    'portas-de-correr': 'Integram a sala com a varanda ou o quintal sem roubar espaço, porque a folha corre em vez de abrir.',
    'portas-de-abrir': 'Robustas, fáceis de limpar e sem empenar com a umidade. Para entradas, áreas de serviço e fundos.',
    'portas-balcao': 'A porta que funciona como janela de quarto: vidro e veneziana para escurecer e ventilar ao mesmo tempo.',
    'portas-camarao': 'As folhas se dobram umas sobre as outras e liberam quase todo o vão. Ideal para integrar ambientes.',
    'portas-pivotantes': 'A porta que muda a cara da fachada. Pivô de piso e puxador longo para uma entrada que impressiona.',
    'box-frontal': 'Vidro temperado de 8 mm, roldanas suaves e perfil discreto. O box que deixa o banheiro com cara de reformado.',
    'box-de-canto': 'Abertura em canto para aproveitar cada centímetro do banheiro, com entrada ampla e vidro temperado de 8 mm.',
  };

  // garantia e prazo da linha saem da configuração e do estoque real, nunca de texto fixo
  function descricaoLinha(chave) {
    var L = Aura.linhas[chave];
    var partes = [L.resumo];
    var garantia = Aura.garantiaDe({ linha: chave });
    if (garantia) partes.push('Garantia de ' + garantia + ' contra defeitos de fabricação.');
    var daLinha = Aura.produtos.filter(function (p) { return p.linha === chave; });
    var medidas = [];
    daLinha.forEach(function (p) { medidas = medidas.concat(p.medidas || []); });
    if (medidas.length) {
      var comEstoque = medidas.filter(function (m) { return m.estoque > 0; }).length;
      if (comEstoque === medidas.length) partes.push('Todas as medidas em estoque, com envio em ' + Aura.prazoProntaEntrega + '.');
      else if (comEstoque === 0 && Aura.prazoSobEncomenda) partes.push('Feita sob encomenda: o prazo é o do frete ' + Aura.prazoSobEncomenda + '.');
    }
    return partes.join(' ');
  }

  var DESC_PADRAO = Aura.preencher('Janelas, portas e box de vidro com fabricação própria. Escolha o modelo e a medida do seu vão, pague em até {parcelas}x sem juros ou com {pix}% de desconto no Pix.');

  /* ---------- valores de cada produto (calculados uma vez) ---------- */

  var VAL = {};
  Aura.produtos.forEach(function (p) {
    VAL[p.id] = {
      linha: p.linha ? [p.linha] : [],
      cor: p.cor ? [p.cor] : [],
      selo: p.selos || [],
      abertura: p.abertura ? [chaveAbertura(p.abertura)] : [],
      preco: [faixaDoPreco(Aura.precoMin(p))],
      precoMin: Aura.precoMin(p),
    };
  });

  /* ---------- estado ---------- */

  var estado = novoEstado();
  var abertos = {}; // grupos de filtro que a pessoa fechou ou abriu
  var resultados = [];

  function novoEstado() {
    return { categoria: '', q: '', linha: [], cor: [], selo: [], abertura: [], preco: [], ordem: '', favoritos: false, pagina: 1 };
  }

  function lerUrl() {
    var u = null;
    try { u = new URLSearchParams(window.location.search); } catch (e) {}
    function get(n) { return (u && u.get(n)) || ''; }
    function lista(n) {
      var vistos = [];
      get(n).split(',').forEach(function (v) {
        v = v.trim().toLowerCase();
        if (n === 'abertura') v = chaveAbertura(v);
        if (v && VALIDOS[n].indexOf(v) > -1 && vistos.indexOf(v) === -1) vistos.push(v);
      });
      return vistos;
    }
    var st = novoEstado();
    var cat = get('categoria').trim().toLowerCase();
    if (cat && (Aura.categoria(cat) || Aura.subcategoria(cat))) st.categoria = cat;
    st.q = get('q').replace(/\s+/g, ' ').trim().slice(0, 80);
    CHAVES_FACETA.forEach(function (k) { st[k] = lista(k); });
    var ordem = get('ordem');
    if (ORDENS.some(function (o) { return o.chave === ordem; })) st.ordem = ordem;
    st.favoritos = get('favoritos') === '1';
    return st;
  }

  function ordemPadrao(st) {
    return st.q ? 'relevancia' : 'mais-vendidos';
  }

  function ordemEfetiva(st) {
    var o = st.ordem || ordemPadrao(st);
    if (o === 'relevancia' && !st.q) o = 'mais-vendidos';
    return o;
  }

  function montarQuery(st) {
    var partes = [];
    function add(k, v) { if (v) partes.push(k + '=' + v); }
    add('categoria', encodeURIComponent(st.categoria));
    add('q', encodeURIComponent(st.q));
    CHAVES_FACETA.forEach(function (k) { add(k, st[k].map(encodeURIComponent).join(',')); });
    var o = ordemEfetiva(st);
    if (st.ordem && o !== ordemPadrao(st)) add('ordem', o);
    if (st.favoritos) add('favoritos', '1');
    return partes.join('&');
  }

  function urlDe(st) {
    var qs = montarQuery(st);
    return 'catalogo.html' + (qs ? '?' + qs : '');
  }

  function copiar(st, mudancas) {
    var n = {};
    Object.keys(st).forEach(function (k) { n[k] = Array.isArray(st[k]) ? st[k].slice() : st[k]; });
    Object.keys(mudancas || {}).forEach(function (k) { n[k] = mudancas[k]; });
    return n;
  }

  // parâmetros que não são do catálogo (utm_source, gclid...) ficam intactos na URL
  var GERENCIADOS = ['categoria', 'q', 'ordem', 'favoritos'].concat(CHAVES_FACETA);

  function extrasDaUrl() {
    var extras = [];
    try {
      new URLSearchParams(window.location.search).forEach(function (v, k) {
        if (GERENCIADOS.indexOf(k) === -1) extras.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
      });
    } catch (e) {}
    return extras;
  }

  function escreverUrl(modo) {
    var partes = [montarQuery(estado)].concat(extrasDaUrl()).filter(Boolean);
    var qs = partes.join('&');
    var url = window.location.pathname + (qs ? '?' + qs : '') + (modo === 'push' ? '' : window.location.hash);
    try {
      if (modo === 'push') window.history.pushState(null, '', url);
      else window.history.replaceState(null, '', url);
    } catch (e) {
      /* alguns navegadores bloqueiam o histórico em arquivo local: a página segue funcionando */
    }
  }

  function totalFiltros(st) {
    return CHAVES_FACETA.reduce(function (s, k) { return s + st[k].length; }, 0);
  }

  /* ---------- filtragem ---------- */

  function listaBase() {
    var lista = estado.q ? Aura.buscar(estado.q) : Aura.produtos.slice();
    if (estado.favoritos) {
      var favs = Aura.favoritos.lista();
      lista = lista.filter(function (p) { return favs.indexOf(p.id) > -1; });
    }
    return lista;
  }

  function passaCategoria(p, cat) {
    if (!cat) return true;
    return p.categoria === cat || p.subcategoria === cat;
  }

  // ignorar: nome do filtro que não entra na conta (para contar as opções dele)
  function passa(p, ignorar) {
    if (ignorar !== 'categoria' && !passaCategoria(p, estado.categoria)) return false;
    var v = VAL[p.id];
    for (var i = 0; i < CHAVES_FACETA.length; i++) {
      var k = CHAVES_FACETA[i];
      if (k === ignorar) continue;
      var sel = estado[k];
      if (!sel.length) continue;
      var tem = false;
      for (var j = 0; j < sel.length; j++) {
        if (v[k].indexOf(sel[j]) > -1) { tem = true; break; }
      }
      if (!tem) return false;
    }
    return true;
  }

  function contarOpcoes(base, chave) {
    var mapa = {};
    base.forEach(function (p) {
      if (!passa(p, chave)) return;
      VAL[p.id][chave].forEach(function (v) { mapa[v] = (mapa[v] || 0) + 1; });
    });
    return mapa;
  }

  function ordenar(lista) {
    var o = ordemEfetiva(estado);
    var l = lista.slice();
    if (o === 'relevancia') return l; // Aura.buscar já devolve na ordem de relevância
    if (o === 'mais-vendidos') l.sort(function (a, b) { return b.vendidos - a.vendidos; });
    if (o === 'menor-preco') l.sort(function (a, b) { return VAL[a.id].precoMin - VAL[b.id].precoMin || b.vendidos - a.vendidos; });
    if (o === 'maior-preco') l.sort(function (a, b) { return VAL[b.id].precoMin - VAL[a.id].precoMin || b.vendidos - a.vendidos; });
    if (o === 'a-z') l.sort(function (a, b) { return a.nome.localeCompare(b.nome, 'pt-BR'); });
    return l;
  }

  /* ---------- contexto da página (título, descrição, migalhas) ---------- */

  function contexto() {
    var cat = null;
    var sub = null;
    if (estado.categoria) {
      cat = Aura.categoria(estado.categoria);
      if (!cat) {
        var s = Aura.subcategoria(estado.categoria);
        if (s) { cat = s.cat; sub = s.sub; }
      }
    }
    var linhaUnica = estado.linha.length === 1 ? estado.linha[0] : null;
    var seloUnico = estado.selo.length === 1 ? estado.selo[0] : null;
    var ctx = { cat: cat, sub: sub, tipo: 'todos', eyebrow: 'Catálogo', titulo: 'Todos os produtos', descricao: DESC_PADRAO, extra: null, visual: 'Banner do catálogo' };

    if (estado.favoritos) {
      ctx.tipo = 'favoritos';
      ctx.eyebrow = 'Sua lista';
      ctx.titulo = 'Meus favoritos';
      ctx.descricao = 'Os produtos que você salvou ficam aqui. Quando decidir, é só escolher a medida e montar o seu pedido.';
      ctx.extra = { nome: 'Meus favoritos', href: 'catalogo.html?favoritos=1' };
      ctx.visual = null;
    } else if (estado.q) {
      ctx.tipo = 'busca';
      ctx.eyebrow = 'Busca no catálogo';
      ctx.titulo = 'Resultados para “' + estado.q + '”';
      ctx.descricao = null; // depende da quantidade, montado em renderTopo
      ctx.extra = { nome: 'Busca', href: urlDe({ categoria: '', q: estado.q, linha: [], cor: [], selo: [], abertura: [], preco: [], ordem: '', favoritos: false }) };
      ctx.visual = null;
    } else if (sub) {
      ctx.tipo = 'sub';
      ctx.eyebrow = cat.nome;
      ctx.titulo = sub.nome;
      ctx.descricao = DESC_SUB[sub.slug] || cat.descricao;
      ctx.visual = 'Banner: ' + sub.nome;
    } else if (cat) {
      ctx.tipo = 'cat';
      ctx.eyebrow = 'Categoria';
      ctx.titulo = cat.nome;
      ctx.descricao = cat.descricao;
      ctx.visual = 'Banner: ' + cat.nome;
    } else if (linhaUnica && Aura.linhas[linhaUnica]) {
      var L = Aura.linhas[linhaUnica];
      ctx.tipo = 'linha';
      ctx.eyebrow = L.perfil || 'Linha';
      ctx.titulo = L.nome;
      ctx.descricao = descricaoLinha(linhaUnica);
      ctx.extra = { nome: L.nome, href: 'catalogo.html?linha=' + encodeURIComponent(linhaUnica) };
      ctx.visual = 'Banner: ' + L.nome;
    } else if (seloUnico && Aura.selos[seloUnico]) {
      ctx.tipo = 'selo';
      ctx.eyebrow = 'Destaques';
      ctx.titulo = TITULO_SELO[seloUnico] || Aura.selos[seloUnico].nome;
      ctx.descricao = DESC_SELO[seloUnico] || DESC_PADRAO;
      ctx.extra = { nome: ctx.titulo, href: 'catalogo.html?selo=' + encodeURIComponent(seloUnico) };
      ctx.visual = 'Banner: ' + ctx.titulo;
    }
    return ctx;
  }

  function migalhasDe(ctx) {
    var itens = [{ nome: 'Início', href: 'index.html' }, { nome: 'Produtos', href: 'catalogo.html' }];
    if (ctx.tipo === 'favoritos' || ctx.tipo === 'busca') {
      itens.push(ctx.extra);
      return itens;
    }
    if (ctx.cat) itens.push({ nome: ctx.cat.nome, href: Aura.urlCatalogo({ categoria: ctx.cat.slug }) });
    if (ctx.sub) itens.push({ nome: ctx.sub.nome, href: Aura.urlCatalogo({ categoria: ctx.sub.slug }) });
    if (!ctx.cat && ctx.extra) itens.push(ctx.extra);
    return itens;
  }

  function urlAbsoluta(rel) {
    if (/^https?:$/.test(window.location.protocol)) {
      try { return new URL(rel, window.location.href).href; } catch (e) {}
    }
    return String(C.empresa.site || '').replace(/\/$/, '') + '/' + rel;
  }

  function renderJsonLd(itens) {
    var s = document.getElementById('jsonld-migalhas');
    if (!s) {
      s = document.createElement('script');
      s.type = 'application/ld+json';
      s.id = 'jsonld-migalhas';
      document.head.appendChild(s);
    }
    s.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: itens.map(function (it, i) {
        return { '@type': 'ListItem', position: i + 1, name: it.nome, item: urlAbsoluta(it.href) };
      }),
    });
  }

  function definirMeta(seletor, valor) {
    var m = document.querySelector(seletor);
    if (m) m.setAttribute('content', valor);
  }

  function renderTopo(ctx, base) {
    var n = resultados.length;
    var desc = ctx.descricao;
    if (ctx.tipo === 'busca') {
      desc = n
        ? 'Achamos ' + n + ' ' + Aura.plural(n, 'produto', 'produtos') + ' para a sua busca. Use os filtros para chegar mais rápido no modelo certo.'
        : 'Ainda não temos nada com esse nome, mas a gente pode te ajudar a encontrar.';
    }

    el.eyebrow.textContent = ctx.eyebrow;
    el.titulo.textContent = ctx.titulo;
    el.descricao.textContent = desc;

    // imagem de topo (espaço reservado para banner da categoria)
    if (ctx.visual) {
      el.visual.innerHTML = Aura.mockup({ rotulo: ctx.visual, ratio: '16/9', alt: ctx.titulo });
      el.visual.hidden = false;
      el.painelTopo.classList.add('tem-visual');
    } else {
      el.visual.innerHTML = '';
      el.visual.hidden = true;
      el.painelTopo.classList.remove('tem-visual');
    }

    renderSubs(ctx, base);

    // migalhas
    var itens = migalhasDe(ctx);
    el.migalhas.innerHTML = itens.map(function (it, i) {
      if (i === itens.length - 1) return '<li><span aria-current="page">' + esc(it.nome) + '</span></li>';
      return '<li><a href="' + esc(it.href) + '">' + esc(it.nome) + '</a></li>';
    }).join('');
    renderJsonLd(itens);

    // título da aba e descrição para buscadores
    var tituloAba = ctx.titulo + ' | ' + C.empresa.nome;
    document.title = tituloAba;
    definirMeta('meta[name="description"]', desc);
    definirMeta('meta[property="og:title"]', tituloAba);
    definirMeta('meta[property="og:description"]', desc);

    // favoritos e busca interna são páginas pessoais ou ralas: fora do índice, mas os links seguem valendo
    var robots = document.querySelector('meta[name="robots"]');
    if (estado.favoritos || estado.q) {
      if (!robots) {
        robots = document.createElement('meta');
        robots.setAttribute('name', 'robots');
        document.head.appendChild(robots);
      }
      robots.setAttribute('content', 'noindex, follow');
    } else if (robots) {
      robots.parentNode.removeChild(robots);
    }
  }

  // atalhos para as subcategorias logo abaixo do título
  function renderSubs(ctx, base) {
    if (!ctx.cat || estado.favoritos || estado.q) {
      el.subs.hidden = true;
      el.subs.innerHTML = '';
      return;
    }
    var cont = {};
    base.forEach(function (p) {
      if (!passa(p, 'categoria')) return;
      cont[p.categoria] = (cont[p.categoria] || 0) + 1;
      cont[p.subcategoria] = (cont[p.subcategoria] || 0) + 1;
    });
    var cat = ctx.cat;
    var links = [{ slug: cat.slug, nome: 'Todos', n: cont[cat.slug] || 0 }].concat(cat.subs.map(function (s) {
      return { slug: s.slug, nome: s.nome, n: cont[s.slug] || 0 };
    }));
    el.subs.setAttribute('aria-label', 'Tipos de ' + cat.nome.toLowerCase());
    el.subs.innerHTML = '<ul>' + links.map(function (l) {
      var ativo = estado.categoria === l.slug;
      return '<li><a class="catalogo-subs__link' + (ativo ? ' is-ativo' : '') + (l.n ? '' : ' is-vazio') + '" href="' + esc(urlDe(copiar(estado, { categoria: l.slug }))) + '" data-cat="' + esc(l.slug) + '" data-chave="sub:' + esc(l.slug) + '"' + (ativo ? ' aria-current="page"' : '') + '>' +
        esc(l.nome) + '<span>' + l.n + '</span></a></li>';
    }).join('') + '</ul>';
    el.subs.hidden = false;

    // deixa o atalho ativo visível na rolagem horizontal
    var ativo = el.subs.querySelector('.is-ativo');
    var ul = el.subs.querySelector('ul');
    if (ativo && ul && ul.scrollWidth > ul.clientWidth) {
      ul.scrollLeft = Math.max(0, ativo.offsetLeft - 24);
    }
  }

  /* ---------- filtros (barra lateral / gaveta) ---------- */

  function htmlGrupo(chave, conteudo, qtdSelecionada) {
    var aberto = abertos[chave] !== false;
    return (
      '<details class="faceta" data-faceta="' + chave + '"' + (aberto ? ' open' : '') + '>' +
        '<summary class="faceta__titulo"><span>' + esc(TITULOS_FACETA[chave]) +
          (qtdSelecionada ? '<span class="faceta__badge">' + qtdSelecionada + '<span class="sr-only"> ' + Aura.plural(qtdSelecionada, 'selecionado', 'selecionados') + '</span></span>' : '') +
        '</span>' + I('down', 'faceta__seta') + '</summary>' +
        '<div class="faceta__corpo">' + conteudo + '</div>' +
      '</details>'
    );
  }

  function htmlOpcao(chave, valor, nome, n, extra) {
    var sel = estado[chave].indexOf(valor) > -1;
    return (
      '<label class="faceta__opcao' + (n ? '' : ' is-zero') + '">' +
        '<input type="checkbox" class="faceta__check" name="' + chave + '" value="' + esc(valor) + '" data-chave="' + chave + ':' + esc(valor) + '"' + (sel ? ' checked' : '') + '>' +
        (extra || '') +
        '<span class="faceta__nome">' + esc(nome) + '</span>' +
        '<span class="faceta__conta">' + n + '<span class="sr-only"> ' + Aura.plural(n, 'produto', 'produtos') + '</span></span>' +
      '</label>'
    );
  }

  function htmlCheckboxes(chave, opcoes, cont) {
    var visiveis = opcoes.filter(function (o) {
      return (cont[o.valor] || 0) > 0 || estado[chave].indexOf(o.valor) > -1;
    });
    if (!visiveis.length) return '';
    var html = '<fieldset><legend class="sr-only">' + esc(TITULOS_FACETA[chave]) + '</legend>' +
      visiveis.map(function (o) { return htmlOpcao(chave, o.valor, o.nome, cont[o.valor] || 0, o.extra); }).join('') +
      '</fieldset>';
    return htmlGrupo(chave, html, estado[chave].length);
  }

  function htmlArvore(base) {
    var cont = {};
    var total = 0;
    base.forEach(function (p) {
      if (!passa(p, 'categoria')) return;
      total++;
      cont[p.categoria] = (cont[p.categoria] || 0) + 1;
      cont[p.subcategoria] = (cont[p.subcategoria] || 0) + 1;
    });
    var ativa = estado.categoria;
    var sub = ativa && !Aura.categoria(ativa) ? Aura.subcategoria(ativa) : null;
    var catAberta = sub ? sub.cat.slug : ativa;

    function link(slug, nome, n, cls) {
      var atual = ativa === slug;
      return '<a class="arvore__link' + (cls ? ' ' + cls : '') + (atual ? ' is-ativo' : '') + '" href="' + esc(urlDe(copiar(estado, { categoria: slug }))) + '" data-cat="' + esc(slug) + '" data-chave="cat:' + esc(slug || 'todas') + '"' + (atual ? ' aria-current="page"' : '') + '>' +
        '<span class="arvore__nome">' + esc(nome) + '</span><span class="arvore__conta">' + n + '<span class="sr-only"> ' + Aura.plural(n, 'produto', 'produtos') + '</span></span></a>';
    }

    var html = '<ul class="arvore">' +
      '<li>' + link('', 'Todas as categorias', total) + '</li>' +
      Aura.categorias.map(function (c) {
        var n = cont[c.slug] || 0;
        var expandida = catAberta === c.slug;
        if (!n && !expandida) return '';
        var subs = '';
        if (expandida) {
          subs = '<ul class="arvore__subs">' + c.subs.map(function (s) {
            var ns = cont[s.slug] || 0;
            if (!ns && ativa !== s.slug) return '';
            return '<li>' + link(s.slug, s.nome, ns, 'arvore__link--sub') + '</li>';
          }).join('') + '</ul>';
        }
        return '<li>' + link(c.slug, c.nome, n) + subs + '</li>';
      }).join('') +
      '</ul>';
    return htmlGrupo('categoria', html, 0);
  }

  function renderFacetas(base) {
    var html = htmlArvore(base);

    var cLinha = contarOpcoes(base, 'linha');
    html += htmlCheckboxes('linha', VALIDOS.linha.map(function (k) { return { valor: k, nome: NOMES.linha(k) }; }), cLinha);

    var cCor = contarOpcoes(base, 'cor');
    html += htmlCheckboxes('cor', VALIDOS.cor.map(function (k) {
      var c = Aura.cores[k] || {};
      return { valor: k, nome: c.nome || k, extra: '<span class="faceta__swatch" style="--cor:' + esc(c.hex || '#ccc') + '" aria-hidden="true"></span>' };
    }), cCor);

    var cSelo = contarOpcoes(base, 'selo');
    html += htmlCheckboxes('selo', ORDEM_SELOS.map(function (k) { return { valor: k, nome: NOMES.selo(k) }; }), cSelo);

    var cAbertura = contarOpcoes(base, 'abertura');
    html += htmlCheckboxes('abertura', ABERTURAS.map(function (a) { return { valor: a.chave, nome: a.nome }; }), cAbertura);

    var cPreco = contarOpcoes(base, 'preco');
    html += htmlCheckboxes('preco', FAIXAS_PRECO.map(function (f) { return { valor: f.chave, nome: f.nome }; }), cPreco);

    el.facetas.innerHTML = html;

    var qtd = totalFiltros(estado);
    document.querySelectorAll('[data-limpar-filtros]').forEach(function (b) {
      if (b.classList.contains('catalogo-filtros__limpar')) b.hidden = qtd === 0;
      else b.disabled = qtd === 0;
    });
    el.filtrosQtd.textContent = qtd;
    el.filtrosQtd.hidden = qtd === 0;
    el.filtrar.setAttribute('aria-label', qtd ? 'Filtrar produtos, ' + qtd + ' ' + Aura.plural(qtd, 'filtro ativo', 'filtros ativos') : 'Filtrar produtos');
  }

  /* ---------- barra de resultados ---------- */

  function renderBarra() {
    var n = resultados.length;
    var palavra = estado.favoritos ? Aura.plural(n, 'produto salvo', 'produtos salvos') : Aura.plural(n, 'produto', 'produtos');
    el.contagem.innerHTML = '<strong>' + n + '</strong> ' + palavra;

    var atual = ordemEfetiva(estado);
    el.ordem.innerHTML = ORDENS.filter(function (o) { return !o.soBusca || estado.q; }).map(function (o) {
      return '<option value="' + o.chave + '"' + (o.chave === atual ? ' selected' : '') + '>' + esc(o.nome) + '</option>';
    }).join('');
    el.ordem.disabled = n < 2;
    var caixaOrdem = el.ordem.closest('.catalogo-ordem');
    if (caixaOrdem) caixaOrdem.hidden = n === 0;

    if (el.verProdutos) {
      el.verProdutos.textContent = n ? 'Ver ' + n + ' ' + Aura.plural(n, 'produto', 'produtos') : 'Nenhum produto';
    }
  }

  function renderChips() {
    var chips = [];
    if (estado.q) chips.push({ id: 'q:', rotulo: 'Busca: “' + estado.q + '”' });
    CHAVES_FACETA.forEach(function (k) {
      estado[k].forEach(function (v) {
        var nome = NOMES[k](v);
        if (k === 'abertura') nome = 'Abertura: ' + nome;
        chips.push({ id: k + ':' + v, rotulo: nome });
      });
    });
    if (!chips.length) {
      el.chips.hidden = true;
      el.chips.innerHTML = '';
      return;
    }
    el.chips.innerHTML =
      '<span class="sr-only">Filtros ativos:</span>' +
      chips.map(function (c) {
        return '<button type="button" class="chip" data-tirar="' + esc(c.id) + '" aria-label="Remover filtro ' + esc(c.rotulo) + '">' + esc(c.rotulo) + I('x') + '</button>';
      }).join('') +
      (totalFiltros(estado) ? '<button type="button" class="catalogo-chips__limpar" data-limpar-filtros>Limpar filtros</button>' : '');
    el.chips.hidden = false;
  }

  /* ---------- grade de produtos ---------- */

  function unidadeVolume(n) {
    var porProduto = C.descontoVolume && C.descontoVolume.contarPor === 'produtos';
    return porProduto ? Aura.plural(n, 'produto diferente', 'produtos diferentes') : Aura.plural(n, 'item', 'itens');
  }

  function mostrarPromo(lista) {
    return Aura.volumeAtivo && !!Aura.primeiraFaixa && lista.length > POSICAO_PROMO;
  }

  function statusPromo() {
    var r;
    try { r = Aura.carrinho.resumo(); } catch (e) { return ''; }
    if (!r || !r.contagem) return '';
    var v = r.volume;
    if (v.percentual && !v.proxima) return I('check') + '<span>Seu carrinho já garantiu <strong>' + v.percentual + '% de desconto</strong>.</span>';
    if (v.proxima) return I('bag') + '<span>Faltam <strong>' + v.proxima.faltam + ' ' + unidadeVolume(v.proxima.faltam) + '</strong> no seu carrinho para ganhar ' + v.proxima.percentual + '%.</span>';
    return '';
  }

  function htmlPromo() {
    var f = Aura.primeiraFaixa;
    return (
      '<div class="catalogo-promo">' +
        '<div class="catalogo-promo__topo">' +
          '<span class="eyebrow eyebrow--claro"><i class="tz"></i>Desconto por volume</span>' +
          '<p class="catalogo-promo__numero" aria-hidden="true">' + f.percentual + '<span>% off</span></p>' +
          '<h3 class="catalogo-promo__titulo">Acima de ' + f.acimaDe + ' ' + esc(Aura.unidadeVolume) + ', ' + f.percentual + '% de desconto no pedido todo.</h3>' +
          '<p class="catalogo-promo__texto">Vale para qualquer combinação de produtos. Sem cupom: o desconto entra sozinho no carrinho.</p>' +
        '</div>' +
        '<div class="catalogo-promo__rodape">' +
          '<p class="catalogo-promo__status" data-promo-status>' + statusPromo() + '</p>' +
          '<a class="catalogo-promo__link" href="ajuda.html#desconto-por-volume">Como funciona' + I('arrow') + '</a>' +
        '</div>' +
      '</div>'
    );
  }

  function htmlCards(lista, de, ate) {
    var promo = mostrarPromo(lista);
    var h = '';
    for (var i = de; i < ate; i++) {
      if (promo && i === POSICAO_PROMO) h += htmlPromo();
      h += Aura.cardProduto(lista[i]);
    }
    return h;
  }

  function renderPaginacao(mostrando, total) {
    if (total <= POR_PAGINA) {
      el.paginacao.hidden = true;
      el.paginacao.innerHTML = '';
      return;
    }
    var pct = Math.round((mostrando / total) * 100);
    var resta = total - mostrando;
    el.paginacao.innerHTML =
      '<p>Mostrando <strong>' + mostrando + '</strong> de <strong>' + total + '</strong> produtos</p>' +
      '<div class="catalogo-paginacao__barra" aria-hidden="true"><span style="width:' + pct + '%"></span></div>' +
      (resta > 0
        ? '<button type="button" class="btn btn--outline btn--lg" data-carregar-mais>Carregar mais produtos</button>'
        : '<p class="catalogo-paginacao__fim">Você viu todos os produtos desta lista.</p>');
    el.paginacao.hidden = false;
  }

  function renderGrade() {
    var lista = resultados;
    if (!lista.length) {
      el.grade.innerHTML = '';
      el.grade.hidden = true;
      el.paginacao.hidden = true;
      el.paginacao.innerHTML = '';
      renderVazio();
      return;
    }
    el.vazio.hidden = true;
    el.vazio.innerHTML = '';
    el.grade.hidden = false;
    var ate = Math.min(lista.length, estado.pagina * POR_PAGINA);
    el.grade.innerHTML = htmlCards(lista, 0, ate);
    renderPaginacao(ate, lista.length);
  }

  function carregarMais() {
    var de = estado.pagina * POR_PAGINA;
    if (de >= resultados.length) return;
    estado.pagina++;
    var ate = Math.min(resultados.length, estado.pagina * POR_PAGINA);
    el.grade.insertAdjacentHTML('beforeend', htmlCards(resultados, de, ate));
    renderPaginacao(ate, resultados.length);
    // leva o foco para o primeiro produto novo (teclado e leitor de tela)
    var cards = el.grade.querySelectorAll('.pcard');
    var novo = cards[de];
    var link = novo && novo.querySelector('.pcard__titulo a');
    if (link) link.focus();
  }

  /* ---------- estados vazios ---------- */

  function htmlPopulares() {
    var itens = Aura.categorias.map(function (c) {
      return { nome: c.nome, href: Aura.urlCatalogo({ categoria: c.slug }), n: Aura.contar(function (p) { return p.categoria === c.slug; }) };
    });
    if (Aura.selos['pronta-entrega']) {
      itens.push({ nome: 'Pronta entrega', href: Aura.urlCatalogo({ selo: 'pronta-entrega' }), n: Aura.contar(function (p) { return (p.selos || []).indexOf('pronta-entrega') > -1; }) });
    }
    return (
      '<div class="catalogo-vazio__populares">' +
        '<p>Os mais procurados</p>' +
        '<ul>' + itens.filter(function (i) { return i.n > 0; }).map(function (i) {
          return '<li><a class="catalogo-subs__link" href="' + esc(i.href) + '">' + esc(i.nome) + '<span>' + i.n + '</span></a></li>';
        }).join('') + '</ul>' +
      '</div>'
    );
  }

  function renderVazio() {
    var html;
    var semFavoritos = estado.favoritos && Aura.favoritos.lista().length === 0;

    if (semFavoritos) {
      html =
        '<div class="catalogo-vazio">' +
          '<span class="catalogo-vazio__icone catalogo-vazio__icone--fav">' + I('heart') + '</span>' +
          '<h3 class="catalogo-vazio__titulo">Sua lista de favoritos está vazia</h3>' +
          '<p>' + (Aura.armazenamentoOk
            ? 'Gostou de um produto? Toque no coração no canto da foto e ele fica guardado aqui neste aparelho. Assim você compara com calma e decide quando quiser.'
            : 'Gostou de um produto? Toque no coração no canto da foto. Seu navegador está bloqueando o armazenamento do site, então a lista só fica guardada enquanto esta página estiver aberta.') + '</p>' +
          '<div class="catalogo-vazio__acoes">' +
            '<a class="btn btn--dark" href="catalogo.html">Explorar o catálogo' + I('arrow') + '</a>' +
          '</div>' +
          htmlPopulares() +
        '</div>';
    } else if (estado.favoritos && !totalFiltros(estado)) {
      // tem favoritos salvos, só que nenhum nesta categoria ou nesta busca
      var tituloFav = estado.q ? 'Nenhum favorito com “' + estado.q + '”' : 'Nenhum favorito nesta categoria';
      var textoFav = estado.q
        ? 'Os produtos que você salvou não aparecem nessa busca. Veja a lista completa ou procure no catálogo todo.'
        : 'Os produtos que você salvou estão em outras categorias. Veja a lista completa para encontrar todos eles.';
      html =
        '<div class="catalogo-vazio">' +
          '<span class="catalogo-vazio__icone catalogo-vazio__icone--fav">' + I('heart') + '</span>' +
          '<h3 class="catalogo-vazio__titulo">' + esc(tituloFav) + '</h3>' +
          '<p>' + esc(textoFav) + '</p>' +
          '<div class="catalogo-vazio__acoes">' +
            '<a class="btn btn--dark" href="' + esc(urlDe(copiar(estado, { categoria: '', q: '' }))) + '">Ver todos os favoritos' + I('arrow') + '</a>' +
            '<a class="btn btn--outline" href="catalogo.html">Explorar o catálogo</a>' +
          '</div>' +
        '</div>';
    } else {
      var filtros = totalFiltros(estado);
      var titulo, texto, acao;
      if (filtros) {
        titulo = 'Nenhum produto com essa combinação de filtros';
        texto = 'Tire um ou outro filtro para ver mais opções. Se preferir, chama a gente no WhatsApp que a gente procura junto com você.';
        acao = '<button type="button" class="btn btn--dark" data-limpar-filtros>Limpar filtros</button>';
      } else if (estado.q) {
        titulo = 'Não encontramos nada para “' + estado.q + '”';
        texto = 'Confira se a palavra está certinha ou tente algo mais simples, como “janela”, “porta”, “box” ou uma medida como “120x100”.';
        acao = '<a class="btn btn--dark" href="catalogo.html">Ver todos os produtos</a>';
      } else {
        titulo = 'Ainda não temos produtos aqui';
        texto = 'Estamos preparando novidades para esta seção. Enquanto isso, dá uma olhada no restante do catálogo.';
        acao = '<a class="btn btn--dark" href="catalogo.html">Ver todos os produtos</a>';
      }
      var msgWhats = estado.q
        ? 'Oi! Procurei por "' + estado.q + '" no site e não encontrei. Vocês fabricam sob medida?'
        : 'Oi! Não encontrei no site o produto ou a medida que eu preciso. Vocês fabricam sob medida?';
      html =
        '<div class="catalogo-vazio">' +
          '<span class="catalogo-vazio__icone">' + I('search') + '</span>' +
          '<h3 class="catalogo-vazio__titulo">' + esc(titulo) + '</h3>' +
          '<p>' + esc(texto) + '</p>' +
          '<div class="catalogo-vazio__acoes">' + acao + '</div>' +
          htmlPopulares() +
          '<div class="catalogo-vazio__whats">' +
            '<div><strong>Não achou a medida? A gente fabrica sob medida.</strong>' +
            '<p>Manda a largura e a altura do seu vão no WhatsApp. Nossa equipe confere com você e passa o orçamento sem compromisso.</p></div>' +
            '<a class="btn btn--wa" href="' + esc(Aura.linkWhatsApp(msgWhats)) + '" target="_blank" rel="noopener">' + I('whatsapp') + 'Pedir orçamento</a>' +
          '</div>' +
        '</div>';
    }
    el.vazio.innerHTML = html;
    el.vazio.hidden = false;
  }

  /* ---------- menu do cabeçalho e campo de busca ---------- */

  function marcarNav() {
    var chave = null;
    var cat = estado.categoria;
    if (cat) {
      var s = Aura.subcategoria(cat);
      chave = s ? s.cat.slug : cat;
    } else if (estado.linha.length === 1 && estado.linha[0] === 'premium') {
      chave = 'premium';
    } else if (estado.selo.length === 1) {
      chave = estado.selo[0];
    }
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      var ativo = a.getAttribute('data-nav') === chave;
      a.classList.toggle('is-ativo', ativo);
      if (ativo) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    var campo = document.getElementById('busca-topo');
    if (campo && document.activeElement !== campo) campo.value = estado.q;
  }

  /* ---------- renderização geral ---------- */

  function renderizar() {
    // guarda o foco para devolver ao mesmo controle depois de redesenhar os filtros e atalhos
    var ativo = document.activeElement;
    var chaveFoco = ativo && ativo.getAttribute && (el.facetas.contains(ativo) || el.subs.contains(ativo)) ? ativo.getAttribute('data-chave') : null;

    var base = listaBase();
    resultados = ordenar(base.filter(function (p) { return passa(p, null); }));
    var ctx = contexto();

    // sem nada para filtrar (busca sem resultado ou favoritos vazio): esconde a lateral
    el.catalogo.classList.toggle('catalogo--sem-lateral', base.length === 0);

    renderTopo(ctx, base);
    renderFacetas(base);
    renderBarra();
    renderChips();
    renderGrade();
    marcarNav();

    if (chaveFoco) {
      var alvos = document.querySelectorAll('[data-facetas] [data-chave], [data-subs] [data-chave]');
      for (var i = 0; i < alvos.length; i++) {
        if (alvos[i].getAttribute('data-chave') === chaveFoco) { alvos[i].focus({ preventScroll: true }); break; }
      }
    }
  }

  function rolarParaResultados() {
    var alvo = el.catalogo;
    if (!alvo) return;
    var topo = alvo.getBoundingClientRect().top;
    var header = document.querySelector('.header');
    var folga = (header ? header.getBoundingClientRect().height : 0) + 16;
    if (topo < folga) {
      window.scrollTo({ top: window.pageYOffset + topo - folga, behavior: 'auto' });
    }
  }

  function aplicar(modo) {
    estado.pagina = 1;
    escreverUrl(modo);
    renderizar();
    if (!gavetaAberta()) rolarParaResultados();
  }

  function alternarValor(chave, valor, marcado) {
    var l = estado[chave];
    var i = l.indexOf(valor);
    if (marcado && i === -1) l.push(valor);
    if (!marcado && i > -1) l.splice(i, 1);
  }

  function limparFiltros() {
    CHAVES_FACETA.forEach(function (k) { estado[k] = []; });
    aplicar('replace');
  }

  function irParaCategoria(slug) {
    if (estado.categoria === slug) return;
    estado.categoria = slug;
    aplicar('push');
  }

  /* ---------- gaveta de filtros no celular ---------- */

  var mq = window.matchMedia ? window.matchMedia('(max-width: 900px)') : { matches: false };

  function gavetaAberta() {
    return el.drawer && el.drawer.classList.contains('is-aberto');
  }

  function ajustarLayout() {
    if (!el.drawer || !el.painel) return;
    if (mq.matches) {
      el.painel.setAttribute('role', 'dialog');
      el.painel.setAttribute('aria-modal', 'true');
      if (!gavetaAberta()) el.drawer.setAttribute('aria-hidden', 'true');
    } else {
      if (gavetaAberta()) Aura.fecharDrawers();
      el.painel.removeAttribute('role');
      el.painel.removeAttribute('aria-modal');
      el.drawer.removeAttribute('aria-hidden');
    }
  }

  if (mq.addEventListener) mq.addEventListener('change', ajustarLayout);
  else if (mq.addListener) mq.addListener(ajustarLayout);

  // mantém o aria-expanded do botão "Filtrar" em dia, inclusive quando fecha com Esc ou clicando fora
  if (el.drawer && window.MutationObserver) {
    new MutationObserver(function () {
      if (el.filtrar) el.filtrar.setAttribute('aria-expanded', String(gavetaAberta()));
    }).observe(el.drawer, { attributes: true, attributeFilter: ['class'] });
  }

  /* ---------- eventos ---------- */

  el.facetas.addEventListener('change', function (e) {
    var inp = e.target.closest('.faceta__check');
    if (!inp) return;
    var chave = inp.getAttribute('name');
    if (CHAVES_FACETA.indexOf(chave) === -1) return;
    alternarValor(chave, inp.value, inp.checked);
    aplicar('replace');
  });

  // lembra quais grupos a pessoa abriu ou fechou (o evento toggle não borbulha)
  el.facetas.addEventListener('toggle', function (e) {
    var d = e.target;
    if (d && d.matches && d.matches('details[data-faceta]')) abertos[d.getAttribute('data-faceta')] = d.open;
  }, true);

  document.addEventListener('click', function (e) {
    var t = e.target;
    var alvo;

    // troca de categoria sem recarregar (clique normal; com Ctrl ou botão do meio abre em nova aba)
    if ((alvo = t.closest('[data-cat]')) && (el.facetas.contains(alvo) || el.subs.contains(alvo))) {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      irParaCategoria(alvo.getAttribute('data-cat') || '');
      return;
    }

    if ((alvo = t.closest('[data-tirar]'))) {
      var id = alvo.getAttribute('data-tirar');
      var partes = id.split(':');
      var chave = partes.shift();
      var valor = partes.join(':');
      if (chave === 'q') estado.q = '';
      else if (CHAVES_FACETA.indexOf(chave) > -1) alternarValor(chave, valor, false);
      aplicar('replace');
      if (el.contagem) el.contagem.focus({ preventScroll: true });
      return;
    }

    if ((alvo = t.closest('[data-limpar-filtros]'))) {
      var naGaveta = gavetaAberta() && el.drawer.contains(alvo);
      limparFiltros();
      if (naGaveta) {
        // o "Limpar" fica desativado depois de limpar: o foco vai para o vizinho "Ver produtos", dentro da gaveta
        var destino = el.drawer.querySelector('[data-ver-produtos]');
        if (destino) destino.focus({ preventScroll: true });
      } else if (el.contagem) {
        el.contagem.focus({ preventScroll: true });
      }
      return;
    }

    if ((alvo = t.closest('[data-carregar-mais]'))) {
      carregarMais();
      return;
    }

    if ((alvo = t.closest('[data-abrir-filtros]'))) {
      e.preventDefault();
      Aura.abrirDrawer('filtros');
      return;
    }

    // "Ver N produtos": o ui.js fecha a gaveta (data-fechar-drawer); aqui só leva até a lista
    if ((alvo = t.closest('[data-ver-produtos]'))) {
      setTimeout(rolarParaResultados, 0);
    }
  });

  el.ordem.addEventListener('change', function () {
    estado.ordem = el.ordem.value;
    aplicar('replace');
  });

  window.addEventListener('popstate', function () {
    estado = lerUrl();
    renderizar();
  });

  // na lista de favoritos, tirar o coração tira o produto da tela
  window.addEventListener('aura:favoritos', function () {
    if (!estado.favoritos) return;
    var focoNaGrade = el.grade.contains(document.activeElement);
    renderizar();
    if (focoNaGrade && el.contagem) el.contagem.focus({ preventScroll: true });
  });

  // o card de desconto por volume acompanha o carrinho
  window.addEventListener('aura:carrinho', function () {
    var s = el.grade.querySelector('[data-promo-status]');
    if (s) s.innerHTML = statusPromo();
  });

  /* ---------- início ---------- */

  estado = lerUrl();
  // normaliza a URL (remove valores inválidos) sem criar nova entrada no histórico
  if (window.location.search) escreverUrl('replace');
  ajustarLayout();
  renderizar();
})();
