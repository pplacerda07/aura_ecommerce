/*
  NÚCLEO DA LOJA AURA
  Regras de preço, carrinho, favoritos, desconto por volume, frete simulado e mensagens do WhatsApp.
  Não tem nada visual aqui. O visual fica em ui.js e nos arquivos de cada página.
*/
(function () {
  'use strict';

  var C = window.AURA_CONFIG;
  var PRODUTOS = window.AURA_PRODUTOS || [];
  var CATEGORIAS = window.AURA_CATEGORIAS || [];
  var Aura = (window.Aura = window.Aura || {});

  Aura.config = C;
  Aura.produtos = PRODUTOS;
  Aura.categorias = CATEGORIAS;
  Aura.linhas = window.AURA_LINHAS || {};
  Aura.cores = window.AURA_CORES || {};
  Aura.selos = window.AURA_SELOS || {};

  /* ---------- utilidades ---------- */

  var BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  Aura.brl = function (v) {
    return BRL.format(Number(v) || 0);
  };

  Aura.esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  Aura.normalizar = function (s) {
    return String(s || '')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .trim();
  };

  Aura.param = function (nome) {
    try {
      return new URLSearchParams(window.location.search).get(nome);
    } catch (e) {
      return null;
    }
  };

  Aura.plural = function (n, um, varios) {
    return n === 1 ? um : varios;
  };

  function cm2m(cm) {
    return (cm / 100).toFixed(2).replace('.', ',');
  }
  Aura.cm2m = cm2m;

  Aura.rotuloMedida = function (m) {
    if (!m) return '';
    return m.rotulo || cm2m(m.largura) + ' x ' + cm2m(m.altura) + ' m';
  };

  /* ---------- armazenamento seguro ---------- */

  // Usa o localStorage. Se o navegador bloquear (modo privado, cookies bloqueados, cheio),
  // guarda na memória da página: o carrinho funciona enquanto a página estiver aberta.
  var memoria = {};
  var store = {
    get: function (k, padrao) {
      try {
        var v = window.localStorage.getItem(k);
        if (v) return JSON.parse(v);
      } catch (e) {}
      try {
        return Object.prototype.hasOwnProperty.call(memoria, k) ? JSON.parse(memoria[k]) : padrao;
      } catch (e) {
        return padrao;
      }
    },
    // devolve true se salvou de forma permanente, false se ficou só na memória desta página
    set: function (k, v) {
      var json = JSON.stringify(v);
      memoria[k] = json;
      try {
        window.localStorage.setItem(k, json);
        return true;
      } catch (e) {
        return false;
      }
    },
    remove: function (k) {
      delete memoria[k];
      try {
        window.localStorage.removeItem(k);
      } catch (e) {}
    },
  };

  // false quando o navegador não deixa salvar nada (o carrinho vale só enquanto a página estiver aberta)
  Aura.armazenamentoOk = (function () {
    try {
      var t = '__aura_teste__';
      window.localStorage.setItem(t, '1');
      window.localStorage.removeItem(t);
      return true;
    } catch (e) {
      return false;
    }
  })();
  Aura.store = store;

  /* ---------- preço ---------- */

  var PIX = (C.pagamento && C.pagamento.pixPercentual) || 0;
  var PARCELAS = (C.pagamento && C.pagamento.maxParcelas) || 1;

  Aura.pixPercentual = PIX;
  Aura.maxParcelas = PARCELAS;

  // arredonda para centavos
  function r2(v) {
    return Math.round(v * 100) / 100;
  }
  Aura.r2 = r2;

  Aura.precoPix = function (v) {
    return r2(v * (1 - PIX / 100));
  };

  // parcela sem juros: trunca os centavos para nunca passar do total
  Aura.parcela = function (v, n) {
    n = n || PARCELAS;
    // o Math.round interno elimina o erro de ponto flutuante (379,90 / 10 = 37,99 e não 37,98)
    var centavos = Math.floor(Math.round(((v * 100) / n) * 1000) / 1000);
    return centavos / 100;
  };

  Aura.precoMin = function (p) {
    return Math.min.apply(null, p.medidas.map(function (m) { return m.preco; }));
  };

  Aura.precoMax = function (p) {
    return Math.max.apply(null, p.medidas.map(function (m) { return m.preco; }));
  };

  Aura.resumoMedidas = function (p) {
    var n = p.medidas.length;
    if (n === 1) return '1 medida: ' + Aura.rotuloMedida(p.medidas[0]);
    var ord = p.medidas.slice().sort(function (a, b) { return a.preco - b.preco; });
    var menor = ord[0];
    var maior = ord[ord.length - 1];
    return n + ' medidas, de ' + Aura.rotuloMedida(menor).replace(' m', '') + ' a ' + Aura.rotuloMedida(maior);
  };

  Aura.temEstoque = function (p) {
    return p.medidas.some(function (m) { return m.estoque > 0; });
  };

  /* ---------- catálogo ---------- */

  var porSlug = {};
  var porId = {};
  PRODUTOS.forEach(function (p) {
    porSlug[p.slug] = p;
    porId[p.id] = p;
  });

  Aura.porSlug = function (s) { return porSlug[s] || null; };
  Aura.porId = function (id) { return porId[id] || null; };

  Aura.categoria = function (slug) {
    for (var i = 0; i < CATEGORIAS.length; i++) if (CATEGORIAS[i].slug === slug) return CATEGORIAS[i];
    return null;
  };

  Aura.subcategoria = function (slug) {
    for (var i = 0; i < CATEGORIAS.length; i++) {
      var c = CATEGORIAS[i];
      for (var j = 0; j < c.subs.length; j++) if (c.subs[j].slug === slug) return { cat: c, sub: c.subs[j] };
    }
    return null;
  };

  Aura.nomeLinha = function (p) {
    if (!p.linha) return 'Vidro temperado';
    return (Aura.linhas[p.linha] && Aura.linhas[p.linha].nome) || p.linha;
  };

  // nome sem o sufixo da linha (o card já mostra a linha logo acima)
  Aura.nomeCurto = function (p) {
    return p.nome.replace(/ Linha (Essencial|Premium)$/, '');
  };

  Aura.nomeCor = function (cor) {
    return (Aura.cores[cor] && Aura.cores[cor].nome) || cor;
  };

  // produtos do mesmo modelo (outras cores e acabamentos)
  Aura.irmaos = function (p) {
    return PRODUTOS.filter(function (x) { return x.modelo === p.modelo; });
  };

  Aura.rotuloOpcao = function (p) {
    var t = Aura.nomeCor(p.cor);
    if (p.grade) t += ' com grade';
    if (p.categoria === 'box-para-banheiro') t = (p.vidro.indexOf('fumê') > -1 ? 'Fumê' : 'Incolor') + ', perfil ' + Aura.nomeCor(p.cor).toLowerCase();
    return t;
  };

  Aura.relacionados = function (p, n) {
    var irm = Aura.irmaos(p).map(function (x) { return x.id; });
    return PRODUTOS.filter(function (x) { return x.id !== p.id && irm.indexOf(x.id) === -1; })
      .map(function (x) {
        var score = 0;
        if (x.subcategoria === p.subcategoria) score += 4;
        if (x.categoria === p.categoria) score += 2;
        if (x.cor === p.cor) score += 2;
        if (x.linha === p.linha) score += 1;
        score += x.vendidos / 2000;
        return { p: x, s: score };
      })
      .sort(function (a, b) { return b.s - a.s; })
      .slice(0, n || 8)
      .map(function (o) { return o.p; });
  };

  Aura.urlProduto = function (p) {
    return 'produto.html?p=' + encodeURIComponent(p.slug);
  };

  Aura.urlCatalogo = function (params) {
    var q = new URLSearchParams();
    Object.keys(params || {}).forEach(function (k) {
      if (params[k] != null && params[k] !== '') q.set(k, params[k]);
    });
    var s = q.toString();
    return 'catalogo.html' + (s ? '?' + s : '');
  };

  Aura.contar = function (filtro) {
    return PRODUTOS.filter(filtro).length;
  };

  // deixa termo e produto no mesmo formato: "1,20 x 1,00 m" vira "1.20x1.00m", "8 mm" vira "8mm",
  // "maxim-ar" vira "maximar"
  function compactar(s) {
    return s
      .replace(/\u00d7/g, 'x')
      .replace(/(\d),(\d)/g, '$1.$2')
      .replace(/(\d)\s*x\s*(\d)/g, '$1x$2')
      .replace(/(\d)\s+(mm|cm|m)\b/g, '$1$2')
      .replace(/-/g, '');
  }

  var indices = {};
  function indiceBusca(p) {
    if (indices[p.id]) return indices[p.id];
    var medidas = p.medidas.map(function (m) {
      var l = m.largura;
      var a = m.altura;
      return [l + 'x' + a, (l / 100).toFixed(2) + 'x' + (a / 100).toFixed(2), l / 100 + 'x' + a / 100, Aura.rotuloMedida(m)].join(' ');
    }).join(' ');
    indices[p.id] = compactar(Aura.normalizar([p.nome, p.id, p.categoria, p.subcategoria, Aura.nomeCor(p.cor), Aura.nomeLinha(p), p.vidro, p.abertura, medidas].join(' ')));
    return indices[p.id];
  }

  // busca por nome, código, cor, linha, vidro, abertura e medida (ex.: "vitrô preto 1,20 x 1,00")
  Aura.buscar = function (termo) {
    var t = compactar(Aura.normalizar(termo));
    if (!t) return [];
    var partes = t.split(/\s+/).map(function (x) {
      // plural simples: "janelas" acha "janela", "portas" acha "porta"
      return x.length > 4 && /s$/.test(x) && !/\d/.test(x) ? x.slice(0, -1) : x;
    });
    return PRODUTOS.map(function (p) {
      var alvo = indiceBusca(p);
      var ok = partes.every(function (x) { return alvo.indexOf(x) > -1; });
      if (!ok) return null;
      var s = compactar(Aura.normalizar(p.nome)).indexOf(t) === 0 ? 3 : 1;
      return { p: p, s: s + p.vendidos / 5000 };
    })
      .filter(Boolean)
      .sort(function (a, b) { return b.s - a.s; })
      .map(function (o) { return o.p; });
  };

  /* ---------- desconto por volume (regra universal) ---------- */

  var DV = C.descontoVolume || { ativo: false, faixas: [] };
  var FAIXAS = (DV.faixas || []).slice().sort(function (a, b) { return a.acimaDe - b.acimaDe; });

  Aura.faixasVolume = FAIXAS;
  Aura.volumeAtivo = !!DV.ativo && FAIXAS.length > 0;
  Aura.primeiraFaixa = FAIXAS[0] || null;

  // devolve { percentual, faixa, proxima: { faltam, percentual } }
  Aura.descontoVolume = function (contagem) {
    var res = { percentual: 0, faixa: null, proxima: null, contagem: contagem };
    if (!Aura.volumeAtivo) return res;
    for (var i = 0; i < FAIXAS.length; i++) {
      if (contagem > FAIXAS[i].acimaDe) {
        res.percentual = FAIXAS[i].percentual;
        res.faixa = FAIXAS[i];
      } else if (!res.proxima) {
        res.proxima = { faltam: FAIXAS[i].acimaDe + 1 - contagem, percentual: FAIXAS[i].percentual, acimaDe: FAIXAS[i].acimaDe };
      }
    }
    return res;
  };

  Aura.unidadeVolume = DV.contarPor === 'produtos' ? 'produtos diferentes' : 'itens';

  /* ---------- favoritos ---------- */

  var KEY_FAV = 'aura.favoritos.v1';

  Aura.favoritos = {
    lista: function () {
      return store.get(KEY_FAV, []).filter(function (id) { return porId[id]; });
    },
    tem: function (id) {
      return this.lista().indexOf(id) > -1;
    },
    alternar: function (id) {
      var l = this.lista();
      var i = l.indexOf(id);
      if (i > -1) l.splice(i, 1);
      else l.push(id);
      store.set(KEY_FAV, l);
      window.dispatchEvent(new CustomEvent('aura:favoritos', { detail: { id: id, ativo: i === -1 } }));
      return i === -1;
    },
  };

  /* ---------- carrinho ---------- */

  var KEY_CART = 'aura.carrinho.v1';

  function chaveItem(id, largura, altura, opcoes) {
    var o = opcoes ? Object.keys(opcoes).sort().map(function (k) { return k + ':' + opcoes[k]; }).join(';') : '';
    return id + '|' + largura + 'x' + altura + '|' + o;
  }

  function lerItens() {
    return store.get(KEY_CART, []).filter(function (it) {
      var p = porId[it.id];
      if (!p) return false;
      return p.medidas.some(function (m) { return m.largura === it.largura && m.altura === it.altura; });
    });
  }

  function salvar(itens, motivo) {
    var permanente = store.set(KEY_CART, itens);
    window.dispatchEvent(new CustomEvent('aura:carrinho', { detail: { motivo: motivo || 'alterado', permanente: permanente } }));
    return permanente;
  }

  Aura.carrinho = {
    itens: lerItens,

    adicionar: function (id, largura, altura, qtd, opcoes) {
      qtd = Math.max(1, Math.min(999, parseInt(qtd, 10) || 1));
      var itens = lerItens();
      var key = chaveItem(id, largura, altura, opcoes);
      var achou = null;
      itens.forEach(function (it) { if (it.key === key) achou = it; });
      if (achou) achou.qtd = Math.min(999, achou.qtd + qtd);
      else itens.push({ key: key, id: id, largura: largura, altura: altura, opcoes: opcoes || {}, qtd: qtd });
      salvar(itens, 'adicionado');
      return key;
    },

    definirQtd: function (key, qtd) {
      qtd = parseInt(qtd, 10);
      var itens = lerItens();
      if (!qtd || qtd < 1) {
        itens = itens.filter(function (it) { return it.key !== key; });
      } else {
        itens.forEach(function (it) { if (it.key === key) it.qtd = Math.min(999, qtd); });
      }
      salvar(itens, 'quantidade');
    },

    remover: function (key) {
      salvar(lerItens().filter(function (it) { return it.key !== key; }), 'removido');
    },

    limpar: function () {
      salvar([], 'limpo');
    },

    unidades: function () {
      return lerItens().reduce(function (s, it) { return s + it.qtd; }, 0);
    },

    // tudo que o carrinho, o drawer e a mensagem do WhatsApp precisam
    resumo: function () {
      var itens = lerItens();
      var linhas = itens.map(function (it) {
        var p = porId[it.id];
        var m = null;
        p.medidas.forEach(function (x) { if (x.largura === it.largura && x.altura === it.altura) m = x; });
        return { item: it, produto: p, medida: m, unitario: m.preco, total: r2(m.preco * it.qtd), sobEncomenda: !(m.estoque > 0) };
      });
      var unidades = itens.reduce(function (s, it) { return s + it.qtd; }, 0);
      var contagem = DV.contarPor === 'produtos' ? itens.length : unidades;
      var subtotal = r2(linhas.reduce(function (s, l) { return s + l.total; }, 0));
      var dv = Aura.descontoVolume(contagem);
      var desconto = r2(subtotal * dv.percentual / 100);
      var total = r2(subtotal - desconto);
      return {
        linhas: linhas,
        unidades: unidades,
        distintos: itens.length,
        contagem: contagem,
        subtotal: subtotal,
        volume: dv,
        desconto: desconto,
        total: total,
        pix: Aura.precoPix(total),
        economiaPix: r2(total - Aura.precoPix(total)),
        parcela: Aura.parcela(total),
        temSobEncomenda: linhas.some(function (l) { return l.sobEncomenda; }),
        vazio: itens.length === 0,
      };
    },
  };

  // mantém abas diferentes sincronizadas
  window.addEventListener('storage', function (e) {
    if (e.key === KEY_CART) window.dispatchEvent(new CustomEvent('aura:carrinho', { detail: { motivo: 'outra-aba' } }));
    if (e.key === KEY_FAV) window.dispatchEvent(new CustomEvent('aura:favoritos', { detail: {} }));
  });

  /* ---------- frete simulado ---------- */

  Aura.limparCep = function (cep) {
    return String(cep || '').replace(/\D/g, '').slice(0, 8);
  };

  Aura.formatarCep = function (cep) {
    var d = Aura.limparCep(cep);
    return d.length > 5 ? d.slice(0, 5) + '-' + d.slice(5) : d;
  };

  Aura.regiaoPorCep = function (cep) {
    var d = Aura.limparCep(cep);
    if (d.length !== 8) return null;
    var n = parseInt(d.slice(0, 5), 10);
    if (n < 1000) return null;
    if (n < 10000) return 'sp-capital';
    if (n < 40000) return 'sudeste';
    if (n < 66000) return 'nordeste';
    if (n < 70000) return 'norte';
    if (n < 76800) return 'centro-oeste';
    if (n < 78000) return 'norte';
    if (n < 80000) return 'centro-oeste';
    return 'sul';
  };

  Aura.calcularFrete = function (cep, valorPedido, sobEncomenda) {
    var reg = Aura.regiaoPorCep(cep);
    if (!reg) return null;
    var r = C.frete.regioes[reg];
    var gratis = C.frete.gratisAcimaDe > 0 && valorPedido >= C.frete.gratisAcimaDe;
    return {
      regiao: reg,
      nome: r.nome,
      valor: gratis ? 0 : r.valor,
      valorCheio: r.valor,
      gratis: gratis,
      // prazo total: transporte da região + despacho (pronta entrega) ou fabricação (sob encomenda)
      prazo: r.prazo + ' de transporte' + (sobEncomenda
        ? (C.frete.prazoSobEncomenda ? ', ' + C.frete.prazoSobEncomenda : '')
        : (C.frete.prazoProntaEntrega ? ', após o despacho em ' + C.frete.prazoProntaEntrega : '')),
    };
  };

  Aura.cepSalvo = function (novo) {
    if (novo !== undefined) store.set('aura.cep', Aura.limparCep(novo));
    return store.get('aura.cep', '');
  };

  /* ---------- WhatsApp ---------- */

  Aura.linkWhatsApp = function (mensagem) {
    return 'https://wa.me/' + C.whatsapp.numero + '?text=' + encodeURIComponent(mensagem || '');
  };

  Aura.abrirWhatsApp = function (mensagem) {
    var url = Aura.linkWhatsApp(mensagem);
    // sem 'noopener' na lista de recursos: com ele o navegador devolve null e a página atual também navegaria
    var w = window.open(url, '_blank');
    if (w) {
      try { w.opener = null; } catch (e) {}
    } else {
      window.location.href = url; // pop-up bloqueado: abre na mesma aba
    }
    return url;
  };

  // link absoluto do produto (no arquivo local usa o domínio da configuração)
  Aura.linkAbsoluto = function (p) {
    var rel = Aura.urlProduto(p);
    if (/^https?:/.test(window.location.protocol)) {
      return new URL(rel, window.location.href).href;
    }
    return C.empresa.site.replace(/\/$/, '') + '/' + rel;
  };

  function textoOpcoes(opcoes) {
    return Object.keys(opcoes || {}).map(function (k) { return k + ': ' + opcoes[k]; });
  }

  Aura.msgCard = function (p) {
    return [
      'Oi! Tenho interesse neste produto:',
      '*' + p.nome + '*',
      'Código: ' + p.id,
      '',
      'Pode me ajudar a escolher a medida certa?',
      Aura.linkAbsoluto(p),
    ].join('\n');
  };

  Aura.msgProduto = function (p, medida, qtd, opcoes) {
    qtd = qtd || 1;
    var linhas = ['Oi! Quero comprar este produto:', '*' + p.nome + '*', 'Código: ' + p.id];
    if (medida) {
      linhas.push('Medida: ' + Aura.rotuloMedida(medida));
      textoOpcoes(opcoes).forEach(function (t) { linhas.push(t); });
      linhas.push('Quantidade: ' + qtd);
      linhas.push('Valor: ' + Aura.brl(r2(medida.preco * qtd)) + (PIX ? ' (ou ' + Aura.brl(Aura.precoPix(r2(medida.preco * qtd))) + ' no Pix)' : ''));
    } else {
      linhas.push('Medida: ainda não escolhi, pode me ajudar?');
    }
    linhas.push('');
    linhas.push(Aura.linkAbsoluto(p));
    return linhas.join('\n');
  };

  // AV + AAMMDD + 4 dígitos aleatórios. Ex.: AV2610014821
  // resumo do carrinho sem dados do cliente (usado quando o navegador bloqueia o armazenamento
  // e a pessoa precisa fechar o pedido sem trocar de página)
  Aura.msgCarrinho = function (resumo) {
    var L = ['Olá, ' + C.empresa.nome + '! Quero fechar este pedido:', ''];
    resumo.linhas.forEach(function (l, i) {
      L.push((i + 1) + ') *' + l.produto.nome + '*');
      L.push('Código: ' + l.produto.id);
      L.push('Medida: ' + Aura.rotuloMedida(l.medida));
      textoOpcoes(l.item.opcoes).forEach(function (t) { L.push(t); });
      L.push('Quantidade: ' + l.item.qtd + ' x ' + Aura.brl(l.unitario) + ' = ' + Aura.brl(l.total));
      L.push('');
    });
    L.push('Subtotal: ' + Aura.brl(resumo.subtotal));
    if (resumo.desconto > 0) L.push('Desconto por volume (' + resumo.volume.percentual + '%): ' + Aura.brl(resumo.desconto) + ' a menos');
    L.push('*Total dos produtos: ' + Aura.brl(resumo.total) + '*');
    if (PIX) L.push('No Pix: ' + Aura.brl(resumo.pix));
    L.push('');
    L.push('Pode me ajudar com o frete e o pagamento?');
    return L.join('\n');
  };

  Aura.numeroPedido = function () {
    var d = new Date();
    var data = String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
    var n;
    try {
      var b = new Uint32Array(1);
      window.crypto.getRandomValues(b);
      n = b[0] % 10000;
    } catch (e) {
      n = Math.floor(Math.random() * 10000);
    }
    return 'AV' + data + String(n).padStart(4, '0');
  };

  /*
    Mensagem do pedido completo.
    cliente: { nome, telefone, cep, cidade, uf, endereco, numero, complemento, bairro, entrega: 'entrega'|'retirada', pagamento, observacoes }
  */
  Aura.msgPedido = function (numero, resumo, cliente, frete) {
    var L = [];
    L.push('Olá, ' + C.empresa.nome + '! Esse é o meu pedido:');
    L.push('');
    L.push('*Pedido ' + numero + '*');
    L.push('');
    resumo.linhas.forEach(function (l, i) {
      L.push((i + 1) + ') *' + l.produto.nome + '*');
      L.push('Código: ' + l.produto.id);
      L.push('Medida: ' + Aura.rotuloMedida(l.medida));
      textoOpcoes(l.item.opcoes).forEach(function (t) { L.push(t); });
      L.push('Quantidade: ' + l.item.qtd + ' x ' + Aura.brl(l.unitario) + ' = ' + Aura.brl(l.total));
      if (l.sobEncomenda) L.push('Sob encomenda');
      L.push('');
    });
    L.push('*Resumo*');
    L.push('Itens: ' + resumo.unidades + ' ' + Aura.plural(resumo.unidades, 'unidade', 'unidades'));
    L.push('Subtotal: ' + Aura.brl(resumo.subtotal));
    if (resumo.desconto > 0) {
      L.push('Desconto por volume (' + resumo.volume.percentual + '%): ' + Aura.brl(resumo.desconto) + ' a menos');
    }
    if (cliente.entrega === 'retirada') {
      L.push('Frete: retirada na loja, sem custo');
    } else if (frete) {
      L.push('Frete estimado (' + frete.nome + '): ' + (frete.gratis ? 'grátis' : Aura.brl(frete.valor)) + ', prazo de ' + frete.prazo);
    } else {
      L.push('Frete: a combinar');
    }
    var freteValor = cliente.entrega === 'retirada' || !frete ? 0 : frete.valor;
    var totalGeral = r2(resumo.total + freteValor);
    L.push('*Total: ' + Aura.brl(totalGeral) + '*');
    if (PIX) L.push('No Pix: ' + Aura.brl(r2(Aura.precoPix(resumo.total) + freteValor)) + ' (' + PIX + '% de desconto nos produtos)');
    L.push('');
    L.push('*Meus dados*');
    L.push('Nome: ' + cliente.nome);
    L.push('WhatsApp: ' + cliente.telefone);
    if (cliente.entrega === 'retirada') {
      L.push('Recebimento: vou retirar na loja');
    } else {
      L.push('Recebimento: entrega no endereço');
      var end = [cliente.endereco, cliente.numero].filter(Boolean).join(', ');
      if (cliente.complemento) end += ', ' + cliente.complemento;
      if (end) L.push('Endereço: ' + end);
      var local = [cliente.bairro, [cliente.cidade, cliente.uf].filter(Boolean).join('/')].filter(Boolean).join(', ');
      if (local) L.push(local);
      L.push('CEP: ' + Aura.formatarCep(cliente.cep));
    }
    L.push('Pagamento: ' + cliente.pagamento);
    if (cliente.observacoes) L.push('Observações: ' + cliente.observacoes);
    L.push('');
    L.push(cliente.entrega === 'retirada' ? 'Pode confirmar quando fica pronto para retirar?' : 'Pode confirmar o frete e o prazo de entrega pra mim?');
    return { texto: L.join('\n'), totalGeral: totalGeral };
  };

  /* ---------- textos com valores da configuração ---------- */

  // garantia oficial do produto (vem da configuração, por linha)
  Aura.garantiaDe = function (p) {
    var g = C.garantia || {};
    return (p && (p.linha ? g[p.linha] : g.box)) || (p && p.specs && p.specs.Garantia) || '';
  };

  Aura.prazoProntaEntrega = (C.frete && C.frete.prazoProntaEntrega) || 'até 2 dias úteis';
  Aura.prazoSobEncomenda = (C.frete && C.frete.prazoSobEncomenda) || '';
  Aura.regraMedida = (C.site && C.site.regraMedida) || '';

  Aura.preencher = function (texto) {
    var f = Aura.primeiraFaixa;
    var g = C.garantia || {};
    return String(texto)
      .replace(/\{garantiaEssencial\}/g, g.essencial || '')
      .replace(/\{garantiaPremium\}/g, g.premium || '')
      .replace(/\{garantiaBox\}/g, g.box || '')
      .replace(/\{prazoProntaEntrega\}/g, Aura.prazoProntaEntrega)
      .replace(/\{prazoSobEncomenda\}/g, Aura.prazoSobEncomenda)
      .replace(/\{regraMedida\}/g, Aura.regraMedida)
      .replace(/\{pix\}/g, PIX)
      .replace(/\{parcelas\}/g, PARCELAS)
      .replace(/\{volumeAcimaDe\}/g, f ? f.acimaDe : '')
      .replace(/\{volumePercentual\}/g, f ? f.percentual : '');
  };
})();
