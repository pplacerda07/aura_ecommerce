/*
  CONFIGURAÇÃO GERAL DA LOJA AURA
  ===============================
  Tudo que é regra comercial ou dado da empresa fica aqui.
  Mudou aqui, muda no site inteiro (cards, carrinho, página de produto e mensagem do WhatsApp).
*/
window.AURA_CONFIG = {
  empresa: {
    nome: 'Aura',
    nomeCompleto: 'Aura Vidros e Esquadrias',
    razaoSocial: 'Aura Vidros e Esquadrias Ltda.', // TROQUE pela razão social real
    cnpj: '00.000.000/0001-00', // TROQUE pelo CNPJ real
    endereco: 'Rua Exemplo, 123, Distrito Industrial, São Paulo, SP', // TROQUE
    cidade: 'São Paulo, SP',
    email: 'contato@auravidros.com.br', // TROQUE
    telefone: '(11) 4000-0000', // TROQUE
    telefoneLink: '551140000000',
    instagram: 'https://instagram.com/', // TROQUE
    facebook: 'https://facebook.com/', // TROQUE
    site: 'https://auravidros.com.br', // TROQUE pelo domínio final (usado no link do produto enviado no WhatsApp)
    horario: [
      { dias: 'Segunda a sexta', horas: '8h às 18h' },
      { dias: 'Sábado', horas: '8h às 12h' },
      { dias: 'Domingo e feriados', horas: 'Fechado' },
    ],
    // números exibidos na home e na página Sobre. TROQUE pelos números reais da empresa.
    numeros: [
      { valor: '12 anos', rotulo: 'fabricando esquadrias' },
      { valor: '+18 mil', rotulo: 'peças entregues' },
      { valor: '26 estados', rotulo: 'atendidos pela nossa entrega' },
      { valor: '4,9 de 5', rotulo: 'nota média dos clientes' },
    ],
  },

  whatsapp: {
    numero: '5511999999999', // TROQUE: DDI + DDD + número, só dígitos
    nomeAtendente: 'Atendimento Aura',
    // aparece no pop-up do WhatsApp
    saudacao: 'Oi! Ficou com dúvida sobre medida, prazo ou frete? Me chama aqui que eu te ajudo agora.',
    // o pop-up abre sozinho uma vez por visita depois desse tempo (em segundos). 0 desliga.
    abrirSozinhoApos: 14,
    // horário do atendimento no WhatsApp (0 = domingo, 6 = sábado). Usado para mostrar "online agora".
    horas: { 0: null, 1: [8, 18], 2: [8, 18], 3: [8, 18], 4: [8, 18], 5: [8, 18], 6: [8, 12] },
    // dias sem atendimento (formato AAAA-MM-DD). Nesses dias o site não mostra "online agora".
    feriados: ['2026-10-12', '2026-11-02', '2026-11-15', '2026-11-20', '2026-12-25', '2027-01-01', '2027-02-08', '2027-02-09', '2027-03-26', '2027-04-21', '2027-05-01', '2027-05-27', '2027-09-07', '2027-10-12', '2027-11-02', '2027-11-15', '2027-11-20', '2027-12-25'],
    atalhos: [
      { rotulo: 'Quero um orçamento', mensagem: 'Oi! Quero um orçamento para a minha obra.' },
      { rotulo: 'Ajuda com a medida', mensagem: 'Oi! Preciso de ajuda para escolher a medida certa.' },
      { rotulo: 'Prazo e frete', mensagem: 'Oi! Queria saber o prazo e o frete para a minha cidade.' },
      { rotulo: 'Acompanhar meu pedido', mensagem: 'Oi! Quero acompanhar o meu pedido.' },
    ],
  },

  /*
    REGRA UNIVERSAL DE DESCONTO POR VOLUME
    --------------------------------------
    Vale para qualquer combinação de produtos no carrinho.
    "acimaDe: 10" significa: a partir de 11 itens o desconto entra sozinho.
    contarPor:
      'unidades' = soma das quantidades (2 janelas iguais contam como 2)
      'produtos' = conta só produtos/medidas diferentes no carrinho
    Quer mais faixas? Adicione na lista, por exemplo:
      { acimaDe: 10, percentual: 8 },
      { acimaDe: 20, percentual: 12 },
    O site sempre aplica a maior faixa atingida.
  */
  descontoVolume: {
    ativo: true,
    contarPor: 'unidades',
    faixas: [
      { acimaDe: 10, percentual: 8 },
    ],
  },

  pagamento: {
    // desconto no Pix, aplicado sobre o total já com o desconto por volume
    pixPercentual: 10,
    maxParcelas: 10, // parcelamento sem juros no cartão
    formas: ['Pix', 'Cartão de crédito', 'Boleto bancário'],
  },

  /*
    FRETE SIMULADO (estimativa por região do CEP)
    O valor exato é confirmado no WhatsApp junto com o pedido.
  */
  frete: {
    gratisAcimaDe: 4000, // frete grátis a partir deste valor nos produtos, já com o desconto por volume (0 desliga)
    regioes: {
      'sp-capital': { nome: 'Grande São Paulo', valor: 79.9, prazo: '2 a 4 dias úteis' },
      sudeste: { nome: 'Sudeste', valor: 129.9, prazo: '3 a 6 dias úteis' },
      sul: { nome: 'Sul', valor: 169.9, prazo: '4 a 8 dias úteis' },
      'centro-oeste': { nome: 'Centro-Oeste', valor: 199.9, prazo: '5 a 9 dias úteis' },
      nordeste: { nome: 'Nordeste', valor: 249.9, prazo: '7 a 12 dias úteis' },
      norte: { nome: 'Norte', valor: 289.9, prazo: '9 a 15 dias úteis' },
    },
    // prazo de despacho dos itens com estoque (pronta entrega)
    prazoProntaEntrega: 'até 2 dias úteis',
    // prazo extra dos itens sem estoque (sob encomenda)
    prazoSobEncomenda: 'mais 10 dias úteis para fabricação',
  },

  retirada: {
    ativo: true,
    endereco: 'Rua Exemplo, 123, Distrito Industrial, São Paulo, SP', // TROQUE
    prazo: 'Pronto para retirar em até 2 dias úteis após a confirmação',
  },

  // garantia por linha. Mudou aqui, muda na home, nas páginas de produto e na central de ajuda.
  garantia: {
    essencial: '1 ano',
    premium: '2 anos',
    box: '1 ano',
  },

  site: {
    // mostra um rótulo discreto dentro dos espaços de imagem (ajuda a saber qual foto vai em cada lugar).
    // Coloque false quando for publicar.
    mostrarRotulosDeImagem: true,
    // regra de medida usada no site inteiro: as medidas da tabela são medidas de vão
    regraMedida: 'As medidas da loja são medidas de vão: a peça já sai de fábrica com a folga de instalação descontada. Escolha a medida igual à do seu vão ou a mais próxima abaixo.',
    itensPorPagina: 24,
    // faixa preta do topo. {pix}, {volumeAcimaDe} e {volumePercentual} são trocados pelos valores acima.
    avisos: [
      'Pagou no Pix, ganhou {pix}% de desconto',
      'Acima de {volumeAcimaDe} itens, mais {volumePercentual}% de desconto automático',
      'Entregamos em todo o Brasil com seguro',
    ],
  },

  /*
    DEPOIMENTOS
    Os textos abaixo são só exemplos de layout.
    SUBSTITUA por depoimentos reais de clientes antes de publicar o site.
  */
  depoimentos: [
    { nome: 'Nome do cliente', local: 'Cidade, UF', texto: 'Espaço para o depoimento de um cliente real. Conte como foi a compra, a entrega e a instalação.', produto: 'Produto comprado' },
    { nome: 'Nome do cliente', local: 'Cidade, UF', texto: 'Espaço para o depoimento de um cliente real. Depoimentos curtos e específicos passam mais confiança.', produto: 'Produto comprado' },
    { nome: 'Nome do cliente', local: 'Cidade, UF', texto: 'Espaço para o depoimento de um cliente real. Se tiver foto da obra pronta, melhor ainda.', produto: 'Produto comprado' },
  ],
};
