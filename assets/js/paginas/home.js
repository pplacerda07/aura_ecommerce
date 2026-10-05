/* Página inicial: vitrine com abas, demonstração do desconto por volume, preços das linhas, números e depoimentos. */
(function () {
  'use strict';

  var Aura = window.Aura;
  var C = Aura.config;
  var esc = Aura.esc;
  var I = Aura.icon;

  var porVendidos = function (a, b) { return b.vendidos - a.vendidos; };

  var VITRINES = {
    'mais-vendidos': {
      itens: function () { return Aura.produtos.slice().sort(porVendidos).slice(0, 10); },
      link: 'catalogo.html?ordem=mais-vendidos',
      rotulo: 'Ver todos os produtos',
    },
    'pronta-entrega': {
      itens: function () { return Aura.produtos.filter(function (p) { return p.selos.indexOf('pronta-entrega') > -1; }).sort(porVendidos).slice(0, 10); },
      link: 'catalogo.html?selo=pronta-entrega',
      rotulo: 'Ver tudo em pronta entrega',
    },
    premium: {
      itens: function () { return Aura.produtos.filter(function (p) { return p.linha === 'premium'; }).sort(porVendidos).slice(0, 10); },
      link: 'catalogo.html?linha=premium',
      rotulo: 'Ver toda a Linha Premium',
    },
    novidades: {
      itens: function () { return Aura.produtos.filter(function (p) { return p.selos.indexOf('novidade') > -1; }).sort(porVendidos).slice(0, 10); },
      link: 'catalogo.html?selo=novidade',
      rotulo: 'Ver todas as novidades',
    },
  };

  /* ---------- vitrine ---------- */

  var trilho = document.querySelector('[data-vitrine-trilho]');
  var abas = Array.prototype.slice.call(document.querySelectorAll('[data-vitrine]'));
  var linkTodos = document.querySelector('[data-vitrine-link]');

  function mostrarVitrine(chave) {
    var v = VITRINES[chave];
    if (!v || !trilho) return;
    trilho.innerHTML = v.itens().map(Aura.cardProduto).join('');
    trilho.scrollLeft = 0;
    trilho.setAttribute('aria-labelledby', 'aba-' + chave);
    if (linkTodos) {
      linkTodos.setAttribute('href', v.link);
      linkTodos.textContent = v.rotulo;
    }
    abas.forEach(function (a) {
      var ativa = a.getAttribute('data-vitrine') === chave;
      a.setAttribute('aria-selected', String(ativa));
      a.tabIndex = ativa ? 0 : -1;
    });
    trilho.dispatchEvent(new Event('scroll'));
  }

  abas.forEach(function (a, i) {
    a.addEventListener('click', function () { mostrarVitrine(a.getAttribute('data-vitrine')); });
    a.addEventListener('keydown', function (e) {
      var alvo = null;
      if (e.key === 'ArrowRight') alvo = abas[(i + 1) % abas.length];
      if (e.key === 'ArrowLeft') alvo = abas[(i - 1 + abas.length) % abas.length];
      if (e.key === 'Home') alvo = abas[0];
      if (e.key === 'End') alvo = abas[abas.length - 1];
      if (alvo) {
        e.preventDefault();
        alvo.focus();
        mostrarVitrine(alvo.getAttribute('data-vitrine'));
      }
    });
  });

  mostrarVitrine('mais-vendidos');
  Aura.iniciarCarrosseis(document);

  /* ---------- demonstração do desconto por volume ---------- */

  var demo = document.querySelector('[data-volume-demo]');
  var secaoVolume = document.querySelector('[data-secao-volume]');
  if (!Aura.volumeAtivo && secaoVolume) {
    secaoVolume.remove();
  } else if (demo) {
    var f = Aura.primeiraFaixa;
    var alvo = f.acimaDe + 1;
    // monta um carrinho de exemplo com produtos reais do catálogo
    var exemplo = [
      { p: Aura.porId('AV1001'), qtd: Math.max(1, alvo - 5) },
      { p: Aura.porId('AV1011'), qtd: 3 },
      { p: Aura.porId('AV1021'), qtd: 2 },
    ].filter(function (x) { return x.p; });
    var unidades = exemplo.reduce(function (s, x) { return s + x.qtd; }, 0);
    var subtotal = Aura.r2(exemplo.reduce(function (s, x) { return s + x.p.medidas[0].preco * x.qtd; }, 0));
    var dv = Aura.descontoVolume(unidades);
    var desconto = Aura.r2(subtotal * dv.percentual / 100);
    var total = Aura.r2(subtotal - desconto);
    var resumoFake = { contagem: unidades, volume: dv, desconto: desconto };

    demo.innerHTML =
      '<div class="demo__cabeca"><strong>Exemplo de pedido</strong><span>' + unidades + ' itens</span></div>' +
      '<div class="demo__linhas">' + exemplo.map(function (x) {
        return '<div class="demo__linha">' + Aura.imagemProduto(x.p, 0, '1/1', false) +
          '<div><b>' + esc(Aura.nomeCurto(x.p)) + '</b><small>' + esc(Aura.rotuloMedida(x.p.medidas[0])) + ' · ' + x.qtd + ' un.</small></div>' +
          '<b>' + Aura.brl(x.p.medidas[0].preco * x.qtd) + '</b></div>';
      }).join('') + '</div>' +
      Aura.barraVolume(resumoFake, true) +
      '<dl class="totais demo__totais">' +
        '<div><dt>Subtotal</dt><dd>' + Aura.brl(subtotal) + '</dd></div>' +
        (desconto ? '<div class="totais__desconto"><dt>Desconto por volume (' + dv.percentual + '%)</dt><dd>' + Aura.brl(desconto) + ' a menos</dd></div>' : '') +
        '<div class="totais__total"><dt>Total</dt><dd>' + Aura.brl(total) + '</dd></div>' +
        (Aura.pixPercentual ? '<div class="totais__pix"><dt>' + I('pix') + 'No Pix</dt><dd>' + Aura.brl(Aura.precoPix(total)) + '</dd></div>' : '') +
      '</dl>';
  }

  /* ---------- preço inicial de cada linha ---------- */

  document.querySelectorAll('[data-preco-linha]').forEach(function (el) {
    var linha = el.getAttribute('data-preco-linha');
    var lista = Aura.produtos.filter(function (p) { return p.linha === linha; });
    if (!lista.length) return;
    el.textContent = Aura.brl(Math.min.apply(null, lista.map(Aura.precoMin)));
  });

  /* ---------- números da empresa ---------- */

  var numeros = document.querySelector('[data-numeros]');
  if (numeros) {
    numeros.innerHTML = (C.empresa.numeros || []).map(function (n) {
      return '<div class="numero"><strong>' + esc(n.valor) + '</strong><span>' + esc(n.rotulo) + '</span></div>';
    }).join('');
  }

  /* ---------- depoimentos ---------- */

  var dep = document.querySelector('[data-depoimentos]');
  if (dep) {
    var estrelas = '<div class="depoimento__estrelas" role="img" aria-label="5 de 5 estrelas">' + [1, 2, 3, 4, 5].map(function () { return I('star'); }).join('') + '</div>';
    dep.innerHTML = (C.depoimentos || []).map(function (d) {
      return (
        '<figure class="depoimento" data-revelar>' +
          estrelas +
          '<blockquote>' + esc(d.texto) + '</blockquote>' +
          '<figcaption class="depoimento__autor">' + Aura.mockup({ rotulo: null, ratio: '1/1', alt: 'Foto do cliente' }) +
            '<div><strong>' + esc(d.nome) + '</strong><span>' + esc(d.local) + (d.produto ? ' · ' + esc(d.produto) : '') + '</span></div>' +
          '</figcaption>' +
        '</figure>'
      );
    }).join('');
  }

  Aura.revelar(document);
})();
