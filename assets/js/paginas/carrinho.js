/*
  CARRINHO E FINALIZAÇÃO DO PEDIDO
  Itens com quantidade editável, barra do desconto por volume, resumo com frete estimado pelo CEP,
  formulário com validação e envio do pedido completo pelo WhatsApp (Aura.msgPedido).
  Três estados na mesma página: carrinho com itens, carrinho vazio e pedido pronto.
*/
(function () {
  'use strict';

  var Aura = window.Aura;
  if (!Aura || !Aura.carrinho) return;

  var C = Aura.config;
  var esc = Aura.esc;
  var I = Aura.icon;
  var brl = Aura.brl;

  var KEY_CLIENTE = 'aura.cliente';
  var KEY_ULTIMO = 'aura.ultimoPedido';
  var KEY_RASCUNHO = 'aura.checkout.rascunho';

  var RETIRADA = !!(C.retirada && C.retirada.ativo);
  var FORMAS = C.pagamento && C.pagamento.formas && C.pagamento.formas.length ? C.pagamento.formas : ['Pix', 'Cartão de crédito', 'Boleto bancário'];
  var GRATIS_ACIMA = (C.frete && C.frete.gratisAcimaDe) || 0;
  var REDUZ = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var MQ_DESKTOP = window.matchMedia ? window.matchMedia('(min-width: 1024px)') : null;

  var UFS = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  // ícone de código de barras (o ui.js não tem um)
  var ICONE_BOLETO = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M3.5 6v12M6.5 6v12M9 6v9M11.5 6v12M14.5 6v9M17 6v12M20.5 6v12"/></svg>';

  var TXT = {
    leadCheio: 'Confira os itens, preencha seus dados e mande o pedido pelo WhatsApp. Nossa equipe confirma frete, prazo e pagamento com você antes de qualquer cobrança.',
    leadVazio: 'Bora mudar isso? Escolha o modelo e a medida do seu vão. A gente fabrica, embala com cuidado e entrega pronto para instalar.',
    cepPadrao: 'A gente completa o endereço.',
    cepResumoPadrao: 'Estimativa por região. O valor final a gente confirma no WhatsApp.',
  };

  /* ---------- utilidades ---------- */

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  function semPonto(s) { return String(s || '').trim().replace(/[.!]+$/, ''); }

  function focar(elm) {
    if (!elm) return;
    try { elm.focus({ preventScroll: true }); } catch (e) { elm.focus(); }
  }

  function rolarAte(elm, bloco, suave) {
    if (!elm) return;
    // 'instant' porque o html tem scroll-behavior: smooth e 'auto' herdaria a animação
    try {
      elm.scrollIntoView({ behavior: suave && !REDUZ ? 'smooth' : 'instant', block: bloco || 'start' });
    } catch (e) {
      elm.scrollIntoView(true);
    }
  }

  function obj(x) { return x && typeof x === 'object' && !Array.isArray(x) ? x : null; }

  // armazenamento da sessão (some ao fechar a aba). Protegido para navegação privada.
  var sessao = {
    get: function (k) {
      try {
        var v = window.sessionStorage.getItem(k);
        return v ? JSON.parse(v) : null;
      } catch (e) {
        return null;
      }
    },
    set: function (k, v) {
      try { window.sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) {}
    },
    remove: function (k) {
      try { window.sessionStorage.removeItem(k); } catch (e) {}
    },
  };

  function digitosTelefone(v) {
    var d = String(v || '').replace(/\D/g, '');
    if (d.length > 11 && d.indexOf('55') === 0) d = d.slice(2);
    return d.slice(0, 11);
  }

  function formatarTelefone(v) {
    var d = digitosTelefone(v);
    if (!d) return '';
    if (d.length <= 2) return '(' + d;
    if (d.length <= 6) return '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length <= 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
    return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
  }

  // máscara que mantém o cursor no lugar certo enquanto a pessoa digita
  function aplicarMascara(input, formatar) {
    if (!input) return;
    input.addEventListener('input', function () {
      var v = input.value;
      var pos = typeof input.selectionStart === 'number' ? input.selectionStart : v.length;
      var antes = v.slice(0, pos).replace(/\D/g, '').length;
      var novo = formatar(v);
      if (novo === v) return;
      input.value = novo;
      if (document.activeElement !== input) return;
      var p = 0;
      var n = 0;
      while (p < novo.length && n < antes) {
        if (/\d/.test(novo.charAt(p))) n++;
        p++;
      }
      try { input.setSelectionRange(p, p); } catch (e) {}
    });
  }

  // abre o WhatsApp numa nova aba sem tirar a pessoa do site (window.open com noopener sempre devolve null)
  function abrirWhatsApp(texto) {
    var url = Aura.linkWhatsApp(texto);
    var w = null;
    try { w = window.open(url, '_blank'); } catch (e) { w = null; }
    if (w) {
      try { w.opener = null; } catch (e) {}
      return true;
    }
    return false;
  }

  function formatarData(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    try {
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) + ', às ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return d.toLocaleDateString();
    }
  }

  function copiarTexto(texto) {
    function ok() { Aura.toast('Mensagem copiada'); }
    function falhou() { Aura.toast('Não deu para copiar. Selecione o texto e copie manualmente.', 'erro'); }
    function alternativo() {
      var ta = document.createElement('textarea');
      ta.value = texto;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '0';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var deu = false;
      try { deu = document.execCommand('copy'); } catch (e) { deu = false; }
      ta.remove();
      if (deu) ok();
      else falhou();
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texto).then(ok, alternativo);
    } else {
      alternativo();
    }
  }

  /* ---------- elementos ---------- */

  var el = {
    topo: $('[data-topo]'),
    topoCheck: $('[data-topo-check]'),
    topoEyebrow: $('[data-topo-eyebrow]'),
    titulo: $('[data-topo-titulo]'),
    lead: $('[data-topo-lead]'),
    etapas: $('[data-etapas]'),
    vCheio: $('[data-vista="cheio"]'),
    vVazio: $('[data-vista="vazio"]'),
    vSucesso: $('[data-vista="sucesso"]'),
    itens: $('[data-itens]'),
    volume: $('[data-volume]'),
    qtdItens: $('[data-qtd-itens]'),
    tituloItens: $('#titulo-itens'),
    lateral: $('[data-lateral]'),
    totais: $('[data-totais]'),
    parcela: $('[data-parcela]'),
    freteInfo: $('[data-frete-info]'),
    cepResumo: $('[data-cep-resumo]'),
    cepResumoInput: $('#resumo-cep'),
    cepResumoAjuda: $('#resumo-cep-ajuda'),
    secaoForm: $('#finalizar'),
    form: $('[data-checkout]'),
    erros: $('[data-erros]'),
    endereco: $('[data-endereco]'),
    retiradaInfo: $('[data-retirada-info]'),
    pagamentos: $('[data-pagamentos]'),
    totalEnvio: $('[data-total-envio]'),
    enviar: $('[data-enviar]'),
    previaBox: $('[data-previa-box]'),
    previa: $('[data-previa]'),
    cepStatus: $('#f-cep-status'),
    barra: $('[data-barra]'),
    barraTotal: $('[data-barra-total]'),
    barraPix: $('[data-barra-pix]'),
    anuncio: $('[data-anuncio]'),
  };

  if (!el.vCheio || !el.vVazio || !el.vSucesso || !el.form || !el.itens) return;

  var F = el.form.elements;

  var estado = {
    vista: null, // 'cheio' | 'vazio' | 'sucesso'
    cep: '',
    cepBuscado: '',
    statusBusca: null,
    numero: null,
    formNaTela: false,
    formAtivo: false,
    formTocado: false,
    passouForm: false,
    vis: { resumo: true, form: false },
    motivo: null,
    errosAssinatura: '',
    volumeHtml: null,
    paraEditar: null, // itens do pedido enviado, para "Voltar e editar o pedido"
  };

  // o número é gerado uma vez por visita, assim a prévia mostra exatamente o que vai ser enviado
  function numeroPedido() {
    if (!estado.numero) estado.numero = Aura.numeroPedido();
    return estado.numero;
  }

  /* ---------- montagem dos campos que dependem da configuração ---------- */

  function montarUF() {
    F.uf.innerHTML = '<option value="">UF</option>' + UFS.map(function (u) {
      return '<option value="' + u + '">' + u + '</option>';
    }).join('');
  }

  // prazo de retirada da configuração; com item sob encomenda, soma o prazo de fabricação (mesmo formato do frete)
  function prazoRetirada(r) {
    var prazo = semPonto(C.retirada && C.retirada.prazo);
    if (r && r.temSobEncomenda && Aura.prazoSobEncomenda) prazo += ', ' + semPonto(Aura.prazoSobEncomenda);
    return prazo ? prazo + '.' : '';
  }

  function atualizarPrazoRetirada(r) {
    if (!RETIRADA) return;
    var prazo = prazoRetirada(r);
    var resumo = $('[data-retirada-resumo]');
    if (resumo) resumo.textContent = ('Sem custo de frete. ' + prazo).trim();
    var pz = $('[data-retirada-prazo]');
    if (pz) pz.textContent = prazo;
  }

  function montarRetirada() {
    var opcao = $('[data-opcao-retirada]');
    if (!RETIRADA) {
      if (opcao) opcao.remove();
      if (el.retiradaInfo) el.retiradaInfo.remove();
      el.retiradaInfo = null;
      return;
    }
    atualizarPrazoRetirada(null);
    var end = $('[data-retirada-endereco]');
    if (end) end.textContent = C.retirada.endereco || '';
    var hr = $('[data-retirada-horario]');
    var horario = (C.empresa.horario || []).filter(function (h) {
      return h.horas && !/fechado/i.test(h.horas);
    }).map(function (h) { return h.dias + ', ' + h.horas; }).join(' · ');
    if (hr) {
      if (horario) hr.textContent = 'Horário: ' + horario;
      else hr.remove();
    }
  }

  // navegador bloqueando dados salvos: o carrinho vale só enquanto esta página estiver aberta
  function montarArmazenamento() {
    if (Aura.armazenamentoOk !== false) return;
    var aviso = $('[data-aviso-armazenamento]');
    if (aviso) {
      aviso.innerHTML = I('info') + '<p><strong>Seu navegador está bloqueando os dados salvos.</strong> O carrinho fica guardado só enquanto esta página estiver aberta. Finalize o pedido agora para não perder nada.</p>';
      aviso.hidden = false;
    }
    // sem armazenamento não tem como lembrar os dados: some a opção e o aviso de privacidade se ajusta
    F.lembrar.checked = false;
    var opcao = F.lembrar.closest('.check');
    if (opcao) opcao.hidden = true;
    var priv = $('[data-privacidade-txt]');
    if (priv) priv.textContent = 'Seus dados vão só na mensagem do WhatsApp e não ficam salvos neste aparelho.';
  }

  function infoPagamento(forma) {
    var k = Aura.normalizar(forma);
    if (k.indexOf('pix') > -1) {
      return { id: 'pix', icone: I('pix'), texto: Aura.pixPercentual ? Aura.pixPercentual + '% de desconto: <b data-pag-valor="pix"></b>' : 'Aprovação na hora' };
    }
    if (k.indexOf('cartao') > -1 || k.indexOf('credito') > -1) {
      return { id: 'cartao', icone: I('card'), texto: Aura.maxParcelas > 1 ? 'Em até ' + Aura.maxParcelas + 'x de <b data-pag-valor="cartao"></b> sem juros' : 'Pagamento à vista no cartão' };
    }
    if (k.indexOf('boleto') > -1) {
      return { id: 'boleto', icone: ICONE_BOLETO, texto: 'À vista. A gente te envia o boleto pelo WhatsApp.' };
    }
    return { id: 'outro', icone: I('card'), texto: '' };
  }

  function montarPagamentos() {
    if (!el.pagamentos) return;
    el.pagamentos.style.setProperty('--cols', String(Math.min(FORMAS.length, 3)));
    el.pagamentos.innerHTML = FORMAS.map(function (f, i) {
      var info = infoPagamento(f);
      return (
        '<label class="opcao-card opcao-card--' + info.id + '">' +
          '<input type="radio" name="pagamento" value="' + esc(f) + '"' + (i === 0 ? ' checked' : '') + '>' +
          '<span class="opcao-card__txt"><strong>' + esc(f) + '</strong>' + (info.texto ? '<small>' + info.texto + '</small>' : '') + '</span>' +
          '<span class="opcao-card__icone">' + info.icone + '</span>' +
        '</label>'
      );
    }).join('');
  }

  /* ---------- leitura e preenchimento do formulário ---------- */

  var ORDEM = ['nome', 'telefone', 'cep', 'endereco', 'numero', 'bairro', 'cidade', 'uf'];
  var DE_ENTREGA = ['cep', 'endereco', 'numero', 'bairro', 'cidade', 'uf'];
  var ENDERECO_AUTO = ['endereco', 'bairro', 'cidade', 'uf'];
  var ROTULOS = { nome: 'Nome completo', telefone: 'WhatsApp', cep: 'CEP', endereco: 'Endereço', numero: 'Número', bairro: 'Bairro', cidade: 'Cidade', uf: 'Estado' };

  function entregaAtual() {
    var r = $('input[name="entrega"]:checked', el.form);
    return RETIRADA && r && r.value === 'retirada' ? 'retirada' : 'entrega';
  }

  function pagamentoAtual() {
    var r = $('input[name="pagamento"]:checked', el.form);
    return r ? r.value : FORMAS[0];
  }

  function lerForm() {
    return {
      nome: F.nome.value.trim().replace(/\s+/g, ' '),
      telefone: formatarTelefone(F.telefone.value),
      cep: Aura.limparCep(F.cep.value),
      endereco: F.endereco.value.trim(),
      numero: F.numero.value.trim(),
      complemento: F.complemento.value.trim(),
      bairro: F.bairro.value.trim(),
      cidade: F.cidade.value.trim(),
      uf: F.uf.value,
      entrega: entregaAtual(),
      pagamento: pagamentoAtual(),
      observacoes: F.observacoes.value.trim(),
    };
  }

  // o que fica salvo em "aura.cliente" (observações não entram)
  function paraSalvar(d) {
    return {
      nome: d.nome, telefone: d.telefone, entrega: d.entrega, cep: d.cep,
      endereco: d.endereco, numero: d.numero, complemento: d.complemento,
      bairro: d.bairro, cidade: d.cidade, uf: d.uf, pagamento: d.pagamento,
    };
  }

  function marcarRadio(nome, valor) {
    $$('input[name="' + nome + '"]', el.form).forEach(function (r) { r.checked = r.value === valor; });
  }

  function preencherForm(d, comObservacoes) {
    ['nome', 'endereco', 'numero', 'complemento', 'bairro', 'cidade'].forEach(function (n) {
      if (typeof d[n] === 'string') F[n].value = d[n];
    });
    if (typeof d.telefone === 'string') F.telefone.value = formatarTelefone(d.telefone);
    if (typeof d.cep === 'string') F.cep.value = Aura.formatarCep(d.cep);
    if (UFS.indexOf(d.uf) > -1) F.uf.value = d.uf;
    if (d.entrega === 'retirada' && RETIRADA) marcarRadio('entrega', 'retirada');
    if (FORMAS.indexOf(d.pagamento) > -1) marcarRadio('pagamento', d.pagamento);
    if (comObservacoes && typeof d.observacoes === 'string') F.observacoes.value = d.observacoes;
    // endereço que veio salvo pode ser trocado pela busca do CEP se a pessoa mudar o CEP
    ENDERECO_AUTO.forEach(function (n) { if (F[n].value) F[n].setAttribute('data-auto', '1'); });
  }

  // rascunho só desta aba (some ao fechar): protege contra uma recarga sem querer no meio do preenchimento
  var timerRascunho = null;
  function agendarRascunho() {
    clearTimeout(timerRascunho);
    timerRascunho = setTimeout(salvarRascunho, 400);
  }
  function salvarRascunho() {
    if (estado.vista === 'sucesso') return;
    var d = lerForm();
    d.lembrar = !!F.lembrar.checked;
    sessao.set(KEY_RASCUNHO, d);
  }

  function aoMudarLembrar() {
    if (!F.lembrar.checked) {
      // desmarcou: nada de dados pessoais guardados no aparelho. O último pedido fica só nesta aba.
      Aura.store.remove(KEY_CLIENTE);
      var ultimo = obj(Aura.store.get(KEY_ULTIMO, null));
      if (ultimo) sessao.set(KEY_ULTIMO, ultimo);
      Aura.store.remove(KEY_ULTIMO);
    }
    clearTimeout(timerRascunho);
    salvarRascunho();
  }

  /* ---------- validação ---------- */

  function obrigatorio(msg) {
    return function (v) { return String(v || '').trim() ? '' : msg; };
  }

  var REGRAS = {
    nome: function (v) {
      v = String(v || '').trim();
      if (!v) return 'Conta pra gente o seu nome completo.';
      if (v.replace(/[^A-Za-zÀ-ÿ]/g, '').length < 3) return 'Escreva o seu nome completo, por favor.';
      return '';
    },
    telefone: function (v) {
      var d = digitosTelefone(v);
      if (!d) return 'Informe o seu WhatsApp para a gente confirmar o pedido.';
      if (d.length < 10) return 'Faltam números. Coloque o DDD e o número, assim: (11) 99999-9999.';
      return '';
    },
    cep: function (v) {
      var d = Aura.limparCep(v);
      if (!d) return 'Informe o CEP da entrega.';
      if (d.length !== 8) return 'O CEP tem 8 números. Confere pra gente?';
      if (!Aura.regiaoPorCep(d)) return 'Esse CEP não parece válido. Confere os números?';
      return '';
    },
    endereco: obrigatorio('Informe a rua ou avenida.'),
    numero: obrigatorio('Informe o número. Se não tiver, escreva S/N.'),
    bairro: obrigatorio('Informe o bairro.'),
    cidade: obrigatorio('Informe a cidade.'),
    uf: obrigatorio('Escolha o estado.'),
  };

  function erroDe(nome) {
    if (DE_ENTREGA.indexOf(nome) > -1 && entregaAtual() !== 'entrega') return '';
    return REGRAS[nome](F[nome].value);
  }

  function errosAtuais() {
    var lista = [];
    ORDEM.forEach(function (n) {
      var m = erroDe(n);
      if (m) lista.push({ nome: n, msg: m });
    });
    return lista;
  }

  function marcarErro(input, msg) {
    if (!input) return;
    var campo = input.closest('.campo');
    var err = document.getElementById(input.id + '-erro');
    if (campo) campo.classList.toggle('is-erro', !!msg);
    if (msg) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
    if (err) {
      err.textContent = msg || '';
      err.hidden = !msg;
    }
    var desc = ((input.getAttribute('data-desc') || '') + (msg && err ? ' ' + err.id : '')).trim();
    if (desc) input.setAttribute('aria-describedby', desc);
    else input.removeAttribute('aria-describedby');
  }

  function validarCampo(nome) {
    var m = erroDe(nome);
    marcarErro(F[nome], m);
    return m;
  }

  function assinaturaErros(lista) {
    return lista.map(function (x) { return x.nome + ':' + x.msg; }).join('|');
  }

  // silencioso: atualiza a lista enquanto a pessoa corrige, sem o leitor de tela reler tudo a cada tecla
  function mostrarErros(lista, silencioso) {
    estado.errosAssinatura = assinaturaErros(lista);
    if (silencioso) el.erros.removeAttribute('role');
    else el.erros.setAttribute('role', 'alert');
    el.erros.innerHTML =
      I('info') +
      '<div><strong>' + (lista.length === 1 ? 'Falta só um detalhe para enviar o pedido:' : 'Faltam ' + lista.length + ' detalhes para enviar o pedido:') + '</strong>' +
        '<ul>' + lista.map(function (x) {
          return '<li><a href="#' + F[x.nome].id + '" data-ir-campo="' + x.nome + '">' + esc(ROTULOS[x.nome]) + ': ' + esc(x.msg) + '</a></li>';
        }).join('') + '</ul>' +
      '</div>';
    el.erros.hidden = false;
  }

  function esconderErros() {
    estado.errosAssinatura = '';
    el.erros.hidden = true;
    el.erros.innerHTML = '';
  }

  // depois que o resumo de erros apareceu, ele acompanha as correções (inclusive quando só a mensagem muda)
  function atualizarResumoErros() {
    if (el.erros.hidden) return;
    var lista = errosAtuais();
    if (!lista.length) esconderErros();
    else if (assinaturaErros(lista) !== estado.errosAssinatura) mostrarErros(lista, true);
  }

  function focarCampo(input) {
    if (!input) return;
    focar(input);
    rolarAte(input.closest('.campo') || input, 'center', true);
  }

  /* ---------- recebimento: entrega ou retirada ---------- */

  function aplicarEntrega() {
    var ret = entregaAtual() === 'retirada';
    if (el.endereco) el.endereco.hidden = ret;
    if (el.retiradaInfo) el.retiradaInfo.hidden = !ret;
    if (el.cepResumo) el.cepResumo.hidden = ret;
    DE_ENTREGA.forEach(function (n) {
      F[n].required = !ret;
      if (ret) marcarErro(F[n], '');
    });
  }

  /* ---------- CEP: frete estimado e busca do endereço ---------- */

  function statusCep(tipo, msg) {
    if (!el.cepStatus) return;
    if (el.cepStatus.textContent !== msg) el.cepStatus.textContent = msg;
    if (tipo) el.cepStatus.setAttribute('data-estado', tipo);
    else el.cepStatus.removeAttribute('data-estado');
  }

  // guarda o resultado da última busca para mostrar de novo se a pessoa redigitar o mesmo CEP
  function statusBusca(tipo, msg) {
    estado.statusBusca = { tipo: tipo, msg: msg };
    statusCep(tipo, msg);
  }

  function erroCepResumo(msg) {
    if (!el.cepResumo) return;
    el.cepResumo.classList.toggle('is-erro', !!msg);
    if (msg) el.cepResumoInput.setAttribute('aria-invalid', 'true');
    else el.cepResumoInput.removeAttribute('aria-invalid');
    el.cepResumoAjuda.textContent = msg || TXT.cepResumoPadrao;
  }

  function preencherSeTiver(nome, valor) {
    var input = F[nome];
    valor = String(valor || '').trim();
    if (!input || !valor) return;
    if (nome === 'uf' && UFS.indexOf(valor) === -1) return;
    // só troca o que está vazio ou o que foi preenchido automaticamente antes
    if (input.value && !input.hasAttribute('data-auto')) return;
    input.value = valor;
    input.setAttribute('data-auto', '1');
    if (input.closest('.campo.is-erro')) validarCampo(nome);
  }

  function limparAuto(nome) {
    var input = F[nome];
    if (!input || !input.hasAttribute('data-auto')) return;
    input.value = '';
    input.removeAttribute('data-auto');
    if (input.closest('.campo.is-erro')) validarCampo(nome);
  }

  var buscaAtual = 0;
  function buscarCep(d) {
    if (!d || d === estado.cepBuscado) return;
    estado.cepBuscado = d;
    if (!window.fetch) return;
    var id = ++buscaAtual;
    var campo = F.cep.closest('.campo');
    var ctrl = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 7000);
    estado.statusBusca = null;
    statusCep('carregando', 'Buscando o endereço...');
    if (campo) campo.classList.add('is-carregando');

    fetch('https://viacep.com.br/ws/' + d + '/json/', ctrl ? { signal: ctrl.signal } : {})
      .then(function (res) {
        if (!res.ok) throw new Error('viacep ' + res.status);
        return res.json();
      })
      .then(function (dados) {
        if (id !== buscaAtual) return;
        // a pessoa mexeu no CEP enquanto a busca andava: descarta (redigitar o mesmo CEP busca de novo)
        if (Aura.limparCep(F.cep.value) !== d) {
          estado.cepBuscado = '';
          return;
        }
        // o que veio de outro CEP (busca anterior ou dados salvos) não vale para este; o que a pessoa digitou fica
        ENDERECO_AUTO.forEach(limparAuto);
        if (!dados || dados.erro) {
          statusBusca('aviso', 'Não achamos esse CEP. Pode preencher o endereço à mão.');
          atualizarResumoErros();
          agendarPrevia();
          agendarRascunho();
          atualizarEtapas();
          return;
        }
        preencherSeTiver('endereco', dados.logradouro);
        preencherSeTiver('bairro', dados.bairro);
        preencherSeTiver('cidade', dados.localidade);
        preencherSeTiver('uf', dados.uf);
        statusBusca('ok', dados.logradouro ? 'Endereço encontrado. Agora é só o número.' : 'Cidade encontrada. Complete a rua e o bairro.');
        atualizarResumoErros();
        agendarPrevia();
        agendarRascunho();
        atualizarEtapas();
      })
      .catch(function () {
        if (id !== buscaAtual) return;
        estado.cepBuscado = '';
        statusCep('aviso', 'Não deu para buscar agora. Preencha à mão, sem problema.');
      })
      .then(function () {
        clearTimeout(timer);
        if (id === buscaAtual && campo) campo.classList.remove('is-carregando');
      });
  }

  // origem: 'form' (campo CEP do formulário) ou 'resumo' (campo do resumo)
  function aoMudarCep(d, origem) {
    var mudou = d !== estado.cep;
    estado.cep = d;
    var formatado = Aura.formatarCep(d);
    if (origem !== 'form' && F.cep.value !== formatado) {
      F.cep.value = formatado;
      if (F.cep.closest('.campo.is-erro')) validarCampo('cep');
    }
    if (origem !== 'resumo' && el.cepResumoInput && document.activeElement !== el.cepResumoInput) {
      el.cepResumoInput.value = formatado;
      if (d.length === 8) erroCepResumo('');
    }
    if (d.length === 8 && Aura.regiaoPorCep(d)) {
      Aura.cepSalvo(d);
      if (d !== estado.cepBuscado) buscarCep(d);
      else if (estado.statusBusca) statusCep(estado.statusBusca.tipo, estado.statusBusca.msg);
      else if (F.cep.closest('.campo.is-carregando')) statusCep('carregando', 'Buscando o endereço...');
      else statusCep('', TXT.cepPadrao);
    } else {
      statusCep('', TXT.cepPadrao);
    }
    if (mudou && estado.vista === 'cheio') {
      renderResumo(Aura.carrinho.resumo());
      atualizarResumoErros();
      // o CEP do resumo muda o formulário por código (sem evento input): prévia e rascunho acompanham aqui
      agendarPrevia();
      agendarRascunho();
    }
  }

  /* ---------- frete e totais ---------- */

  function freteAtual(r) {
    if (entregaAtual() === 'retirada') return { tipo: 'retirada', valor: 0, frete: null };
    if (estado.cep.length !== 8) return { tipo: 'pendente', valor: 0, frete: null };
    var f = Aura.calcularFrete(estado.cep, r.total, r.temSobEncomenda);
    if (!f) return { tipo: 'invalido', valor: 0, frete: null };
    return { tipo: 'entrega', valor: f.valor, frete: f };
  }

  function nota(icone, html, tipo) {
    return '<p class="resumo__nota' + (tipo ? ' resumo__nota--' + tipo : '') + '">' + I(icone) + '<span>' + html + '</span></p>';
  }

  function renderResumo(r) {
    var fr = freteAtual(r);
    var semFrete = fr.tipo === 'pendente' || fr.tipo === 'invalido';
    var totalGeral = Aura.r2(r.total + fr.valor);
    var pix = Aura.r2(Aura.precoPix(r.total) + fr.valor);
    var parcela = Aura.parcela(totalGeral);
    var unidades = r.unidades + ' ' + Aura.plural(r.unidades, 'item', 'itens');

    var freteDd;
    if (fr.tipo === 'retirada') {
      freteDd = '<span class="is-gratis">Retirada na loja: grátis</span>';
    } else if (fr.tipo === 'entrega') {
      freteDd = fr.frete.gratis
        ? '<s class="resumo__riscado"><span class="sr-only">de </span>' + brl(fr.frete.valorCheio) + '</s> <span class="is-gratis"><span class="sr-only">por </span>Grátis</span>'
        : brl(fr.valor);
    } else {
      freteDd = '<button type="button" class="resumo__link" data-focar-cep>' + (fr.tipo === 'invalido' ? 'Confira o CEP' : 'Informe o CEP') + '</button>';
    }

    var rotuloTotal = semFrete ? 'Total <small>sem o frete</small>' : 'Total';
    var linhaPix = Aura.pixPercentual ? '<div class="totais__pix"><dt>' + I('pix') + 'No Pix</dt><dd>' + brl(pix) + '</dd></div>' : '';

    if (el.totais) {
      el.totais.innerHTML =
        '<div><dt>Subtotal (' + unidades + ')</dt><dd>' + brl(r.subtotal) + '</dd></div>' +
        (r.desconto > 0 ? '<div class="totais__desconto"><dt>Desconto por volume (' + r.volume.percentual + '%)</dt><dd>' + brl(r.desconto) + ' a menos</dd></div>' : '') +
        '<div><dt>' + (fr.tipo === 'entrega' ? 'Frete estimado' : 'Frete') + '</dt><dd>' + freteDd + '</dd></div>' +
        '<div class="totais__total"><dt>' + rotuloTotal + '</dt><dd>' + brl(totalGeral) + '</dd></div>' +
        linhaPix;
    }

    if (el.parcela) {
      el.parcela.textContent = Aura.maxParcelas > 1 ? 'ou em até ' + Aura.maxParcelas + 'x de ' + brl(parcela) + ' sem juros no cartão' : '';
    }

    if (el.freteInfo) {
      var notas = [];
      if (fr.tipo === 'retirada') {
        notas.push(nota('pin', 'Retire em <strong>' + esc(C.retirada.endereco) + '</strong>. ' + esc(prazoRetirada(r))));
      } else {
        if (fr.tipo === 'entrega') {
          notas.push(nota('truck', 'Prazo estimado para <strong>' + esc(fr.frete.nome) + '</strong>: ' + esc(fr.frete.prazo) + '.'));
        }
        if (GRATIS_ACIMA > 0) {
          if (r.total >= GRATIS_ACIMA) {
            notas.push(nota('check', 'Seus produtos chegaram a ' + brl(GRATIS_ACIMA) + ' e o pedido ganhou <strong>frete grátis</strong>.', 'sucesso'));
          } else {
            notas.push(nota('sparkle', 'Faltam <strong>' + brl(Aura.r2(GRATIS_ACIMA - r.total)) + '</strong> para o frete sair grátis.'));
          }
        }
      }
      el.freteInfo.innerHTML = notas.join('');
    }

    // valores dentro das opções de pagamento
    $$('[data-pag-valor="pix"]', el.form).forEach(function (b) { b.textContent = brl(pix); });
    $$('[data-pag-valor="cartao"]', el.form).forEach(function (b) { b.textContent = brl(parcela); });

    if (el.totalEnvio) {
      el.totalEnvio.innerHTML =
        '<div class="totais__total"><dt>' + (semFrete ? 'Total do pedido <small>sem o frete</small>' : 'Total do pedido') + '</dt><dd>' + brl(totalGeral) + '</dd></div>' +
        linhaPix;
    }

    atualizarPrazoRetirada(r);

    if (el.barraTotal) el.barraTotal.textContent = brl(totalGeral);
    if (el.barraPix) {
      el.barraPix.textContent = Aura.pixPercentual
        ? 'ou ' + brl(pix) + ' no Pix'
        : Aura.maxParcelas > 1 ? 'ou ' + Aura.maxParcelas + 'x de ' + brl(parcela) : '';
    }

    ajustarFixo();
    return totalGeral;
  }

  // o resumo só fica grudado na rolagem se couber inteiro abaixo do cabeçalho
  function ajustarFixo() {
    if (!el.lateral) return;
    var header = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 124;
    var cabe = el.lateral.offsetHeight + header + 32 <= window.innerHeight;
    el.lateral.classList.toggle('is-fixo', cabe);
  }

  /* ---------- itens ---------- */

  function htmlItem(l) {
    var p = l.produto;
    var it = l.item;
    var key = esc(it.key);
    var url = Aura.urlProduto(p);
    var nome = esc(p.nome);
    // dá contexto aos botões do stepper para quem usa leitor de tela
    var stepper = Aura.stepperCarrinho(it.key, it.qtd)
      .replace('aria-label="Diminuir quantidade"', function () { return 'aria-label="Diminuir quantidade de ' + nome + '"'; })
      .replace('aria-label="Aumentar quantidade"', function () { return 'aria-label="Aumentar quantidade de ' + nome + '"'; })
      .replace('aria-label="Quantidade"', function () { return 'aria-label="Quantidade de ' + nome + '"'; });
    return (
      '<li class="item" data-key="' + key + '">' +
        '<a class="item__img" href="' + url + '" tabindex="-1" aria-hidden="true">' + Aura.imagemProduto(p, 0, '1/1', false) + '</a>' +
        '<div class="item__info">' +
          '<p class="item__linha">' + esc(Aura.nomeLinha(p)) + '</p>' +
          '<h3 class="item__nome"><a href="' + url + '">' + nome + '</a></h3>' +
          '<p class="item__det"><span>Medida ' + esc(Aura.rotuloMedida(l.medida)) + '</span>' + Aura.htmlOpcoesItem(it) + '<span>Cód. ' + esc(p.id) + '</span></p>' +
          (l.sobEncomenda ? '<p class="item__encomenda"><span class="item__tag">Sob encomenda</span><span>' + esc(semPonto(Aura.prazoSobEncomenda)) + '</span></p>' : '') +
        '</div>' +
        '<div class="item__compra">' +
          stepper +
          '<div class="item__valores"><strong><span class="sr-only">Total do item: </span>' + brl(l.total) + '</strong><small>' + brl(l.unitario) + ' cada</small></div>' +
        '</div>' +
        '<button type="button" class="item__remover" data-remover="' + key + '" aria-label="Remover ' + nome + ' do carrinho" title="Remover do carrinho">' + I('trash') + '</button>' +
      '</li>'
    );
  }

  var ATTRS_FOCO = ['data-qtd-input', 'data-qtd-menos', 'data-qtd-mais', 'data-remover'];

  function capturarFoco() {
    var a = document.activeElement;
    if (!a || !el.itens.contains(a)) return null;
    var li = a.closest('[data-key]');
    if (!li) return null;
    var info = { attr: null, key: li.getAttribute('data-key'), indice: $$('[data-key]', el.itens).indexOf(li) };
    ATTRS_FOCO.forEach(function (at) { if (a.hasAttribute(at)) info.attr = at; });
    if (!info.attr && a.closest('.item__nome')) info.attr = 'nome';
    return info;
  }

  function restaurarFoco(info) {
    if (!info) return;
    var lis = $$('[data-key]', el.itens);
    var li = null;
    lis.forEach(function (x) { if (x.getAttribute('data-key') === info.key) li = x; });
    var alvo = null;
    if (li) {
      alvo = info.attr === 'nome' ? $('.item__nome a', li) : info.attr ? $('[' + info.attr + ']', li) : null;
    } else if (lis.length) {
      // o item saiu: vai para o item que ficou no lugar dele
      var prox = lis[Math.min(Math.max(info.indice, 0), lis.length - 1)];
      alvo = $('.item__nome a', prox);
    } else {
      alvo = el.tituloItens;
    }
    focar(alvo);
  }

  function renderItens(r) {
    var foco = capturarFoco();
    el.itens.innerHTML = r.linhas.map(htmlItem).join('');
    if (el.qtdItens) el.qtdItens.textContent = '(' + r.unidades + ' ' + Aura.plural(r.unidades, 'item', 'itens') + ')';
    if (el.volume) {
      var v = Aura.barraVolume(r);
      if (v !== estado.volumeHtml) {
        el.volume.innerHTML = v;
        estado.volumeHtml = v;
      }
    }
    restaurarFoco(foco);
  }

  /* ---------- prévia da mensagem ---------- */

  function montarMensagem(r, dados, previa) {
    var aPreencher = '(a preencher)';
    var cliente = {
      nome: dados.nome || (previa ? aPreencher : ''),
      telefone: dados.telefone || (previa ? aPreencher : ''),
      cep: dados.cep,
      cidade: dados.cidade,
      uf: dados.uf,
      endereco: dados.endereco,
      numero: dados.numero,
      complemento: dados.complemento,
      bairro: dados.bairro,
      entrega: dados.entrega,
      pagamento: dados.pagamento,
      observacoes: dados.observacoes,
    };
    var frete = cliente.entrega === 'entrega' ? Aura.calcularFrete(cliente.cep, r.total, r.temSobEncomenda) : null;
    var msg = Aura.msgPedido(numeroPedido(), r, cliente, frete);
    if (previa && cliente.entrega === 'entrega' && cliente.cep.length !== 8) {
      msg.texto = msg.texto.replace(/^CEP: .*$/m, 'CEP: ' + aPreencher);
    }
    return msg;
  }

  var timerPrevia = null;
  function agendarPrevia() {
    clearTimeout(timerPrevia);
    timerPrevia = setTimeout(function () { atualizarPrevia(); }, 150);
  }

  function atualizarPrevia(r) {
    if (!el.previa || estado.vista !== 'cheio') return;
    r = r || Aura.carrinho.resumo();
    if (r.vazio) return;
    el.previa.textContent = montarMensagem(r, lerForm(), true).texto;
  }

  /* ---------- etapas e barra fixa ---------- */

  function atualizarEtapas() {
    if (!el.etapas) return;
    var atual;
    if (estado.vista === 'sucesso') atual = 4;
    else if (estado.vista !== 'cheio') atual = 1;
    else if (estado.formNaTela || estado.formAtivo || estado.formTocado) atual = errosAtuais().length ? 2 : 3;
    else atual = 1;
    $$('.etapa', el.etapas).forEach(function (li, i) {
      var n = i + 1;
      var feita = n < atual;
      var eAtual = n === atual;
      li.classList.toggle('is-feita', feita);
      li.classList.toggle('is-atual', eAtual);
      if (eAtual) li.setAttribute('aria-current', 'step');
      else li.removeAttribute('aria-current');
      var st = $('[data-etapa-status]', li);
      if (st) st.textContent = feita ? ', concluída' : '';
    });
  }

  function atualizarBarra() {
    if (!el.barra) return;
    var mostrar = estado.vista === 'cheio' && !estado.vis.resumo && !estado.vis.form && !estado.passouForm;
    el.barra.classList.toggle('is-visivel', mostrar);
    var celular = MQ_DESKTOP ? !MQ_DESKTOP.matches : true;
    document.body.classList.toggle('tem-barra-carrinho', mostrar && celular);
  }

  function observar() {
    if (!('IntersectionObserver' in window)) return;
    if (el.secaoForm) {
      new IntersectionObserver(function (ents) {
        ents.forEach(function (en) { estado.formNaTela = en.isIntersecting; });
        atualizarEtapas();
      }, { rootMargin: '-30% 0px -50% 0px' }).observe(el.secaoForm);
    }
    if (el.lateral && el.secaoForm && el.barra) {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) {
          if (en.target === el.lateral) {
            estado.vis.resumo = en.isIntersecting;
          } else {
            estado.vis.form = en.isIntersecting;
            estado.passouForm = !en.isIntersecting && en.boundingClientRect.top < 0;
          }
        });
        atualizarBarra();
      });
      io.observe(el.lateral);
      io.observe(el.secaoForm);
    }
    if (MQ_DESKTOP) {
      if (MQ_DESKTOP.addEventListener) MQ_DESKTOP.addEventListener('change', atualizarBarra);
      else if (MQ_DESKTOP.addListener) MQ_DESKTOP.addListener(atualizarBarra);
    }
    var timerTela = null;
    window.addEventListener('resize', function () {
      clearTimeout(timerTela);
      timerTela = setTimeout(ajustarFixo, 150);
    });
  }

  /* ---------- topo e estados da página ---------- */

  function definirTopo(eyebrow, titulo, lead, comCheck) {
    if (el.topoEyebrow) el.topoEyebrow.textContent = eyebrow;
    if (el.titulo) el.titulo.textContent = titulo;
    if (el.lead) el.lead.textContent = lead;
    if (el.topoCheck) {
      el.topoCheck.innerHTML = comCheck ? I('check') : '';
      el.topoCheck.hidden = !comCheck;
    }
  }

  function mostrarVista(nome) {
    el.vCheio.hidden = nome !== 'cheio';
    el.vVazio.hidden = nome !== 'vazio';
    el.vSucesso.hidden = nome !== 'sucesso';
    if (el.etapas) el.etapas.hidden = nome === 'vazio';
    if (el.topo) {
      el.topo.classList.toggle('is-vazio', nome === 'vazio');
      el.topo.classList.toggle('is-sucesso', nome === 'sucesso');
    }
  }

  function focarTitulo() {
    focar(el.titulo);
  }

  function anunciar(msg) {
    if (!el.anuncio) return;
    el.anuncio.textContent = '';
    setTimeout(function () { el.anuncio.textContent = msg; }, 60);
  }

  // no aparelho só quando a pessoa pediu para lembrar os dados; senão, só nesta aba
  function lerUltimoPedido() {
    var u = obj(Aura.store.get(KEY_ULTIMO, null)) || obj(sessao.get(KEY_ULTIMO));
    if (!u || typeof u.texto !== 'string' || !u.texto || !u.numero) return null;
    return u;
  }

  function guardarUltimoPedido(u) {
    if (F.lembrar.checked) {
      Aura.store.set(KEY_ULTIMO, u);
      sessao.remove(KEY_ULTIMO);
    } else {
      Aura.store.remove(KEY_ULTIMO);
      sessao.set(KEY_ULTIMO, u);
    }
  }

  // cópia dos itens do carrinho, para dar para voltar e editar o pedido depois do envio
  function copiaItens() {
    return Aura.carrinho.itens().map(function (it) {
      return { key: it.key, id: it.id, largura: it.largura, altura: it.altura, qtd: it.qtd, opcoes: it.opcoes || {} };
    });
  }

  function itensValidos(lista) {
    if (!Array.isArray(lista)) return [];
    return lista.filter(function (it) {
      var p = it && it.id && it.qtd > 0 ? Aura.porId(it.id) : null;
      return !!p && p.medidas.some(function (m) { return m.largura === it.largura && m.altura === it.altura; });
    });
  }

  // devolve os itens do pedido ao carrinho e volta para a tela de edição, com o formulário como estava
  function restaurarPedido() {
    var ed = estado.paraEditar;
    var itens = ed ? itensValidos(ed.itens) : [];
    if (!itens.length) {
      Aura.toast('Não deu para trazer os itens de volta. Monte o pedido de novo pelo catálogo.', 'erro');
      return;
    }
    estado.paraEditar = null;
    if (ed.numero) estado.numero = ed.numero; // é o mesmo pedido, corrigido
    var noCarrinho = Aura.carrinho.itens().map(function (it) { return it.key; });
    // render() fica parado enquanto a vista é 'sucesso'
    estado.vista = null;
    itens.forEach(function (it) {
      if (it.key && noCarrinho.indexOf(it.key) > -1) return; // não duplica o que já voltou
      Aura.carrinho.adicionar(it.id, it.largura, it.altura, it.qtd, it.opcoes);
    });
    render();
    if (estado.vista !== 'cheio') return;
    agendarRascunho(); // o formulário continua preenchido: volta a valer se a página recarregar
    try {
      window.scrollTo({ top: 0, behavior: REDUZ ? 'instant' : 'smooth' });
    } catch (e) {
      window.scrollTo(0, 0);
    }
    focarTitulo();
    Aura.toast('Seu pedido voltou para o carrinho. Ajuste o que precisar e envie de novo.');
  }

  function htmlUltimoPedido(u, podeEditar) {
    var data = formatarData(u.quando);
    var itens = Number(u.itens) || 0;
    return (
      '<aside class="ultimo-pedido" aria-labelledby="titulo-ultimo-pedido">' +
        '<span class="eyebrow"><i class="tz"></i>Seu último pedido</span>' +
        '<h2 class="ultimo-pedido__numero" id="titulo-ultimo-pedido">Pedido ' + esc(u.numero) + '</h2>' +
        '<dl class="ultimo-pedido__dados">' +
          (data ? '<div><dt>Data</dt><dd>' + esc(data) + '</dd></div>' : '') +
          (itens ? '<div><dt>Itens</dt><dd>' + itens + ' ' + Aura.plural(itens, 'item', 'itens') + '</dd></div>' : '') +
          '<div><dt>Total</dt><dd>' + brl(u.total) + '</dd></div>' +
        '</dl>' +
        '<a class="btn btn--wa btn--block" href="' + esc(Aura.linkWhatsApp(u.texto)) + '" target="_blank" rel="noopener">' + I('whatsapp') + 'Reenviar no WhatsApp</a>' +
        (podeEditar ? '<button type="button" class="btn btn--outline btn--block btn--sm" data-editar-pedido>Voltar e editar este pedido</button>' : '') +
        '<a class="btn btn--ghost btn--block btn--sm" href="' + esc(Aura.linkWhatsApp('Oi! Quero saber como está o meu pedido ' + u.numero + '.')) + '" target="_blank" rel="noopener">Perguntar como está o pedido</a>' +
        '<p class="ultimo-pedido__nota">Mandou e ficou sem resposta? Reenvie que a gente localiza pelo número.</p>' +
      '</aside>'
    );
  }

  function mostrarVazio() {
    definirTopo('Seu pedido', 'Seu carrinho está vazio', TXT.leadVazio, false);
    mostrarVista('vazio');

    var ultimo = lerUltimoPedido();
    var editaveis = ultimo ? itensValidos(ultimo.carrinho) : [];
    estado.paraEditar = editaveis.length ? { itens: editaveis, numero: ultimo.numero } : null;
    var f = Aura.primeiraFaixa;
    var top = Aura.produtos.slice().sort(function (a, b) { return b.vendidos - a.vendidos; }).slice(0, 8);

    el.vVazio.innerHTML =
      '<div class="container">' +
        '<div class="vazio-cartao' + (ultimo ? ' vazio-cartao--duplo' : '') + '">' +
          '<section class="vazio-cartao__principal" aria-labelledby="titulo-vazio">' +
            I('bag', 'vazio-cartao__icone') +
            '<h2 class="vazio-cartao__titulo" id="titulo-vazio">Que tal começar pelo catálogo?</h2>' +
            '<p class="vazio-cartao__texto">São ' + Aura.produtos.length + ' produtos entre janelas, portas e box para banheiro, todos com preço na hora. Escolheu a medida, é só colocar no carrinho.</p>' +
            (Aura.volumeAtivo && f
              ? '<p class="vazio-cartao__volume">' + I('percent') + '<span>Acima de <strong>' + f.acimaDe + ' ' + Aura.unidadeVolume + '</strong> no carrinho, você ganha <strong>' + f.percentual + '% de desconto</strong> automático.</span></p>'
              : '') +
            '<div class="vazio-cartao__ctas">' +
              '<a class="btn btn--dark btn--lg" href="catalogo.html">Ver catálogo completo' + I('arrow') + '</a>' +
              '<a class="btn btn--outline btn--lg vazio-cartao__wa" href="' + esc(Aura.linkWhatsApp('Oi! Quero ajuda para montar o meu pedido.')) + '" target="_blank" rel="noopener">' + I('whatsapp') + 'Pedir ajuda no WhatsApp</a>' +
            '</div>' +
          '</section>' +
          (ultimo ? htmlUltimoPedido(ultimo, !!estado.paraEditar) : '') +
        '</div>' +
      '</div>' +
      (top.length
        ? '<section class="secao secao--cinza carrinho-vazio__vitrine" aria-labelledby="titulo-mais-vendidos">' +
            '<div class="container">' +
              '<div class="secao__cabeca">' +
                '<div><span class="eyebrow"><i class="tz"></i>Mais vendidos</span><h2 id="titulo-mais-vendidos">Comece pelos queridinhos de quem está construindo.</h2></div>' +
                '<a class="link-seta" href="catalogo.html?ordem=mais-vendidos">Ver todos ' + I('arrow') + '</a>' +
              '</div>' +
              '<div class="carrossel" data-carrossel>' +
                '<div class="carrossel__trilho">' + top.map(Aura.cardProduto).join('') + '</div>' +
                '<div class="vitrine__rodape">' +
                  '<div class="carrossel__setas">' +
                    '<button type="button" class="carrossel__seta" data-carrossel-ant aria-label="Produtos anteriores">' + I('left') + '</button>' +
                    '<button type="button" class="carrossel__seta" data-carrossel-prox aria-label="Próximos produtos">' + I('right') + '</button>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</section>'
        : '');

    Aura.iniciarCarrosseis(el.vVazio);
    var trilho = $('.carrossel__trilho', el.vVazio);
    if (trilho) trilho.dispatchEvent(new Event('scroll'));
  }

  function mostrarCheio() {
    definirTopo('Seu pedido', 'Seu carrinho', TXT.leadCheio, false);
    mostrarVista('cheio');
  }

  function mostrarSucesso(p) {
    var retirada = p.entrega === 'retirada';
    var confirma = retirada ? 'confirma o prazo de retirada e o pagamento com você' : 'confirma frete, prazo e pagamento com você';
    var lead = p.abriu
      ? 'O WhatsApp abriu com o resumo completo do seu pedido. Confira e toque em enviar. Assim que a mensagem chegar, a nossa equipe ' + confirma + '.'
      : 'Seu pedido está montado, falta só enviar. Toque no botão abaixo e mande a mensagem que já vai prontinha. Nossa equipe ' + confirma + '.';
    definirTopo(p.abriu ? 'Quase lá' : 'Falta só enviar', 'Pedido ' + p.numero + ' pronto!', lead, true);
    mostrarVista('sucesso');

    // prazos sempre da configuração (pronta entrega, fabricação sob encomenda e retirada)
    var saida = 'Depois da confirmação, o pedido sai em ' + semPonto(Aura.prazoProntaEntrega) +
      (p.temSobEncomenda && Aura.prazoSobEncomenda ? ', ' + semPonto(Aura.prazoSobEncomenda) : '') + '.';
    var passo3 = retirada
      ? { t: 'Você retira na loja', d: ('A gente avisa no WhatsApp assim que estiver tudo separado. ' + prazoRetirada(p)).trim() }
      : { t: 'Seu pedido sai para entrega', d: saida + ' Vai com embalagem reforçada, seguro e rastreio até a sua obra.' };
    estado.paraEditar = p.carrinho && p.carrinho.length ? { itens: p.carrinho, numero: p.numero } : null;

    el.vSucesso.innerHTML =
      '<div class="sucesso">' +
        '<ul class="sucesso__chips" aria-label="Resumo do pedido">' +
          '<li>Total <strong>' + brl(p.total) + '</strong></li>' +
          '<li><strong>' + p.itens + '</strong> ' + Aura.plural(p.itens, 'item', 'itens') + '</li>' +
          '<li>Pagamento: <strong>' + esc(p.pagamento) + '</strong></li>' +
          '<li>' + (retirada ? 'Retirada na loja' : 'Entrega no endereço') + '</li>' +
        '</ul>' +
        (p.abriu ? '' :
          '<div class="aviso-box aviso-box--atencao sucesso__aviso">' + I('info') +
            '<p><strong>O WhatsApp não abriu sozinho?</strong> Alguns navegadores bloqueiam a nova janela. Pelo botão abaixo funciona, e a mensagem já vai pronta.</p>' +
          '</div>') +
        '<div class="sucesso__acoes">' +
          '<a class="btn btn--wa btn--lg" href="' + esc(Aura.linkWhatsApp(p.texto)) + '" target="_blank" rel="noopener">' + I('whatsapp') + (p.abriu ? 'Abrir o WhatsApp de novo' : 'Abrir o WhatsApp e enviar') + '</a>' +
          '<a class="btn btn--outline btn--lg" href="index.html">Voltar para a loja</a>' +
        '</div>' +
        (estado.paraEditar
          ? '<p class="sucesso__editar">Viu algo errado na medida, na quantidade ou no pagamento? <button type="button" class="resumo__link" data-editar-pedido>Voltar e editar o pedido</button></p>'
          : '') +
        '<div class="sucesso__grid">' +
          '<section class="sucesso__card" aria-labelledby="titulo-proximos">' +
            '<h2 id="titulo-proximos">O que acontece agora</h2>' +
            '<ol class="sucesso__passos">' +
              '<li><strong>Você envia a mensagem</strong><span>Confira o resumo no WhatsApp e toque em enviar. Se quiser, dá para editar antes.</span></li>' +
              '<li><strong>A gente confirma com você</strong><span>Nossa equipe confere o pedido, ' + (retirada ? 'o prazo de retirada' : 'o frete, o prazo') + ' e a forma de pagamento.</span></li>' +
              '<li><strong>' + esc(passo3.t) + '</strong><span>' + esc(passo3.d) + '</span></li>' +
            '</ol>' +
            '<p class="sucesso__numero">' + I('info') + '<span>Guarde o número <strong>' + esc(p.numero) + '</strong>. Com ele a gente acha o seu pedido rapidinho.</span></p>' +
          '</section>' +
          '<section class="sucesso__card" aria-labelledby="titulo-mensagem">' +
            '<div class="sucesso__card-topo">' +
              '<h2 id="titulo-mensagem">A mensagem do pedido</h2>' +
              '<button type="button" class="btn btn--outline btn--sm" data-copiar>Copiar</button>' +
            '</div>' +
            '<div class="previa__corpo previa__corpo--solta">' +
              '<div class="previa__bolha"><pre class="previa__texto" tabindex="0" aria-label="Mensagem do pedido">' + esc(p.texto) + '</pre></div>' +
            '</div>' +
          '</section>' +
        '</div>' +
      '</div>';

    var btnCopiar = $('[data-copiar]', el.vSucesso);
    if (btnCopiar) btnCopiar.addEventListener('click', function () { copiarTexto(p.texto); });

    atualizarEtapas();
    atualizarBarra();
    try {
      window.scrollTo({ top: 0, behavior: REDUZ ? 'instant' : 'smooth' });
    } catch (e) {
      window.scrollTo(0, 0);
    }
    focarTitulo();
  }

  /* ---------- renderização geral ---------- */

  var renderAgendado = false;
  function agendarRender() {
    if (renderAgendado) return;
    renderAgendado = true;
    // espera o clique ou o Tab terminar para não perder o foco no meio da troca
    setTimeout(render, 0);
  }

  function render() {
    renderAgendado = false;
    if (estado.vista === 'sucesso') return;
    var r = Aura.carrinho.resumo();
    var anterior = estado.vista;

    if (r.vazio) {
      if (anterior !== 'vazio') {
        var focoAqui = anterior === 'cheio' && el.vCheio.contains(document.activeElement);
        estado.vista = 'vazio';
        mostrarVazio();
        if (focoAqui) focarTitulo();
      }
    } else {
      if (anterior !== 'cheio') {
        estado.vista = 'cheio';
        mostrarCheio();
      }
      renderItens(r);
      var total = renderResumo(r);
      atualizarPrevia(r);
      // remoção já é anunciada pelo aviso do ui.js; aqui só a troca de quantidade
      if (anterior === 'cheio' && estado.motivo === 'quantidade') {
        anunciar('Carrinho atualizado. Total do pedido: ' + brl(total) + '.');
      }
    }
    estado.motivo = null;
    atualizarEtapas();
    atualizarBarra();
  }

  /* ---------- ir para o formulário ---------- */

  function primeiroPendente() {
    for (var i = 0; i < ORDEM.length; i++) {
      if (erroDe(ORDEM[i])) return F[ORDEM[i]];
    }
    return el.enviar;
  }

  function irParaFormulario(focarCampoPendente, suave) {
    if (!el.secaoForm || estado.vista !== 'cheio') return;
    if (focarCampoPendente) {
      var alvo = primeiroPendente();
      focar(alvo);
      if (alvo === F.nome) rolarAte(el.secaoForm, 'start', suave);
      else rolarAte(alvo.closest('.campo') || alvo, 'center', suave);
    } else {
      rolarAte(el.secaoForm, 'start', suave);
    }
  }

  /* ---------- envio do pedido ---------- */

  function enviar(e) {
    e.preventDefault();
    var r = Aura.carrinho.resumo();
    if (r.vazio) {
      agendarRender();
      return;
    }

    var erros = [];
    ORDEM.forEach(function (n) {
      F[n].setAttribute('data-sujo', '1');
      var m = validarCampo(n);
      if (m) erros.push({ nome: n, msg: m });
    });
    if (erros.length) {
      mostrarErros(erros);
      focarCampo(F[erros[0].nome]);
      atualizarEtapas();
      return;
    }
    esconderErros();

    var dados = lerForm();
    var numero = numeroPedido();
    var msg = montarMensagem(r, dados, false);

    // abre primeiro, ainda dentro do clique, para o navegador não bloquear a janela
    var abriu = abrirWhatsApp(msg.texto);

    clearTimeout(timerRascunho);
    clearTimeout(timerPrevia);
    if (F.lembrar.checked) Aura.store.set(KEY_CLIENTE, paraSalvar(dados));
    else Aura.store.remove(KEY_CLIENTE);
    if (dados.entrega === 'entrega' && dados.cep.length === 8) Aura.cepSalvo(dados.cep);
    // os itens vão junto para dar para voltar e editar o pedido, mesmo depois de limpar o carrinho
    var itensPedido = copiaItens();
    guardarUltimoPedido({
      numero: numero,
      texto: msg.texto,
      total: msg.totalGeral,
      quando: new Date().toISOString(),
      itens: r.unidades,
      carrinho: itensPedido,
    });
    sessao.remove(KEY_RASCUNHO);

    estado.vista = 'sucesso';
    Aura.carrinho.limpar();
    mostrarSucesso({
      numero: numero,
      texto: msg.texto,
      total: msg.totalGeral,
      itens: r.unidades,
      entrega: dados.entrega,
      pagamento: dados.pagamento,
      abriu: abriu,
      temSobEncomenda: !!r.temSobEncomenda,
      carrinho: itensPedido,
    });
  }

  /* ---------- Enter não envia o pedido sem querer ---------- */

  // Enter (ou "Ir" no teclado do celular) num campo leva ao próximo campo obrigatório que falta.
  // Com tudo certo, leva ao botão de enviar: o pedido só sai com um toque no botão.
  function aoApertarEnter(e) {
    if (e.key !== 'Enter' || e.isComposing || e.altKey || e.ctrlKey || e.metaKey) return;
    var t = e.target;
    if (!t || t.tagName !== 'INPUT' || /^(submit|button|reset|image)$/.test(t.type)) return;
    e.preventDefault();

    if (REGRAS[t.name]) {
      t.setAttribute('data-sujo', '1');
      if (validarCampo(t.name)) {
        atualizarResumoErros();
        return; // fica no campo, com a mensagem do que falta
      }
      atualizarResumoErros();
    }

    var depois = null;
    var antes = null;
    ORDEM.forEach(function (n) {
      if (!erroDe(n)) return;
      var c = F[n];
      if (c === t) return;
      var segue = t.compareDocumentPosition(c) & 4; // Node.DOCUMENT_POSITION_FOLLOWING
      if (segue && !depois) depois = c;
      if (!segue && !antes) antes = c;
    });
    var alvo = depois || antes;
    if (alvo) {
      focarCampo(alvo);
    } else {
      focar(el.enviar);
      rolarAte(el.enviar, 'center', true);
    }
    atualizarEtapas();
  }

  /* ---------- eventos ---------- */

  function eventos() {
    window.addEventListener('aura:carrinho', function (e) {
      estado.motivo = e.detail && e.detail.motivo;
      agendarRender();
    });

    // formulário
    aplicarMascara(F.telefone, formatarTelefone);
    aplicarMascara(F.cep, Aura.formatarCep);
    aplicarMascara(el.cepResumoInput, Aura.formatarCep);

    el.form.addEventListener('input', function (e) {
      var t = e.target;
      if (!t.name) return;
      estado.formTocado = true;
      t.setAttribute('data-sujo', '1');
      t.removeAttribute('data-auto');
      if (t.name === 'cep') aoMudarCep(Aura.limparCep(t.value), 'form');
      if (REGRAS[t.name] && t.closest('.campo.is-erro')) validarCampo(t.name);
      atualizarResumoErros();
      agendarPrevia();
      agendarRascunho();
      atualizarEtapas();
    });

    el.form.addEventListener('change', function (e) {
      var t = e.target;
      if (t.name === 'entrega') {
        aplicarEntrega();
        if (estado.vista === 'cheio') renderResumo(Aura.carrinho.resumo());
        atualizarResumoErros();
      }
      if (t.name === 'lembrar') {
        aoMudarLembrar();
        return;
      }
      if (t.name === 'uf') {
        t.setAttribute('data-sujo', '1');
        validarCampo('uf');
        atualizarResumoErros();
      }
      agendarPrevia();
      agendarRascunho();
      atualizarEtapas();
    });

    el.form.addEventListener('focusout', function (e) {
      var t = e.target;
      if (REGRAS[t.name] && t.hasAttribute('data-sujo')) validarCampo(t.name);
    });

    el.form.addEventListener('focusin', function () {
      if (estado.formAtivo) return;
      estado.formAtivo = true;
      atualizarEtapas();
    });

    el.form.addEventListener('keydown', aoApertarEnter);
    el.form.addEventListener('submit', enviar);

    // "Voltar e editar o pedido" (tela de pedido pronto e cartão do último pedido)
    [el.vSucesso, el.vVazio].forEach(function (v) {
      v.addEventListener('click', function (e) {
        if (e.target.closest('[data-editar-pedido]')) restaurarPedido();
      });
    });

    el.erros.addEventListener('click', function (e) {
      var a = e.target.closest('[data-ir-campo]');
      if (!a) return;
      e.preventDefault();
      focarCampo(F[a.getAttribute('data-ir-campo')]);
    });

    if (el.previaBox) {
      el.previaBox.addEventListener('toggle', function () {
        if (el.previaBox.open) atualizarPrevia();
      });
    }

    // CEP do resumo
    if (el.cepResumo) {
      el.cepResumoInput.addEventListener('input', function () {
        var d = Aura.limparCep(el.cepResumoInput.value);
        if (d.length === 8 && Aura.regiaoPorCep(d)) {
          erroCepResumo('');
          aoMudarCep(d, 'resumo');
        } else if (el.cepResumo.classList.contains('is-erro')) {
          erroCepResumo('');
        }
      });
      el.cepResumo.addEventListener('submit', function (e) {
        e.preventDefault();
        var d = Aura.limparCep(el.cepResumoInput.value);
        if (d.length !== 8 || !Aura.regiaoPorCep(d)) {
          erroCepResumo(d.length !== 8 ? 'Digite os 8 números do seu CEP.' : 'Esse CEP não parece válido. Confere os números?');
          focar(el.cepResumoInput);
          return;
        }
        erroCepResumo('');
        aoMudarCep(d, 'resumo');
      });
    }

    // botões que nascem dentro do resumo
    if (el.lateral) {
      el.lateral.addEventListener('click', function (e) {
        if (e.target.closest('[data-focar-cep]')) {
          if (el.cepResumo && !el.cepResumo.hidden) focar(el.cepResumoInput);
          else focarCampo(F.cep);
        }
      });
    }

    // esvaziar
    var esvaziar = $('[data-esvaziar]');
    if (esvaziar) {
      esvaziar.addEventListener('click', function () {
        if (!window.confirm('Quer mesmo tirar todos os itens do carrinho?')) return;
        Aura.carrinho.limpar();
        Aura.toast('Carrinho esvaziado');
      });
    }

    // "Finalizar pedido" do resumo, da barra fixa e do carrinho lateral
    document.addEventListener('click', function (e) {
      var a = e.target.closest('[data-ir-finalizar], a[href="carrinho.html#finalizar"]');
      if (!a || estado.vista !== 'cheio') return;
      e.preventDefault();
      Aura.fecharDrawers();
      irParaFormulario(true, true);
    });

    window.addEventListener('hashchange', function () {
      if (window.location.hash === '#finalizar' && estado.vista === 'cheio') {
        Aura.fecharDrawers();
        irParaFormulario(false, true);
      }
    });
  }

  /* ---------- início ---------- */

  function iniciar() {
    montarUF();
    montarRetirada();
    montarPagamentos();

    // guarda as descrições fixas de cada campo para somar a mensagem de erro depois
    ORDEM.forEach(function (n) {
      F[n].setAttribute('data-desc', F[n].getAttribute('aria-describedby') || '');
    });

    // dados de uma visita anterior: primeiro o rascunho desta sessão, depois o que ficou salvo no aparelho
    var rascunho = obj(sessao.get(KEY_RASCUNHO));
    var salvo = obj(Aura.store.get(KEY_CLIENTE, null));
    if (rascunho) preencherForm(rascunho, true);
    else if (salvo) preencherForm(salvo, false);
    // "Lembrar meus dados" começa desmarcada; volta marcada só para quem já tinha escolhido lembrar
    F.lembrar.checked = rascunho && typeof rascunho.lembrar === 'boolean' ? rascunho.lembrar : !!salvo;
    montarArmazenamento();
    if (!Aura.limparCep(F.cep.value)) {
      var cepGuardado = Aura.cepSalvo();
      if (cepGuardado) F.cep.value = Aura.formatarCep(cepGuardado);
    }

    aplicarEntrega();

    estado.cep = Aura.limparCep(F.cep.value);
    if (el.cepResumoInput) el.cepResumoInput.value = Aura.formatarCep(estado.cep);
    if (estado.cep.length === 8 && Aura.regiaoPorCep(estado.cep)) {
      // endereço já preenchido: não precisa buscar de novo
      if (F.endereco.value && F.cidade.value) estado.cepBuscado = estado.cep;
      else buscarCep(estado.cep);
    }

    eventos();
    render();
    observar();

    // veio do carrinho lateral (carrinho.html#finalizar)
    if (window.location.hash === '#finalizar' && estado.vista === 'cheio') {
      setTimeout(function () { irParaFormulario(false, false); }, 80);
    }
  }

  iniciar();
})();
