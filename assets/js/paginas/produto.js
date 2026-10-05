/*
  PÁGINA DE PRODUTO (produto.html?p=slug, opcional &medida=120x100)
  Galeria, escolha de medida e opções, preço na hora, carrinho, compra pelo WhatsApp,
  dica do desconto por volume, frete por CEP, abas de detalhes, carrosséis,
  barra de compra fixa no celular e dados estruturados para o Google.
  Tudo vem de assets/js/produtos.js e das regras de assets/js/config.js.
*/
(function () {
  'use strict';

  var Aura = window.Aura;
  if (!Aura || !Aura.config) return;

  var C = Aura.config;
  var esc = Aura.esc;
  var I = Aura.icon;

  var raiz = document.querySelector('[data-pdp]');
  if (!raiz) return;

  /* ---------- constantes de texto ---------- */

  // prazos e regra de medida vêm da configuração (core.js lê de config.js)
  var PRAZO_PRONTA = semPonto(Aura.prazoProntaEntrega);
  var PRAZO_ENCOMENDA = semPonto(Aura.prazoSobEncomenda);
  var REGRA_MEDIDA = String(Aura.regraMedida || '').trim();
  // ordem sugerida das fotos em produtos.js
  var ROTULOS_FOTOS = ['Foto do produto', 'Foto instalada', 'Desenho com as medidas', 'Detalhe do acabamento'];

  var REDUZIR = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var KG = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 });
  var POR_PRODUTO = !!(C.descontoVolume && C.descontoVolume.contarPor === 'produtos');

  /* ---------- utilidades ---------- */

  function toArray(lista) {
    return Array.prototype.slice.call(lista || []);
  }

  function semPonto(s) {
    return String(s || '').trim().replace(/[.!]+$/, '');
  }

  function unidades(n) {
    return n + ' ' + Aura.plural(n, 'unidade', 'unidades');
  }

  function itensVolume(n) {
    return n + ' ' + (POR_PRODUTO ? Aura.plural(n, 'produto diferente', 'produtos diferentes') : Aura.plural(n, 'item', 'itens'));
  }

  function kg(v) {
    return KG.format(v) + ' kg';
  }

  function chaveMedida(m) {
    return m.largura + 'x' + m.altura;
  }

  function rolar(el, bloco) {
    if (!el || !el.scrollIntoView) return;
    try {
      el.scrollIntoView({ behavior: REDUZIR ? 'auto' : 'smooth', block: bloco || 'center' });
    } catch (e) {
      el.scrollIntoView();
    }
  }

  function focar(el) {
    if (!el) return;
    try {
      el.focus({ preventScroll: true });
    } catch (e) {
      el.focus();
    }
  }

  function urlAbsoluta(rel) {
    if (/^https?:/.test(window.location.protocol)) {
      try {
        return new URL(rel, window.location.href).href;
      } catch (e) { /* segue para o domínio da configuração */ }
    }
    return String(C.empresa.site || '').replace(/\/$/, '') + '/' + rel;
  }

  function resumir(texto, max) {
    texto = String(texto || '').replace(/\s+/g, ' ').trim();
    if (texto.length <= max) return texto;
    var corte = texto.slice(0, max);
    var espaco = corte.lastIndexOf(' ');
    return (espaco > 60 ? corte.slice(0, espaco) : corte).replace(/[,.;:]$/, '') + '…';
  }

  function meta(seletor, atributos, valor) {
    var el = document.head.querySelector(seletor);
    if (!el) {
      el = document.createElement('meta');
      Object.keys(atributos).forEach(function (k) { el.setAttribute(k, atributos[k]); });
      document.head.appendChild(el);
    }
    el.setAttribute('content', valor);
  }

  function jsonLd(obj) {
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  }

  function iconeCategoria(slug) {
    if (slug === 'portas') return 'door';
    if (slug === 'box-para-banheiro') return 'shower';
    return 'window';
  }

  function htmlCarrossel(id, eyebrow, titulo, lista, cinza, descricao) {
    if (!lista || !lista.length) return '';
    return (
      '<section class="secao' + (cinza ? ' secao--cinza' : '') + ' pdp-vitrine" aria-labelledby="' + id + '">' +
        '<div class="container carrossel" data-carrossel>' +
          '<div class="secao__cabeca">' +
            '<div>' +
              '<span class="eyebrow"><i class="tz"></i>' + esc(eyebrow) + '</span>' +
              '<h2 id="' + id + '">' + esc(titulo) + '</h2>' +
              (descricao ? '<p>' + esc(descricao) + '</p>' : '') +
            '</div>' +
            '<div class="carrossel__setas">' +
              '<button type="button" class="carrossel__seta" data-carrossel-ant aria-label="Produtos anteriores">' + I('left') + '</button>' +
              '<button type="button" class="carrossel__seta" data-carrossel-prox aria-label="Próximos produtos">' + I('right') + '</button>' +
            '</div>' +
          '</div>' +
          '<div class="carrossel__trilho">' + lista.map(Aura.cardProduto).join('') + '</div>' +
        '</div>' +
      '</section>'
    );
  }

  /* ---------- produto do endereço ---------- */

  var slug = Aura.param('p');
  var p = slug ? Aura.porSlug(slug) || Aura.porId(slug) : null;

  if (!p || !p.medidas || !p.medidas.length) {
    naoEncontrado(slug);
    return;
  }

  var irmaos = Aura.irmaos(p);
  var opcoes = (p.opcoes || []).filter(function (o) { return o && o.nome && o.valores && o.valores.length; });
  var precoMin = Aura.precoMin(p);
  var precoMax = Aura.precoMax(p);
  var cat = Aura.categoria(p.categoria);
  var subInfo = Aura.subcategoria(p.subcategoria);
  var sub = subInfo ? subInfo.sub : null;
  var nFotos = Math.max(ROTULOS_FOTOS.length, (p.imagens || []).length);
  // garantia oficial (config.garantia, por linha)
  var GARANTIA = typeof Aura.garantiaDe === 'function' ? Aura.garantiaDe(p) : ((p.specs && p.specs.Garantia) || '');

  // adicionada: a última escolha que foi para o carrinho ({ chave, qtd }), para não contar em dobro
  var estado = { medida: null, opcoes: {}, qtd: 1, foto: 0, cep: '', adicionada: null };

  // medida pedida no endereço (&medida=LxA)
  var medidaUrl = String(Aura.param('medida') || '').toLowerCase().replace(/\s/g, '');
  p.medidas.forEach(function (m) { if (chaveMedida(m) === medidaUrl) estado.medida = m; });
  // se só existe uma escolha possível, ela já vem marcada
  if (!estado.medida && p.medidas.length === 1) estado.medida = p.medidas[0];
  opcoes.forEach(function (o) { if (o.valores.length === 1) estado.opcoes[o.nome] = o.valores[0]; });

  function rotuloFoto(i) {
    return ROTULOS_FOTOS[i] || 'Foto ' + (i + 1);
  }

  function opcoesEscolhidas() {
    var o = {};
    opcoes.forEach(function (op) { if (estado.opcoes[op.nome]) o[op.nome] = estado.opcoes[op.nome]; });
    return o;
  }

  // mesma chave que o carrinho usa em core.js (para saber se o item já está lá)
  function chaveCarrinho() {
    if (!estado.medida) return '';
    var o = opcoesEscolhidas();
    var txt = Object.keys(o).sort().map(function (k) { return k + ':' + o[k]; }).join(';');
    return p.id + '|' + chaveMedida(estado.medida) + '|' + txt;
  }

  function msgWhats(pergunta) {
    return 'Oi! ' + pergunta + '\n*' + p.nome + '*\nCódigo: ' + p.id + '\n\n' + Aura.linkAbsoluto(p);
  }

  // troca a garantia escrita nos dados do produto pela garantia oficial da configuração
  function comGarantiaOficial(texto) {
    return GARANTIA ? String(texto).replace(/^Garantia de .+? contra/i, 'Garantia de ' + GARANTIA + ' contra') : texto;
  }

  /* ---------- contas (mesmas regras de Aura.carrinho.resumo) ---------- */

  // total desta escolha sozinha, com o desconto por volume que ela mesma atinge.
  // É o valor da compra direta pelo WhatsApp e o que o carrinho cobraria se ela fosse o único item.
  function totalSelecao(preco, qtd) {
    var subtotal = Aura.r2(preco * qtd);
    var dv = Aura.descontoVolume(POR_PRODUTO ? 1 : qtd);
    var desconto = Aura.r2(subtotal * dv.percentual / 100);
    return { subtotal: subtotal, desconto: desconto, total: Aura.r2(subtotal - desconto), volume: dv };
  }

  // a escolha da tela já está no carrinho (acabou de ser adicionada e nada mudou desde então)
  function jaAdicionada(r) {
    var a = estado.adicionada;
    if (!a || !estado.medida || a.chave !== chaveCarrinho() || a.qtd !== estado.qtd) return false;
    return r.linhas.some(function (l) { return l.item.key === a.chave && l.item.qtd >= a.qtd; });
  }

  // como fica o pedido: o carrinho de agora somado a esta escolha (sem contar duas vezes o que já foi adicionado)
  function projecao() {
    var r = Aura.carrinho.resumo();
    var chave = chaveCarrinho();
    var linhaNoCarrinho = !!chave && r.linhas.some(function (l) { return l.item.key === chave; });
    var ja = jaAdicionada(r);
    var unit = estado.medida ? estado.medida.preco : precoMin;
    var qtdExtra = ja ? 0 : estado.qtd;
    var contagem = POR_PRODUTO ? r.distintos + (linhaNoCarrinho ? 0 : 1) : r.unidades + qtdExtra;
    var subtotal = Aura.r2(r.subtotal + Aura.r2(unit * qtdExtra));
    var dv = Aura.descontoVolume(contagem);
    var desconto = Aura.r2(subtotal * dv.percentual / 100);
    return {
      carrinho: r,
      jaAdicionada: ja,
      contagem: contagem,
      subtotal: subtotal,
      volume: dv,
      desconto: desconto,
      total: Aura.r2(subtotal - desconto),
    };
  }

  // mensagem do "Comprar pelo WhatsApp": resumo completo desta escolha, com o que ainda falta escolher
  function msgCompra() {
    var m = estado.medida;
    var q = estado.qtd;
    var escolhidas = opcoesEscolhidas();
    var L = ['Oi! Quero comprar este produto:', '*' + p.nome + '*', 'Código: ' + p.id];
    L.push('Medida: ' + (m ? Aura.rotuloMedida(m) : 'ainda não escolhi, pode me ajudar?'));
    opcoes.forEach(function (o) { L.push(o.nome + ': ' + (escolhidas[o.nome] || 'ainda não escolhi')); });
    if (m) {
      var t = totalSelecao(m.preco, q);
      L.push('Quantidade: ' + q + (q > 1 ? ' (' + Aura.brl(m.preco) + ' cada)' : ''));
      if (t.desconto > 0) {
        L.push('Subtotal: ' + Aura.brl(t.subtotal));
        L.push('Desconto por volume (' + t.volume.percentual + '%): ' + Aura.brl(t.desconto) + ' a menos');
      }
      L.push('Valor: ' + Aura.brl(t.total) + (Aura.pixPercentual ? ' (ou ' + Aura.brl(Aura.precoPix(t.total)) + ' no Pix)' : ''));
      if (!(m.estoque > 0)) L.push('Sob encomenda');
    } else if (q > 1) {
      L.push('Quantidade: ' + q);
    }
    L.push('');
    L.push(Aura.linkAbsoluto(p));
    return L.join('\n');
  }

  /* ---------- HTML: topo ---------- */

  function htmlMigalhas() {
    var itens = ['<li><a href="index.html">Início</a></li>'];
    if (cat) itens.push('<li><a href="' + esc(Aura.urlCatalogo({ categoria: cat.slug })) + '">' + esc(cat.nome) + '</a></li>');
    if (sub) itens.push('<li><a href="' + esc(Aura.urlCatalogo({ categoria: sub.slug })) + '">' + esc(sub.nome) + '</a></li>');
    itens.push('<li><span aria-current="page">' + esc(p.nome) + '</span></li>');
    return '<nav class="migalhas pdp-migalhas" aria-label="Você está em"><ol>' + itens.join('') + '</ol></nav>';
  }

  function htmlGaleria() {
    var fav = Aura.favoritos.tem(p.id);
    var minis = '';
    for (var i = 0; i < nFotos; i++) {
      minis +=
        '<li><button type="button" class="galeria__mini" data-foto="' + i + '"' + (i === 0 ? ' aria-current="true"' : '') +
          ' aria-label="Ver ' + esc(rotuloFoto(i).toLowerCase()) + '">' +
          Aura.imagemProduto(p, i, '1/1', rotuloFoto(i)) +
        '</button></li>';
    }
    return (
      '<section class="pdp__galeria galeria" aria-label="Fotos do produto">' +
        '<div class="galeria__palco">' +
          '<div class="galeria__principal" data-pdp-foto>' + Aura.imagemProduto(p, 0, '1/1', rotuloFoto(0)) + '</div>' +
          '<button type="button" class="galeria__fav' + (fav ? ' is-ativo' : '') + '" data-fav="' + esc(p.id) + '" aria-pressed="' + fav + '" aria-label="Salvar nos favoritos">' + I('heart') + '</button>' +
        '</div>' +
        '<ul class="galeria__minis" aria-label="Escolha a foto">' + minis + '</ul>' +
      '</section>'
    );
  }

  function htmlFatos() {
    var f = [];
    if (p.vidro) f.push(['sparkle', p.vidro]);
    if (p.abertura) f.push([iconeCategoria(p.categoria), p.abertura + (p.folhas ? ', ' + p.folhas + ' ' + Aura.plural(p.folhas, 'folha', 'folhas') : '')]);
    if (p.linha && Aura.linhas[p.linha] && Aura.linhas[p.linha].perfil) f.push(['ruler', Aura.linhas[p.linha].perfil]);
    if (!f.length) return '';
    return '<ul class="pdp-fatos" aria-label="Resumo do produto">' + f.map(function (x) {
      return '<li>' + I(x[0]) + '<span>' + esc(x[1]) + '</span></li>';
    }).join('') + '</ul>';
  }

  function htmlVariantes() {
    if (irmaos.length < 2) return '';
    return (
      '<div class="pdp-bloco">' +
        '<div class="pdp-bloco__cabeca"><p class="pdp-bloco__titulo" id="pdp-rotulo-variantes">Outras opções deste modelo</p></div>' +
        '<ul class="pdp-variantes" aria-labelledby="pdp-rotulo-variantes">' + irmaos.map(function (x) {
          var cor = Aura.cores[x.cor] || { hex: '#cccccc' };
          var atual = x.id === p.id;
          return (
            '<li><a class="pdp-variante' + (atual ? ' is-atual' : '') + '" href="' + esc(Aura.urlProduto(x)) + '" data-variante="' + esc(x.id) + '"' + (atual ? ' aria-current="page"' : '') + '>' +
              '<span class="swatch' + (x.grade ? ' swatch--grade' : '') + '" style="--cor:' + esc(cor.hex) + '" aria-hidden="true"></span>' +
              '<span>' + esc(Aura.rotuloOpcao(x)) + '</span>' +
              (atual ? I('check', 'pdp-variante__check') : '') +
            '</a></li>'
          );
        }).join('') + '</ul>' +
      '</div>'
    );
  }

  function htmlSeletorMedida() {
    var temRotulo = p.medidas.some(function (m) { return m.rotulo; });
    return (
      '<div class="pdp-bloco" id="pdp-medida" data-pdp-bloco-medida>' +
        '<div class="pdp-bloco__cabeca">' +
          '<p class="pdp-bloco__titulo" id="pdp-rotulo-medida">' + (temRotulo ? 'Escolha a medida' : 'Escolha a medida (largura x altura)') + '</p>' +
          '<a class="pdp-link-ajuda" href="ajuda.html#como-medir">' + I('ruler') + 'Como medir?</a>' +
        '</div>' +
        '<div class="pills pdp-medidas' + (temRotulo ? ' pdp-medidas--longas' : '') + '" role="radiogroup" aria-labelledby="pdp-rotulo-medida" aria-required="true" aria-describedby="pdp-erro-medida" data-grupo="medida">' +
          p.medidas.map(function (m, i) {
            return (
              '<button type="button" class="pill pdp-pill" role="radio" aria-checked="false" tabindex="-1" data-valor="' + i + '">' +
                '<span class="pdp-pill__medida">' + esc(Aura.rotuloMedida(m)) + '</span>' +
                '<small>' + Aura.brl(m.preco) + '</small>' +
                (m.estoque > 0 ? '' : '<small class="pdp-pill__enc">sob encomenda</small>') +
              '</button>'
            );
          }).join('') +
        '</div>' +
        '<p class="campo__erro pdp-erro" id="pdp-erro-medida" role="alert" hidden></p>' +
        (REGRA_MEDIDA ? '<p class="pdp-bloco__nota pdp-regra-medida">' + esc(REGRA_MEDIDA) + '</p>' : '') +
        '<p class="pdp-bloco__nota">Não achou a sua medida? <a href="' + esc(Aura.linkWhatsApp(msgWhats('Não achei a minha medida neste produto, pode me ajudar?'))) + '" target="_blank" rel="noopener">Chama a gente no WhatsApp</a> que a gente te ajuda a encontrar a melhor opção.</p>' +
      '</div>'
    );
  }

  function htmlSeletoresOpcoes() {
    return opcoes.map(function (o, i) {
      var id = 'pdp-opcao-' + i;
      return (
        '<div class="pdp-bloco" data-pdp-bloco-opcao="' + i + '">' +
          '<div class="pdp-bloco__cabeca"><p class="pdp-bloco__titulo" id="' + id + '-rotulo">' + esc(o.nome) + '</p></div>' +
          (o.ajuda ? '<p class="campo__ajuda pdp-bloco__ajuda" id="' + id + '-ajuda">' + I('info') + '<span>' + esc(o.ajuda) + '</span></p>' : '') +
          '<div class="pills pdp-opcoes" role="radiogroup" aria-labelledby="' + id + '-rotulo" aria-required="true" aria-describedby="' + (o.ajuda ? id + '-ajuda ' : '') + id + '-erro" data-grupo="opcao" data-opcao="' + i + '">' +
            o.valores.map(function (v) {
              return '<button type="button" class="pill" role="radio" aria-checked="false" tabindex="-1" data-valor="' + esc(v) + '">' + esc(v) + '</button>';
            }).join('') +
          '</div>' +
          '<p class="campo__erro pdp-erro" id="' + id + '-erro" role="alert" hidden></p>' +
        '</div>'
      );
    }).join('');
  }

  function htmlCompra() {
    return (
      '<div class="pdp-compra">' +
        '<div class="pdp-compra__linha" data-pdp-compra-linha>' +
          '<label class="sr-only" for="pdp-qtd">Quantidade</label>' +
          '<div class="stepper pdp-stepper">' +
            '<button type="button" data-pdp-qtd="menos" aria-label="Diminuir quantidade" aria-controls="pdp-qtd">' + I('minus') + '</button>' +
            '<input id="pdp-qtd" type="number" inputmode="numeric" min="1" max="999" step="1" value="1" data-pdp-qtd-input>' +
            '<button type="button" data-pdp-qtd="mais" aria-label="Aumentar quantidade" aria-controls="pdp-qtd">' + I('plus') + '</button>' +
          '</div>' +
          '<button type="button" class="btn btn--accent btn--lg pdp-compra__add" data-pdp-adicionar>' + I('bag') + '<span>Adicionar ao carrinho</span></button>' +
        '</div>' +
        '<a class="btn btn--wa btn--lg btn--block" data-pdp-wa href="' + esc(Aura.linkWhatsApp(msgCompra())) + '" target="_blank" rel="noopener">' + I('whatsapp') + 'Comprar pelo WhatsApp</a>' +
        '<p class="pdp-compra__nota">' + I('lock') + '<span>Sem cadastro e sem complicação. Você confirma frete e pagamento com a nossa equipe no WhatsApp.</span></p>' +
        (Aura.armazenamentoOk === false
          ? '<p class="pdp-compra__nota pdp-compra__nota--aviso">' + I('info') + '<span>Seu navegador está bloqueando os dados salvos do site. O carrinho funciona enquanto esta página estiver aberta, então finalize o pedido por aqui ou pelo WhatsApp.</span></p>'
          : '') +
      '</div>'
    );
  }

  function htmlFrete() {
    return (
      '<div class="pdp-frete">' +
        '<form class="pdp-frete__form" data-pdp-frete novalidate>' +
          '<div class="pdp-frete__cabeca">' +
            '<label class="pdp-frete__rotulo" for="pdp-cep">' + I('truck') + 'Calcule o frete e o prazo</label>' +
            '<a class="pdp-frete__nao-sei" href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank" rel="noopener">Não sei meu CEP</a>' +
          '</div>' +
          '<div class="pdp-frete__campos">' +
            '<input id="pdp-cep" class="input" type="text" inputmode="numeric" autocomplete="postal-code" placeholder="00000-000" aria-describedby="pdp-cep-erro">' +
            '<button type="submit" class="btn btn--dark">Calcular</button>' +
          '</div>' +
          '<p class="campo__erro" id="pdp-cep-erro" role="alert" hidden></p>' +
        '</form>' +
        '<div class="pdp-frete__resultado" data-pdp-frete-res aria-live="polite"></div>' +
      '</div>'
    );
  }

  function htmlConfianca() {
    var itens = [
      ['shield', 'Garantia de fábrica', esc(GARANTIA ? GARANTIA + ' contra defeitos de fabricação' : 'Contra defeitos de fabricação')],
      ['truck', 'Entrega com seguro', 'Com rastreio até a sua obra'],
      ['lock', 'Compra segura', 'Site protegido e atendimento humano'],
      ['refresh', 'Troca facilitada', '<a href="ajuda.html#trocas-e-devolucoes">Veja como funciona</a>'],
    ];
    return '<ul class="pdp-confianca" aria-label="Por que comprar com a Aura">' + itens.map(function (x) {
      return '<li>' + I(x[0]) + '<span><strong>' + x[1] + '</strong>' + x[2] + '</span></li>';
    }).join('') + '</ul>';
  }

  function htmlInfo() {
    return (
      '<div class="pdp__info pdp-info">' +
        '<div class="pdp-info__topo">' +
          Aura.selosHtml(p) +
          '<p class="pdp-info__meta">' + esc(Aura.nomeLinha(p)) + ' · Código ' + esc(p.id) + '</p>' +
          '<h1 class="pdp-info__titulo">' + esc(p.nome) + '</h1>' +
          (p.descricao && p.descricao[0] ? '<p class="pdp-info__pitch">' + esc(p.descricao[0]) + '</p>' : '') +
          htmlFatos() +
        '</div>' +
        htmlVariantes() +
        htmlSeletorMedida() +
        htmlSeletoresOpcoes() +
        '<div class="pdp-preco" data-pdp-preco aria-live="polite"></div>' +
        htmlCompra() +
        (Aura.volumeAtivo ? '<div class="pdp-volume" data-pdp-volume></div>' : '') +
        htmlFrete() +
        htmlConfianca() +
      '</div>'
    );
  }

  /* ---------- HTML: abas de detalhes ---------- */

  function textoPeso() {
    if (estado.medida && estado.medida.pesoKg) return kg(estado.medida.pesoKg) + ' na medida ' + Aura.rotuloMedida(estado.medida);
    var pesos = p.medidas.map(function (m) { return m.pesoKg; }).filter(Boolean);
    if (!pesos.length) return 'Consulte a nossa equipe';
    var menor = Math.min.apply(null, pesos);
    var maior = Math.max.apply(null, pesos);
    return menor === maior ? kg(menor) : 'De ' + kg(menor) + ' a ' + kg(maior) + ', conforme a medida';
  }

  function htmlAbaSobre() {
    var destaques = (p.destaques || []).map(comGarantiaOficial);
    return (
      '<div class="pdp-sobre">' +
        '<div class="texto pdp-sobre__texto">' + (p.descricao || []).map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') + '</div>' +
        (destaques.length
          ? '<aside class="pdp-cartao" aria-labelledby="pdp-destaques-titulo">' +
              '<h3 id="pdp-destaques-titulo">Por que escolher este modelo</h3>' +
              '<ul class="lista-check">' + destaques.map(function (d) { return '<li>' + I('check') + '<span>' + esc(d) + '</span></li>'; }).join('') + '</ul>' +
            '</aside>'
          : '') +
      '</div>'
    );
  }

  function htmlAbaSpecs() {
    var linhas = Object.keys(p.specs || {}).map(function (k) {
      var valor = k === 'Garantia' && GARANTIA ? GARANTIA : p.specs[k];
      return '<tr><th scope="row">' + esc(k) + '</th><td>' + esc(valor) + '</td></tr>';
    }).join('');
    linhas += '<tr><th scope="row">Peso aproximado</th><td data-pdp-peso>' + esc(textoPeso()) + '</td></tr>';
    return (
      '<div class="pdp-specs">' +
        '<table class="tabela-specs"><caption class="sr-only">Especificações técnicas</caption><tbody>' + linhas + '</tbody></table>' +
        '<aside class="pdp-cartao pdp-cartao--ajuda" aria-labelledby="pdp-ajuda-tecnica">' +
          '<span class="pdp-cartao__icone">' + I('chat') + '</span>' +
          '<h3 id="pdp-ajuda-tecnica">Precisa de outro detalhe técnico?</h3>' +
          '<p>Chama a gente no WhatsApp. Um especialista responde com as informações que você, o seu arquiteto ou o seu serralheiro precisam.</p>' +
          '<a class="btn btn--wa" href="' + esc(Aura.linkWhatsApp(msgWhats('Tenho uma dúvida técnica sobre este produto:'))) + '" target="_blank" rel="noopener">' + I('whatsapp') + 'Perguntar no WhatsApp</a>' +
        '</aside>' +
      '</div>'
    );
  }

  function htmlAbaMedidas() {
    var comPix = Aura.pixPercentual > 0;
    var comParcela = Aura.maxParcelas > 1;
    var temRotulo = p.medidas.some(function (m) { return m.rotulo; });
    var cabeca =
      '<tr role="row">' +
        '<th scope="col" role="columnheader">Medida</th>' +
        '<th scope="col" role="columnheader">Preço</th>' +
        (comPix ? '<th scope="col" role="columnheader">No Pix</th>' : '') +
        (comParcela ? '<th scope="col" role="columnheader">Parcelado</th>' : '') +
        '<th scope="col" role="columnheader">Disponibilidade</th>' +
        '<th scope="col" role="columnheader"><span class="sr-only">Escolher</span></th>' +
      '</tr>';
    var corpo = p.medidas.map(function (m, i) {
      var ok = m.estoque > 0;
      return (
        '<tr role="row" data-linha-medida="' + i + '">' +
          '<th scope="row" role="rowheader" data-rotulo="Medida">' + esc(Aura.rotuloMedida(m)) + '</th>' +
          '<td role="cell" data-rotulo="Preço"><strong>' + Aura.brl(m.preco) + '</strong></td>' +
          (comPix ? '<td role="cell" data-rotulo="No Pix" class="pdp-tabela__pix">' + Aura.brl(Aura.precoPix(m.preco)) + '</td>' : '') +
          (comParcela ? '<td role="cell" data-rotulo="Parcelado">' + Aura.maxParcelas + 'x de ' + Aura.brl(Aura.parcela(m.preco)) + '</td>' : '') +
          '<td role="cell" data-rotulo="Disponibilidade"><span class="pdp-tag pdp-tag--' + (ok ? 'ok' : 'enc') + '">' + (ok ? 'Em estoque' : 'Sob encomenda') + '</span></td>' +
          '<td role="cell" class="pdp-tabela__acao"><button type="button" class="btn btn--sm btn--outline" data-selecionar-medida="' + i + '">Selecionar</button></td>' +
        '</tr>'
      );
    }).join('');
    var notas = ['Preços por unidade. ' + (temRotulo ? 'Medidas de vão, em metros.' : 'Medidas de vão, em metros, largura x altura.')];
    if (comPix) notas.push('Pagando no Pix, você ganha ' + Aura.pixPercentual + '% de desconto.');
    if (Aura.volumeAtivo && Aura.primeiraFaixa) notas.push('Acima de ' + itensVolume(Aura.primeiraFaixa.acimaDe) + ' no pedido, entra mais ' + Aura.primeiraFaixa.percentual + '% de desconto automático.');
    return (
      '<div class="pdp-medidas-aba">' +
        '<table class="pdp-tabela" role="table"><caption class="sr-only">Medidas e preços</caption>' +
          '<thead role="rowgroup">' + cabeca + '</thead><tbody role="rowgroup">' + corpo + '</tbody>' +
        '</table>' +
        '<p class="pdp-nota">' + I('info') + '<span>' + esc(notas.join(' ')) + '</span></p>' +
      '</div>'
    );
  }

  function htmlAbaCaixa() {
    return (
      '<div class="pdp-caixa">' +
        '<div class="pdp-caixa__texto">' +
          '<h3>Chega tudo o que você precisa</h3>' +
          '<ul class="lista-tz">' + (p.naCaixa || []).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
          '<p class="pdp-nota">' + I('box') + '<span>Embalamos com proteção reforçada e enviamos com seguro. Confira a embalagem na hora da entrega.</span></p>' +
        '</div>' +
        '<div class="pdp-caixa__visual">' + Aura.mockup({ rotulo: 'Foto da embalagem e dos acessórios', ratio: '4/3', alt: 'Embalagem e acessórios do produto' }) + '</div>' +
      '</div>'
    );
  }

  function dicasInstalacao() {
    var regra = REGRA_MEDIDA ? ' ' + REGRA_MEDIDA : '';
    if (p.categoria === 'box-para-banheiro') {
      return [
        ['Meça o vão com calma', 'Largura em cima, no meio e embaixo, e a altura dos dois lados. Vale sempre a menor medida.' + regra],
        ['Confira prumo e nível', 'Paredes no prumo e piso no nível garantem que as folhas corram macio e vedem certinho.'],
        ['Perfis primeiro, vidros depois', 'Fixe os perfis com os parafusos e as buchas do kit e só então coloque os vidros e as roldanas.'],
        ['Vidro temperado não aceita corte', 'Depois de temperado, o vidro não pode ser cortado nem furado. Por isso a medida certa faz toda a diferença.'],
      ];
    }
    return [
      ['Meça o vão com calma', 'Largura e altura em três pontos, usando a menor medida.' + regra],
      ['Prumo, nível e esquadro', 'Posicione o batente e confira o prumo e o nível antes de fixar. É isso que faz a folha abrir e fechar macio.'],
      ['Fixe com o que vem na caixa', 'Use os parafusos e as buchas que acompanham o produto, sem forçar o perfil de alumínio.'],
      ['Vede o contorno', 'Finalize com silicone ou espuma de vedação no encontro com a parede, para não entrar água nem vento.'],
    ];
  }

  function htmlAbaInstalacao() {
    return (
      '<div class="pdp-instalacao">' +
        '<div class="pdp-instalacao__texto">' +
          '<h3>Instalação sem mistério</h3>' +
          '<p class="pdp-instalacao__lead">A peça chega pronta para qualquer serralheiro, pedreiro ou instalador de confiança. A instalação não está inclusa no preço, mas a gente tira as suas dúvidas pelo WhatsApp durante a obra.</p>' +
          '<ol class="medir__lista">' + dicasInstalacao().map(function (d) {
            return '<li><strong>' + esc(d[0]) + '</strong>' + esc(d[1]) + '</li>';
          }).join('') + '</ol>' +
          '<div class="pdp-instalacao__ctas">' +
            '<a class="link-seta" href="ajuda.html#instalacao">Guia completo de instalação' + I('arrow') + '</a>' +
            '<a class="btn btn--outline" href="' + esc(Aura.linkWhatsApp(msgWhats('Tenho uma dúvida sobre a instalação deste produto:'))) + '" target="_blank" rel="noopener">' + I('whatsapp', 'pdp-icone-wa') + 'Tirar dúvida da instalação</a>' +
          '</div>' +
        '</div>' +
        '<div class="pdp-instalacao__visual">' + Aura.imagemProduto(p, 2, '4/3', 'Desenho técnico com cotas') + '</div>' +
      '</div>'
    );
  }

  var ABAS = [
    { id: 'sobre', nome: 'Sobre o produto', html: htmlAbaSobre },
    { id: 'especificacoes', nome: 'Especificações técnicas', html: htmlAbaSpecs },
    { id: 'medidas', nome: 'Medidas e preços', html: htmlAbaMedidas },
    { id: 'caixa', nome: 'O que vem na caixa', html: htmlAbaCaixa },
    { id: 'instalacao', nome: 'Instalação', html: htmlAbaInstalacao },
  ];

  function htmlDetalhes() {
    return (
      '<section class="pdp-detalhes" id="detalhes" aria-labelledby="pdp-detalhes-titulo">' +
        '<div class="container">' +
          '<div class="pdp-detalhes__cabeca">' +
            '<span class="eyebrow"><i class="tz"></i>Ficha completa</span>' +
            '<h2 id="pdp-detalhes-titulo">Tudo o que você precisa saber antes de comprar.</h2>' +
          '</div>' +
          '<div class="abas pdp-abas" role="tablist" aria-label="Detalhes do produto">' +
            ABAS.map(function (a, i) {
              return '<button type="button" class="aba" role="tab" id="aba-' + a.id + '" aria-controls="painel-' + a.id + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" data-aba="' + a.id + '">' + esc(a.nome) + '</button>';
            }).join('') +
          '</div>' +
          ABAS.map(function (a, i) {
            return '<div class="pdp-painel" role="tabpanel" id="painel-' + a.id + '" aria-labelledby="aba-' + a.id + '" tabindex="0"' + (i ? ' hidden' : '') + '>' + a.html() + '</div>';
          }).join('') +
        '</div>' +
      '</section>'
    );
  }

  function htmlBarra() {
    return (
      '<div class="pdp-barra" data-pdp-barra role="region" aria-label="Compra rápida">' +
        '<div class="pdp-barra__info"><span data-barra-medida></span><strong data-barra-preco></strong></div>' +
        '<a class="btn btn--wa btn--quadrado" data-pdp-wa href="#" target="_blank" rel="noopener" aria-label="Comprar pelo WhatsApp">' + I('whatsapp') + '</a>' +
        '<button type="button" class="btn btn--accent pdp-barra__add" data-pdp-adicionar>' + I('bag') + 'Adicionar</button>' +
      '</div>'
    );
  }

  /* ---------- montagem ---------- */

  var outros = irmaos.filter(function (x) { return x.id !== p.id; });
  var relacionados = Aura.relacionados(p, 8);
  var f1 = Aura.volumeAtivo ? Aura.primeiraFaixa : null;

  raiz.innerHTML =
    '<div class="pdp">' +
      '<div class="container">' +
        htmlMigalhas() +
        '<div class="pdp__grid">' + htmlGaleria() + htmlInfo() + '</div>' +
      '</div>' +
    '</div>' +
    htmlDetalhes() +
    htmlCarrossel('pdp-irmaos-titulo', 'Mesmo modelo', 'Outras opções deste modelo', outros, true, 'A mesma peça, em outra cor ou acabamento. Escolha a que combina com a sua obra.') +
    htmlCarrossel('pdp-relacionados-titulo', 'Combina com a sua obra', 'Você também pode gostar', relacionados, !outros.length,
      f1 ? 'Vale lembrar: acima de ' + itensVolume(f1.acimaDe) + ' no pedido, você ganha ' + f1.percentual + '% de desconto em tudo.' : '') +
    htmlBarra();

  var grupoMedida = raiz.querySelector('[data-grupo="medida"]');
  var elPreco = raiz.querySelector('[data-pdp-preco]');
  var inputQtd = raiz.querySelector('[data-pdp-qtd-input]');

  /* ---------- seleção (medida e opções) ---------- */

  function marcarGrupo(grupo, valor) {
    var radios = toArray(grupo.querySelectorAll('[role="radio"]'));
    var algum = false;
    radios.forEach(function (r) {
      var sel = valor != null && r.getAttribute('data-valor') === String(valor);
      r.setAttribute('aria-checked', String(sel));
      r.tabIndex = sel ? 0 : -1;
      if (sel) algum = true;
    });
    if (!algum && radios[0]) radios[0].tabIndex = 0;
  }

  function erroDoGrupo(grupo) {
    var bloco = grupo.closest('.pdp-bloco');
    return { bloco: bloco, erro: bloco ? bloco.querySelector('.pdp-erro') : null };
  }

  function mostrarErro(grupo, msg) {
    var e = erroDoGrupo(grupo);
    if (e.bloco) e.bloco.classList.add('is-erro');
    grupo.setAttribute('aria-invalid', 'true');
    if (e.erro) {
      e.erro.hidden = false;
      e.erro.textContent = msg;
    }
  }

  function limparErro(grupo) {
    var e = erroDoGrupo(grupo);
    if (e.bloco) e.bloco.classList.remove('is-erro');
    grupo.removeAttribute('aria-invalid');
    if (e.erro) {
      e.erro.hidden = true;
      e.erro.textContent = '';
    }
  }

  function levarAte(grupo) {
    var alvo = grupo.querySelector('[aria-checked="true"]') || grupo.querySelector('[role="radio"]');
    focar(alvo);
    rolar(grupo.closest('.pdp-bloco') || grupo, 'center');
  }

  function selecionarMedida(i) {
    var m = p.medidas[i];
    if (!m) return;
    estado.medida = m;
    marcarGrupo(grupoMedida, i);
    limparErro(grupoMedida);
    atualizarUrl();
    atualizarDependentesDaMedida();
    atualizarCompra();
  }

  function escolher(radio) {
    var grupo = radio.closest('[role="radiogroup"]');
    if (!grupo) return;
    var tipo = grupo.getAttribute('data-grupo');
    if (tipo === 'medida') {
      selecionarMedida(parseInt(radio.getAttribute('data-valor'), 10));
    } else if (tipo === 'opcao') {
      var o = opcoes[parseInt(grupo.getAttribute('data-opcao'), 10)];
      if (!o) return;
      var valor = radio.getAttribute('data-valor');
      estado.opcoes[o.nome] = valor;
      marcarGrupo(grupo, valor);
      limparErro(grupo);
      atualizarCompra();
    }
  }

  function validar() {
    if (!estado.medida) {
      mostrarErro(grupoMedida, 'Escolha a medida para continuar.');
      levarAte(grupoMedida);
      return false;
    }
    for (var i = 0; i < opcoes.length; i++) {
      if (!estado.opcoes[opcoes[i].nome]) {
        var g = raiz.querySelector('[data-grupo="opcao"][data-opcao="' + i + '"]');
        if (g) {
          mostrarErro(g, 'Falta escolher: ' + opcoes[i].nome.toLowerCase() + '.');
          levarAte(g);
        }
        return false;
      }
    }
    return true;
  }

  function adicionar() {
    if (!validar()) return;
    var m = estado.medida;
    var q = estado.qtd;
    // marcada antes de adicionar: o evento aura:carrinho já redesenha a tela sem contar esta escolha duas vezes
    estado.adicionada = { chave: chaveCarrinho(), qtd: q };
    Aura.carrinho.adicionar(p.id, m.largura, m.altura, q, opcoesEscolhidas());
    if (Aura.armazenamentoOk === false) {
      Aura.toast(esc('Seu navegador está bloqueando os dados salvos do site. O produto fica no carrinho enquanto esta página estiver aberta, então finalize o pedido por aqui ou pelo WhatsApp.'), 'erro');
    }
    if (typeof Aura.abrirCarrinho === 'function') {
      // o carrinho lateral aberto já confirma a compra (um aviso por cima esconderia o botão de finalizar)
      Aura.abrirCarrinho();
    } else if (Aura.armazenamentoOk !== false) {
      Aura.toast(esc(q > 1 ? q + ' unidades adicionadas ao carrinho' : 'Produto adicionado ao carrinho'));
    }
  }

  function irParaSeletor() {
    var bloco = raiz.querySelector('[data-pdp-bloco-medida]');
    if (!bloco) return;
    focar(bloco.querySelector('[aria-checked="true"]') || bloco.querySelector('[role="radio"]'));
    rolar(bloco, 'center');
  }

  /* ---------- quantidade ---------- */

  function definirQtd(n, manterCampo) {
    n = Math.max(1, Math.min(999, parseInt(n, 10) || 1));
    estado.qtd = n;
    if (!manterCampo && inputQtd) inputQtd.value = n;
    atualizarCompra();
  }

  if (inputQtd) {
    inputQtd.addEventListener('input', function () {
      var v = parseInt(inputQtd.value, 10);
      if (v >= 1) definirQtd(v, true);
    });
    inputQtd.addEventListener('change', function () { definirQtd(inputQtd.value); });
  }

  /* ---------- preço, disponibilidade e ações ---------- */

  function htmlParcela(v) {
    return Aura.maxParcelas > 1 ? '<span class="pdp-preco__parcela">ou ' + Aura.maxParcelas + 'x de ' + Aura.brl(Aura.parcela(v)) + ' sem juros</span>' : '';
  }

  function htmlPix(v) {
    if (!Aura.pixPercentual) return '';
    return '<span class="pdp-preco__pix">' + I('pix') + '<span><strong>' + Aura.brl(Aura.precoPix(v)) + '</strong> no Pix, ' + Aura.pixPercentual + '% de desconto</span></span>';
  }

  function htmlDisponibilidade(m) {
    var envio = PRAZO_PRONTA ? ' Envio em ' + PRAZO_PRONTA + '.' : '';
    var emEstoque = 'Em estoque.' + envio;
    var encomenda = PRAZO_ENCOMENDA
      ? 'Sob encomenda. Conte com ' + PRAZO_ENCOMENDA + ', além do prazo de entrega.'
      : 'Sob encomenda. A nossa equipe confirma o prazo de fabricação no WhatsApp.';
    var ok;
    var txt;
    if (m) {
      ok = m.estoque > 0;
      txt = ok ? emEstoque : encomenda;
    } else {
      var comEstoque = p.medidas.filter(function (x) { return x.estoque > 0; }).length;
      var resto = p.medidas.length - comEstoque;
      if (resto === 0) {
        ok = true;
        txt = 'Em estoque em todas as medidas.' + envio;
      } else if (comEstoque === 0) {
        ok = false;
        txt = encomenda;
      } else {
        ok = true;
        txt = 'Em estoque em ' + comEstoque + ' de ' + p.medidas.length + ' medidas. ' +
          (resto === 1 ? 'A outra é feita sob encomenda.' : 'As outras são feitas sob encomenda.');
      }
    }
    return '<p class="pdp-disp pdp-disp--' + (ok ? 'ok' : 'enc') + '"><i aria-hidden="true"></i>' + esc(txt) + '</p>';
  }

  function renderPreco() {
    var m = estado.medida;
    var q = estado.qtd;
    var html;
    if (!m) {
      html =
        '<span class="pdp-preco__de">A partir de</span>' +
        '<strong class="pdp-preco__valor">' + Aura.brl(precoMin) + '</strong>' +
        htmlParcela(precoMin) +
        htmlPix(precoMin) +
        '<p class="pdp-preco__dica">' + I('info') + '<span>Escolha a medida para ver o preço exato.</span></p>';
    } else {
      // mesma conta do carrinho para esta escolha: desconto por volume incluído quando ela mesma passa da faixa
      var t = totalSelecao(m.preco, q);
      html =
        '<span class="pdp-preco__de">' + esc(Aura.rotuloMedida(m)) + (q > 1 ? ' · preço por unidade' : '') + '</span>' +
        '<strong class="pdp-preco__valor">' + Aura.brl(m.preco) + '</strong>' +
        htmlParcela(m.preco) +
        htmlPix(m.preco) +
        (q > 1
          ? '<div class="pdp-preco__total">' +
              '<span>Total de ' + unidades(q) +
                (t.desconto > 0 ? '<small class="pdp-preco__total-desc">com ' + t.volume.percentual + '% de desconto por volume</small>' : '') +
              '</span>' +
              '<span class="pdp-preco__total-valor">' +
                (t.desconto > 0 ? '<s class="pdp-preco__total-cheio"><span class="sr-only">De </span>' + Aura.brl(t.subtotal) + '</s>' : '') +
                '<strong>' + (t.desconto > 0 ? '<span class="sr-only">por </span>' : '') + Aura.brl(t.total) + '</strong>' +
                (Aura.pixPercentual ? '<small>' + Aura.brl(Aura.precoPix(t.total)) + ' no Pix</small>' : '') +
              '</span>' +
            '</div>'
          : '');
    }
    elPreco.innerHTML = html + htmlDisponibilidade(m);
  }

  function atualizarWhats() {
    var href = Aura.linkWhatsApp(msgCompra());
    toArray(raiz.querySelectorAll('[data-pdp-wa]')).forEach(function (a) { a.setAttribute('href', href); });
  }

  function atualizarBarra() {
    var bm = raiz.querySelector('[data-barra-medida]');
    var bp = raiz.querySelector('[data-barra-preco]');
    if (!bm || !bp) return;
    if (estado.medida) {
      bm.textContent = Aura.rotuloMedida(estado.medida) + (estado.qtd > 1 ? ' · ' + estado.qtd + ' un.' : '');
      bp.textContent = Aura.brl(totalSelecao(estado.medida.preco, estado.qtd).total);
    } else {
      bm.textContent = 'Escolha a medida';
      bp.innerHTML = '<small>a partir de</small> ' + Aura.brl(precoMin);
    }
  }

  function renderVolume(pr) {
    var el = raiz.querySelector('[data-pdp-volume]');
    if (!el || !Aura.volumeAtivo) return;
    pr = pr || projecao();
    var noCarrinho = pr.carrinho.contagem;
    var total = pr.contagem;
    var dv = pr.volume;
    var f1 = Aura.primeiraFaixa;
    var proxima = dv.proxima || (dv.percentual ? null : { faltam: f1.acimaDe + 1 - total, percentual: f1.percentual, acimaDe: f1.acimaDe });
    // esta escolha já está contada no carrinho (acabou de ser adicionada, ou a mesma linha já está lá)
    var jaContada = noCarrinho > 0 && total === noCarrinho;
    var inicio;
    if (jaContada) inicio = 'Seu carrinho tem <strong>' + itensVolume(noCarrinho) + '</strong>, contando este produto. ';
    else if (noCarrinho > 0) inicio = 'Seu carrinho já tem <strong>' + itensVolume(noCarrinho) + '</strong>. Se adicionar esta escolha, ';
    else inicio = 'Com esta escolha, ';
    var msg;
    if (dv.percentual) {
      msg = inicio + (jaContada
        ? 'O pedido já ganha <strong>' + dv.percentual + '% de desconto</strong> automático.'
        : 'o pedido chega a <strong>' + itensVolume(total) + '</strong> e ganha <strong>' + dv.percentual + '% de desconto</strong> automático.');
      if (proxima) msg += ' Com mais ' + itensVolume(proxima.faltam) + ', sobe para ' + proxima.percentual + '%.';
    } else {
      msg = inicio + (jaContada ? 'Faltam' : 'faltam') + ' <strong>' + itensVolume(proxima.faltam) + '</strong> para o pedido ganhar <strong>' + proxima.percentual + '% de desconto</strong>. Vale misturar qualquer produto do site.';
    }
    var cheia = !proxima;
    var alvo = proxima ? proxima.acimaDe + 1 : dv.faixa.acimaDe + 1;
    var pct = Math.max(4, Math.min(100, Math.round((total / alvo) * 100)));
    el.innerHTML =
      '<div class="volume volume--compacta' + (cheia ? ' is-cheia' : '') + '">' +
        '<div class="volume__topo">' + I(cheia ? 'check' : 'percent', 'volume__icone') +
          '<p>' + msg + ' <a class="pdp-volume__link" href="ajuda.html#desconto-por-volume">Como funciona</a></p>' +
        '</div>' +
        '<div class="volume__barra" role="progressbar" aria-valuemin="0" aria-valuemax="' + alvo + '" aria-valuenow="' + Math.min(total, alvo) + '" aria-label="Progresso para o desconto por volume"><span style="width:' + pct + '%"></span></div>' +
      '</div>';
  }

  function atualizarDependentesDaMedida() {
    // peso na ficha técnica
    var peso = raiz.querySelector('[data-pdp-peso]');
    if (peso) peso.textContent = textoPeso();

    // tabela de medidas
    toArray(raiz.querySelectorAll('[data-linha-medida]')).forEach(function (tr) {
      var sel = estado.medida === p.medidas[parseInt(tr.getAttribute('data-linha-medida'), 10)];
      tr.classList.toggle('is-atual', sel);
      var b = tr.querySelector('[data-selecionar-medida]');
      if (b) {
        b.innerHTML = sel ? I('check') + 'Selecionada' : 'Selecionar';
        b.classList.toggle('btn--dark', sel);
        b.classList.toggle('btn--outline', !sel);
      }
    });

    // outras opções do modelo levam a mesma medida, quando existir
    toArray(raiz.querySelectorAll('[data-variante]')).forEach(function (a) {
      var x = Aura.porId(a.getAttribute('data-variante'));
      if (!x || x.id === p.id) return;
      var href = Aura.urlProduto(x);
      var m = estado.medida;
      if (m && x.medidas.some(function (y) { return y.largura === m.largura && y.altura === m.altura; })) href += '&medida=' + chaveMedida(m);
      a.setAttribute('href', href);
    });
  }

  function atualizarCompra() {
    renderPreco();
    atualizarWhats();
    atualizarBarra();
    atualizarCarrinhoDependentes();
  }

  // o que depende do carrinho somado a esta escolha: dica do desconto por volume e estimativa de frete
  function atualizarCarrinhoDependentes() {
    var pr = projecao();
    renderVolume(pr);
    recalcularFrete(pr);
  }

  function atualizarUrl() {
    try {
      if (!window.history || !window.history.replaceState) return;
      var q = new URLSearchParams(window.location.search);
      q.set('p', p.slug);
      if (estado.medida) q.set('medida', chaveMedida(estado.medida));
      else q.delete('medida');
      window.history.replaceState(window.history.state, '', '?' + q.toString() + window.location.hash);
    } catch (e) { /* arquivo aberto direto do computador: segue sem mudar o endereço */ }
  }

  /* ---------- galeria ---------- */

  function trocarFoto(i) {
    if (i < 0 || i >= nFotos || i === estado.foto) return;
    estado.foto = i;
    var palco = raiz.querySelector('[data-pdp-foto]');
    palco.innerHTML = Aura.imagemProduto(p, i, '1/1', rotuloFoto(i));
    palco.classList.remove('is-trocando');
    void palco.offsetWidth;
    palco.classList.add('is-trocando');
    toArray(raiz.querySelectorAll('[data-foto]')).forEach(function (b) {
      if (parseInt(b.getAttribute('data-foto'), 10) === i) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
    });
  }

  // arrastar para o lado na foto principal (celular)
  (function () {
    var palco = raiz.querySelector('[data-pdp-foto]');
    if (!palco) return;
    var x0 = null;
    var y0 = null;
    palco.addEventListener('touchstart', function (e) {
      x0 = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
    }, { passive: true });
    palco.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      var dy = e.changedTouches[0].clientY - y0;
      x0 = null;
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
      trocarFoto((estado.foto + (dx < 0 ? 1 : -1) + nFotos) % nFotos);
    }, { passive: true });
  })();

  /* ---------- abas ---------- */

  function ativarAba(id, levarFoco) {
    toArray(raiz.querySelectorAll('[role="tab"]')).forEach(function (t) {
      var ativa = t.getAttribute('data-aba') === id;
      t.setAttribute('aria-selected', String(ativa));
      t.tabIndex = ativa ? 0 : -1;
      var painel = document.getElementById(t.getAttribute('aria-controls'));
      if (painel) painel.hidden = !ativa;
      if (!ativa) return;
      if (levarFoco) t.focus();
      // mantém a aba visível quando a lista rola na horizontal (celular)
      var lista = t.parentNode;
      var r = t.getBoundingClientRect();
      var lr = lista.getBoundingClientRect();
      if (r.left < lr.left) lista.scrollLeft -= lr.left - r.left + 16;
      else if (r.right > lr.right) lista.scrollLeft += r.right - lr.right + 16;
    });
  }

  /* ---------- frete ---------- */

  var formFrete = raiz.querySelector('[data-pdp-frete]');
  var inputCep = raiz.querySelector('#pdp-cep');
  var erroCep = raiz.querySelector('#pdp-cep-erro');
  var resFrete = raiz.querySelector('[data-pdp-frete-res]');

  // mesma base do carrinho: total dos produtos já com o desconto por volume (carrinho + esta escolha)
  function valorBaseFrete(pr) {
    return (pr || projecao()).total;
  }

  function sobEncomenda() {
    return estado.medida ? !(estado.medida.estoque > 0) : !Aura.temEstoque(p);
  }

  function mostrarErroCep(msg) {
    erroCep.hidden = false;
    erroCep.textContent = msg;
    inputCep.setAttribute('aria-invalid', 'true');
    inputCep.closest('.pdp-frete').classList.add('is-erro');
    resFrete.innerHTML = '';
    estado.cep = '';
  }

  function limparErroCep() {
    erroCep.hidden = true;
    erroCep.textContent = '';
    inputCep.removeAttribute('aria-invalid');
    inputCep.closest('.pdp-frete').classList.remove('is-erro');
  }

  function renderFrete(f, pr) {
    pr = pr || projecao();
    var limite = (C.frete && C.frete.gratisAcimaDe) || 0;
    var base = valorBaseFrete(pr);
    var origem = pr.jaAdicionada
      ? 'Com o seu carrinho'
      : pr.carrinho.unidades > 0 ? 'Somando o seu carrinho e esta escolha' : 'Com esta escolha';
    var dica = '';
    if (f.gratis) {
      dica = '<p class="pdp-frete__dica is-ok">' + I('check') + '<span>' + origem + ', os produtos somam ' + Aura.brl(base) +
        (pr.desconto > 0 ? ', já com o desconto por volume,' : '') + ' e o frete fica por nossa conta.</span></p>';
    } else if (limite > 0) {
      dica = '<p class="pdp-frete__dica">' + I('sparkle') + '<span>Frete grátis nos pedidos a partir de ' + Aura.brl(limite) + '. ' +
        origem + ', faltam ' + Aura.brl(Aura.r2(limite - base)) + (pr.desconto > 0 ? ' (já contando o desconto por volume)' : '') + '.</span></p>';
    }
    resFrete.innerHTML =
      '<ul class="pdp-frete__opcoes">' +
        '<li>' +
          '<span class="pdp-frete__tipo">' + I('truck') + '<span><strong>Entrega no endereço</strong><small>' + esc(f.nome) + ' · ' + esc(f.prazo) + '</small></span></span>' +
          '<strong class="pdp-frete__valor' + (f.gratis ? ' is-gratis' : '') + '">' + (f.gratis ? 'Frete grátis' : Aura.brl(f.valor)) + '</strong>' +
        '</li>' +
        (C.retirada && C.retirada.ativo
          ? '<li>' +
              '<span class="pdp-frete__tipo">' + I('store') + '<span><strong>Retirar na loja</strong><small>' + esc(C.empresa.cidade) + ', sem custo</small></span></span>' +
              '<strong class="pdp-frete__valor is-gratis">Grátis</strong>' +
            '</li>'
          : '') +
      '</ul>' +
      dica +
      '<p class="pdp-frete__nota">Estimativa. O valor final é confirmado no WhatsApp junto com o seu pedido.</p>';
  }

  function calcularFrete() {
    var cep = Aura.limparCep(inputCep.value);
    if (!cep) {
      mostrarErroCep('Digite o seu CEP para calcular o frete.');
      return false;
    }
    var pr = projecao();
    var f = cep.length === 8 ? Aura.calcularFrete(cep, valorBaseFrete(pr), sobEncomenda()) : null;
    if (!f) {
      mostrarErroCep('Esse CEP não parece certo. Confira os 8 números e tente de novo.');
      return false;
    }
    limparErroCep();
    inputCep.value = Aura.formatarCep(cep);
    Aura.cepSalvo(cep);
    estado.cep = cep;
    renderFrete(f, pr);
    return true;
  }

  function recalcularFrete(pr) {
    if (!estado.cep || !resFrete) return;
    pr = pr || projecao();
    var f = Aura.calcularFrete(estado.cep, valorBaseFrete(pr), sobEncomenda());
    if (f) renderFrete(f, pr);
  }

  if (formFrete && inputCep) {
    inputCep.addEventListener('input', function () {
      var v = Aura.formatarCep(inputCep.value);
      if (v !== inputCep.value) inputCep.value = v;
      if (!erroCep.hidden) limparErroCep();
    });
    formFrete.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!calcularFrete()) inputCep.focus();
    });
    var cepSalvo = Aura.cepSalvo();
    if (cepSalvo) {
      inputCep.value = Aura.formatarCep(cepSalvo);
      if (Aura.regiaoPorCep(cepSalvo)) calcularFrete();
    }
  }

  /* ---------- barra de compra fixa (celular) ---------- */

  (function () {
    var barra = raiz.querySelector('[data-pdp-barra]');
    var alvo = raiz.querySelector('[data-pdp-compra-linha]');
    if (!barra || !alvo || !('IntersectionObserver' in window) || !window.matchMedia) return;
    var mq = window.matchMedia('(max-width: 900px)');
    var passou = false;
    function aplicar() {
      var mostrar = passou && mq.matches;
      barra.classList.toggle('is-visivel', mostrar);
      document.body.classList.toggle('tem-barra-compra', mostrar);
      if ('inert' in barra) barra.inert = !mostrar;
    }
    var MARGEM_TOPO = 96;
    new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        // passou = a linha de compra saiu por cima da área observada (e não por baixo, antes de chegar nela)
        var topo = en.rootBounds ? en.rootBounds.top : MARGEM_TOPO;
        passou = !en.isIntersecting && !!en.boundingClientRect && en.boundingClientRect.bottom <= topo + 1;
      });
      aplicar();
    }, { rootMargin: '-' + MARGEM_TOPO + 'px 0px 0px 0px', threshold: 0 }).observe(alvo);
    if (mq.addEventListener) mq.addEventListener('change', aplicar);
    else if (mq.addListener) mq.addListener(aplicar);
    aplicar();
  })();

  /* ---------- eventos ---------- */

  raiz.addEventListener('click', function (e) {
    var t = e.target;
    var el;
    if (!t || !t.closest) return;
    if ((el = t.closest('[data-foto]'))) { trocarFoto(parseInt(el.getAttribute('data-foto'), 10)); return; }
    if ((el = t.closest('[role="radio"]'))) { escolher(el); return; }
    if ((el = t.closest('[data-pdp-qtd]'))) { definirQtd(estado.qtd + (el.getAttribute('data-pdp-qtd') === 'mais' ? 1 : -1)); return; }
    if ((el = t.closest('[data-pdp-adicionar]'))) { adicionar(); return; }
    if ((el = t.closest('[data-selecionar-medida]'))) {
      selecionarMedida(parseInt(el.getAttribute('data-selecionar-medida'), 10));
      irParaSeletor();
      return;
    }
    if ((el = t.closest('[data-aba]'))) { ativarAba(el.getAttribute('data-aba'), false); }
  });

  raiz.addEventListener('keydown', function (e) {
    var el = e.target;
    if (!el || !el.getAttribute) return;
    var papel = el.getAttribute('role');
    if (papel !== 'radio' && papel !== 'tab') return;
    var lista = papel === 'radio'
      ? toArray(el.closest('[role="radiogroup"]').querySelectorAll('[role="radio"]'))
      : toArray(raiz.querySelectorAll('[role="tab"]'));
    var i = lista.indexOf(el);
    var n = lista.length;
    var alvo = null;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        if (papel === 'tab' && e.key === 'ArrowDown') return;
        alvo = lista[(i + 1) % n];
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        if (papel === 'tab' && e.key === 'ArrowUp') return;
        alvo = lista[(i - 1 + n) % n];
        break;
      case 'Home':
        alvo = lista[0];
        break;
      case 'End':
        alvo = lista[n - 1];
        break;
      default:
        return;
    }
    if (!alvo) return;
    e.preventDefault();
    if (papel === 'radio') {
      alvo.focus();
      escolher(alvo);
    } else {
      ativarAba(alvo.getAttribute('data-aba'), true);
    }
  });

  // carrinho mudou (aqui, no drawer ou em outra aba): atualiza a dica do desconto por volume e o frete
  window.addEventListener('aura:carrinho', function () { atualizarCarrinhoDependentes(); });

  /* ---------- estado inicial ---------- */

  marcarGrupo(grupoMedida, estado.medida ? p.medidas.indexOf(estado.medida) : null);
  opcoes.forEach(function (o, i) {
    var g = raiz.querySelector('[data-grupo="opcao"][data-opcao="' + i + '"]');
    if (g) marcarGrupo(g, estado.opcoes[o.nome] != null ? estado.opcoes[o.nome] : null);
  });
  atualizarDependentesDaMedida();
  atualizarCompra();
  if (estado.medida) atualizarUrl();

  // abre direto uma aba pelo endereço (ex.: produto.html?p=...#medidas)
  var hashAba = window.location.hash.replace(/^#(painel-|aba-)?/, '');
  if (hashAba && ABAS.some(function (a) { return a.id === hashAba; })) {
    ativarAba(hashAba, false);
    setTimeout(function () { rolar(raiz.querySelector('#detalhes'), 'start'); }, 60);
  }

  Aura.iniciarCarrosseis(raiz);
  Aura.revelar(raiz);

  /* ---------- SEO: título, descrição e dados estruturados ---------- */

  (function () {
    var descricao = resumir((p.descricao && p.descricao[0]) || p.nome, 158);
    var titulo = p.nome + ' | Aura';
    var url = Aura.linkAbsoluto(p);
    document.title = titulo;
    meta('meta[name="description"]', { name: 'description' }, descricao);
    meta('meta[property="og:title"]', { property: 'og:title' }, titulo);
    meta('meta[property="og:description"]', { property: 'og:description' }, descricao);
    meta('meta[property="og:url"]', { property: 'og:url' }, url);

    var canonico = document.head.querySelector('link[rel="canonical"]');
    if (!canonico) {
      canonico = document.createElement('link');
      canonico.setAttribute('rel', 'canonical');
      document.head.appendChild(canonico);
    }
    canonico.setAttribute('href', url);

    var imagens = (p.imagens && p.imagens.length ? p.imagens : ['assets/img/og-image.jpg']).map(urlAbsoluta);

    jsonLd({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.nome,
      sku: p.id,
      brand: { '@type': 'Brand', name: C.empresa.nome || 'Aura' },
      description: (p.descricao || []).join(' ') || p.nome,
      image: imagens,
      category: [cat && cat.nome, sub && sub.nome].filter(Boolean).join(' > '),
      color: Aura.nomeCor(p.cor),
      material: (p.specs && p.specs.Material) || undefined,
      url: url,
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'BRL',
        lowPrice: precoMin.toFixed(2),
        highPrice: precoMax.toFixed(2),
        offerCount: p.medidas.length,
        availability: Aura.temEstoque(p) ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
        itemCondition: 'https://schema.org/NewCondition',
        url: url,
        seller: { '@type': 'Organization', name: C.empresa.nomeCompleto || C.empresa.nome },
      },
    });

    var trilha = [{ nome: 'Início', url: urlAbsoluta('index.html') }];
    if (cat) trilha.push({ nome: cat.nome, url: urlAbsoluta(Aura.urlCatalogo({ categoria: cat.slug })) });
    if (sub) trilha.push({ nome: sub.nome, url: urlAbsoluta(Aura.urlCatalogo({ categoria: sub.slug })) });
    trilha.push({ nome: p.nome, url: url });
    jsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: trilha.map(function (t, i) {
        return { '@type': 'ListItem', position: i + 1, name: t.nome, item: t.url };
      }),
    });
  })();

  /* ---------- produto não encontrado ---------- */

  function naoEncontrado(pedido) {
    var termo = '';
    var achados = [];
    if (pedido) {
      var palavras = String(pedido).toLowerCase().replace(/[^a-z0-9à-ú]+/gi, ' ').trim().split(/\s+/).slice(0, 6);
      while (palavras.length && !achados.length) {
        achados = Aura.buscar(palavras.join(' '));
        if (achados.length) termo = palavras.join(' ');
        palavras.pop();
      }
    }
    var maisVendidos = Aura.produtos.slice().sort(function (a, b) { return b.vendidos - a.vendidos; }).slice(0, 8);

    document.title = (pedido ? 'Produto não encontrado' : 'Escolha um produto') + ' | Aura';
    meta('meta[name="robots"]', { name: 'robots' }, 'noindex, follow');

    var cats = Aura.categorias.map(function (c) {
      var n = Aura.contar(function (x) { return x.categoria === c.slug; });
      return (
        '<li><a class="pdp-404__cat" href="' + esc(Aura.urlCatalogo({ categoria: c.slug })) + '">' +
          '<span class="pdp-404__cat-icone">' + I(iconeCategoria(c.slug)) + '</span>' +
          '<span><strong>' + esc(c.nome) + '</strong><small>' + n + ' ' + Aura.plural(n, 'opção', 'opções') + '</small></span>' +
          I('arrow', 'pdp-404__seta') +
        '</a></li>'
      );
    }).join('');

    raiz.innerHTML =
      '<section class="pdp-404">' +
        '<div class="container pdp-404__inner">' +
          '<span class="pdp-404__icone">' + I('search') + '</span>' +
          '<span class="eyebrow"><i class="tz"></i>' + (pedido ? 'Produto não encontrado' : 'Vamos achar o seu produto') + '</span>' +
          '<h1>' + (pedido ? 'Esse produto não está mais aqui, mas a gente te ajuda a achar.' : 'Qual produto você está procurando?') + '</h1>' +
          '<p class="pdp-404__texto">' + (pedido
            ? 'O link pode ter mudado ou o item saiu do catálogo. Busque pelo nome ou pela medida, ou escolha uma categoria aqui embaixo.'
            : 'Busque pelo nome ou pela medida, ou escolha uma categoria aqui embaixo.') + '</p>' +
          '<form class="pdp-404__busca" role="search" action="catalogo.html" method="get">' +
            '<label class="sr-only" for="pdp-404-busca">Buscar produtos</label>' +
            '<input id="pdp-404-busca" class="input" type="search" name="q" placeholder="Ex.: vitrô preto, porta de correr, box" value="' + esc(termo) + '">' +
            '<button class="btn btn--dark" type="submit">' + I('search') + 'Buscar</button>' +
          '</form>' +
          '<ul class="pdp-404__cats">' + cats + '</ul>' +
          '<p class="pdp-404__wa">Prefere falar com alguém? <a href="' + esc(Aura.linkWhatsApp('Oi! Não encontrei um produto no site, pode me ajudar?')) + '" target="_blank" rel="noopener">' + I('whatsapp') + 'Chama a gente no WhatsApp</a></p>' +
        '</div>' +
      '</section>' +
      (achados.length
        ? htmlCarrossel('pdp-404-achados', 'Talvez seja um destes', 'Achamos produtos parecidos', achados.slice(0, 8), true)
        : htmlCarrossel('pdp-404-vitrine', 'Mais vendidos', 'Os queridinhos de quem está construindo', maisVendidos, true));

    var form = raiz.querySelector('.pdp-404__busca');
    if (form) {
      form.addEventListener('submit', function (e) {
        if (!form.querySelector('input').value.trim()) e.preventDefault();
      });
    }
    Aura.iniciarCarrosseis(raiz);
  }
})();
