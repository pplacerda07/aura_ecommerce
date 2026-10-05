/*
  PÁGINAS INSTITUCIONAIS (sobre.html e ajuda.html)
  Monta tudo o que depende da configuração: números da empresa, dados da empresa, tabela de frete,
  garantia por linha, retirada, faixas e exemplo do desconto por volume e cards de contato.
  Na central de ajuda também cuida da busca entre os temas e do índice que acompanha a rolagem.

  Atributos usados no HTML:
    data-se-volume        some quando o desconto por volume está desligado
    data-se-retirada      some quando a retirada na loja está desligada
    data-se-pix           some quando o desconto no Pix é 0
    data-sem-pix          aparece só quando o desconto no Pix é 0 (texto alternativo)
    data-se-frete-gratis  some quando não existe frete grátis
    data-se-encomenda     some quando não existe prazo extra para itens sob encomenda
    data-empresa="campo"  recebe o texto de Aura.config.empresa[campo]
*/
(function () {
  'use strict';

  var Aura = window.Aura;
  if (!Aura || !Aura.config) return;

  var C = Aura.config;
  var E = C.empresa || {};
  var esc = Aura.esc;
  var I = Aura.icon;
  var pagina = document.body.getAttribute('data-pagina');

  var retiradaAtiva = !!(C.retirada && C.retirada.ativo);
  var freteGratis = (C.frete && Number(C.frete.gratisAcimaDe)) || 0;
  var prazoEncomenda = (C.frete && C.frete.prazoSobEncomenda) || '';

  /* ---------- utilidades ---------- */

  function $(sel, raiz) { return (raiz || document).querySelector(sel); }
  function $$(sel, raiz) { return Array.prototype.slice.call((raiz || document).querySelectorAll(sel)); }
  function remover(el) { if (el && el.parentNode) el.parentNode.removeChild(el); }

  function telLink() {
    return E.telefoneLink || String(E.telefone || '').replace(/\D/g, '');
  }

  function linkMapa(endereco) {
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(endereco || '');
  }

  function htmlHorario() {
    var h = E.horario || [];
    if (!h.length) return '';
    return '<ul class="inst-horario">' + h.map(function (x) {
      return '<li><span>' + esc(x.dias) + '</span><strong>' + esc(x.horas) + '</strong></li>';
    }).join('') + '</ul>';
  }

  function medidaMaisBarata(p) {
    return p.medidas.slice().sort(function (a, b) { return a.preco - b.preco; })[0];
  }

  /* ---------- partes ligadas à configuração ---------- */

  function aplicarCondicionais() {
    if (!Aura.volumeAtivo) $$('[data-se-volume]').forEach(remover);
    if (!retiradaAtiva) $$('[data-se-retirada]').forEach(remover);
    if (!Aura.pixPercentual) $$('[data-se-pix]').forEach(remover);
    else $$('[data-sem-pix]').forEach(remover);
    if (!freteGratis) $$('[data-se-frete-gratis]').forEach(remover);
    if (!prazoEncomenda) $$('[data-se-encomenda]').forEach(remover);
  }

  function preencherEmpresa() {
    $$('[data-empresa]').forEach(function (el) {
      var v = E[el.getAttribute('data-empresa')];
      if (typeof v === 'string' && v) el.textContent = v;
    });
  }

  /* =========================================================
     SOBRE
     ========================================================= */

  function sobreNumeros() {
    var lista = $('[data-sobre-numeros]');
    if (!lista) return;
    var nums = E.numeros || [];
    if (!nums.length) {
      remover($('[data-sobre-numeros-secao]'));
      return;
    }
    lista.innerHTML = nums.map(function (n) {
      return (
        '<li class="sobre-numero">' +
          '<i class="tz" aria-hidden="true"></i>' +
          '<strong>' + esc(n.valor) + '</strong>' +
          '<span>' + esc(n.rotulo) + '</span>' +
        '</li>'
      );
    }).join('');
  }

  function sobreEmpresa() {
    var dl = $('[data-sobre-empresa]');
    if (dl) {
      var linhas = [
        { icone: 'store', rotulo: 'Razão social', valor: E.razaoSocial ? esc(E.razaoSocial) : '' },
        { icone: 'shield', rotulo: 'CNPJ', valor: E.cnpj ? esc(E.cnpj) : '' },
        { icone: 'pin', rotulo: 'Endereço', valor: E.endereco ? esc(E.endereco) : '' },
        { icone: 'phone', rotulo: 'Telefone', valor: E.telefone ? '<a href="tel:+' + esc(telLink()) + '">' + esc(E.telefone) + '</a>' : '' },
        { icone: 'mail', rotulo: 'E-mail', valor: E.email ? '<a href="mailto:' + esc(E.email) + '">' + esc(E.email) + '</a>' : '' },
        { icone: 'clock', rotulo: 'Horário de atendimento', valor: htmlHorario() },
      ];
      dl.innerHTML = linhas.filter(function (l) { return l.valor; }).map(function (l) {
        return '<div><dt>' + I(l.icone) + esc(l.rotulo) + '</dt><dd>' + l.valor + '</dd></div>';
      }).join('');
    }

    var pino = $('[data-sobre-endereco]');
    if (pino) {
      if (!E.endereco) {
        remover(pino);
      } else {
        pino.innerHTML =
          I('pin', 'sobre-empresa__pino-icone') +
          '<div>' +
            '<strong>' + esc(E.nomeCompleto || E.nome || '') + '</strong>' +
            '<span>' + esc(E.endereco) + '</span>' +
            '<a href="' + esc(linkMapa(E.endereco)) + '" target="_blank" rel="noopener">Como chegar ' + I('arrow') + '</a>' +
          '</div>';
      }
    }
  }

  /* =========================================================
     CENTRAL DE AJUDA: conteúdo da configuração
     ========================================================= */

  function ajudaFrete() {
    var alvo = $('[data-tabela-frete]');
    var reg = (C.frete && C.frete.regioes) || {};
    var chaves = Object.keys(reg);
    if (alvo) {
      if (!chaves.length) {
        remover(alvo);
      } else {
        alvo.innerHTML =
          '<table class="ajuda-tabela">' +
            '<caption class="sr-only">Frete estimado e prazo de transporte por região</caption>' +
            '<thead><tr><th scope="col">Região</th><th scope="col">Frete estimado</th><th scope="col">Prazo de transporte</th></tr></thead>' +
            '<tbody>' + chaves.map(function (k) {
              var r = reg[k] || {};
              return (
                '<tr>' +
                  '<th scope="row">' + esc(r.nome || k) + '</th>' +
                  '<td class="ajuda-tabela__valor">' + Aura.brl(r.valor) + '</td>' +
                  '<td>' + esc(r.prazo || 'A combinar') + '</td>' +
                '</tr>'
              );
            }).join('') + '</tbody>' +
          '</table>';
      }
    }
    $$('[data-frete-gratis]').forEach(function (el) { el.textContent = Aura.brl(freteGratis); });
  }

  function ajudaRetirada() {
    var el = $('[data-retirada]');
    if (!el || !retiradaAtiva) return;
    var r = C.retirada || {};
    var endereco = r.endereco || E.endereco || '';
    var blocos = [];
    if (endereco) {
      blocos.push(
        '<div class="ajuda-retirada__item">' + I('pin') +
          '<div><small>Endereço para retirada</small><strong>' + esc(endereco) + '</strong>' +
          '<a class="link-seta" href="' + esc(linkMapa(endereco)) + '" target="_blank" rel="noopener">Como chegar ' + I('arrow') + '</a></div>' +
        '</div>'
      );
    }
    if (r.prazo) {
      blocos.push(
        '<div class="ajuda-retirada__item">' + I('clock') +
          '<div><small>Prazo para retirar</small><strong>' + esc(r.prazo) + '</strong></div>' +
        '</div>'
      );
    }
    var horario = htmlHorario();
    if (horario) {
      blocos.push(
        '<div class="ajuda-retirada__item ajuda-retirada__item--horario">' + I('store') +
          '<div><small>Horário da loja</small>' + horario + '</div>' +
        '</div>'
      );
    }
    if (!blocos.length) { remover(el); return; }
    el.innerHTML = blocos.join('');
  }

  var GARANTIA_INFO = {
    essencial: { icone: 'window', desc: 'Janelas e portas da Linha Essencial' },
    premium: { icone: 'award', desc: 'Janelas e portas da Linha Premium' },
    box: { icone: 'shower', desc: 'Box de vidro temperado e ferragens' },
  };

  function nomeGarantia(k) {
    if (Aura.linhas[k] && Aura.linhas[k].nome) return Aura.linhas[k].nome;
    if (k === 'box') {
      var c = Aura.categoria('box-para-banheiro');
      return c ? c.nome : 'Box para banheiro';
    }
    return k.charAt(0).toUpperCase() + k.slice(1);
  }

  function ajudaGarantia() {
    var el = $('[data-garantias]');
    if (!el) return;
    var g = C.garantia || {};
    var chaves = Object.keys(g).filter(function (k) { return g[k]; });
    if (!chaves.length) { remover(el); return; }
    el.innerHTML = chaves.map(function (k) {
      var info = GARANTIA_INFO[k] || { icone: 'shield', desc: '' };
      return (
        '<li class="ajuda-garantia' + (k === 'premium' ? ' ajuda-garantia--destaque' : '') + '">' +
          I(info.icone) +
          '<span class="ajuda-garantia__nome">' + esc(nomeGarantia(k)) + '</span>' +
          '<strong>' + esc(g[k]) + '</strong>' +
          (info.desc ? '<small>' + esc(info.desc) + '</small>' : '') +
        '</li>'
      );
    }).join('');
  }

  function ajudaVolume() {
    if (!Aura.volumeAtivo) return;
    var faixas = Aura.faixasVolume || [];
    var unidade = Aura.unidadeVolume;
    var porProdutos = C.descontoVolume && C.descontoVolume.contarPor === 'produtos';

    $$('[data-volume-unidade]').forEach(function (el) { el.textContent = unidade; });

    var tab = $('[data-faixas-volume]');
    if (tab) {
      tab.innerHTML =
        '<table class="ajuda-tabela ajuda-tabela--faixas">' +
          '<caption class="sr-only">Faixas do desconto por volume</caption>' +
          '<thead><tr><th scope="col">Quantidade no carrinho</th><th scope="col">Desconto em todo o pedido</th></tr></thead>' +
          '<tbody>' + faixas.map(function (f) {
            return (
              '<tr>' +
                '<th scope="row">Acima de ' + f.acimaDe + ' ' + esc(unidade) + ' <small>(a partir de ' + (f.acimaDe + 1) + ')</small></th>' +
                '<td><span class="ajuda-faixa">' + f.percentual + '% de desconto</span></td>' +
              '</tr>'
            );
          }).join('') + '</tbody>' +
        '</table>';
    }

    var regras = $('[data-regras-volume]');
    if (regras) {
      var lista = [];
      lista.push(porProdutos
        ? '<strong>Conta produtos diferentes.</strong> Cada produto ou medida diferente no carrinho conta como 1, não importa a quantidade de cada um.'
        : '<strong>Conta unidades.</strong> Duas janelas iguais contam como 2 itens. Vale somar tudo o que a sua obra precisa.');
      lista.push('<strong>É automático.</strong> O desconto aparece sozinho no carrinho e já vai calculado no pedido do WhatsApp. Sem cupom.');
      lista.push('<strong>Vale para qualquer combinação.</strong> Janelas, portas e box, de qualquer linha, cor ou medida.');
      if (faixas.length > 1) lista.push('<strong>Sempre vale a maior faixa.</strong> Quanto mais itens, maior o desconto.');
      if (Aura.pixPercentual) lista.push('<strong>Soma com o Pix.</strong> Os ' + Aura.pixPercentual + '% do Pix são calculados em cima do total que já tem o desconto por volume.');
      lista.push('<strong>Vale sobre os produtos.</strong> O frete é calculado à parte.');
      regras.innerHTML = lista.map(function (t) { return '<li>' + I('check') + '<span>' + t + '</span></li>'; }).join('');
    }

    var ex = $('[data-exemplo-volume]');
    if (ex) {
      var html = htmlExemploVolume(porProdutos);
      if (html) ex.innerHTML = html;
      else remover(ex);
    }
  }

  // exemplo calculado com preços reais do catálogo e as mesmas funções do carrinho
  function htmlExemploVolume(porProdutos) {
    var f = Aura.primeiraFaixa;
    if (!f || !Aura.produtos.length) return '';
    var alvo = f.acimaDe + 1;
    var maisVendidos = Aura.produtos.slice().sort(function (a, b) { return b.vendidos - a.vendidos; });
    var linhas;

    if (porProdutos) {
      if (maisVendidos.length < alvo) return '';
      linhas = maisVendidos.slice(0, alvo).map(function (p) { return { p: p, m: medidaMaisBarata(p), qtd: 1 }; });
    } else {
      var prod = Aura.porId('AV1001') || maisVendidos[0];
      linhas = [{ p: prod, m: medidaMaisBarata(prod), qtd: alvo }];
    }

    var contagem = porProdutos ? linhas.length : linhas.reduce(function (s, l) { return s + l.qtd; }, 0);
    var subtotal = Aura.r2(linhas.reduce(function (s, l) { return s + Aura.r2(l.m.preco * l.qtd); }, 0));
    var dv = Aura.descontoVolume(contagem);
    var desconto = Aura.r2(subtotal * dv.percentual / 100);
    var total = Aura.r2(subtotal - desconto);
    var pix = Aura.precoPix(total);
    var final = Aura.pixPercentual ? pix : total;
    var economia = Aura.r2(subtotal - final);

    var titulo, produtoHtml, rotuloSubtotal;
    if (porProdutos) {
      titulo = alvo + ' produtos diferentes, uma unidade de cada';
      var nomes = linhas.slice(0, 3).map(function (l) { return esc(l.p.nome); }).join(', ');
      produtoHtml =
        '<div class="ajuda-exemplo__produto ajuda-exemplo__produto--lista">' +
          '<div><strong>' + nomes + '</strong><span>' + (alvo > 3 ? 'e mais ' + (alvo - 3) + ' ' + Aura.plural(alvo - 3, 'produto', 'produtos') + ', ' : '') + 'na menor medida de cada um</span></div>' +
        '</div>';
      rotuloSubtotal = 'Subtotal (' + alvo + ' produtos)';
    } else {
      var l = linhas[0];
      titulo = alvo + ' unidades do mesmo produto';
      produtoHtml =
        '<a class="ajuda-exemplo__produto" href="' + Aura.urlProduto(l.p) + '">' +
          Aura.imagemProduto(l.p, 0, '1/1', false) +
          '<div><strong>' + esc(l.p.nome) + '</strong><span>Medida ' + esc(Aura.rotuloMedida(l.m)) + ' · ' + Aura.brl(l.m.preco) + ' cada</span></div>' +
        '</a>';
      rotuloSubtotal = 'Subtotal (' + l.qtd + ' x ' + Aura.brl(l.m.preco) + ')';
    }

    var barra = Aura.barraVolume ? Aura.barraVolume({ contagem: contagem, volume: dv, desconto: desconto }, true) : '';

    return (
      '<div class="ajuda-exemplo__cabeca">' +
        '<span class="eyebrow"><i class="tz"></i>Exemplo com preço real do catálogo</span>' +
        '<h3>' + esc(titulo) + '</h3>' +
      '</div>' +
      produtoHtml +
      barra +
      '<dl class="totais">' +
        '<div><dt>' + esc(rotuloSubtotal) + '</dt><dd>' + Aura.brl(subtotal) + '</dd></div>' +
        (desconto ? '<div class="totais__desconto"><dt>Desconto por volume (' + dv.percentual + '%)</dt><dd>' + Aura.brl(desconto) + ' a menos</dd></div>' : '') +
        '<div class="totais__total"><dt>Total</dt><dd>' + Aura.brl(total) + '</dd></div>' +
        (Aura.pixPercentual ? '<div class="totais__pix"><dt>' + I('pix') + 'No Pix (mais ' + Aura.pixPercentual + '% de desconto)</dt><dd>' + Aura.brl(pix) + '</dd></div>' : '') +
      '</dl>' +
      (economia > 0 ? '<p class="ajuda-exemplo__economia">' + I('check') + '<span>Você economiza <strong>' + Aura.brl(economia) + '</strong> em relação ao preço cheio.</span></p>' : '') +
      '<p class="ajuda-exemplo__nota">Calculado com os preços atuais do site. Frete à parte.</p>'
    );
  }

  function ajudaContato() {
    var el = $('[data-contatos]');
    if (el) {
      var cards = [];
      if (E.telefone) {
        cards.push(
          '<a class="ajuda-contato" href="tel:+' + esc(telLink()) + '">' + I('phone') +
            '<div><small>Telefone</small><strong>' + esc(E.telefone) + '</strong><em>Ligue em horário de atendimento</em></div>' +
          '</a>'
        );
      }
      if (E.email) {
        cards.push(
          '<a class="ajuda-contato" href="mailto:' + esc(E.email) + '">' + I('mail') +
            '<div><small>E-mail</small><strong>' + esc(E.email) + '</strong><em>Para orçamentos e documentos</em></div>' +
          '</a>'
        );
      }
      if (E.endereco) {
        cards.push(
          '<a class="ajuda-contato" href="' + esc(linkMapa(E.endereco)) + '" target="_blank" rel="noopener">' + I('pin') +
            '<div><small>Endereço</small><strong>' + esc(E.endereco) + '</strong><em>Abrir no mapa</em></div>' +
          '</a>'
        );
      }
      var horario = htmlHorario();
      if (horario) {
        cards.push(
          '<div class="ajuda-contato ajuda-contato--horario">' + I('clock') +
            '<div><small>Horário de atendimento</small>' + horario + '</div>' +
          '</div>'
        );
      }
      el.insertAdjacentHTML('beforeend', cards.join(''));
    }

    var st = $('[data-wa-status]');
    if (st && Aura.atendimentoAberto) {
      var aberto = Aura.atendimentoAberto();
      st.textContent = aberto ? 'Online agora' : 'Respondemos assim que abrirmos';
      st.classList.toggle('is-aberto', aberto);
    }
  }

  /* =========================================================
     CENTRAL DE AJUDA: busca entre os temas
     ========================================================= */

  function iniciarBusca() {
    var form = $('[data-ajuda-busca]');
    var campo = $('#ajuda-busca-campo');
    if (!form || !campo) return;

    var limpar = $('[data-ajuda-limpar]');
    var status = $('#ajuda-busca-status');
    var vazio = $('[data-ajuda-vazio]');
    var termoVazio = $('[data-ajuda-termo]');
    var waVazio = $('[data-ajuda-vazio-wa]');
    var temas = $('[data-ajuda-temas]');
    var grupos = $$('[data-ajuda-grupo]');

    var secoes = $$('[data-ajuda-secao]').map(function (s) {
      var cab = s.querySelector('.ajuda-secao__cabeca');
      var link = $('[data-indice="' + s.id + '"]');
      return {
        el: s,
        cab: Aura.normalizar((cab ? cab.textContent : '') + ' ' + (s.getAttribute('data-palavras') || '')),
        li: link ? link.closest('li') : null,
        itens: $$('[data-ajuda-item]', s).map(function (el) {
          return { el: el, txt: Aura.normalizar(el.textContent) };
        }),
      };
    });

    function ocultar(el, sim) {
      if (el) el.classList.toggle('is-oculto', !!sim);
    }

    function fecharAbertosPelaBusca() {
      $$('details[data-aberto-pela-busca]').forEach(function (d) {
        d.open = false;
        d.removeAttribute('data-aberto-pela-busca');
      });
    }

    function contem(texto, termos) {
      for (var i = 0; i < termos.length; i++) if (texto.indexOf(termos[i]) === -1) return false;
      return true;
    }

    function filtrar() {
      var bruto = campo.value.trim();
      var q = Aura.normalizar(bruto);
      if (limpar) limpar.hidden = !bruto;
      fecharAbertosPelaBusca();

      if (q.length < 2) {
        secoes.forEach(function (s) {
          ocultar(s.el, false);
          ocultar(s.li, false);
          s.itens.forEach(function (it) { ocultar(it.el, false); });
        });
        grupos.forEach(function (g) { ocultar(g, false); });
        ocultar(temas, false);
        if (vazio) vazio.hidden = true;
        if (status) status.textContent = '';
        return 0;
      }

      var termos = q.split(/\s+/).filter(Boolean);
      var visiveis = 0;

      secoes.forEach(function (s) {
        var cabOk = contem(s.cab, termos);
        var achados = 0;
        s.itens.forEach(function (it) {
          var ok = cabOk || contem(it.txt + ' ' + s.cab, termos);
          ocultar(it.el, !ok);
          if (ok) {
            achados++;
            // abre a pergunta quando a resposta tem o termo buscado
            if (!cabOk && it.el.tagName === 'DETAILS' && !it.el.open) {
              it.el.open = true;
              it.el.setAttribute('data-aberto-pela-busca', '');
            }
          }
        });
        var mostra = cabOk || achados > 0;
        ocultar(s.el, !mostra);
        ocultar(s.li, !mostra);
        if (mostra) visiveis++;
      });

      grupos.forEach(function (g) {
        var algum = $$('[data-ajuda-item]', g).some(function (it) { return !it.classList.contains('is-oculto'); });
        ocultar(g, !algum);
      });

      ocultar(temas, true);
      if (vazio) {
        vazio.hidden = visiveis > 0;
        if (termoVazio) termoVazio.textContent = bruto;
        if (waVazio) waVazio.setAttribute('href', Aura.linkWhatsApp('Oi! Procurei por "' + bruto + '" na central de ajuda e não encontrei a resposta. Pode me ajudar?'));
      }
      if (status) {
        status.textContent = visiveis
          ? visiveis + ' ' + Aura.plural(visiveis, 'tema tem', 'temas têm') + ' resultado para “' + bruto + '”'
          : 'Nenhum resultado para “' + bruto + '”';
      }
      return visiveis;
    }

    function irParaResultado() {
      var alvo = (vazio && !vazio.hidden) ? vazio : secoes.map(function (s) { return s.el; }).filter(function (el) { return !el.classList.contains('is-oculto'); })[0];
      if (alvo) alvo.scrollIntoView({ block: 'start' });
    }

    function limparBusca(focar) {
      campo.value = '';
      filtrar();
      if (focar) campo.focus();
    }

    var timer;
    campo.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(filtrar, 140);
    });
    campo.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && campo.value) {
        e.preventDefault();
        e.stopPropagation();
        limparBusca(true);
      }
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearTimeout(timer);
      filtrar();
      if (campo.value.trim().length >= 2) irParaResultado();
    });
    if (limpar) limpar.addEventListener('click', function () { limparBusca(true); });
    var limparVazio = $('[data-ajuda-limpar-vazio]');
    if (limparVazio) limparVazio.addEventListener('click', function () { limparBusca(true); });

    $$('[data-ajuda-sugestao]').forEach(function (b) {
      b.addEventListener('click', function () {
        campo.value = b.getAttribute('data-ajuda-sugestao');
        filtrar();
        irParaResultado();
      });
    });
  }

  /* =========================================================
     CENTRAL DE AJUDA: índice que acompanha a rolagem
     ========================================================= */

  // altura real do cabeçalho fixo, usada pelo índice grudado no topo
  function acompanharCabecalho() {
    var header = $('.header');
    if (!header) return;
    function medir() {
      document.documentElement.style.setProperty('--ajuda-header', Math.round(header.getBoundingClientRect().height) + 'px');
    }
    medir();
    if ('ResizeObserver' in window) new ResizeObserver(medir).observe(header);
    else window.addEventListener('resize', medir);
  }

  function iniciarIndice() {
    var links = $$('[data-indice]');
    var lista = $('.ajuda-indice__lista');
    if (!links.length || !lista) return;

    // com movimento reduzido no sistema, a fileira pula direto, sem animação
    var movimentoReduzido = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

    function centralizar(a) {
      // só no celular, quando o índice vira uma fileira que rola para o lado
      if (lista.scrollWidth <= lista.clientWidth + 2) return;
      var esquerda = Math.max(0, a.offsetLeft - (lista.clientWidth - a.offsetWidth) / 2);
      var comportamento = movimentoReduzido && movimentoReduzido.matches ? 'auto' : 'smooth';
      try { lista.scrollTo({ left: esquerda, behavior: comportamento }); } catch (e) { lista.scrollLeft = esquerda; }
    }

    var atual = null;
    function marcar(id) {
      if (!id || id === atual) return;
      atual = id;
      links.forEach(function (a) {
        var ativo = a.getAttribute('data-indice') === id;
        a.classList.toggle('is-ativo', ativo);
        if (ativo) {
          a.setAttribute('aria-current', 'location');
          centralizar(a);
        } else {
          a.removeAttribute('aria-current');
        }
      });
    }

    links.forEach(function (a) {
      a.addEventListener('click', function () { marcar(a.getAttribute('data-indice')); });
    });

    var secoes = $$('[data-ajuda-secao]');
    if (!('IntersectionObserver' in window) || !secoes.length) return;

    var visiveis = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) visiveis[en.target.id] = true;
        else delete visiveis[en.target.id];
      });
      // a primeira seção (na ordem da página) que cruza a faixa de leitura
      for (var i = 0; i < secoes.length; i++) {
        if (visiveis[secoes[i].id]) { marcar(secoes[i].id); break; }
      }
    }, { rootMargin: '-28% 0px -62% 0px', threshold: 0 });

    secoes.forEach(function (s) { io.observe(s); });
  }

  // o conteúdo da configuração entra depois que o navegador já pulou para a âncora; reposiciona
  function realinharAncora() {
    var id = '';
    try { id = decodeURIComponent((window.location.hash || '').slice(1)); } catch (e) { return; }
    if (!id) return;
    var alvo = document.getElementById(id);
    if (!alvo || !alvo.hasAttribute('data-ajuda-secao')) return;
    var mexeu = false;
    function marcarMexeu() { mexeu = true; }
    ['wheel', 'touchstart', 'keydown'].forEach(function (ev) { window.addEventListener(ev, marcarMexeu, { once: true, passive: true }); });
    function ir() {
      if (mexeu) return;
      try { alvo.scrollIntoView({ block: 'start', behavior: 'instant' }); } catch (e) { alvo.scrollIntoView(true); }
    }
    requestAnimationFrame(ir);
    window.addEventListener('load', function () { requestAnimationFrame(ir); }, { once: true });
  }

  /* =========================================================
     MONTAGEM
     ========================================================= */

  aplicarCondicionais();
  preencherEmpresa();

  if (pagina === 'sobre') {
    sobreNumeros();
    sobreEmpresa();
  }

  if (pagina === 'ajuda') {
    ajudaFrete();
    ajudaRetirada();
    ajudaGarantia();
    ajudaVolume();
    ajudaContato();
    if (Aura.hidratar) Aura.hidratar(document.getElementById('conteudo') || document);
    iniciarBusca();
    acompanharCabecalho();
    iniciarIndice();
    realinharAncora();
  }

  if (Aura.revelar) Aura.revelar(document);
})();
