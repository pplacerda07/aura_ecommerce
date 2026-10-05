/*
  INTERFACE COMPARTILHADA DA LOJA AURA
  Cabeçalho, rodapé, carrinho lateral, pop-up do WhatsApp, busca, card de produto, ícones e avisos.
  Cada página só precisa ter <div id="aura-header"></div> e <div id="aura-footer"></div>.
*/
(function () {
  'use strict';

  var Aura = window.Aura;
  var C = Aura.config;
  var esc = Aura.esc;

  /* ---------- ícones ---------- */

  var P = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    bag: '<path d="M5.5 8h13l-1 12.5h-11L5.5 8Z"/><path d="M9 8V7a3 3 0 0 1 6 0v1"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z"/>',
    chat: '<path d="M20.5 12a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.1-4.2A8.5 8.5 0 1 1 20.5 12Z"/>',
    phone: '<path d="M5 3.5h3.5l1.8 4.6-2.3 1.4a11 11 0 0 0 6.5 6.5l1.4-2.3 4.6 1.8V19a2 2 0 0 1-2 2A17 17 0 0 1 3 5.5a2 2 0 0 1 2-2Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/>',
    truck: '<path d="M2.5 6.5h11v10h-11z"/><path d="M13.5 9.5h4l3.5 3.5v3.5h-7.5"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    card: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6.5 15h4"/>',
    pix: '<rect x="6" y="6" width="12" height="12" rx="3" transform="rotate(45 12 12)"/><path d="m9.5 12 2.5-2.5 2.5 2.5-2.5 2.5z"/>',
    shield: '<path d="M12 3 5 6v5.5c0 4.6 3 8 7 9.5 4-1.5 7-4.9 7-9.5V6l-7-3Z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    right: '<path d="m9 5.5 6.5 6.5L9 18.5"/>',
    left: '<path d="M15 5.5 8.5 12l6.5 6.5"/>',
    down: '<path d="m5.5 9 6.5 6.5L18.5 9"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    trash: '<path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    star: '<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8Z"/>',
    ruler: '<path d="M3 16.5 16.5 3 21 7.5 7.5 21Z"/><path d="m7.5 12.5 2 2M10.5 9.5l2 2M13.5 6.5l2 2"/>',
    box: '<path d="M21 8 12 3 3 8v8l9 5 9-5V8Z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    pin: '<path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="9" cy="10" r="1.8"/><path d="m21 16-5-5-9.5 9"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    filter: '<path d="M4 6.5h9M17 6.5h3M4 12h3M11 12h9M4 17.5h11M19 17.5h1"/><circle cx="15" cy="6.5" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="17.5" r="2"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8v.2"/>',
    percent: '<path d="M18.5 5.5 5.5 18.5"/><circle cx="7.5" cy="7.5" r="2.3"/><circle cx="16.5" cy="16.5" r="2.3"/>',
    tool: '<path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L3.5 17.5l3 3 5.7-5.7a4 4 0 0 0 5.3-5.3l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6Z"/>',
    refresh: '<path d="M4.5 12a7.5 7.5 0 0 1 13.2-4.9L19.5 9"/><path d="M19.5 4.5V9H15"/><path d="M19.5 12a7.5 7.5 0 0 1-13.2 4.9L4.5 15"/><path d="M4.5 19.5V15H9"/>',
    store: '<path d="M4.5 10.5V20h15v-9.5"/><path d="M3 4h18l-1.2 5.2a2.5 2.5 0 0 1-4.8.3 2.6 2.6 0 0 1-5 0 2.5 2.5 0 0 1-4.8-.3Z"/><path d="M10 20v-5h4v5"/>',
    factory: '<path d="M3 21V10.5l6 3.5v-3.5l6 3.5V6l6 3v12H3Z"/><path d="M7 17.5h2M12 17.5h2M17 17.5h1"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="m8.6 13.8-1.6 7.2 5-2.8 5 2.8-1.6-7.2"/>',
    send: '<path d="M20.5 3.5 10 14"/><path d="M20.5 3.5 14 20.5l-4-6.5-6.5-4 17-6.5Z"/>',
    grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.8"/>',
    window: '<rect x="4" y="3" width="16" height="18" rx="1.8"/><path d="M12 3v18M4 12h16"/>',
    door: '<path d="M6 21V4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21"/><path d="M3.5 21h17M14.5 12.5v.5"/>',
    shower: '<rect x="4" y="3" width="16" height="18" rx="1.8"/><path d="M12 3v18M9.5 10.5v3M14.5 10.5v3"/>',
    sparkle: '<path d="M12 3.5 13.8 10l6.7 2-6.7 2L12 20.5 10.2 14 3.5 12l6.7-2Z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5v.01"/>',
    facebook: '<path d="M14 8.5h3V4.5h-3a4 4 0 0 0-4 4v2.5H7v4h3v6.5h4V15h3l1-4h-4V9a.5.5 0 0 1 .5-.5Z"/>',
    calc: '<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 7h7M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01M8.5 15h.01M12 15h.01M15.5 15h.01M8.5 18h.01M12 18h.01"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
    quote: '<path d="M10 7H6.5A1.5 1.5 0 0 0 5 8.5V12h4v4.5H5M19 7h-3.5A1.5 1.5 0 0 0 14 8.5V12h4v4.5h-4"/>',
  };

  var WA_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z';

  Aura.icon = function (nome, cls) {
    var c = 'icon' + (cls ? ' ' + cls : '');
    if (nome === 'whatsapp') {
      return '<svg class="' + c + '" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="' + WA_PATH + '"/></svg>';
    }
    return '<svg class="' + c + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (P[nome] || '') + '</svg>';
  };
  var I = Aura.icon;

  /* ---------- espaço de imagem (mockup) ---------- */

  // opts: { src, alt, rotulo, ratio, cls }
  Aura.mockup = function (opts) {
    opts = opts || {};
    var ratio = opts.ratio ? ' style="--ratio:' + opts.ratio + '"' : '';
    var cls = 'mockup' + (opts.cls ? ' ' + opts.cls : '');
    if (opts.src) {
      return '<div class="' + cls + ' mockup--foto"' + ratio + '><img src="' + esc(opts.src) + '" alt="' + esc(opts.alt || '') + '" loading="lazy" decoding="async"></div>';
    }
    var rot = C.site.mostrarRotulosDeImagem && opts.rotulo ? '<span class="mockup__rotulo">' + esc(opts.rotulo) + '</span>' : '';
    return '<div class="' + cls + '"' + ratio + ' role="img" aria-label="' + esc(opts.alt || opts.rotulo || 'Imagem') + '">' + I('image', 'mockup__icone') + rot + '</div>';
  };

  Aura.imagemProduto = function (p, i, ratio, rotulo) {
    // rotulo false = sem rótulo (miniaturas)
    return Aura.mockup({ src: p.imagens && p.imagens[i || 0], alt: p.nome, rotulo: rotulo === false ? null : rotulo || 'Foto do produto', ratio: ratio || '4/5' });
  };

  /* ---------- selos ---------- */

  Aura.selosHtml = function (p) {
    if (!p.selos || !p.selos.length) return '';
    return '<ul class="selos">' + p.selos.map(function (s) {
      var nome = (Aura.selos[s] && Aura.selos[s].nome) || s;
      return '<li class="selo selo--' + esc(s) + '">' + esc(nome) + '</li>';
    }).join('') + '</ul>';
  };

  /* ---------- card de produto ---------- */

  Aura.cardProduto = function (p) {
    var min = Aura.precoMin(p);
    var url = Aura.urlProduto(p);
    var fav = Aura.favoritos.tem(p.id);
    var irmaos = Aura.irmaos(p);
    var swatches = '';
    if (irmaos.length > 1) {
      swatches = '<div class="pcard__opcoes" role="group" aria-label="Outras opções deste modelo">' + irmaos.slice(0, 5).map(function (x) {
        var cor = Aura.cores[x.cor] || { hex: '#ccc' };
        var atual = x.id === p.id ? ' is-atual' : '';
        return '<a href="' + Aura.urlProduto(x) + '" class="swatch swatch--sm' + atual + (x.grade ? ' swatch--grade' : '') + '" style="--cor:' + cor.hex + '" title="' + esc(Aura.rotuloOpcao(x)) + '" aria-label="' + esc(Aura.rotuloOpcao(x)) + '"></a>';
      }).join('') + '<span class="pcard__opcoes-txt">' + irmaos.length + ' opções</span></div>';
    }
    return (
      '<article class="pcard" data-id="' + p.id + '">' +
        '<a class="pcard__media" href="' + url + '" tabindex="-1" aria-hidden="true">' +
          Aura.imagemProduto(p, 0, '4/5') +
        '</a>' +
        Aura.selosHtml(p) +
        '<button type="button" class="pcard__fav' + (fav ? ' is-ativo' : '') + '" data-fav="' + p.id + '" aria-pressed="' + fav + '" aria-label="Salvar nos favoritos">' + I('heart') + '</button>' +
        '<div class="pcard__body">' +
          '<p class="pcard__meta">' + esc(Aura.nomeLinha(p)) + '</p>' +
          '<h3 class="pcard__titulo"><a href="' + url + '" title="' + esc(p.nome) + '">' + esc(Aura.nomeCurto(p)) + '</a></h3>' +
          '<p class="pcard__medidas">' + I('ruler') + '<span>' + esc(Aura.resumoMedidas(p)) + '</span></p>' +
          swatches +
          '<div class="pcard__preco">' +
            '<span class="pcard__apartir">A partir de</span>' +
            '<strong class="pcard__valor">' + Aura.brl(min) + '</strong>' +
            '<span class="pcard__parcela">ou ' + Aura.maxParcelas + 'x de ' + Aura.brl(Aura.parcela(min)) + ' sem juros</span>' +
            (Aura.pixPercentual ? '<span class="pcard__pix">' + I('pix') + Aura.brl(Aura.precoPix(min)) + ' no Pix</span>' : '') +
          '</div>' +
          '<div class="pcard__acoes">' +
            '<a class="btn btn--dark btn--block" href="' + url + '">Escolher medida</a>' +
            '<button type="button" class="btn btn--wa btn--quadrado" data-wa-produto="' + p.id + '" aria-label="Comprar pelo WhatsApp" title="Comprar pelo WhatsApp">' + I('whatsapp') + '</button>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  };

  /* ---------- barra de desconto por volume ---------- */

  Aura.barraVolume = function (resumo, compacta) {
    if (!Aura.volumeAtivo) return '';
    var v = resumo.volume;
    var f = Aura.primeiraFaixa;
    var alvo, msg, cheia = false;
    if (v.percentual && !v.proxima) {
      cheia = true;
      alvo = v.faixa.acimaDe + 1;
      msg = 'Pronto! Você ganhou <strong>' + v.percentual + '% de desconto</strong> por volume' + (resumo.desconto ? ' e economizou <strong>' + Aura.brl(resumo.desconto) + '</strong>.' : '.');
    } else if (v.percentual && v.proxima) {
      alvo = v.proxima.acimaDe + 1;
      msg = 'Você já tem <strong>' + v.percentual + '%</strong>. Faltam <strong>' + v.proxima.faltam + ' ' + Aura.plural(v.proxima.faltam, 'item', 'itens') + '</strong> para chegar a <strong>' + v.proxima.percentual + '%</strong>.';
    } else {
      var pr = v.proxima || { faltam: f.acimaDe + 1, percentual: f.percentual, acimaDe: f.acimaDe };
      alvo = pr.acimaDe + 1;
      msg = resumo.contagem === 0
        ? 'Acima de <strong>' + f.acimaDe + ' ' + Aura.unidadeVolume + '</strong> no carrinho, você ganha <strong>' + f.percentual + '% de desconto</strong> automático.'
        : 'Faltam <strong>' + pr.faltam + ' ' + Aura.plural(pr.faltam, 'item', 'itens') + '</strong> para você ganhar <strong>' + pr.percentual + '% de desconto</strong> em todo o pedido.';
    }
    var pct = Math.max(4, Math.min(100, Math.round((resumo.contagem / alvo) * 100)));
    return (
      '<div class="volume' + (cheia ? ' is-cheia' : '') + (compacta ? ' volume--compacta' : '') + '">' +
        '<div class="volume__topo">' + I(cheia ? 'check' : 'percent', 'volume__icone') + '<p>' + msg + '</p></div>' +
        '<div class="volume__barra" role="progressbar" aria-valuemin="0" aria-valuemax="' + alvo + '" aria-valuenow="' + Math.min(resumo.contagem, alvo) + '" aria-label="Progresso para o desconto por volume"><span style="width:' + pct + '%"></span></div>' +
      '</div>'
    );
  };

  /* ---------- toasts ---------- */

  var toastBox;
  Aura.toast = function (msg, tipo) {
    if (!toastBox) {
      toastBox = document.createElement('div');
      toastBox.className = 'toasts';
      toastBox.setAttribute('role', 'status');
      toastBox.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastBox);
    }
    var t = document.createElement('div');
    t.className = 'toast' + (tipo ? ' toast--' + tipo : '');
    t.innerHTML = I(tipo === 'erro' ? 'info' : 'check') + '<span>' + msg + '</span>';
    toastBox.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('is-visivel'); });
    setTimeout(function () {
      t.classList.remove('is-visivel');
      setTimeout(function () { t.remove(); }, 300);
    }, 3200);
  };

  /* ---------- atendimento: está aberto agora? ---------- */

  // usa o horário de Brasília (não o fuso do aparelho) e respeita os feriados da configuração
  Aura.atendimentoAberto = function () {
    var h = C.whatsapp.horas;
    if (!h) return true;
    var dia, hora, data;
    try {
      var partes = {};
      new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' })
        .formatToParts(new Date())
        .forEach(function (x) { partes[x.type] = x.value; });
      dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(partes.weekday);
      hora = (+partes.hour % 24) + (+partes.minute) / 60;
      data = partes.year + '-' + partes.month + '-' + partes.day;
    } catch (e) {
      var ag = new Date();
      dia = ag.getDay();
      hora = ag.getHours() + ag.getMinutes() / 60;
      data = ag.getFullYear() + '-' + String(ag.getMonth() + 1).padStart(2, '0') + '-' + String(ag.getDate()).padStart(2, '0');
    }
    if ((C.whatsapp.feriados || []).indexOf(data) > -1) return false;
    var faixa = h[dia];
    if (!faixa) return false;
    return hora >= faixa[0] && hora < faixa[1];
  };

  /* ---------- cabeçalho ---------- */

  function htmlAvisos() {
    var avisos = (C.site.avisos || []).map(Aura.preencher);
    return (
      '<div class="avisos" role="region" aria-label="Avisos da loja">' +
        '<div class="container avisos__inner">' +
          '<ul class="avisos__lista">' + avisos.map(function (a, i) {
            return '<li class="avisos__item' + (i === 0 ? ' is-ativo' : '') + '">' + esc(a) + '</li>';
          }).join('') + '</ul>' +
          '<ul class="avisos__linha">' + avisos.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul>' +
        '</div>' +
      '</div>'
    );
  }

  function htmlMega() {
    var cols = Aura.categorias.map(function (c) {
      var n = Aura.contar(function (p) { return p.categoria === c.slug; });
      return (
        '<div class="mega__col">' +
          '<a class="mega__cat" href="' + Aura.urlCatalogo({ categoria: c.slug }) + '">' + esc(c.nome) + ' <span>' + n + '</span></a>' +
          '<ul>' + c.subs.map(function (s) {
            return '<li><a href="' + Aura.urlCatalogo({ categoria: s.slug }) + '">' + esc(s.nome) + '</a></li>';
          }).join('') + '</ul>' +
        '</div>'
      );
    }).join('');
    var linhas = Object.keys(Aura.linhas).map(function (k) {
      var l = Aura.linhas[k];
      return '<li><a href="' + Aura.urlCatalogo({ linha: k }) + '"><strong>' + esc(l.nome) + '</strong><span>' + esc(l.resumo) + '</span></a></li>';
    }).join('');
    return (
      '<div class="mega__panel" id="painel-todos" role="region" aria-label="Todos os produtos">' +
        '<div class="container mega__grid">' +
          cols +
          '<div class="mega__col mega__col--linhas"><span class="mega__cat">Por linha</span><ul class="mega__linhas">' + linhas + '</ul></div>' +
          '<a class="mega__promo" href="' + Aura.urlCatalogo({ selo: 'pronta-entrega' }) + '">' +
            '<span class="eyebrow eyebrow--claro"><i class="tz"></i>Pronta entrega</span>' +
            '<strong>Precisa pra já? Peças em estoque saem em ' + esc(Aura.prazoProntaEntrega) + '.</strong>' +
            '<span class="mega__promo-link">Ver produtos ' + I('arrow') + '</span>' +
          '</a>' +
        '</div>' +
      '</div>'
    );
  }

  function htmlAtendimento() {
    var aberto = Aura.atendimentoAberto();
    return (
      '<div class="dropdown__panel atendimento" id="painel-atendimento">' +
        '<p class="atendimento__status' + (aberto ? ' is-aberto' : '') + '"><i></i>' + (aberto ? 'Estamos online agora' : 'Fora do horário, mas pode mandar mensagem') + '</p>' +
        '<a class="atendimento__item atendimento__item--wa" href="' + Aura.linkWhatsApp('Oi! Vim pelo site e queria tirar uma dúvida.') + '" target="_blank" rel="noopener">' + I('whatsapp') + '<span><small>WhatsApp</small><strong>Chamar agora</strong></span></a>' +
        '<a class="atendimento__item" href="tel:+' + esc(C.empresa.telefoneLink) + '">' + I('phone') + '<span><small>Telefone</small><strong>' + esc(C.empresa.telefone) + '</strong></span></a>' +
        '<a class="atendimento__item" href="mailto:' + esc(C.empresa.email) + '">' + I('mail') + '<span><small>E-mail</small><strong>' + esc(C.empresa.email) + '</strong></span></a>' +
        '<div class="atendimento__horario">' + I('clock') + '<ul>' + C.empresa.horario.map(function (h) {
          return '<li><span>' + esc(h.dias) + '</span><strong>' + esc(h.horas) + '</strong></li>';
        }).join('') + '</ul></div>' +
      '</div>'
    );
  }

  function htmlHeader() {
    var nav = [
      { href: Aura.urlCatalogo({ categoria: 'janelas' }), txt: 'Janelas', key: 'janelas' },
      { href: Aura.urlCatalogo({ categoria: 'portas' }), txt: 'Portas', key: 'portas' },
      { href: Aura.urlCatalogo({ categoria: 'box-para-banheiro' }), txt: 'Box para banheiro', key: 'box-para-banheiro' },
      { href: Aura.urlCatalogo({ linha: 'premium' }), txt: 'Linha Premium', key: 'premium' },
      { href: Aura.urlCatalogo({ selo: 'pronta-entrega' }), txt: 'Pronta entrega', key: 'pronta-entrega' },
      { href: 'sobre.html', txt: 'Sobre a Aura', key: 'sobre' },
      { href: 'ajuda.html', txt: 'Ajuda', key: 'ajuda' },
    ];
    return (
      htmlAvisos() +
      '<header class="header" id="topo">' +
        '<div class="container header__main">' +
          '<button type="button" class="icon-btn header__menu" data-abrir-menu aria-label="Abrir menu" aria-controls="menu-mobile" aria-expanded="false">' + I('menu') + '</button>' +
          '<a href="index.html" class="header__logo" aria-label="Aura, página inicial"><img src="assets/img/logo-preta.png" alt="Aura" width="874" height="303"></a>' +
          '<form class="busca" role="search" action="catalogo.html" method="get" autocomplete="off">' +
            '<label class="sr-only" for="busca-topo">Buscar produtos</label>' +
            '<input id="busca-topo" class="busca__campo" type="search" name="q" placeholder="Busque por janela, porta, box, medida..." aria-autocomplete="list" aria-controls="busca-resultados">' +
            '<button class="busca__botao" type="submit" aria-label="Buscar">' + I('search') + '</button>' +
            '<div class="busca__resultados" id="busca-resultados" hidden></div>' +
          '</form>' +
          '<div class="header__acoes">' +
            '<div class="dropdown" data-dropdown>' +
              '<button type="button" class="header__atendimento" aria-expanded="false" aria-controls="painel-atendimento" aria-label="Atendimento: fale com a gente">' + I('chat') + '<span><small>Atendimento</small><strong>Fale com a gente</strong></span>' + I('down', 'icon--xs') + '</button>' +
              htmlAtendimento() +
            '</div>' +
            '<a href="catalogo.html?favoritos=1" class="icon-btn header__fav" aria-label="Meus favoritos">' + I('heart') + '<span class="contador" data-contador-fav hidden>0</span></a>' +
            '<button type="button" class="icon-btn header__carrinho" data-abrir-carrinho aria-label="Abrir carrinho">' + I('bag') + '<span class="contador" data-contador-carrinho hidden>0</span></button>' +
          '</div>' +
        '</div>' +
        '<nav class="header__nav" aria-label="Categorias">' +
          '<div class="container nav">' +
            '<div class="mega" data-mega>' +
              '<button type="button" class="nav__todos" aria-expanded="false" aria-controls="painel-todos">' + I('grid') + 'Todos os produtos' + I('down', 'icon--xs') + '</button>' +
              htmlMega() +
            '</div>' +
            '<ul class="nav__lista">' + nav.map(function (n) {
              return '<li><a class="nav__link" data-nav="' + n.key + '" href="' + n.href + '">' + esc(n.txt) + '</a></li>';
            }).join('') + '</ul>' +
            (Aura.volumeAtivo ? '<a class="nav__destaque" href="ajuda.html#desconto-por-volume">' + I('percent') + Aura.preencher('Acima de {volumeAcimaDe} itens, {volumePercentual}% off') + '</a>' : '') +
          '</div>' +
        '</nav>' +
      '</header>' +
      htmlMenuMobile(nav)
    );
  }

  function htmlMenuMobile(nav) {
    var cats = Aura.categorias.map(function (c) {
      return (
        '<details class="mmenu__grupo">' +
          '<summary>' + esc(c.nome) + I('down', 'icon--xs') + '</summary>' +
          '<ul>' +
            '<li><a href="' + Aura.urlCatalogo({ categoria: c.slug }) + '">Ver tudo em ' + esc(c.nome.toLowerCase()) + '</a></li>' +
            c.subs.map(function (s) { return '<li><a href="' + Aura.urlCatalogo({ categoria: s.slug }) + '">' + esc(s.nome) + '</a></li>'; }).join('') +
          '</ul>' +
        '</details>'
      );
    }).join('');
    return (
      '<div class="drawer drawer--esquerda" id="menu-mobile" aria-hidden="true">' +
        '<div class="drawer__fundo" data-fechar-drawer></div>' +
        '<aside class="drawer__painel" role="dialog" aria-modal="true" aria-label="Menu">' +
          '<div class="drawer__topo"><img src="assets/img/logo-preta.png" alt="Aura" class="mmenu__logo" width="874" height="303"><button type="button" class="icon-btn" data-fechar-drawer aria-label="Fechar menu">' + I('x') + '</button></div>' +
          '<div class="drawer__corpo mmenu">' +
            '<a class="mmenu__todos" href="catalogo.html">' + I('grid') + 'Todos os produtos</a>' +
            cats +
            '<ul class="mmenu__links">' +
              nav.slice(3).map(function (n) { return '<li><a href="' + n.href + '">' + esc(n.txt) + '</a></li>'; }).join('') +
              '<li><a href="catalogo.html?favoritos=1">Meus favoritos</a></li>' +
            '</ul>' +
            '<div class="mmenu__atendimento">' +
              '<p class="mmenu__titulo">Atendimento</p>' +
              '<a class="btn btn--wa btn--block" href="' + Aura.linkWhatsApp('Oi! Vim pelo site e queria tirar uma dúvida.') + '" target="_blank" rel="noopener">' + I('whatsapp') + 'Chamar no WhatsApp</a>' +
              '<a class="mmenu__contato" href="tel:+' + esc(C.empresa.telefoneLink) + '">' + I('phone') + esc(C.empresa.telefone) + '</a>' +
              '<a class="mmenu__contato" href="mailto:' + esc(C.empresa.email) + '">' + I('mail') + esc(C.empresa.email) + '</a>' +
            '</div>' +
          '</div>' +
        '</aside>' +
      '</div>'
    );
  }

  /* ---------- rodapé ---------- */

  function htmlFooter() {
    var ano = new Date().getFullYear();
    var e = C.empresa;
    return (
      '<section class="pre-rodape">' +
        '<div class="container pre-rodape__inner">' +
          '<div class="pre-rodape__texto">' +
            '<span class="eyebrow eyebrow--claro"><i class="tz"></i>Atendimento de gente de verdade</span>' +
            '<h2>Ficou na dúvida da medida? Manda uma foto do vão pra gente.</h2>' +
            '<p>Nossa equipe responde no WhatsApp, confere as medidas com você e indica o produto certo. Sem compromisso e sem enrolação.</p>' +
          '</div>' +
          '<a class="btn btn--wa btn--lg" href="' + Aura.linkWhatsApp('Oi! Quero ajuda para escolher a medida certa. Posso mandar uma foto do vão?') + '" target="_blank" rel="noopener">' + I('whatsapp') + 'Chamar no WhatsApp</a>' +
        '</div>' +
      '</section>' +
      '<footer class="rodape">' +
        '<div class="container rodape__topo">' +
          '<div class="rodape__marca">' +
            '<img src="assets/img/logo-branca.png" alt="Aura" width="874" height="303">' +
            '<p>Janelas, portas e box de vidro com fabricação própria, preço justo e entrega para todo o Brasil. A gente cuida da sua obra como se fosse nossa.</p>' +
            '<div class="rodape__redes">' +
              '<a href="' + esc(e.instagram) + '" target="_blank" rel="noopener" aria-label="Instagram da Aura">' + I('instagram') + '</a>' +
              '<a href="' + esc(e.facebook) + '" target="_blank" rel="noopener" aria-label="Facebook da Aura">' + I('facebook') + '</a>' +
              '<a href="' + Aura.linkWhatsApp('Oi! Vim pelo site.') + '" target="_blank" rel="noopener" aria-label="WhatsApp da Aura">' + I('whatsapp') + '</a>' +
            '</div>' +
          '</div>' +
          '<nav class="rodape__col" aria-label="Produtos"><h3>Produtos</h3><ul>' +
            Aura.categorias.map(function (c) { return '<li><a href="' + Aura.urlCatalogo({ categoria: c.slug }) + '">' + esc(c.nome) + '</a></li>'; }).join('') +
            '<li><a href="' + Aura.urlCatalogo({ linha: 'premium' }) + '">Linha Premium</a></li>' +
            '<li><a href="' + Aura.urlCatalogo({ selo: 'pronta-entrega' }) + '">Pronta entrega</a></li>' +
            '<li><a href="catalogo.html">Ver tudo</a></li>' +
          '</ul></nav>' +
          '<nav class="rodape__col" aria-label="Ajuda"><h3>Ajuda</h3><ul>' +
            '<li><a href="ajuda.html#como-comprar">Como comprar</a></li>' +
            '<li><a href="ajuda.html#como-medir">Como medir o vão</a></li>' +
            '<li><a href="ajuda.html#entrega-e-frete">Entrega e frete</a></li>' +
            '<li><a href="ajuda.html#instalacao">Instalação</a></li>' +
            '<li><a href="ajuda.html#garantia">Garantia</a></li>' +
            '<li><a href="ajuda.html#trocas-e-devolucoes">Trocas e devoluções</a></li>' +
            '<li><a href="ajuda.html#pagamento">Formas de pagamento</a></li>' +
            '<li><a href="sobre.html">Sobre a Aura</a></li>' +
          '</ul></nav>' +
          '<div class="rodape__col"><h3>Atendimento</h3><ul class="rodape__contato">' +
            '<li><a href="' + Aura.linkWhatsApp('Oi! Vim pelo site.') + '" target="_blank" rel="noopener">' + I('whatsapp') + 'WhatsApp</a></li>' +
            '<li><a href="tel:+' + esc(e.telefoneLink) + '">' + I('phone') + esc(e.telefone) + '</a></li>' +
            '<li><a href="mailto:' + esc(e.email) + '">' + I('mail') + esc(e.email) + '</a></li>' +
          '</ul>' +
          '<ul class="rodape__horario">' + e.horario.map(function (h) { return '<li><span>' + esc(h.dias) + '</span><span>' + esc(h.horas) + '</span></li>'; }).join('') + '</ul>' +
          '</div>' +
        '</div>' +
        '<div class="container rodape__selos">' +
          '<div><h3>Formas de pagamento</h3><ul class="pagamentos">' +
            ['Pix', 'Visa', 'Mastercard', 'Elo', 'Hipercard', 'American Express', 'Boleto'].map(function (b) { return '<li>' + b + '</li>'; }).join('') +
          '</ul></div>' +
          '<div><h3>Compra segura</h3><ul class="pagamentos pagamentos--seguranca"><li>' + I('lock') + 'Site protegido com SSL</li><li>' + I('shield') + 'Garantia de fábrica</li></ul></div>' +
        '</div>' +
        '<div class="container rodape__base">' +
          '<p>© ' + ano + ' ' + esc(e.razaoSocial) + ' · CNPJ ' + esc(e.cnpj) + '</p>' +
          '<p>' + esc(e.endereco) + '</p>' +
        '</div>' +
      '</footer>'
    );
  }

  /* ---------- carrinho lateral ---------- */

  function htmlDrawerCarrinho() {
    return (
      '<div class="drawer" id="drawer-carrinho" aria-hidden="true">' +
        '<div class="drawer__fundo" data-fechar-drawer></div>' +
        '<aside class="drawer__painel" role="dialog" aria-modal="true" aria-labelledby="drawer-carrinho-titulo">' +
          '<div class="drawer__topo"><h2 id="drawer-carrinho-titulo">Seu carrinho <span data-drawer-qtd></span></h2><button type="button" class="icon-btn" data-fechar-drawer aria-label="Fechar carrinho">' + I('x') + '</button></div>' +
          '<div class="drawer__volume" data-drawer-volume></div>' +
          '<div class="drawer__corpo" data-drawer-itens></div>' +
          '<div class="drawer__rodape" data-drawer-rodape></div>' +
        '</aside>' +
      '</div>'
    );
  }

  Aura.htmlOpcoesItem = function (it) {
    var o = it.opcoes || {};
    return Object.keys(o).map(function (k) { return '<span>' + esc(k) + ': ' + esc(o[k]) + '</span>'; }).join('');
  };

  function renderDrawer() {
    var el = document.getElementById('drawer-carrinho');
    if (!el) return;
    // lembra qual controle tinha o foco para devolver depois de redesenhar
    var ativo = document.activeElement;
    var foco = null;
    if (ativo && el.contains(ativo)) {
      ['data-qtd-menos', 'data-qtd-mais', 'data-qtd-input', 'data-remover'].some(function (attr) {
        if (!ativo.hasAttribute(attr)) return false;
        var item = ativo.closest('.mini-item');
        foco = { attr: attr, key: ativo.getAttribute(attr), indice: Array.prototype.indexOf.call(el.querySelectorAll('.mini-item'), item) };
        return true;
      });
    }
    pintarDrawer(el);
    if (foco) {
      var alvo = Array.prototype.filter.call(el.querySelectorAll('[' + foco.attr + ']'), function (x) {
        return x.getAttribute(foco.attr) === foco.key && !x.disabled;
      })[0];
      if (!alvo && foco.attr === 'data-qtd-menos') {
        alvo = Array.prototype.filter.call(el.querySelectorAll('[data-qtd-input]'), function (x) { return x.getAttribute('data-qtd-input') === foco.key; })[0];
      }
      if (!alvo) {
        var nomes = el.querySelectorAll('.mini-item__nome');
        alvo = nomes[Math.min(Math.max(foco.indice, 0), nomes.length - 1)] || el.querySelector('.vazio .btn') || el.querySelector('[data-fechar-drawer].icon-btn');
      }
      if (alvo) alvo.focus();
    }
  }

  function pintarDrawer(el) {
    var r = Aura.carrinho.resumo();
    el.querySelector('[data-drawer-qtd]').textContent = r.unidades ? '(' + r.unidades + ')' : '';
    el.querySelector('[data-drawer-volume]').innerHTML = Aura.barraVolume(r, true);
    var corpo = el.querySelector('[data-drawer-itens]');
    var rod = el.querySelector('[data-drawer-rodape]');
    if (r.vazio) {
      corpo.innerHTML =
        '<div class="vazio">' + I('bag', 'vazio__icone') +
          '<p class="vazio__titulo">Seu carrinho está vazio</p>' +
          '<p>Escolha o modelo, a medida e a quantidade. A gente cuida do resto.</p>' +
          '<a class="btn btn--dark" href="catalogo.html">Ver produtos</a>' +
        '</div>';
      rod.innerHTML = '';
      return;
    }
    corpo.innerHTML = '<ul class="mini-itens">' + r.linhas.map(function (l) {
      return (
        '<li class="mini-item">' +
          '<a class="mini-item__img" href="' + Aura.urlProduto(l.produto) + '">' + Aura.imagemProduto(l.produto, 0, '1/1', false) + '</a>' +
          '<div class="mini-item__info">' +
            '<a class="mini-item__nome" href="' + Aura.urlProduto(l.produto) + '">' + esc(l.produto.nome) + '</a>' +
            '<p class="mini-item__det"><span>' + esc(Aura.rotuloMedida(l.medida)) + '</span>' + Aura.htmlOpcoesItem(l.item) + '</p>' +
            '<div class="mini-item__linha">' +
              stepper(l.item.key, l.item.qtd, true) +
              '<strong>' + Aura.brl(l.total) + '</strong>' +
            '</div>' +
          '</div>' +
          '<button type="button" class="mini-item__remover" data-remover="' + esc(l.item.key) + '" aria-label="Remover ' + esc(l.produto.nome) + '">' + I('trash') + '</button>' +
        '</li>'
      );
    }).join('') + '</ul>';
    rod.innerHTML =
      '<dl class="totais">' +
        '<div><dt>Subtotal</dt><dd>' + Aura.brl(r.subtotal) + '</dd></div>' +
        (r.desconto ? '<div class="totais__desconto"><dt>Desconto por volume (' + r.volume.percentual + '%)</dt><dd>' + Aura.brl(r.desconto) + ' a menos</dd></div>' : '') +
        '<div class="totais__total"><dt>Total</dt><dd>' + Aura.brl(r.total) + '</dd></div>' +
        (Aura.pixPercentual ? '<div class="totais__pix"><dt>' + I('pix') + 'No Pix</dt><dd>' + Aura.brl(r.pix) + '</dd></div>' : '') +
      '</dl>' +
      (Aura.armazenamentoOk
        ? '<p class="drawer__nota">Frete calculado na próxima etapa. Você finaliza pelo WhatsApp com a nossa equipe.</p>' +
          '<a class="btn btn--accent btn--block btn--lg" href="carrinho.html#finalizar">Finalizar pedido' + I('arrow') + '</a>'
        : '<p class="aviso-box aviso-box--atencao drawer__aviso">' + I('info') + '<span>Seu navegador está bloqueando os dados salvos do site, então o carrinho não passa para outra página. Envie o pedido direto pelo WhatsApp que a gente confirma frete e pagamento com você.</span></p>' +
          '<a class="btn btn--wa btn--block btn--lg" href="' + Aura.linkWhatsApp(Aura.msgCarrinho(r)) + '" target="_blank" rel="noopener">' + I('whatsapp') + 'Enviar pedido pelo WhatsApp</a>') +
      '<button type="button" class="btn btn--ghost btn--block" data-fechar-drawer>Continuar comprando</button>';
  }

  function stepper(key, qtd, pequeno) {
    return (
      '<div class="stepper' + (pequeno ? ' stepper--sm' : '') + '">' +
        '<button type="button" data-qtd-menos="' + esc(key) + '" aria-label="Diminuir quantidade"' + (qtd <= 1 ? ' disabled' : '') + '>' + I('minus') + '</button>' +
        '<input type="number" inputmode="numeric" min="1" max="999" value="' + qtd + '" data-qtd-input="' + esc(key) + '" aria-label="Quantidade">' +
        '<button type="button" data-qtd-mais="' + esc(key) + '" aria-label="Aumentar quantidade">' + I('plus') + '</button>' +
      '</div>'
    );
  }
  Aura.stepperCarrinho = stepper;

  /* ---------- drawers (abrir e fechar com foco preso) ---------- */

  var ultimoFoco = null;

  Aura.abrirDrawer = function (id) {
    var d = document.getElementById(id);
    if (!d) return;
    ultimoFoco = document.activeElement;
    d.setAttribute('aria-hidden', 'false');
    d.classList.add('is-aberto');
    document.documentElement.classList.add('trava-rolagem');
    var foco = d.querySelector('[data-fechar-drawer].icon-btn') || d.querySelector('button, a');
    setTimeout(function () { if (foco) foco.focus(); }, 60);
    if (id === 'menu-mobile') {
      var b = document.querySelector('[data-abrir-menu]');
      if (b) b.setAttribute('aria-expanded', 'true');
    }
  };

  Aura.fecharDrawers = function () {
    var abertos = document.querySelectorAll('.drawer.is-aberto');
    if (!abertos.length) return;
    abertos.forEach(function (d) {
      d.classList.remove('is-aberto');
      d.setAttribute('aria-hidden', 'true');
    });
    document.documentElement.classList.remove('trava-rolagem');
    var b = document.querySelector('[data-abrir-menu]');
    if (b) b.setAttribute('aria-expanded', 'false');
    if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
  };

  Aura.abrirCarrinho = function () {
    renderDrawer();
    Aura.abrirDrawer('drawer-carrinho');
  };

  /* ---------- pop-up do WhatsApp ---------- */

  function htmlWhats() {
    var w = C.whatsapp;
    var aberto = Aura.atendimentoAberto();
    var agora = new Date();
    var hora = String(agora.getHours()).padStart(2, '0') + ':' + String(agora.getMinutes()).padStart(2, '0');
    return (
      '<div class="wa" data-wa>' +
        '<div class="wa__card" id="wa-card" role="dialog" aria-modal="false" aria-labelledby="wa-titulo" hidden>' +
          '<div class="wa__topo">' +
            '<div class="wa__avatar"><img src="assets/img/favicon.png" alt="" width="40" height="40"><i class="' + (aberto ? 'is-online' : '') + '"></i></div>' +
            '<div class="wa__quem"><strong id="wa-titulo">' + esc(w.nomeAtendente) + '</strong><span>' + (aberto ? 'Online agora, responde em minutos' : 'Respondemos assim que abrirmos') + '</span></div>' +
            '<button type="button" class="wa__fechar" data-wa-fechar aria-label="Fechar conversa">' + I('x') + '</button>' +
          '</div>' +
          '<div class="wa__conversa">' +
            '<div class="wa__balao"><p>' + esc(w.saudacao) + '</p><time>' + hora + '</time></div>' +
          '</div>' +
          '<div class="wa__atalhos">' + w.atalhos.map(function (a, i) {
            return '<button type="button" data-wa-atalho="' + i + '">' + esc(a.rotulo) + '</button>';
          }).join('') + '</div>' +
          '<form class="wa__form" data-wa-form>' +
            '<label class="sr-only" for="wa-msg">Sua mensagem</label>' +
            '<input id="wa-msg" type="text" placeholder="Escreva sua mensagem" maxlength="500" autocomplete="off">' +
            '<button type="submit" aria-label="Enviar no WhatsApp">' + I('send') + '</button>' +
          '</form>' +
        '</div>' +
        '<button type="button" class="wa__fab" data-wa-abrir aria-controls="wa-card" aria-expanded="false" aria-label="Conversar no WhatsApp">' +
          I('whatsapp') + '<span class="wa__fab-txt">Fale com a gente</span><i class="wa__ping" aria-hidden="true"></i>' +
        '</button>' +
      '</div>'
    );
  }

  var waVisto = false;

  // pelaPessoa = aberto por clique/teclado: o foco entra no cartão. Abertura automática não rouba o foco.
  function abrirWhats(abrir, pelaPessoa) {
    var card = document.getElementById('wa-card');
    var fab = document.querySelector('[data-wa-abrir]');
    if (!card) return;
    var vai = abrir === undefined ? card.hidden : abrir;
    if (!vai && card.hidden) return;
    var focoDentro = card.contains(document.activeElement);
    card.hidden = !vai;
    fab.setAttribute('aria-expanded', String(vai));
    document.querySelector('[data-wa]').classList.toggle('is-aberto', vai);
    if (vai) {
      waVisto = true;
      try { sessionStorage.setItem('aura.wa.visto', '1'); } catch (e) {}
      var ping = fab.querySelector('.wa__ping');
      if (ping) ping.remove();
      if (pelaPessoa) {
        setTimeout(function () {
          var alvo = card.querySelector('[data-wa-atalho]') || document.getElementById('wa-msg');
          if (alvo) alvo.focus();
        }, 0);
      }
    } else if (focoDentro) {
      fab.focus();
    }
  }
  Aura.abrirWhatsPopup = abrirWhats;

  /* ---------- busca com sugestões ---------- */

  function iniciarBusca() {
    var form = document.querySelector('.busca');
    if (!form) return;
    var campo = form.querySelector('.busca__campo');
    var box = form.querySelector('.busca__resultados');
    var q = Aura.param('q');
    if (q) campo.value = q;
    var timer;
    function render() {
      var t = campo.value.trim();
      if (t.length < 2) { box.hidden = true; return; }
      var res = Aura.buscar(t);
      if (!res.length) {
        box.innerHTML = '<p class="busca__vazio">Não achamos nada com "' + esc(t) + '". Tente "janela", "porta" ou "box".</p>';
      } else {
        box.innerHTML =
          '<ul>' + res.slice(0, 6).map(function (p) {
            return '<li><a href="' + Aura.urlProduto(p) + '">' +
              '<span class="busca__thumb">' + Aura.imagemProduto(p, 0, '1/1', false) + '</span>' +
              '<span class="busca__info"><strong>' + esc(p.nome) + '</strong><small>A partir de ' + Aura.brl(Aura.precoMin(p)) + '</small></span>' +
            '</a></li>';
          }).join('') + '</ul>' +
          '<a class="busca__todos" href="' + Aura.urlCatalogo({ q: t }) + '">Ver ' + res.length + ' ' + Aura.plural(res.length, 'resultado', 'resultados') + ' para "' + esc(t) + '"' + I('arrow') + '</a>';
      }
      box.hidden = false;
    }
    campo.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(render, 120);
    });
    campo.addEventListener('focus', render);
    campo.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { box.hidden = true; campo.blur(); }
      if (e.key === 'ArrowDown') {
        var first = box.querySelector('a');
        if (first) { e.preventDefault(); first.focus(); }
      }
    });
    box.addEventListener('keydown', function (e) {
      var links = Array.prototype.slice.call(box.querySelectorAll('a'));
      var i = links.indexOf(document.activeElement);
      if (e.key === 'ArrowDown' && i < links.length - 1) { e.preventDefault(); links[i + 1].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); if (i > 0) links[i - 1].focus(); else campo.focus(); }
      if (e.key === 'Escape') { box.hidden = true; campo.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (!form.contains(e.target)) box.hidden = true;
    });
    form.addEventListener('focusout', function (e) {
      if (!e.relatedTarget || !form.contains(e.relatedTarget)) box.hidden = true;
    });
    form.addEventListener('submit', function (e) {
      if (!campo.value.trim()) e.preventDefault();
    });
  }

  /* ---------- contadores ---------- */

  function atualizarContadores() {
    var n = Aura.carrinho.unidades();
    document.querySelectorAll('[data-contador-carrinho]').forEach(function (el) {
      el.textContent = n > 99 ? '99+' : n;
      el.hidden = n === 0;
    });
    document.querySelectorAll('.header__carrinho[data-abrir-carrinho]').forEach(function (b) {
      b.setAttribute('aria-label', n ? 'Abrir carrinho, ' + n + ' ' + Aura.plural(n, 'item', 'itens') : 'Abrir carrinho');
    });
    var f = Aura.favoritos.lista().length;
    document.querySelectorAll('[data-contador-fav]').forEach(function (el) {
      el.textContent = f;
      el.hidden = f === 0;
    });
    document.querySelectorAll('.header__fav').forEach(function (b) {
      b.setAttribute('aria-label', f ? 'Meus favoritos, ' + f + ' ' + Aura.plural(f, 'salvo', 'salvos') : 'Meus favoritos');
    });
  }

  /* ---------- carrossel horizontal ---------- */

  Aura.iniciarCarrosseis = function (raiz) {
    (raiz || document).querySelectorAll('[data-carrossel]').forEach(function (wrap) {
      if (wrap.dataset.pronto) return;
      wrap.dataset.pronto = '1';
      var trilho = wrap.querySelector('.carrossel__trilho');
      var ant = wrap.querySelector('[data-carrossel-ant]');
      var prox = wrap.querySelector('[data-carrossel-prox]');
      if (!trilho) return;
      function passo() {
        var item = trilho.firstElementChild;
        return item ? item.getBoundingClientRect().width + parseFloat(getComputedStyle(trilho).columnGap || 16) : 300;
      }
      function estado() {
        if (!ant || !prox) return;
        ant.disabled = trilho.scrollLeft < 8;
        prox.disabled = trilho.scrollLeft + trilho.clientWidth > trilho.scrollWidth - 8;
      }
      function comport() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      }
      if (ant) ant.addEventListener('click', function () { trilho.scrollBy({ left: -passo() * 2, behavior: comport() }); });
      if (prox) prox.addEventListener('click', function () { trilho.scrollBy({ left: passo() * 2, behavior: comport() }); });
      trilho.addEventListener('scroll', function () { window.requestAnimationFrame(estado); }, { passive: true });
      window.addEventListener('resize', estado);
      estado();
    });
  };

  /* ---------- avisos rotativos ---------- */

  function iniciarAvisos() {
    var itens = document.querySelectorAll('.avisos__item');
    if (itens.length < 2) return;
    var i = 0;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setInterval(function () {
      itens[i].classList.remove('is-ativo');
      i = (i + 1) % itens.length;
      itens[i].classList.add('is-ativo');
    }, 4200);
  }

  /* ---------- link ativo no menu ---------- */

  function marcarMenu() {
    var pagina = document.body.dataset.pagina;
    var chave = pagina;
    if (pagina === 'catalogo') {
      var cat = Aura.param('categoria');
      var sub = cat && Aura.subcategoria(cat);
      chave = sub ? sub.cat.slug : cat || (Aura.param('linha') === 'premium' ? 'premium' : Aura.param('selo'));
    }
    if (pagina === 'produto') {
      var p = Aura.porSlug(Aura.param('p')) || Aura.porId(Aura.param('p'));
      chave = p && p.categoria;
    }
    if (!chave) return;
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      if (a.getAttribute('data-nav') !== chave) return;
      a.classList.add('is-ativo');
      a.setAttribute('aria-current', 'page');
    });
  }

  /* ---------- dados estruturados da empresa ---------- */

  function jsonLdOrganizacao() {
    var e = C.empresa;
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: e.nomeCompleto,
      url: e.site,
      logo: e.site.replace(/\/$/, '') + '/assets/img/logo-preta.png',
      telephone: e.telefone,
      email: e.email,
      address: { '@type': 'PostalAddress', streetAddress: e.endereco, addressCountry: 'BR' },
      sameAs: [e.instagram, e.facebook],
    });
    document.head.appendChild(s);
  }

  /* ---------- eventos globais ---------- */

  function fecharPaineis(exceto) {
    document.querySelectorAll('[data-dropdown].is-aberto, [data-mega].is-aberto').forEach(function (d) {
      if (d === exceto) return;
      d.classList.remove('is-aberto');
      var b = d.querySelector('[aria-expanded]');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  }

  function eventos() {
    document.addEventListener('focusin', function (e) {
      var dentro = e.target.closest && e.target.closest('[data-dropdown], [data-mega]');
      fecharPaineis(dentro);
    });

    document.addEventListener('click', function (e) {
      var t = e.target;
      var el;
      if (!t.closest('[data-dropdown], [data-mega]')) fecharPaineis(null);

      if ((el = t.closest('[data-abrir-carrinho]'))) { e.preventDefault(); Aura.abrirCarrinho(); return; }
      if ((el = t.closest('[data-abrir-menu]'))) { e.preventDefault(); Aura.abrirDrawer('menu-mobile'); return; }
      if ((el = t.closest('[data-fechar-drawer]'))) { e.preventDefault(); Aura.fecharDrawers(); return; }

      if ((el = t.closest('[data-fav]'))) {
        e.preventDefault();
        var id = el.getAttribute('data-fav');
        var ativo = Aura.favoritos.alternar(id);
        document.querySelectorAll('[data-fav="' + id + '"]').forEach(function (b) {
          b.classList.toggle('is-ativo', ativo);
          b.setAttribute('aria-pressed', String(ativo));
        });
        Aura.toast(ativo ? 'Salvo nos seus favoritos' : 'Removido dos favoritos');
        return;
      }

      if ((el = t.closest('[data-wa-produto]'))) {
        e.preventDefault();
        var p = Aura.porId(el.getAttribute('data-wa-produto'));
        if (p) Aura.abrirWhatsApp(Aura.msgCard(p));
        return;
      }

      if ((el = t.closest('[data-qtd-menos]'))) {
        var k1 = el.getAttribute('data-qtd-menos');
        var it1 = Aura.carrinho.itens().filter(function (x) { return x.key === k1; })[0];
        if (it1 && it1.qtd > 1) Aura.carrinho.definirQtd(k1, it1.qtd - 1);
        return;
      }
      if ((el = t.closest('[data-qtd-mais]'))) {
        var k2 = el.getAttribute('data-qtd-mais');
        var it2 = Aura.carrinho.itens().filter(function (x) { return x.key === k2; })[0];
        if (it2) Aura.carrinho.definirQtd(k2, it2.qtd + 1);
        return;
      }
      if ((el = t.closest('[data-remover]'))) {
        Aura.carrinho.remover(el.getAttribute('data-remover'));
        Aura.toast('Item removido do carrinho');
        return;
      }

      if ((el = t.closest('[data-wa-abrir]'))) { abrirWhats(undefined, true); return; }
      if ((el = t.closest('[data-wa-fechar]'))) { abrirWhats(false); return; }
      if ((el = t.closest('[data-wa-atalho]'))) {
        var a = C.whatsapp.atalhos[+el.getAttribute('data-wa-atalho')];
        if (a) Aura.abrirWhatsApp(a.mensagem);
        return;
      }

      // dropdowns e mega menu (clique)
      var dd = t.closest('[data-dropdown], [data-mega]');
      fecharPaineis(dd);
      if (dd && t.closest('.header__atendimento, .nav__todos')) {
        var aberto = dd.classList.toggle('is-aberto');
        var btn = dd.querySelector('[aria-expanded]');
        if (btn) btn.setAttribute('aria-expanded', String(aberto));
      }
    });

    document.addEventListener('change', function (e) {
      var el = e.target.closest('[data-qtd-input]');
      if (el) Aura.carrinho.definirQtd(el.getAttribute('data-qtd-input'), Math.max(1, parseInt(el.value, 10) || 1));
    });

    document.addEventListener('submit', function (e) {
      if (e.target.matches('[data-wa-form]')) {
        e.preventDefault();
        var inp = e.target.querySelector('input');
        var msg = inp.value.trim() || 'Oi! Vim pelo site e queria tirar uma dúvida.';
        Aura.abrirWhatsApp(msg);
        inp.value = '';
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var painel = document.activeElement && document.activeElement.closest && document.activeElement.closest('[data-dropdown].is-aberto, [data-mega].is-aberto');
        Aura.fecharDrawers();
        abrirWhats(false);
        fecharPaineis(null);
        if (painel) {
          var botao = painel.querySelector('[aria-expanded]');
          if (botao) botao.focus();
        }
      }
      // prende o foco dentro do drawer aberto
      if (e.key === 'Tab') {
        var d = document.querySelector('.drawer.is-aberto .drawer__painel');
        if (!d) return;
        var focaveis = d.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, summary');
        if (!focaveis.length) return;
        var primeiro = focaveis[0];
        var ultimo = focaveis[focaveis.length - 1];
        if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
        else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
      }
    });

    window.addEventListener('aura:carrinho', function (e) {
      atualizarContadores();
      renderDrawer();
      if (e.detail && e.detail.motivo === 'adicionado') {
        var b = document.querySelector('.header__carrinho');
        if (b) {
          b.classList.remove('pulsa');
          void b.offsetWidth;
          b.classList.add('pulsa');
        }
      }
    });
    window.addEventListener('aura:favoritos', atualizarContadores);

    // cabeçalho compacto ao rolar
    var header = document.querySelector('.header');
    var ultimo = false;
    function aoRolar() {
      // histerese maior que a variação de altura do cabeçalho, para não ficar alternando
      var y = window.scrollY;
      var rolou = ultimo ? y > 20 : y > 120;
      if (rolou !== ultimo) {
        header.classList.toggle('is-rolado', rolou);
        ultimo = rolou;
      }
    }
    window.addEventListener('scroll', aoRolar, { passive: true });
    aoRolar();
  }

  /* ---------- revelar ao rolar ---------- */

  Aura.revelar = function (raiz) {
    var els = (raiz || document).querySelectorAll('[data-revelar]:not(.is-visivel)');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(function (el) { el.classList.add('is-visivel'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-visivel');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  };

  /* ---------- atributos declarativos usados no HTML das páginas ----------
     data-icone="truck"            insere o ícone no começo do elemento
     data-mockup="Rótulo"          vira um espaço de imagem (data-ratio="4/5", data-src="caminho.jpg" para usar foto)
     data-whats-link="mensagem"    vira link do WhatsApp com a mensagem
     data-preencher                troca {pix}, {parcelas}, {volumeAcimaDe}, {volumePercentual}, {garantiaEssencial},
                                   {garantiaPremium}, {garantiaBox}, {prazoProntaEntrega}, {prazoSobEncomenda} e {regraMedida}
     data-contar="janelas"         escreve "28 opções" (categoria ou subcategoria)
  */
  Aura.hidratar = function (raiz) {
    raiz = raiz || document;
    raiz.querySelectorAll('[data-mockup]').forEach(function (el) {
      var ratio = el.getAttribute('data-ratio');
      var html = Aura.mockup({
        rotulo: el.getAttribute('data-mockup'),
        alt: el.getAttribute('data-alt') || el.getAttribute('data-mockup'),
        src: el.getAttribute('data-src'),
        ratio: ratio && ratio !== 'auto' ? ratio : null,
        cls: el.className || null,
      });
      el.outerHTML = html;
    });
    raiz.querySelectorAll('[data-icone]').forEach(function (el) {
      if (el.dataset.iconePronto) return;
      el.dataset.iconePronto = '1';
      el.insertAdjacentHTML('afterbegin', I(el.getAttribute('data-icone')));
    });
    raiz.querySelectorAll('[data-whats-link]').forEach(function (el) {
      el.setAttribute('href', Aura.linkWhatsApp(el.getAttribute('data-whats-link')));
    });
    raiz.querySelectorAll('[data-preencher]').forEach(function (el) {
      if (el.dataset.preenchido) return;
      el.dataset.preenchido = '1';
      el.innerHTML = Aura.preencher(el.innerHTML);
    });
    raiz.querySelectorAll('[data-contar]').forEach(function (el) {
      var k = el.getAttribute('data-contar');
      var n = Aura.contar(function (p) { return p.categoria === k || p.subcategoria === k; });
      el.textContent = n + ' ' + Aura.plural(n, 'opção', 'opções');
    });
  };

  /* ---------- montagem ---------- */

  function montar() {
    var h = document.getElementById('aura-header');
    var f = document.getElementById('aura-footer');
    if (h) h.outerHTML = htmlHeader();
    if (f) f.outerHTML = htmlFooter();
    document.body.insertAdjacentHTML('beforeend', htmlDrawerCarrinho() + htmlWhats());
    Aura.hidratar(document);
    eventos();
    iniciarBusca();
    iniciarAvisos();
    atualizarContadores();
    marcarMenu();
    jsonLdOrganizacao();

    var seg = C.whatsapp.abrirSozinhoApos;
    var visto = false;
    try { visto = sessionStorage.getItem('aura.wa.visto') === '1'; } catch (e) {}
    if (seg > 0 && !visto && document.body.dataset.pagina !== 'carrinho') {
      setTimeout(function () {
        var ja = waVisto;
        try { ja = ja || sessionStorage.getItem('aura.wa.visto') === '1'; } catch (e) {}
        // não abre por cima de gaveta, menu aberto ou enquanto a pessoa digita
        var ocupado = document.querySelector('.drawer.is-aberto, [data-dropdown].is-aberto, [data-mega].is-aberto') ||
          (document.activeElement && /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName));
        if (!ja && !ocupado && window.innerHeight >= 500) abrirWhats(true);
      }, seg * 1000);
    }

    // abre o carrinho se o link pedir (#carrinho)
    if (window.location.hash === '#carrinho') Aura.abrirCarrinho();
  }

  Aura.montarLayout = montar;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar);
  else montar();
})();
