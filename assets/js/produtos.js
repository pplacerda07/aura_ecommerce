/*
  CATÁLOGO AURA
  =============
  Este arquivo é a sua base de produtos. Pode editar à vontade.

  Como funciona cada produto:
  - id: código interno (aparece no pedido do WhatsApp)
  - slug: endereço da página (produto.html?p=slug). Use letras minúsculas e hífen.
  - modelo: produtos com o mesmo modelo aparecem como "outras opções" entre si
  - categoria / subcategoria: precisam existir em AURA_CATEGORIAS logo abaixo
  - linha: "essencial", "premium" ou null (box de vidro)
  - cor: chave de AURA_CORES
  - selos: "mais-vendido", "pronta-entrega", "novidade"
  - medidas: cada medida é uma variação com preço próprio (largura e altura em cm)
      estoque 0 = sob encomenda. "rotulo" é opcional e substitui o texto padrão da medida.
  - opcoes: escolhas extras obrigatórias (ex.: lado da abertura)
  - imagens: lista de caminhos das fotos. Vazio = mostra o espaço reservado (mockup).
      Exemplo: imagens: ['assets/img/produtos/AV1001-1.jpg', 'assets/img/produtos/AV1001-2.jpg']
      Ordem sugerida: recorte em fundo branco, foto instalada, desenho com cotas, detalhe.
*/

window.AURA_CATEGORIAS = [
  {
    "slug": "janelas",
    "nome": "Janelas",
    "descricao": "Vitrôs, venezianas, maxim-ar e basculantes em alumínio, prontos para instalar. Escolha a medida do seu vão e receba em casa.",
    "subs": [
      {
        "slug": "vitros-de-correr",
        "nome": "Vitrôs e janelas de correr"
      },
      {
        "slug": "venezianas",
        "nome": "Venezianas"
      },
      {
        "slug": "maxim-ar",
        "nome": "Maxim-ar"
      },
      {
        "slug": "basculantes",
        "nome": "Basculantes"
      },
      {
        "slug": "persiana-integrada",
        "nome": "Persiana integrada"
      }
    ]
  },
  {
    "slug": "portas",
    "nome": "Portas",
    "descricao": "Portas de correr, de abrir, balcão, camarão e pivotantes em alumínio. Robustas, bonitas e sem manutenção.",
    "subs": [
      {
        "slug": "portas-de-correr",
        "nome": "Portas de correr"
      },
      {
        "slug": "portas-de-abrir",
        "nome": "Portas de abrir"
      },
      {
        "slug": "portas-balcao",
        "nome": "Portas balcão"
      },
      {
        "slug": "portas-camarao",
        "nome": "Portas camarão"
      },
      {
        "slug": "portas-pivotantes",
        "nome": "Portas pivotantes"
      }
    ]
  },
  {
    "slug": "box-para-banheiro",
    "nome": "Box para banheiro",
    "descricao": "Box em vidro temperado de 8 mm com kit completo. Frontal, de canto ou até o teto, do jeito que o seu banheiro pede.",
    "subs": [
      {
        "slug": "box-frontal",
        "nome": "Box frontal"
      },
      {
        "slug": "box-de-canto",
        "nome": "Box de canto"
      }
    ]
  }
];

window.AURA_LINHAS = {
  "essencial": {
    "nome": "Linha Essencial",
    "perfil": "Perfil 20 mm",
    "resumo": "O melhor custo-benefício para a obra toda."
  },
  "premium": {
    "nome": "Linha Premium",
    "perfil": "Perfil 25 mm",
    "resumo": "Mais robusta, vedação reforçada e roldanas com rolamento."
  }
};

window.AURA_CORES = {
  "preto": {
    "nome": "Preto",
    "hex": "#1C1C1C"
  },
  "branco": {
    "nome": "Branco",
    "hex": "#F7F7F5"
  },
  "bronze": {
    "nome": "Bronze",
    "hex": "#5A4535"
  },
  "natural": {
    "nome": "Natural Fosco",
    "hex": "#B8B8B2"
  },
  "prata": {
    "nome": "Prata",
    "hex": "#C9CBCF"
  }
};

window.AURA_SELOS = {
  "mais-vendido": {
    "nome": "Mais vendido"
  },
  "pronta-entrega": {
    "nome": "Pronta entrega"
  },
  "novidade": {
    "nome": "Novidade"
  }
};

window.AURA_PRODUTOS = [
  {
    "id": "AV1001",
    "slug": "vitro-de-correr-2-folhas-preto-linha-essencial",
    "nome": "Vitrô de Correr 2 Folhas Preto Linha Essencial",
    "modelo": "vitro-correr-2f-essencial",
    "categoria": "janelas",
    "subcategoria": "vitros-de-correr",
    "linha": "essencial",
    "cor": "preto",
    "vidro": "Liso incolor 4 mm",
    "folhas": 2,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "mais-vendido",
      "pronta-entrega"
    ],
    "vendidos": 1068,
    "medidas": [
      {
        "largura": 100,
        "altura": 100,
        "preco": 379.9,
        "estoque": 22,
        "pesoKg": 11
      },
      {
        "largura": 120,
        "altura": 100,
        "preco": 419.9,
        "estoque": 7,
        "pesoKg": 13.2
      },
      {
        "largura": 120,
        "altura": 120,
        "preco": 459.9,
        "estoque": 23,
        "pesoKg": 15.8
      },
      {
        "largura": 150,
        "altura": 100,
        "preco": 479.9,
        "estoque": 5,
        "pesoKg": 16.5
      },
      {
        "largura": 150,
        "altura": 120,
        "preco": 539.9,
        "estoque": 25,
        "pesoKg": 19.8
      }
    ],
    "opcoes": [],
    "descricao": [
      "O clássico que nunca dá errado. Duas folhas de correr, abertura de metade do vão e um visual limpo que combina com qualquer fachada.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Essencial você tem o melhor custo-benefício para a obra toda: perfil leve e resistente, acabamento caprichado e preço que cabe no orçamento.",
      "Indicada para quartos, salas e cozinhas."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Melhor custo-benefício para a obra toda",
      "Pintura eletrostática que não descasca",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1001",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Essencial (perfil 20 mm)",
      "Batente": "6 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "2",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas de nylon",
      "Vedação": "Escova de vedação",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1002",
    "slug": "vitro-de-correr-2-folhas-branco-linha-essencial",
    "nome": "Vitrô de Correr 2 Folhas Branco Linha Essencial",
    "modelo": "vitro-correr-2f-essencial",
    "categoria": "janelas",
    "subcategoria": "vitros-de-correr",
    "linha": "essencial",
    "cor": "branco",
    "vidro": "Liso incolor 4 mm",
    "folhas": 2,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "pronta-entrega"
    ],
    "vendidos": 250,
    "medidas": [
      {
        "largura": 100,
        "altura": 100,
        "preco": 359.9,
        "estoque": 14,
        "pesoKg": 11
      },
      {
        "largura": 120,
        "altura": 100,
        "preco": 389.9,
        "estoque": 22,
        "pesoKg": 13.2
      },
      {
        "largura": 120,
        "altura": 120,
        "preco": 439.9,
        "estoque": 12,
        "pesoKg": 15.8
      },
      {
        "largura": 150,
        "altura": 100,
        "preco": 449.9,
        "estoque": 28,
        "pesoKg": 16.5
      },
      {
        "largura": 150,
        "altura": 120,
        "preco": 509.9,
        "estoque": 28,
        "pesoKg": 19.8
      }
    ],
    "opcoes": [],
    "descricao": [
      "O clássico que nunca dá errado. Duas folhas de correr, abertura de metade do vão e um visual limpo que combina com qualquer fachada.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática branca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Essencial você tem o melhor custo-benefício para a obra toda: perfil leve e resistente, acabamento caprichado e preço que cabe no orçamento.",
      "Indicada para quartos, salas e cozinhas."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Melhor custo-benefício para a obra toda",
      "Pintura eletrostática que não descasca",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1002",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática branca",
      "Linha": "Linha Essencial (perfil 20 mm)",
      "Batente": "6 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "2",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas de nylon",
      "Vedação": "Escova de vedação",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1003",
    "slug": "vitro-de-correr-2-folhas-preto-linha-premium",
    "nome": "Vitrô de Correr 2 Folhas Preto Linha Premium",
    "modelo": "vitro-correr-2f-premium",
    "categoria": "janelas",
    "subcategoria": "vitros-de-correr",
    "linha": "premium",
    "cor": "preto",
    "vidro": "Liso incolor 4 mm",
    "folhas": 2,
    "abertura": "Correr",
    "grade": false,
    "selos": [],
    "vendidos": 310,
    "medidas": [
      {
        "largura": 100,
        "altura": 100,
        "preco": 509.9,
        "estoque": 0,
        "pesoKg": 11
      },
      {
        "largura": 120,
        "altura": 100,
        "preco": 559.9,
        "estoque": 0,
        "pesoKg": 13.2
      },
      {
        "largura": 120,
        "altura": 120,
        "preco": 629.9,
        "estoque": 0,
        "pesoKg": 15.8
      },
      {
        "largura": 150,
        "altura": 100,
        "preco": 639.9,
        "estoque": 0,
        "pesoKg": 16.5
      },
      {
        "largura": 150,
        "altura": 120,
        "preco": 719.9,
        "estoque": 0,
        "pesoKg": 19.8
      }
    ],
    "opcoes": [],
    "descricao": [
      "O clássico que nunca dá errado. Duas folhas de correr, abertura de metade do vão e um visual limpo que combina com qualquer fachada.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto, as roldanas têm rolamento e a vedação leva borracha EPDM, então a peça corre mais macia, veda melhor contra vento e água e dura muito mais.",
      "Indicada para quartos, salas e cozinhas."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Roldanas com rolamento e vedação reforçada",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1003",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "2",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas com rolamento",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1004",
    "slug": "vitro-de-correr-2-folhas-bronze-linha-premium",
    "nome": "Vitrô de Correr 2 Folhas Bronze Linha Premium",
    "modelo": "vitro-correr-2f-premium",
    "categoria": "janelas",
    "subcategoria": "vitros-de-correr",
    "linha": "premium",
    "cor": "bronze",
    "vidro": "Liso incolor 4 mm",
    "folhas": 2,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "novidade"
    ],
    "vendidos": 126,
    "medidas": [
      {
        "largura": 100,
        "altura": 100,
        "preco": 519.9,
        "estoque": 0,
        "pesoKg": 11
      },
      {
        "largura": 120,
        "altura": 100,
        "preco": 579.9,
        "estoque": 0,
        "pesoKg": 13.2
      },
      {
        "largura": 120,
        "altura": 120,
        "preco": 639.9,
        "estoque": 0,
        "pesoKg": 15.8
      },
      {
        "largura": 150,
        "altura": 100,
        "preco": 659.9,
        "estoque": 0,
        "pesoKg": 16.5
      },
      {
        "largura": 150,
        "altura": 120,
        "preco": 739.9,
        "estoque": 0,
        "pesoKg": 19.8
      }
    ],
    "opcoes": [],
    "descricao": [
      "O clássico que nunca dá errado. Duas folhas de correr, abertura de metade do vão e um visual limpo que combina com qualquer fachada.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática bronze, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto, as roldanas têm rolamento e a vedação leva borracha EPDM, então a peça corre mais macia, veda melhor contra vento e água e dura muito mais.",
      "Indicada para quartos, salas e cozinhas."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Roldanas com rolamento e vedação reforçada",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1004",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática bronze",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "2",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas com rolamento",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1005",
    "slug": "vitro-de-correr-4-folhas-preto-linha-essencial",
    "nome": "Vitrô de Correr 4 Folhas Preto Linha Essencial",
    "modelo": "vitro-correr-4f-essencial",
    "categoria": "janelas",
    "subcategoria": "vitros-de-correr",
    "linha": "essencial",
    "cor": "preto",
    "vidro": "Liso incolor 4 mm",
    "folhas": 4,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "mais-vendido",
      "pronta-entrega"
    ],
    "vendidos": 761,
    "medidas": [
      {
        "largura": 150,
        "altura": 100,
        "preco": 559.9,
        "estoque": 14,
        "pesoKg": 16.5
      },
      {
        "largura": 150,
        "altura": 120,
        "preco": 619.9,
        "estoque": 36,
        "pesoKg": 19.8
      },
      {
        "largura": 200,
        "altura": 100,
        "preco": 659.9,
        "estoque": 34,
        "pesoKg": 22
      },
      {
        "largura": 200,
        "altura": 120,
        "preco": 749.9,
        "estoque": 30,
        "pesoKg": 26.4
      },
      {
        "largura": 240,
        "altura": 120,
        "preco": 849.9,
        "estoque": 36,
        "pesoKg": 31.7
      }
    ],
    "opcoes": [],
    "descricao": [
      "Quatro folhas, duas fixas e duas de correr, para vãos largos que pedem bastante luz e ventilação bem distribuída.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Essencial você tem o melhor custo-benefício para a obra toda: perfil leve e resistente, acabamento caprichado e preço que cabe no orçamento.",
      "Indicada para salas e vãos largos."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Melhor custo-benefício para a obra toda",
      "Pintura eletrostática que não descasca",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1005",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Essencial (perfil 20 mm)",
      "Batente": "6 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "4",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas de nylon",
      "Vedação": "Escova de vedação",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1006",
    "slug": "vitro-de-correr-4-folhas-branco-linha-essencial",
    "nome": "Vitrô de Correr 4 Folhas Branco Linha Essencial",
    "modelo": "vitro-correr-4f-essencial",
    "categoria": "janelas",
    "subcategoria": "vitros-de-correr",
    "linha": "essencial",
    "cor": "branco",
    "vidro": "Liso incolor 4 mm",
    "folhas": 4,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "pronta-entrega"
    ],
    "vendidos": 174,
    "medidas": [
      {
        "largura": 150,
        "altura": 100,
        "preco": 529.9,
        "estoque": 30,
        "pesoKg": 16.5
      },
      {
        "largura": 150,
        "altura": 120,
        "preco": 589.9,
        "estoque": 10,
        "pesoKg": 19.8
      },
      {
        "largura": 200,
        "altura": 100,
        "preco": 629.9,
        "estoque": 11,
        "pesoKg": 22
      },
      {
        "largura": 200,
        "altura": 120,
        "preco": 709.9,
        "estoque": 18,
        "pesoKg": 26.4
      },
      {
        "largura": 240,
        "altura": 120,
        "preco": 799.9,
        "estoque": 33,
        "pesoKg": 31.7
      }
    ],
    "opcoes": [],
    "descricao": [
      "Quatro folhas, duas fixas e duas de correr, para vãos largos que pedem bastante luz e ventilação bem distribuída.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática branca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Essencial você tem o melhor custo-benefício para a obra toda: perfil leve e resistente, acabamento caprichado e preço que cabe no orçamento.",
      "Indicada para salas e vãos largos."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Melhor custo-benefício para a obra toda",
      "Pintura eletrostática que não descasca",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1006",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática branca",
      "Linha": "Linha Essencial (perfil 20 mm)",
      "Batente": "6 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "4",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas de nylon",
      "Vedação": "Escova de vedação",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1007",
    "slug": "vitro-de-correr-4-folhas-com-grade-preto-linha-essencial",
    "nome": "Vitrô de Correr 4 Folhas com Grade Preto Linha Essencial",
    "modelo": "vitro-correr-4f-essencial",
    "categoria": "janelas",
    "subcategoria": "vitros-de-correr",
    "linha": "essencial",
    "cor": "preto",
    "vidro": "Liso incolor 4 mm",
    "folhas": 4,
    "abertura": "Correr",
    "grade": true,
    "selos": [
      "pronta-entrega"
    ],
    "vendidos": 227,
    "medidas": [
      {
        "largura": 150,
        "altura": 100,
        "preco": 629.9,
        "estoque": 36,
        "pesoKg": 16.5
      },
      {
        "largura": 150,
        "altura": 120,
        "preco": 709.9,
        "estoque": 11,
        "pesoKg": 19.8
      },
      {
        "largura": 200,
        "altura": 100,
        "preco": 749.9,
        "estoque": 19,
        "pesoKg": 22
      },
      {
        "largura": 200,
        "altura": 120,
        "preco": 849.9,
        "estoque": 13,
        "pesoKg": 26.4
      },
      {
        "largura": 240,
        "altura": 120,
        "preco": 969.9,
        "estoque": 16,
        "pesoKg": 31.7
      }
    ],
    "opcoes": [],
    "descricao": [
      "Quatro folhas, duas fixas e duas de correr, para vãos largos que pedem bastante luz e ventilação bem distribuída.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Essencial você tem o melhor custo-benefício para a obra toda: perfil leve e resistente, acabamento caprichado e preço que cabe no orçamento.",
      "Indicada para salas e vãos largos."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Melhor custo-benefício para a obra toda",
      "Pintura eletrostática que não descasca",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1007",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Essencial (perfil 20 mm)",
      "Batente": "6 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "4",
      "Fechamento": "Fecho concha com trava",
      "Grade": "Grade de proteção em alumínio integrada",
      "Roldanas": "Roldanas de nylon",
      "Vedação": "Escova de vedação",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1008",
    "slug": "vitro-de-correr-4-folhas-preto-linha-premium",
    "nome": "Vitrô de Correr 4 Folhas Preto Linha Premium",
    "modelo": "vitro-correr-4f-premium",
    "categoria": "janelas",
    "subcategoria": "vitros-de-correr",
    "linha": "premium",
    "cor": "preto",
    "vidro": "Liso incolor 4 mm",
    "folhas": 4,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "mais-vendido"
    ],
    "vendidos": 753,
    "medidas": [
      {
        "largura": 150,
        "altura": 100,
        "preco": 749.9,
        "estoque": 0,
        "pesoKg": 16.5
      },
      {
        "largura": 150,
        "altura": 120,
        "preco": 829.9,
        "estoque": 0,
        "pesoKg": 19.8
      },
      {
        "largura": 200,
        "altura": 100,
        "preco": 889.9,
        "estoque": 0,
        "pesoKg": 22
      },
      {
        "largura": 200,
        "altura": 120,
        "preco": 1009.9,
        "estoque": 0,
        "pesoKg": 26.4
      },
      {
        "largura": 240,
        "altura": 120,
        "preco": 1139.9,
        "estoque": 0,
        "pesoKg": 31.7
      }
    ],
    "opcoes": [],
    "descricao": [
      "Quatro folhas, duas fixas e duas de correr, para vãos largos que pedem bastante luz e ventilação bem distribuída.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto, as roldanas têm rolamento e a vedação leva borracha EPDM, então a peça corre mais macia, veda melhor contra vento e água e dura muito mais.",
      "Indicada para salas e vãos largos."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Roldanas com rolamento e vedação reforçada",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1008",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "4",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas com rolamento",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1009",
    "slug": "vitro-de-correr-4-folhas-branco-linha-premium",
    "nome": "Vitrô de Correr 4 Folhas Branco Linha Premium",
    "modelo": "vitro-correr-4f-premium",
    "categoria": "janelas",
    "subcategoria": "vitros-de-correr",
    "linha": "premium",
    "cor": "branco",
    "vidro": "Liso incolor 4 mm",
    "folhas": 4,
    "abertura": "Correr",
    "grade": false,
    "selos": [],
    "vendidos": 228,
    "medidas": [
      {
        "largura": 150,
        "altura": 100,
        "preco": 709.9,
        "estoque": 0,
        "pesoKg": 16.5
      },
      {
        "largura": 150,
        "altura": 120,
        "preco": 789.9,
        "estoque": 0,
        "pesoKg": 19.8
      },
      {
        "largura": 200,
        "altura": 100,
        "preco": 839.9,
        "estoque": 0,
        "pesoKg": 22
      },
      {
        "largura": 200,
        "altura": 120,
        "preco": 949.9,
        "estoque": 0,
        "pesoKg": 26.4
      },
      {
        "largura": 240,
        "altura": 120,
        "preco": 1079.9,
        "estoque": 0,
        "pesoKg": 31.7
      }
    ],
    "opcoes": [],
    "descricao": [
      "Quatro folhas, duas fixas e duas de correr, para vãos largos que pedem bastante luz e ventilação bem distribuída.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática branca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto, as roldanas têm rolamento e a vedação leva borracha EPDM, então a peça corre mais macia, veda melhor contra vento e água e dura muito mais.",
      "Indicada para salas e vãos largos."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Roldanas com rolamento e vedação reforçada",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1009",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática branca",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "4",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas com rolamento",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1010",
    "slug": "vitro-de-correr-4-folhas-natural-fosco-linha-premium",
    "nome": "Vitrô de Correr 4 Folhas Natural Fosco Linha Premium",
    "modelo": "vitro-correr-4f-premium",
    "categoria": "janelas",
    "subcategoria": "vitros-de-correr",
    "linha": "premium",
    "cor": "natural",
    "vidro": "Liso incolor 4 mm",
    "folhas": 4,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "novidade"
    ],
    "vendidos": 58,
    "medidas": [
      {
        "largura": 150,
        "altura": 100,
        "preco": 739.9,
        "estoque": 0,
        "pesoKg": 16.5
      },
      {
        "largura": 150,
        "altura": 120,
        "preco": 819.9,
        "estoque": 0,
        "pesoKg": 19.8
      },
      {
        "largura": 200,
        "altura": 100,
        "preco": 879.9,
        "estoque": 0,
        "pesoKg": 22
      },
      {
        "largura": 200,
        "altura": 120,
        "preco": 989.9,
        "estoque": 0,
        "pesoKg": 26.4
      },
      {
        "largura": 240,
        "altura": 120,
        "preco": 1119.9,
        "estoque": 0,
        "pesoKg": 31.7
      }
    ],
    "opcoes": [],
    "descricao": [
      "Quatro folhas, duas fixas e duas de correr, para vãos largos que pedem bastante luz e ventilação bem distribuída.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio é anodizado no tom natural fosco, um acabamento que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto, as roldanas têm rolamento e a vedação leva borracha EPDM, então a peça corre mais macia, veda melhor contra vento e água e dura muito mais.",
      "Indicada para salas e vãos largos."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Roldanas com rolamento e vedação reforçada",
      "Anodização natural fosca que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1010",
      "Material": "Alumínio",
      "Acabamento": "Alumínio anodizado natural fosco",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "4",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas com rolamento",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1011",
    "slug": "veneziana-de-correr-3-folhas-preto-linha-essencial",
    "nome": "Veneziana de Correr 3 Folhas Preto Linha Essencial",
    "modelo": "veneziana-3f-essencial",
    "categoria": "janelas",
    "subcategoria": "venezianas",
    "linha": "essencial",
    "cor": "preto",
    "vidro": "Liso incolor 4 mm",
    "folhas": 3,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "mais-vendido",
      "pronta-entrega"
    ],
    "vendidos": 1128,
    "medidas": [
      {
        "largura": 100,
        "altura": 100,
        "preco": 539.9,
        "estoque": 6,
        "pesoKg": 14
      },
      {
        "largura": 120,
        "altura": 100,
        "preco": 589.9,
        "estoque": 18,
        "pesoKg": 16.8
      },
      {
        "largura": 120,
        "altura": 120,
        "preco": 649.9,
        "estoque": 10,
        "pesoKg": 20.2
      },
      {
        "largura": 150,
        "altura": 120,
        "preco": 739.9,
        "estoque": 26,
        "pesoKg": 25.2
      }
    ],
    "opcoes": [],
    "descricao": [
      "Uma folha de vidro e duas de veneziana. Você escurece o quarto sem fechar a ventilação e dorme melhor de verdade.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Essencial você tem o melhor custo-benefício para a obra toda: perfil leve e resistente, acabamento caprichado e preço que cabe no orçamento.",
      "Indicada para quartos."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Melhor custo-benefício para a obra toda",
      "Pintura eletrostática que não descasca",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1011",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Essencial (perfil 20 mm)",
      "Batente": "6 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "3",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas de nylon",
      "Vedação": "Escova de vedação",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1012",
    "slug": "veneziana-de-correr-3-folhas-branco-linha-essencial",
    "nome": "Veneziana de Correr 3 Folhas Branco Linha Essencial",
    "modelo": "veneziana-3f-essencial",
    "categoria": "janelas",
    "subcategoria": "venezianas",
    "linha": "essencial",
    "cor": "branco",
    "vidro": "Liso incolor 4 mm",
    "folhas": 3,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "pronta-entrega"
    ],
    "vendidos": 27,
    "medidas": [
      {
        "largura": 100,
        "altura": 100,
        "preco": 509.9,
        "estoque": 30,
        "pesoKg": 14
      },
      {
        "largura": 120,
        "altura": 100,
        "preco": 549.9,
        "estoque": 6,
        "pesoKg": 16.8
      },
      {
        "largura": 120,
        "altura": 120,
        "preco": 609.9,
        "estoque": 23,
        "pesoKg": 20.2
      },
      {
        "largura": 150,
        "altura": 120,
        "preco": 699.9,
        "estoque": 10,
        "pesoKg": 25.2
      }
    ],
    "opcoes": [],
    "descricao": [
      "Uma folha de vidro e duas de veneziana. Você escurece o quarto sem fechar a ventilação e dorme melhor de verdade.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática branca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Essencial você tem o melhor custo-benefício para a obra toda: perfil leve e resistente, acabamento caprichado e preço que cabe no orçamento.",
      "Indicada para quartos."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Melhor custo-benefício para a obra toda",
      "Pintura eletrostática que não descasca",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1012",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática branca",
      "Linha": "Linha Essencial (perfil 20 mm)",
      "Batente": "6 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "3",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas de nylon",
      "Vedação": "Escova de vedação",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1013",
    "slug": "veneziana-de-correr-3-folhas-preto-linha-premium",
    "nome": "Veneziana de Correr 3 Folhas Preto Linha Premium",
    "modelo": "veneziana-3f-premium",
    "categoria": "janelas",
    "subcategoria": "venezianas",
    "linha": "premium",
    "cor": "preto",
    "vidro": "Liso incolor 4 mm",
    "folhas": 3,
    "abertura": "Correr",
    "grade": false,
    "selos": [],
    "vendidos": 168,
    "medidas": [
      {
        "largura": 100,
        "altura": 100,
        "preco": 719.9,
        "estoque": 0,
        "pesoKg": 14
      },
      {
        "largura": 120,
        "altura": 100,
        "preco": 789.9,
        "estoque": 0,
        "pesoKg": 16.8
      },
      {
        "largura": 120,
        "altura": 120,
        "preco": 869.9,
        "estoque": 0,
        "pesoKg": 20.2
      },
      {
        "largura": 150,
        "altura": 120,
        "preco": 999.9,
        "estoque": 0,
        "pesoKg": 25.2
      }
    ],
    "opcoes": [],
    "descricao": [
      "Uma folha de vidro e duas de veneziana. Você escurece o quarto sem fechar a ventilação e dorme melhor de verdade.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto, as roldanas têm rolamento e a vedação leva borracha EPDM, então a peça corre mais macia, veda melhor contra vento e água e dura muito mais.",
      "Indicada para quartos."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Roldanas com rolamento e vedação reforçada",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1013",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "3",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas com rolamento",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1014",
    "slug": "veneziana-de-correr-6-folhas-preto-linha-essencial",
    "nome": "Veneziana de Correr 6 Folhas Preto Linha Essencial",
    "modelo": "veneziana-6f-essencial",
    "categoria": "janelas",
    "subcategoria": "venezianas",
    "linha": "essencial",
    "cor": "preto",
    "vidro": "Liso incolor 4 mm",
    "folhas": 6,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "pronta-entrega"
    ],
    "vendidos": 88,
    "medidas": [
      {
        "largura": 150,
        "altura": 120,
        "preco": 899.9,
        "estoque": 16,
        "pesoKg": 25.2
      },
      {
        "largura": 200,
        "altura": 100,
        "preco": 959.9,
        "estoque": 29,
        "pesoKg": 28
      },
      {
        "largura": 200,
        "altura": 120,
        "preco": 1069.9,
        "estoque": 6,
        "pesoKg": 33.6
      },
      {
        "largura": 240,
        "altura": 120,
        "preco": 1199.9,
        "estoque": 21,
        "pesoKg": 40.3
      }
    ],
    "opcoes": [],
    "descricao": [
      "Seis folhas para vãos maiores: luz quando você quer, escuro quando você precisa e ventilação o tempo todo.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Essencial você tem o melhor custo-benefício para a obra toda: perfil leve e resistente, acabamento caprichado e preço que cabe no orçamento.",
      "Indicada para quartos amplos e suítes."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Melhor custo-benefício para a obra toda",
      "Pintura eletrostática que não descasca",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1014",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Essencial (perfil 20 mm)",
      "Batente": "6 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "6",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas de nylon",
      "Vedação": "Escova de vedação",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1015",
    "slug": "veneziana-de-correr-6-folhas-branco-linha-essencial",
    "nome": "Veneziana de Correr 6 Folhas Branco Linha Essencial",
    "modelo": "veneziana-6f-essencial",
    "categoria": "janelas",
    "subcategoria": "venezianas",
    "linha": "essencial",
    "cor": "branco",
    "vidro": "Liso incolor 4 mm",
    "folhas": 6,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "pronta-entrega"
    ],
    "vendidos": 135,
    "medidas": [
      {
        "largura": 150,
        "altura": 120,
        "preco": 849.9,
        "estoque": 9,
        "pesoKg": 25.2
      },
      {
        "largura": 200,
        "altura": 100,
        "preco": 909.9,
        "estoque": 10,
        "pesoKg": 28
      },
      {
        "largura": 200,
        "altura": 120,
        "preco": 1009.9,
        "estoque": 13,
        "pesoKg": 33.6
      },
      {
        "largura": 240,
        "altura": 120,
        "preco": 1129.9,
        "estoque": 7,
        "pesoKg": 40.3
      }
    ],
    "opcoes": [],
    "descricao": [
      "Seis folhas para vãos maiores: luz quando você quer, escuro quando você precisa e ventilação o tempo todo.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática branca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Essencial você tem o melhor custo-benefício para a obra toda: perfil leve e resistente, acabamento caprichado e preço que cabe no orçamento.",
      "Indicada para quartos amplos e suítes."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Melhor custo-benefício para a obra toda",
      "Pintura eletrostática que não descasca",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1015",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática branca",
      "Linha": "Linha Essencial (perfil 20 mm)",
      "Batente": "6 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "6",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas de nylon",
      "Vedação": "Escova de vedação",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1016",
    "slug": "veneziana-de-correr-6-folhas-preto-linha-premium",
    "nome": "Veneziana de Correr 6 Folhas Preto Linha Premium",
    "modelo": "veneziana-6f-premium",
    "categoria": "janelas",
    "subcategoria": "venezianas",
    "linha": "premium",
    "cor": "preto",
    "vidro": "Liso incolor 4 mm",
    "folhas": 6,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "mais-vendido"
    ],
    "vendidos": 986,
    "medidas": [
      {
        "largura": 150,
        "altura": 120,
        "preco": 1219.9,
        "estoque": 0,
        "pesoKg": 25.2
      },
      {
        "largura": 200,
        "altura": 100,
        "preco": 1289.9,
        "estoque": 0,
        "pesoKg": 28
      },
      {
        "largura": 200,
        "altura": 120,
        "preco": 1439.9,
        "estoque": 0,
        "pesoKg": 33.6
      },
      {
        "largura": 240,
        "altura": 120,
        "preco": 1619.9,
        "estoque": 0,
        "pesoKg": 40.3
      }
    ],
    "opcoes": [],
    "descricao": [
      "Seis folhas para vãos maiores: luz quando você quer, escuro quando você precisa e ventilação o tempo todo.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto, as roldanas têm rolamento e a vedação leva borracha EPDM, então a peça corre mais macia, veda melhor contra vento e água e dura muito mais.",
      "Indicada para quartos amplos e suítes."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Roldanas com rolamento e vedação reforçada",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1016",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "6",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas com rolamento",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1017",
    "slug": "veneziana-de-correr-6-folhas-branco-linha-premium",
    "nome": "Veneziana de Correr 6 Folhas Branco Linha Premium",
    "modelo": "veneziana-6f-premium",
    "categoria": "janelas",
    "subcategoria": "venezianas",
    "linha": "premium",
    "cor": "branco",
    "vidro": "Liso incolor 4 mm",
    "folhas": 6,
    "abertura": "Correr",
    "grade": false,
    "selos": [],
    "vendidos": 71,
    "medidas": [
      {
        "largura": 150,
        "altura": 120,
        "preco": 1149.9,
        "estoque": 0,
        "pesoKg": 25.2
      },
      {
        "largura": 200,
        "altura": 100,
        "preco": 1219.9,
        "estoque": 0,
        "pesoKg": 28
      },
      {
        "largura": 200,
        "altura": 120,
        "preco": 1359.9,
        "estoque": 0,
        "pesoKg": 33.6
      },
      {
        "largura": 240,
        "altura": 120,
        "preco": 1529.9,
        "estoque": 0,
        "pesoKg": 40.3
      }
    ],
    "opcoes": [],
    "descricao": [
      "Seis folhas para vãos maiores: luz quando você quer, escuro quando você precisa e ventilação o tempo todo.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática branca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto, as roldanas têm rolamento e a vedação leva borracha EPDM, então a peça corre mais macia, veda melhor contra vento e água e dura muito mais.",
      "Indicada para quartos amplos e suítes."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Roldanas com rolamento e vedação reforçada",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1017",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática branca",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "6",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas com rolamento",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1018",
    "slug": "janela-maxim-ar-preto-linha-essencial",
    "nome": "Janela Maxim-ar Preto Linha Essencial",
    "modelo": "maxim-ar-essencial",
    "categoria": "janelas",
    "subcategoria": "maxim-ar",
    "linha": "essencial",
    "cor": "preto",
    "vidro": "Mini boreal 4 mm",
    "folhas": 1,
    "abertura": "Projetante",
    "grade": false,
    "selos": [
      "pronta-entrega"
    ],
    "vendidos": 188,
    "medidas": [
      {
        "largura": 60,
        "altura": 60,
        "preco": 229.9,
        "estoque": 13,
        "pesoKg": 3.6
      },
      {
        "largura": 80,
        "altura": 60,
        "preco": 259.9,
        "estoque": 31,
        "pesoKg": 4.8
      },
      {
        "largura": 100,
        "altura": 60,
        "preco": 299.9,
        "estoque": 5,
        "pesoKg": 6
      },
      {
        "largura": 100,
        "altura": 80,
        "preco": 349.9,
        "estoque": 28,
        "pesoKg": 8
      }
    ],
    "opcoes": [],
    "descricao": [
      "Abre projetada para fora, deixa o ar circular mesmo com chuva fina e protege a privacidade com vidro mini boreal.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Essencial você tem o melhor custo-benefício para a obra toda: perfil leve e resistente, acabamento caprichado e preço que cabe no orçamento.",
      "Indicada para banheiros, áreas de serviço e cozinhas."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Melhor custo-benefício para a obra toda",
      "Pintura eletrostática que não descasca",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1018",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Essencial (perfil 20 mm)",
      "Batente": "6 cm",
      "Vidro": "Mini boreal 4 mm",
      "Abertura": "Projetante",
      "Folhas": "1",
      "Fechamento": "Braço limitador com fecho",
      "Vedação": "Escova de vedação",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Braço limitador com fecho já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1019",
    "slug": "janela-maxim-ar-branco-linha-essencial",
    "nome": "Janela Maxim-ar Branco Linha Essencial",
    "modelo": "maxim-ar-essencial",
    "categoria": "janelas",
    "subcategoria": "maxim-ar",
    "linha": "essencial",
    "cor": "branco",
    "vidro": "Mini boreal 4 mm",
    "folhas": 1,
    "abertura": "Projetante",
    "grade": false,
    "selos": [
      "pronta-entrega"
    ],
    "vendidos": 334,
    "medidas": [
      {
        "largura": 60,
        "altura": 60,
        "preco": 219.9,
        "estoque": 10,
        "pesoKg": 3.6
      },
      {
        "largura": 80,
        "altura": 60,
        "preco": 249.9,
        "estoque": 7,
        "pesoKg": 4.8
      },
      {
        "largura": 100,
        "altura": 60,
        "preco": 279.9,
        "estoque": 6,
        "pesoKg": 6
      },
      {
        "largura": 100,
        "altura": 80,
        "preco": 329.9,
        "estoque": 32,
        "pesoKg": 8
      }
    ],
    "opcoes": [],
    "descricao": [
      "Abre projetada para fora, deixa o ar circular mesmo com chuva fina e protege a privacidade com vidro mini boreal.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática branca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Essencial você tem o melhor custo-benefício para a obra toda: perfil leve e resistente, acabamento caprichado e preço que cabe no orçamento.",
      "Indicada para banheiros, áreas de serviço e cozinhas."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Melhor custo-benefício para a obra toda",
      "Pintura eletrostática que não descasca",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1019",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática branca",
      "Linha": "Linha Essencial (perfil 20 mm)",
      "Batente": "6 cm",
      "Vidro": "Mini boreal 4 mm",
      "Abertura": "Projetante",
      "Folhas": "1",
      "Fechamento": "Braço limitador com fecho",
      "Vedação": "Escova de vedação",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Braço limitador com fecho já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1020",
    "slug": "janela-maxim-ar-preto-linha-premium",
    "nome": "Janela Maxim-ar Preto Linha Premium",
    "modelo": "maxim-ar-premium",
    "categoria": "janelas",
    "subcategoria": "maxim-ar",
    "linha": "premium",
    "cor": "preto",
    "vidro": "Canelado 4 mm",
    "folhas": 1,
    "abertura": "Projetante",
    "grade": false,
    "selos": [
      "novidade"
    ],
    "vendidos": 117,
    "medidas": [
      {
        "largura": 60,
        "altura": 60,
        "preco": 309.9,
        "estoque": 0,
        "pesoKg": 3.6
      },
      {
        "largura": 80,
        "altura": 60,
        "preco": 359.9,
        "estoque": 0,
        "pesoKg": 4.8
      },
      {
        "largura": 100,
        "altura": 60,
        "preco": 399.9,
        "estoque": 0,
        "pesoKg": 6
      },
      {
        "largura": 100,
        "altura": 80,
        "preco": 469.9,
        "estoque": 0,
        "pesoKg": 8
      }
    ],
    "opcoes": [],
    "descricao": [
      "Abre projetada para fora, deixa o ar circular mesmo com chuva fina e protege a privacidade com vidro canelado.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto e a vedação leva borracha EPDM, então a peça fecha com mais firmeza, veda melhor contra vento e água e dura muito mais.",
      "Indicada para banheiros, áreas de serviço e cozinhas."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Perfil 25 mm e vedação com borracha EPDM",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1020",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Canelado 4 mm",
      "Abertura": "Projetante",
      "Folhas": "1",
      "Fechamento": "Braço limitador com fecho",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Braço limitador com fecho já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1021",
    "slug": "vitro-basculante-preto-linha-essencial",
    "nome": "Vitrô Basculante Preto Linha Essencial",
    "modelo": "basculante-essencial",
    "categoria": "janelas",
    "subcategoria": "basculantes",
    "linha": "essencial",
    "cor": "preto",
    "vidro": "Mini boreal 4 mm",
    "folhas": 1,
    "abertura": "Basculante",
    "grade": false,
    "selos": [
      "mais-vendido",
      "pronta-entrega"
    ],
    "vendidos": 1080,
    "medidas": [
      {
        "largura": 40,
        "altura": 40,
        "preco": 139.9,
        "estoque": 4,
        "pesoKg": 1.6
      },
      {
        "largura": 60,
        "altura": 40,
        "preco": 159.9,
        "estoque": 9,
        "pesoKg": 2.4
      },
      {
        "largura": 60,
        "altura": 60,
        "preco": 199.9,
        "estoque": 36,
        "pesoKg": 3.6
      },
      {
        "largura": 80,
        "altura": 60,
        "preco": 229.9,
        "estoque": 15,
        "pesoKg": 4.8
      }
    ],
    "opcoes": [],
    "descricao": [
      "Compacto e fácil de operar. As palhetas giram juntas com uma alavanca só e o vidro mini boreal garante privacidade.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Essencial você tem o melhor custo-benefício para a obra toda: perfil leve e resistente, acabamento caprichado e preço que cabe no orçamento.",
      "Indicada para banheiros e lavabos."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Melhor custo-benefício para a obra toda",
      "Pintura eletrostática que não descasca",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1021",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Essencial (perfil 20 mm)",
      "Batente": "6 cm",
      "Vidro": "Mini boreal 4 mm",
      "Abertura": "Basculante",
      "Folhas": "1",
      "Fechamento": "Alavanca de comando",
      "Vedação": "Escova de vedação",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Alavanca de comando já instalada",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1022",
    "slug": "vitro-basculante-branco-linha-essencial",
    "nome": "Vitrô Basculante Branco Linha Essencial",
    "modelo": "basculante-essencial",
    "categoria": "janelas",
    "subcategoria": "basculantes",
    "linha": "essencial",
    "cor": "branco",
    "vidro": "Mini boreal 4 mm",
    "folhas": 1,
    "abertura": "Basculante",
    "grade": false,
    "selos": [
      "pronta-entrega"
    ],
    "vendidos": 208,
    "medidas": [
      {
        "largura": 40,
        "altura": 40,
        "preco": 129.9,
        "estoque": 19,
        "pesoKg": 1.6
      },
      {
        "largura": 60,
        "altura": 40,
        "preco": 149.9,
        "estoque": 14,
        "pesoKg": 2.4
      },
      {
        "largura": 60,
        "altura": 60,
        "preco": 189.9,
        "estoque": 36,
        "pesoKg": 3.6
      },
      {
        "largura": 80,
        "altura": 60,
        "preco": 219.9,
        "estoque": 36,
        "pesoKg": 4.8
      }
    ],
    "opcoes": [],
    "descricao": [
      "Compacto e fácil de operar. As palhetas giram juntas com uma alavanca só e o vidro mini boreal garante privacidade.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática branca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Essencial você tem o melhor custo-benefício para a obra toda: perfil leve e resistente, acabamento caprichado e preço que cabe no orçamento.",
      "Indicada para banheiros e lavabos."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Melhor custo-benefício para a obra toda",
      "Pintura eletrostática que não descasca",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1022",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática branca",
      "Linha": "Linha Essencial (perfil 20 mm)",
      "Batente": "6 cm",
      "Vidro": "Mini boreal 4 mm",
      "Abertura": "Basculante",
      "Folhas": "1",
      "Fechamento": "Alavanca de comando",
      "Vedação": "Escova de vedação",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Alavanca de comando já instalada",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1023",
    "slug": "vitro-basculante-preto-linha-premium",
    "nome": "Vitrô Basculante Preto Linha Premium",
    "modelo": "basculante-premium",
    "categoria": "janelas",
    "subcategoria": "basculantes",
    "linha": "premium",
    "cor": "preto",
    "vidro": "Mini boreal 4 mm",
    "folhas": 1,
    "abertura": "Basculante",
    "grade": false,
    "selos": [],
    "vendidos": 320,
    "medidas": [
      {
        "largura": 40,
        "altura": 40,
        "preco": 179.9,
        "estoque": 0,
        "pesoKg": 1.6
      },
      {
        "largura": 60,
        "altura": 40,
        "preco": 219.9,
        "estoque": 0,
        "pesoKg": 2.4
      },
      {
        "largura": 60,
        "altura": 60,
        "preco": 259.9,
        "estoque": 0,
        "pesoKg": 3.6
      },
      {
        "largura": 80,
        "altura": 60,
        "preco": 309.9,
        "estoque": 0,
        "pesoKg": 4.8
      }
    ],
    "opcoes": [],
    "descricao": [
      "Compacto e fácil de operar. As palhetas giram juntas com uma alavanca só e o vidro mini boreal garante privacidade.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto e a vedação leva borracha EPDM, então a peça fecha com mais firmeza, veda melhor contra vento e água e dura muito mais.",
      "Indicada para banheiros e lavabos."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Perfil 25 mm e vedação com borracha EPDM",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1023",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Mini boreal 4 mm",
      "Abertura": "Basculante",
      "Folhas": "1",
      "Fechamento": "Alavanca de comando",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Alavanca de comando já instalada",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1024",
    "slug": "janela-de-correr-com-persiana-integrada-preto-linha-premium",
    "nome": "Janela de Correr com Persiana Integrada Preto Linha Premium",
    "modelo": "persiana-premium",
    "categoria": "janelas",
    "subcategoria": "persiana-integrada",
    "linha": "premium",
    "cor": "preto",
    "vidro": "Liso incolor 4 mm",
    "folhas": 2,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "mais-vendido"
    ],
    "vendidos": 556,
    "medidas": [
      {
        "largura": 100,
        "altura": 100,
        "preco": 1609.9,
        "estoque": 0,
        "pesoKg": 16
      },
      {
        "largura": 120,
        "altura": 120,
        "preco": 1869.9,
        "estoque": 0,
        "pesoKg": 23
      },
      {
        "largura": 150,
        "altura": 120,
        "preco": 2089.9,
        "estoque": 0,
        "pesoKg": 28.8
      },
      {
        "largura": 200,
        "altura": 120,
        "preco": 2449.9,
        "estoque": 0,
        "pesoKg": 38.4
      }
    ],
    "opcoes": [],
    "descricao": [
      "A persiana fica dentro do quadro da janela, protegida de poeira e chuva. Recolhe com fita e escurece o ambiente sem cortina.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto, as roldanas têm rolamento e a vedação leva borracha EPDM, então a peça corre mais macia, veda melhor contra vento e água e dura muito mais.",
      "Indicada para quartos e home office."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Roldanas com rolamento e vedação reforçada",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1024",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "2",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas com rolamento",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1025",
    "slug": "janela-de-correr-com-persiana-integrada-branco-linha-premium",
    "nome": "Janela de Correr com Persiana Integrada Branco Linha Premium",
    "modelo": "persiana-premium",
    "categoria": "janelas",
    "subcategoria": "persiana-integrada",
    "linha": "premium",
    "cor": "branco",
    "vidro": "Liso incolor 4 mm",
    "folhas": 2,
    "abertura": "Correr",
    "grade": false,
    "selos": [],
    "vendidos": 153,
    "medidas": [
      {
        "largura": 100,
        "altura": 100,
        "preco": 1519.9,
        "estoque": 0,
        "pesoKg": 16
      },
      {
        "largura": 120,
        "altura": 120,
        "preco": 1769.9,
        "estoque": 0,
        "pesoKg": 23
      },
      {
        "largura": 150,
        "altura": 120,
        "preco": 1969.9,
        "estoque": 0,
        "pesoKg": 28.8
      },
      {
        "largura": 200,
        "altura": 120,
        "preco": 2309.9,
        "estoque": 0,
        "pesoKg": 38.4
      }
    ],
    "opcoes": [],
    "descricao": [
      "A persiana fica dentro do quadro da janela, protegida de poeira e chuva. Recolhe com fita e escurece o ambiente sem cortina.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática branca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto, as roldanas têm rolamento e a vedação leva borracha EPDM, então a peça corre mais macia, veda melhor contra vento e água e dura muito mais.",
      "Indicada para quartos e home office."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Roldanas com rolamento e vedação reforçada",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1025",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática branca",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "2",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas com rolamento",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1026",
    "slug": "janela-com-persiana-integrada-motorizada-preto-linha-premium",
    "nome": "Janela com Persiana Integrada Motorizada Preto Linha Premium",
    "modelo": "persiana-motor-premium",
    "categoria": "janelas",
    "subcategoria": "persiana-integrada",
    "linha": "premium",
    "cor": "preto",
    "vidro": "Liso incolor 4 mm",
    "folhas": 2,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "novidade"
    ],
    "vendidos": 205,
    "medidas": [
      {
        "largura": 100,
        "altura": 100,
        "preco": 2699.9,
        "estoque": 0,
        "pesoKg": 17
      },
      {
        "largura": 120,
        "altura": 120,
        "preco": 2969.9,
        "estoque": 0,
        "pesoKg": 24.5
      },
      {
        "largura": 150,
        "altura": 120,
        "preco": 3189.9,
        "estoque": 0,
        "pesoKg": 30.6
      },
      {
        "largura": 200,
        "altura": 120,
        "preco": 3559.9,
        "estoque": 0,
        "pesoKg": 40.8
      }
    ],
    "opcoes": [],
    "descricao": [
      "Sobe e desce a persiana no botão ou no controle remoto. Conforto de hotel no seu quarto, com motor silencioso e garantia.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto, as roldanas têm rolamento e a vedação leva borracha EPDM, então a peça corre mais macia, veda melhor contra vento e água e dura muito mais.",
      "Indicada para quartos e suítes."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Roldanas com rolamento e vedação reforçada",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1026",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "2",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas com rolamento",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Acionamento": "Motor tubular com interruptor e controle remoto",
      "Alimentação": "Bivolt (127 V ou 220 V)",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Motor, interruptor e controle remoto",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1027",
    "slug": "janela-de-correr-3-folhas-preto-linha-premium",
    "nome": "Janela de Correr 3 Folhas Preto Linha Premium",
    "modelo": "janela-3f-premium",
    "categoria": "janelas",
    "subcategoria": "vitros-de-correr",
    "linha": "premium",
    "cor": "preto",
    "vidro": "Liso incolor 4 mm",
    "folhas": 3,
    "abertura": "Correr",
    "grade": false,
    "selos": [],
    "vendidos": 246,
    "medidas": [
      {
        "largura": 150,
        "altura": 100,
        "preco": 1059.9,
        "estoque": 0,
        "pesoKg": 18
      },
      {
        "largura": 150,
        "altura": 120,
        "preco": 1149.9,
        "estoque": 0,
        "pesoKg": 21.6
      },
      {
        "largura": 180,
        "altura": 120,
        "preco": 1259.9,
        "estoque": 0,
        "pesoKg": 25.9
      },
      {
        "largura": 200,
        "altura": 120,
        "preco": 1329.9,
        "estoque": 0,
        "pesoKg": 28.8
      }
    ],
    "opcoes": [],
    "descricao": [
      "Três folhas que correm em trilhos independentes. Você abre dois terços do vão e ganha muito mais ventilação.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto, as roldanas têm rolamento e a vedação leva borracha EPDM, então a peça corre mais macia, veda melhor contra vento e água e dura muito mais.",
      "Indicada para salas e cozinhas."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Roldanas com rolamento e vedação reforçada",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1027",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "3",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas com rolamento",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV1028",
    "slug": "janela-de-correr-3-folhas-branco-linha-premium",
    "nome": "Janela de Correr 3 Folhas Branco Linha Premium",
    "modelo": "janela-3f-premium",
    "categoria": "janelas",
    "subcategoria": "vitros-de-correr",
    "linha": "premium",
    "cor": "branco",
    "vidro": "Liso incolor 4 mm",
    "folhas": 3,
    "abertura": "Correr",
    "grade": false,
    "selos": [],
    "vendidos": 288,
    "medidas": [
      {
        "largura": 150,
        "altura": 100,
        "preco": 999.9,
        "estoque": 0,
        "pesoKg": 18
      },
      {
        "largura": 150,
        "altura": 120,
        "preco": 1079.9,
        "estoque": 0,
        "pesoKg": 21.6
      },
      {
        "largura": 180,
        "altura": 120,
        "preco": 1179.9,
        "estoque": 0,
        "pesoKg": 25.9
      },
      {
        "largura": 200,
        "altura": 120,
        "preco": 1249.9,
        "estoque": 0,
        "pesoKg": 28.8
      }
    ],
    "opcoes": [],
    "descricao": [
      "Três folhas que correm em trilhos independentes. Você abre dois terços do vão e ganha muito mais ventilação.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática branca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto, as roldanas têm rolamento e a vedação leva borracha EPDM, então a peça corre mais macia, veda melhor contra vento e água e dura muito mais.",
      "Indicada para salas e cozinhas."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Roldanas com rolamento e vedação reforçada",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV1028",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática branca",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "3",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas com rolamento",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Janela montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV2001",
    "slug": "porta-de-correr-2-folhas-com-vidro-preto-linha-essencial",
    "nome": "Porta de Correr 2 Folhas com Vidro Preto Linha Essencial",
    "modelo": "porta-correr-2f-essencial",
    "categoria": "portas",
    "subcategoria": "portas-de-correr",
    "linha": "essencial",
    "cor": "preto",
    "vidro": "Liso incolor 4 mm",
    "folhas": 2,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "mais-vendido",
      "pronta-entrega"
    ],
    "vendidos": 1053,
    "medidas": [
      {
        "largura": 160,
        "altura": 210,
        "preco": 1459.9,
        "estoque": 24,
        "pesoKg": 50.4
      },
      {
        "largura": 180,
        "altura": 210,
        "preco": 1559.9,
        "estoque": 11,
        "pesoKg": 56.7
      },
      {
        "largura": 200,
        "altura": 210,
        "preco": 1659.9,
        "estoque": 13,
        "pesoKg": 63
      },
      {
        "largura": 240,
        "altura": 210,
        "preco": 1869.9,
        "estoque": 12,
        "pesoKg": 75.6
      }
    ],
    "opcoes": [],
    "descricao": [
      "Integra a sala com a varanda ou o quintal sem roubar espaço, porque a folha corre em vez de abrir.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Essencial você tem o melhor custo-benefício para a obra toda: perfil leve e resistente, acabamento caprichado e preço que cabe no orçamento.",
      "Indicada para varandas, salas e áreas externas."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Melhor custo-benefício para a obra toda",
      "Pintura eletrostática que não descasca",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV2001",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Essencial (perfil 20 mm)",
      "Batente": "6 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "2",
      "Fechamento": "Fechadura com chave",
      "Roldanas": "Roldanas de nylon",
      "Vedação": "Escova de vedação",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Porta montada com batente",
      "Vidro instalado e vedado",
      "Fechadura e chaves",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV2002",
    "slug": "porta-de-correr-2-folhas-com-vidro-branco-linha-essencial",
    "nome": "Porta de Correr 2 Folhas com Vidro Branco Linha Essencial",
    "modelo": "porta-correr-2f-essencial",
    "categoria": "portas",
    "subcategoria": "portas-de-correr",
    "linha": "essencial",
    "cor": "branco",
    "vidro": "Liso incolor 4 mm",
    "folhas": 2,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "pronta-entrega"
    ],
    "vendidos": 349,
    "medidas": [
      {
        "largura": 160,
        "altura": 210,
        "preco": 1379.9,
        "estoque": 14,
        "pesoKg": 50.4
      },
      {
        "largura": 180,
        "altura": 210,
        "preco": 1469.9,
        "estoque": 13,
        "pesoKg": 56.7
      },
      {
        "largura": 200,
        "altura": 210,
        "preco": 1569.9,
        "estoque": 9,
        "pesoKg": 63
      },
      {
        "largura": 240,
        "altura": 210,
        "preco": 1759.9,
        "estoque": 20,
        "pesoKg": 75.6
      }
    ],
    "opcoes": [],
    "descricao": [
      "Integra a sala com a varanda ou o quintal sem roubar espaço, porque a folha corre em vez de abrir.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática branca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Essencial você tem o melhor custo-benefício para a obra toda: perfil leve e resistente, acabamento caprichado e preço que cabe no orçamento.",
      "Indicada para varandas, salas e áreas externas."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Melhor custo-benefício para a obra toda",
      "Pintura eletrostática que não descasca",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV2002",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática branca",
      "Linha": "Linha Essencial (perfil 20 mm)",
      "Batente": "6 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "2",
      "Fechamento": "Fechadura com chave",
      "Roldanas": "Roldanas de nylon",
      "Vedação": "Escova de vedação",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Porta montada com batente",
      "Vidro instalado e vedado",
      "Fechadura e chaves",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV2003",
    "slug": "porta-de-correr-2-folhas-com-vidro-preto-linha-premium",
    "nome": "Porta de Correr 2 Folhas com Vidro Preto Linha Premium",
    "modelo": "porta-correr-2f-premium",
    "categoria": "portas",
    "subcategoria": "portas-de-correr",
    "linha": "premium",
    "cor": "preto",
    "vidro": "Liso incolor 4 mm",
    "folhas": 2,
    "abertura": "Correr",
    "grade": false,
    "selos": [],
    "vendidos": 178,
    "medidas": [
      {
        "largura": 160,
        "altura": 210,
        "preco": 1969.9,
        "estoque": 0,
        "pesoKg": 50.4
      },
      {
        "largura": 180,
        "altura": 210,
        "preco": 2109.9,
        "estoque": 0,
        "pesoKg": 56.7
      },
      {
        "largura": 200,
        "altura": 210,
        "preco": 2249.9,
        "estoque": 0,
        "pesoKg": 63
      },
      {
        "largura": 240,
        "altura": 210,
        "preco": 2519.9,
        "estoque": 0,
        "pesoKg": 75.6
      }
    ],
    "opcoes": [],
    "descricao": [
      "Integra a sala com a varanda ou o quintal sem roubar espaço, porque a folha corre em vez de abrir.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto, as roldanas têm rolamento e a vedação leva borracha EPDM, então a peça corre mais macia, veda melhor contra vento e água e dura muito mais.",
      "Indicada para varandas, salas e áreas externas."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Roldanas com rolamento e vedação reforçada",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV2003",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "2",
      "Fechamento": "Fechadura com chave",
      "Roldanas": "Roldanas com rolamento",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Porta montada com batente",
      "Vidro instalado e vedado",
      "Fechadura e chaves",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV2004",
    "slug": "porta-de-correr-4-folhas-com-vidro-preto-linha-premium",
    "nome": "Porta de Correr 4 Folhas com Vidro Preto Linha Premium",
    "modelo": "porta-correr-4f-premium",
    "categoria": "portas",
    "subcategoria": "portas-de-correr",
    "linha": "premium",
    "cor": "preto",
    "vidro": "Liso incolor 4 mm",
    "folhas": 4,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "mais-vendido"
    ],
    "vendidos": 1205,
    "medidas": [
      {
        "largura": 240,
        "altura": 210,
        "preco": 3169.9,
        "estoque": 0,
        "pesoKg": 80.6
      },
      {
        "largura": 300,
        "altura": 210,
        "preco": 3639.9,
        "estoque": 0,
        "pesoKg": 100.8
      },
      {
        "largura": 350,
        "altura": 210,
        "preco": 4029.9,
        "estoque": 0,
        "pesoKg": 117.6
      }
    ],
    "opcoes": [],
    "descricao": [
      "Feita para vãos grandes. As duas folhas centrais correm e abrem metade do vão, deixando a casa muito mais aberta.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto, as roldanas têm rolamento e a vedação leva borracha EPDM, então a peça corre mais macia, veda melhor contra vento e água e dura muito mais.",
      "Indicada para salas amplas e varandas gourmet."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Roldanas com rolamento e vedação reforçada",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV2004",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "4",
      "Fechamento": "Fechadura com chave",
      "Roldanas": "Roldanas com rolamento",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Porta montada com batente",
      "Vidro instalado e vedado",
      "Fechadura e chaves",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV2005",
    "slug": "porta-de-correr-4-folhas-com-vidro-branco-linha-premium",
    "nome": "Porta de Correr 4 Folhas com Vidro Branco Linha Premium",
    "modelo": "porta-correr-4f-premium",
    "categoria": "portas",
    "subcategoria": "portas-de-correr",
    "linha": "premium",
    "cor": "branco",
    "vidro": "Liso incolor 4 mm",
    "folhas": 4,
    "abertura": "Correr",
    "grade": false,
    "selos": [],
    "vendidos": 79,
    "medidas": [
      {
        "largura": 240,
        "altura": 210,
        "preco": 2989.9,
        "estoque": 0,
        "pesoKg": 80.6
      },
      {
        "largura": 300,
        "altura": 210,
        "preco": 3429.9,
        "estoque": 0,
        "pesoKg": 100.8
      },
      {
        "largura": 350,
        "altura": 210,
        "preco": 3799.9,
        "estoque": 0,
        "pesoKg": 117.6
      }
    ],
    "opcoes": [],
    "descricao": [
      "Feita para vãos grandes. As duas folhas centrais correm e abrem metade do vão, deixando a casa muito mais aberta.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática branca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto, as roldanas têm rolamento e a vedação leva borracha EPDM, então a peça corre mais macia, veda melhor contra vento e água e dura muito mais.",
      "Indicada para salas amplas e varandas gourmet."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Roldanas com rolamento e vedação reforçada",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV2005",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática branca",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "4",
      "Fechamento": "Fechadura com chave",
      "Roldanas": "Roldanas com rolamento",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Porta montada com batente",
      "Vidro instalado e vedado",
      "Fechadura e chaves",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV2006",
    "slug": "porta-de-abrir-lambri-preto-linha-essencial",
    "nome": "Porta de Abrir Lambri Preto Linha Essencial",
    "modelo": "porta-abrir-lambri-essencial",
    "categoria": "portas",
    "subcategoria": "portas-de-abrir",
    "linha": "essencial",
    "cor": "preto",
    "vidro": "Sem vidro (fechamento em lambri)",
    "folhas": 1,
    "abertura": "Abrir",
    "grade": false,
    "selos": [
      "pronta-entrega"
    ],
    "vendidos": 49,
    "medidas": [
      {
        "largura": 70,
        "altura": 210,
        "preco": 889.9,
        "estoque": 30,
        "pesoKg": 26.5
      },
      {
        "largura": 80,
        "altura": 210,
        "preco": 949.9,
        "estoque": 34,
        "pesoKg": 30.2
      },
      {
        "largura": 90,
        "altura": 210,
        "preco": 1009.9,
        "estoque": 23,
        "pesoKg": 34
      }
    ],
    "opcoes": [
      {
        "nome": "Lado da abertura",
        "valores": [
          "Esquerda",
          "Direita"
        ],
        "ajuda": "Olhando de fora para dentro do ambiente."
      }
    ],
    "descricao": [
      "Fechamento total em lambri de alumínio. Robusta, fácil de limpar e não empena com umidade como a madeira.",
      "Chega montada, com fechadura e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Essencial você tem o melhor custo-benefício para a obra toda: perfil leve e resistente, acabamento caprichado e preço que cabe no orçamento.",
      "Indicada para entradas, áreas de serviço e fundos."
    ],
    "destaques": [
      "Chega montada, com fechadura e acessórios instalados",
      "Melhor custo-benefício para a obra toda",
      "Pintura eletrostática que não descasca",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV2006",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Essencial (perfil 20 mm)",
      "Batente": "6 cm",
      "Vidro": "Sem vidro (fechamento em lambri)",
      "Abertura": "Abrir",
      "Folhas": "1",
      "Fechamento": "Fechadura com chave e maçaneta",
      "Vedação": "Escova de vedação",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Porta montada com batente",
      "Fechadura e chaves",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV2007",
    "slug": "porta-de-abrir-lambri-branco-linha-essencial",
    "nome": "Porta de Abrir Lambri Branco Linha Essencial",
    "modelo": "porta-abrir-lambri-essencial",
    "categoria": "portas",
    "subcategoria": "portas-de-abrir",
    "linha": "essencial",
    "cor": "branco",
    "vidro": "Sem vidro (fechamento em lambri)",
    "folhas": 1,
    "abertura": "Abrir",
    "grade": false,
    "selos": [
      "pronta-entrega"
    ],
    "vendidos": 341,
    "medidas": [
      {
        "largura": 70,
        "altura": 210,
        "preco": 839.9,
        "estoque": 8,
        "pesoKg": 26.5
      },
      {
        "largura": 80,
        "altura": 210,
        "preco": 899.9,
        "estoque": 11,
        "pesoKg": 30.2
      },
      {
        "largura": 90,
        "altura": 210,
        "preco": 949.9,
        "estoque": 14,
        "pesoKg": 34
      }
    ],
    "opcoes": [
      {
        "nome": "Lado da abertura",
        "valores": [
          "Esquerda",
          "Direita"
        ],
        "ajuda": "Olhando de fora para dentro do ambiente."
      }
    ],
    "descricao": [
      "Fechamento total em lambri de alumínio. Robusta, fácil de limpar e não empena com umidade como a madeira.",
      "Chega montada, com fechadura e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática branca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Essencial você tem o melhor custo-benefício para a obra toda: perfil leve e resistente, acabamento caprichado e preço que cabe no orçamento.",
      "Indicada para entradas, áreas de serviço e fundos."
    ],
    "destaques": [
      "Chega montada, com fechadura e acessórios instalados",
      "Melhor custo-benefício para a obra toda",
      "Pintura eletrostática que não descasca",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV2007",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática branca",
      "Linha": "Linha Essencial (perfil 20 mm)",
      "Batente": "6 cm",
      "Vidro": "Sem vidro (fechamento em lambri)",
      "Abertura": "Abrir",
      "Folhas": "1",
      "Fechamento": "Fechadura com chave e maçaneta",
      "Vedação": "Escova de vedação",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Porta montada com batente",
      "Fechadura e chaves",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV2008",
    "slug": "porta-de-abrir-com-vidro-e-lambri-preto-linha-premium",
    "nome": "Porta de Abrir com Vidro e Lambri Preto Linha Premium",
    "modelo": "porta-abrir-vidro-premium",
    "categoria": "portas",
    "subcategoria": "portas-de-abrir",
    "linha": "premium",
    "cor": "preto",
    "vidro": "Mini boreal 4 mm na parte superior",
    "folhas": 1,
    "abertura": "Abrir",
    "grade": false,
    "selos": [],
    "vendidos": 261,
    "medidas": [
      {
        "largura": 70,
        "altura": 210,
        "preco": 1319.9,
        "estoque": 0,
        "pesoKg": 26.5
      },
      {
        "largura": 80,
        "altura": 210,
        "preco": 1409.9,
        "estoque": 0,
        "pesoKg": 30.2
      },
      {
        "largura": 90,
        "altura": 210,
        "preco": 1499.9,
        "estoque": 0,
        "pesoKg": 34
      }
    ],
    "opcoes": [
      {
        "nome": "Lado da abertura",
        "valores": [
          "Esquerda",
          "Direita"
        ],
        "ajuda": "Olhando de fora para dentro do ambiente."
      }
    ],
    "descricao": [
      "Metade lambri, metade vidro. Deixa a luz entrar e mantém a privacidade com vidro mini boreal na parte de cima.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto e a vedação leva borracha EPDM, então a peça fecha com mais firmeza, veda melhor contra vento e água e dura muito mais.",
      "Indicada para entradas e cozinhas."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Perfil 25 mm e vedação com borracha EPDM",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV2008",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Mini boreal 4 mm na parte superior",
      "Abertura": "Abrir",
      "Folhas": "1",
      "Fechamento": "Fechadura com chave e maçaneta",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Porta montada com batente",
      "Vidro instalado e vedado",
      "Fechadura e chaves",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV2009",
    "slug": "porta-balcao-3-folhas-veneziana-e-vidro-preto-linha-essencial",
    "nome": "Porta Balcão 3 Folhas Veneziana e Vidro Preto Linha Essencial",
    "modelo": "porta-balcao-3f-essencial",
    "categoria": "portas",
    "subcategoria": "portas-balcao",
    "linha": "essencial",
    "cor": "preto",
    "vidro": "Liso incolor 4 mm",
    "folhas": 3,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "pronta-entrega"
    ],
    "vendidos": 205,
    "medidas": [
      {
        "largura": 160,
        "altura": 210,
        "preco": 1939.9,
        "estoque": 4,
        "pesoKg": 57.1
      },
      {
        "largura": 200,
        "altura": 210,
        "preco": 2209.9,
        "estoque": 29,
        "pesoKg": 71.4
      },
      {
        "largura": 240,
        "altura": 210,
        "preco": 2479.9,
        "estoque": 29,
        "pesoKg": 85.7
      }
    ],
    "opcoes": [],
    "descricao": [
      "A porta que funciona como janela de quarto: uma folha de vidro e duas de veneziana para escurecer e ventilar ao mesmo tempo.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Essencial você tem o melhor custo-benefício para a obra toda: perfil leve e resistente, acabamento caprichado e preço que cabe no orçamento.",
      "Indicada para quartos com sacada."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Melhor custo-benefício para a obra toda",
      "Pintura eletrostática que não descasca",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV2009",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Essencial (perfil 20 mm)",
      "Batente": "6 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "3",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas de nylon",
      "Vedação": "Escova de vedação",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Porta montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV2010",
    "slug": "porta-balcao-3-folhas-veneziana-e-vidro-preto-linha-premium",
    "nome": "Porta Balcão 3 Folhas Veneziana e Vidro Preto Linha Premium",
    "modelo": "porta-balcao-3f-premium",
    "categoria": "portas",
    "subcategoria": "portas-balcao",
    "linha": "premium",
    "cor": "preto",
    "vidro": "Liso incolor 4 mm",
    "folhas": 3,
    "abertura": "Correr",
    "grade": false,
    "selos": [],
    "vendidos": 339,
    "medidas": [
      {
        "largura": 160,
        "altura": 210,
        "preco": 2619.9,
        "estoque": 0,
        "pesoKg": 57.1
      },
      {
        "largura": 200,
        "altura": 210,
        "preco": 2979.9,
        "estoque": 0,
        "pesoKg": 71.4
      },
      {
        "largura": 240,
        "altura": 210,
        "preco": 3339.9,
        "estoque": 0,
        "pesoKg": 85.7
      }
    ],
    "opcoes": [],
    "descricao": [
      "A porta que funciona como janela de quarto: uma folha de vidro e duas de veneziana para escurecer e ventilar ao mesmo tempo.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto, as roldanas têm rolamento e a vedação leva borracha EPDM, então a peça corre mais macia, veda melhor contra vento e água e dura muito mais.",
      "Indicada para quartos com sacada."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Roldanas com rolamento e vedação reforçada",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV2010",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "3",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas com rolamento",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Porta montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV2011",
    "slug": "porta-balcao-3-folhas-veneziana-e-vidro-branco-linha-premium",
    "nome": "Porta Balcão 3 Folhas Veneziana e Vidro Branco Linha Premium",
    "modelo": "porta-balcao-3f-premium",
    "categoria": "portas",
    "subcategoria": "portas-balcao",
    "linha": "premium",
    "cor": "branco",
    "vidro": "Liso incolor 4 mm",
    "folhas": 3,
    "abertura": "Correr",
    "grade": false,
    "selos": [],
    "vendidos": 94,
    "medidas": [
      {
        "largura": 160,
        "altura": 210,
        "preco": 2469.9,
        "estoque": 0,
        "pesoKg": 57.1
      },
      {
        "largura": 200,
        "altura": 210,
        "preco": 2809.9,
        "estoque": 0,
        "pesoKg": 71.4
      },
      {
        "largura": 240,
        "altura": 210,
        "preco": 3149.9,
        "estoque": 0,
        "pesoKg": 85.7
      }
    ],
    "opcoes": [],
    "descricao": [
      "A porta que funciona como janela de quarto: uma folha de vidro e duas de veneziana para escurecer e ventilar ao mesmo tempo.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática branca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto, as roldanas têm rolamento e a vedação leva borracha EPDM, então a peça corre mais macia, veda melhor contra vento e água e dura muito mais.",
      "Indicada para quartos com sacada."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Roldanas com rolamento e vedação reforçada",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV2011",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática branca",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Correr",
      "Folhas": "3",
      "Fechamento": "Fecho concha com trava",
      "Roldanas": "Roldanas com rolamento",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Porta montada com batente",
      "Vidro instalado e vedado",
      "Fecho concha com trava já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV2012",
    "slug": "porta-camarao-4-folhas-com-vidro-preto-linha-premium",
    "nome": "Porta Camarão 4 Folhas com Vidro Preto Linha Premium",
    "modelo": "porta-camarao-4f-premium",
    "categoria": "portas",
    "subcategoria": "portas-camarao",
    "linha": "premium",
    "cor": "preto",
    "vidro": "Liso incolor 4 mm",
    "folhas": 4,
    "abertura": "Camarão",
    "grade": false,
    "selos": [
      "novidade"
    ],
    "vendidos": 357,
    "medidas": [
      {
        "largura": 160,
        "altura": 210,
        "preco": 2639.9,
        "estoque": 0,
        "pesoKg": 57.1
      },
      {
        "largura": 200,
        "altura": 210,
        "preco": 2979.9,
        "estoque": 0,
        "pesoKg": 71.4
      },
      {
        "largura": 240,
        "altura": 210,
        "preco": 3309.9,
        "estoque": 0,
        "pesoKg": 85.7
      }
    ],
    "opcoes": [
      {
        "nome": "Lado da abertura",
        "valores": [
          "Esquerda",
          "Direita"
        ],
        "ajuda": "Olhando de fora para dentro do ambiente."
      }
    ],
    "descricao": [
      "As folhas se dobram umas sobre as outras e liberam quase todo o vão. Ideal para integrar ambientes de verdade.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto, as roldanas têm rolamento e a vedação leva borracha EPDM, então a peça corre mais macia, veda melhor contra vento e água e dura muito mais.",
      "Indicada para varandas, áreas gourmet e salas."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Roldanas com rolamento e vedação reforçada",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV2012",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Camarão",
      "Folhas": "4",
      "Fechamento": "Fecho de embutir",
      "Roldanas": "Roldanas superiores com rolamento",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Porta montada com batente",
      "Vidro instalado e vedado",
      "Fecho de embutir já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV2013",
    "slug": "porta-camarao-4-folhas-com-vidro-branco-linha-premium",
    "nome": "Porta Camarão 4 Folhas com Vidro Branco Linha Premium",
    "modelo": "porta-camarao-4f-premium",
    "categoria": "portas",
    "subcategoria": "portas-camarao",
    "linha": "premium",
    "cor": "branco",
    "vidro": "Liso incolor 4 mm",
    "folhas": 4,
    "abertura": "Camarão",
    "grade": false,
    "selos": [],
    "vendidos": 260,
    "medidas": [
      {
        "largura": 160,
        "altura": 210,
        "preco": 2489.9,
        "estoque": 0,
        "pesoKg": 57.1
      },
      {
        "largura": 200,
        "altura": 210,
        "preco": 2809.9,
        "estoque": 0,
        "pesoKg": 71.4
      },
      {
        "largura": 240,
        "altura": 210,
        "preco": 3129.9,
        "estoque": 0,
        "pesoKg": 85.7
      }
    ],
    "opcoes": [
      {
        "nome": "Lado da abertura",
        "valores": [
          "Esquerda",
          "Direita"
        ],
        "ajuda": "Olhando de fora para dentro do ambiente."
      }
    ],
    "descricao": [
      "As folhas se dobram umas sobre as outras e liberam quase todo o vão. Ideal para integrar ambientes de verdade.",
      "Chega montada, com vidro e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática branca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto, as roldanas têm rolamento e a vedação leva borracha EPDM, então a peça corre mais macia, veda melhor contra vento e água e dura muito mais.",
      "Indicada para varandas, áreas gourmet e salas."
    ],
    "destaques": [
      "Chega montada, com vidro e acessórios instalados",
      "Roldanas com rolamento e vedação reforçada",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV2013",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática branca",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Liso incolor 4 mm",
      "Abertura": "Camarão",
      "Folhas": "4",
      "Fechamento": "Fecho de embutir",
      "Roldanas": "Roldanas superiores com rolamento",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Porta montada com batente",
      "Vidro instalado e vedado",
      "Fecho de embutir já instalado",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV2014",
    "slug": "porta-pivotante-ripada-preto-linha-premium",
    "nome": "Porta Pivotante Ripada Preto Linha Premium",
    "modelo": "porta-pivotante-premium",
    "categoria": "portas",
    "subcategoria": "portas-pivotantes",
    "linha": "premium",
    "cor": "preto",
    "vidro": "Sem vidro (ripado em alumínio)",
    "folhas": 1,
    "abertura": "Pivotante",
    "grade": false,
    "selos": [
      "mais-vendido"
    ],
    "vendidos": 904,
    "medidas": [
      {
        "largura": 100,
        "altura": 210,
        "preco": 4969.9,
        "estoque": 0,
        "pesoKg": 50.4
      },
      {
        "largura": 120,
        "altura": 240,
        "preco": 5749.9,
        "estoque": 0,
        "pesoKg": 69.1
      },
      {
        "largura": 140,
        "altura": 240,
        "preco": 6229.9,
        "estoque": 0,
        "pesoKg": 80.6
      }
    ],
    "opcoes": [
      {
        "nome": "Lado da abertura",
        "valores": [
          "Esquerda",
          "Direita"
        ],
        "ajuda": "Olhando de fora para dentro do ambiente."
      }
    ],
    "descricao": [
      "A porta que muda a cara da fachada. Ripado em alumínio, pivô de piso e puxador longo para uma entrada que impressiona.",
      "Chega montada, com fechadura e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática preta fosca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto e a vedação leva borracha EPDM, então a peça fecha com mais firmeza, veda melhor contra vento e água e dura muito mais.",
      "Indicada para entradas principais e fachadas."
    ],
    "destaques": [
      "Chega montada, com fechadura e acessórios instalados",
      "Perfil 25 mm e vedação com borracha EPDM",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV2014",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática preta fosca",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Sem vidro (ripado em alumínio)",
      "Abertura": "Pivotante",
      "Folhas": "1",
      "Fechamento": "Fechadura rolete com chave",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Puxador": "Puxador tubular de 100 cm incluso",
      "Pivô": "Pivô de piso e superior em aço",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Porta montada com batente",
      "Fechadura e chaves",
      "Puxador tubular de 100 cm",
      "Pivô de piso e pivô superior",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV2015",
    "slug": "porta-pivotante-ripada-bronze-linha-premium",
    "nome": "Porta Pivotante Ripada Bronze Linha Premium",
    "modelo": "porta-pivotante-premium",
    "categoria": "portas",
    "subcategoria": "portas-pivotantes",
    "linha": "premium",
    "cor": "bronze",
    "vidro": "Sem vidro (ripado em alumínio)",
    "folhas": 1,
    "abertura": "Pivotante",
    "grade": false,
    "selos": [],
    "vendidos": 213,
    "medidas": [
      {
        "largura": 100,
        "altura": 210,
        "preco": 5109.9,
        "estoque": 0,
        "pesoKg": 50.4
      },
      {
        "largura": 120,
        "altura": 240,
        "preco": 5909.9,
        "estoque": 0,
        "pesoKg": 69.1
      },
      {
        "largura": 140,
        "altura": 240,
        "preco": 6409.9,
        "estoque": 0,
        "pesoKg": 80.6
      }
    ],
    "opcoes": [
      {
        "nome": "Lado da abertura",
        "valores": [
          "Esquerda",
          "Direita"
        ],
        "ajuda": "Olhando de fora para dentro do ambiente."
      }
    ],
    "descricao": [
      "A porta que muda a cara da fachada. Ripado em alumínio, pivô de piso e puxador longo para uma entrada que impressiona.",
      "Chega montada, com fechadura e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática bronze, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Premium o perfil é mais robusto e a vedação leva borracha EPDM, então a peça fecha com mais firmeza, veda melhor contra vento e água e dura muito mais.",
      "Indicada para entradas principais e fachadas."
    ],
    "destaques": [
      "Chega montada, com fechadura e acessórios instalados",
      "Perfil 25 mm e vedação com borracha EPDM",
      "Pintura eletrostática que não descasca",
      "Garantia de 2 anos contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV2015",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática bronze",
      "Linha": "Linha Premium (perfil 25 mm)",
      "Batente": "7 cm",
      "Vidro": "Sem vidro (ripado em alumínio)",
      "Abertura": "Pivotante",
      "Folhas": "1",
      "Fechamento": "Fechadura rolete com chave",
      "Vedação": "Escova de vedação e borracha EPDM",
      "Puxador": "Puxador tubular de 100 cm incluso",
      "Pivô": "Pivô de piso e superior em aço",
      "Garantia": "2 anos"
    },
    "naCaixa": [
      "Porta montada com batente",
      "Fechadura e chaves",
      "Puxador tubular de 100 cm",
      "Pivô de piso e pivô superior",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV2016",
    "slug": "porta-vestiario-lambri-branco-linha-essencial",
    "nome": "Porta Vestiário Lambri Branco Linha Essencial",
    "modelo": "porta-vestiario-essencial",
    "categoria": "portas",
    "subcategoria": "portas-de-abrir",
    "linha": "essencial",
    "cor": "branco",
    "vidro": "Sem vidro (fechamento em lambri)",
    "folhas": 1,
    "abertura": "Abrir",
    "grade": false,
    "selos": [
      "pronta-entrega"
    ],
    "vendidos": 329,
    "medidas": [
      {
        "largura": 60,
        "altura": 160,
        "preco": 479.9,
        "estoque": 29,
        "pesoKg": 13.4
      },
      {
        "largura": 70,
        "altura": 160,
        "preco": 509.9,
        "estoque": 5,
        "pesoKg": 15.7
      },
      {
        "largura": 80,
        "altura": 160,
        "preco": 549.9,
        "estoque": 16,
        "pesoKg": 17.9
      }
    ],
    "opcoes": [
      {
        "nome": "Lado da abertura",
        "valores": [
          "Esquerda",
          "Direita"
        ],
        "ajuda": "Olhando de fora para dentro do ambiente."
      }
    ],
    "descricao": [
      "Leve, resistente à umidade e com tarjeta livre e ocupado. Feita para banheiros de comércio, academias e escolas.",
      "Chega montada, com tarjeta e acessórios instalados, pronta para fixar no vão. O alumínio recebe pintura eletrostática branca, que não descasca e aguenta sol e chuva sem perder a cor.",
      "Na Linha Essencial você tem o melhor custo-benefício para a obra toda: perfil leve e resistente, acabamento caprichado e preço que cabe no orçamento.",
      "Indicada para banheiros coletivos, vestiários e comércios."
    ],
    "destaques": [
      "Chega montada, com tarjeta e acessórios instalados",
      "Melhor custo-benefício para a obra toda",
      "Pintura eletrostática que não descasca",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV2016",
      "Material": "Alumínio",
      "Acabamento": "Pintura eletrostática branca",
      "Linha": "Linha Essencial (perfil 20 mm)",
      "Batente": "6 cm",
      "Vidro": "Sem vidro (fechamento em lambri)",
      "Abertura": "Abrir",
      "Folhas": "1",
      "Fechamento": "Tarjeta livre e ocupado",
      "Vedação": "Escova de vedação",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Porta montada com batente",
      "Tarjeta livre e ocupado já instalada",
      "Parafusos e buchas para fixação",
      "Guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV3001",
    "slug": "box-frontal-de-correr-vidro-incolor-perfil-preto",
    "nome": "Box Frontal de Correr Vidro Incolor Perfil Preto",
    "modelo": "box-frontal",
    "categoria": "box-para-banheiro",
    "subcategoria": "box-frontal",
    "linha": null,
    "cor": "preto",
    "vidro": "Vidro temperado incolor 8 mm",
    "folhas": 2,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "mais-vendido",
      "pronta-entrega"
    ],
    "vendidos": 1186,
    "medidas": [
      {
        "largura": 100,
        "altura": 190,
        "preco": 769.9,
        "estoque": 32,
        "pesoKg": 38
      },
      {
        "largura": 120,
        "altura": 190,
        "preco": 829.9,
        "estoque": 22,
        "pesoKg": 45.6
      },
      {
        "largura": 140,
        "altura": 190,
        "preco": 889.9,
        "estoque": 18,
        "pesoKg": 53.2
      },
      {
        "largura": 160,
        "altura": 190,
        "preco": 949.9,
        "estoque": 17,
        "pesoKg": 60.8
      }
    ],
    "opcoes": [],
    "descricao": [
      "Vidro temperado de 8 mm, roldanas suaves e perfil discreto. O box que deixa o banheiro com cara de reformado.",
      "O kit chega completo, com vidros temperados, perfis em alumínio preto, roldanas e todos os acessórios para instalar. É só medir o vão com cuidado, escolher a medida certa e agendar a instalação.",
      "Indicado para banheiros com vão reto. Se o seu vão não bate com nenhuma medida da lista, chama a gente no WhatsApp que fazemos sob medida."
    ],
    "destaques": [
      "Vidro temperado de 8 mm, até 5 vezes mais resistente que o comum",
      "Kit completo com perfis, roldanas e acessórios",
      "Perfil em alumínio que não enferruja",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV3001",
      "Material": "Alumínio",
      "Acabamento": "Perfil em alumínio com pintura preta fosca",
      "Vidro": "Vidro temperado incolor 8 mm",
      "Abertura": "Correr",
      "Folhas": "2",
      "Fechamento": "Puxador em alumínio",
      "Roldanas": "Roldanas em aço inox",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Vidros temperados de 8 mm já lapidados",
      "Perfis de alumínio cortados na medida",
      "Roldanas, puxador e batedores",
      "Parafusos, buchas e guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV3002",
    "slug": "box-frontal-de-correr-vidro-incolor-perfil-prata",
    "nome": "Box Frontal de Correr Vidro Incolor Perfil Prata",
    "modelo": "box-frontal",
    "categoria": "box-para-banheiro",
    "subcategoria": "box-frontal",
    "linha": null,
    "cor": "prata",
    "vidro": "Vidro temperado incolor 8 mm",
    "folhas": 2,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "pronta-entrega"
    ],
    "vendidos": 331,
    "medidas": [
      {
        "largura": 100,
        "altura": 190,
        "preco": 709.9,
        "estoque": 23,
        "pesoKg": 38
      },
      {
        "largura": 120,
        "altura": 190,
        "preco": 769.9,
        "estoque": 20,
        "pesoKg": 45.6
      },
      {
        "largura": 140,
        "altura": 190,
        "preco": 819.9,
        "estoque": 13,
        "pesoKg": 53.2
      },
      {
        "largura": 160,
        "altura": 190,
        "preco": 879.9,
        "estoque": 26,
        "pesoKg": 60.8
      }
    ],
    "opcoes": [],
    "descricao": [
      "Vidro temperado de 8 mm, roldanas suaves e perfil discreto. O box que deixa o banheiro com cara de reformado.",
      "O kit chega completo, com vidros temperados, perfis em alumínio prata, roldanas e todos os acessórios para instalar. É só medir o vão com cuidado, escolher a medida certa e agendar a instalação.",
      "Indicado para banheiros com vão reto. Se o seu vão não bate com nenhuma medida da lista, chama a gente no WhatsApp que fazemos sob medida."
    ],
    "destaques": [
      "Vidro temperado de 8 mm, até 5 vezes mais resistente que o comum",
      "Kit completo com perfis, roldanas e acessórios",
      "Perfil em alumínio que não enferruja",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV3002",
      "Material": "Alumínio",
      "Acabamento": "Perfil em alumínio anodizado prata",
      "Vidro": "Vidro temperado incolor 8 mm",
      "Abertura": "Correr",
      "Folhas": "2",
      "Fechamento": "Puxador em alumínio",
      "Roldanas": "Roldanas em aço inox",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Vidros temperados de 8 mm já lapidados",
      "Perfis de alumínio cortados na medida",
      "Roldanas, puxador e batedores",
      "Parafusos, buchas e guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV3003",
    "slug": "box-frontal-de-correr-vidro-fume-perfil-preto",
    "nome": "Box Frontal de Correr Vidro Fumê Perfil Preto",
    "modelo": "box-frontal",
    "categoria": "box-para-banheiro",
    "subcategoria": "box-frontal",
    "linha": null,
    "cor": "preto",
    "vidro": "Vidro temperado fumê 8 mm",
    "folhas": 2,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "novidade"
    ],
    "vendidos": 339,
    "medidas": [
      {
        "largura": 100,
        "altura": 190,
        "preco": 859.9,
        "estoque": 0,
        "pesoKg": 38
      },
      {
        "largura": 120,
        "altura": 190,
        "preco": 929.9,
        "estoque": 0,
        "pesoKg": 45.6
      },
      {
        "largura": 140,
        "altura": 190,
        "preco": 999.9,
        "estoque": 0,
        "pesoKg": 53.2
      },
      {
        "largura": 160,
        "altura": 190,
        "preco": 1059.9,
        "estoque": 0,
        "pesoKg": 60.8
      }
    ],
    "opcoes": [],
    "descricao": [
      "Vidro temperado de 8 mm, roldanas suaves e perfil discreto. O box que deixa o banheiro com cara de reformado.",
      "O kit chega completo, com vidros temperados, perfis em alumínio preto, roldanas e todos os acessórios para instalar. É só medir o vão com cuidado, escolher a medida certa e agendar a instalação.",
      "Indicado para banheiros com vão reto. Se o seu vão não bate com nenhuma medida da lista, chama a gente no WhatsApp que fazemos sob medida."
    ],
    "destaques": [
      "Vidro temperado de 8 mm, até 5 vezes mais resistente que o comum",
      "Kit completo com perfis, roldanas e acessórios",
      "Perfil em alumínio que não enferruja",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV3003",
      "Material": "Alumínio",
      "Acabamento": "Perfil em alumínio com pintura preta fosca",
      "Vidro": "Vidro temperado fumê 8 mm",
      "Abertura": "Correr",
      "Folhas": "2",
      "Fechamento": "Puxador em alumínio",
      "Roldanas": "Roldanas em aço inox",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Vidros temperados de 8 mm já lapidados",
      "Perfis de alumínio cortados na medida",
      "Roldanas, puxador e batedores",
      "Parafusos, buchas e guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV3004",
    "slug": "box-de-canto-vidro-incolor-perfil-preto",
    "nome": "Box de Canto Vidro Incolor Perfil Preto",
    "modelo": "box-canto",
    "categoria": "box-para-banheiro",
    "subcategoria": "box-de-canto",
    "linha": null,
    "cor": "preto",
    "vidro": "Vidro temperado incolor 8 mm",
    "folhas": 4,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "pronta-entrega"
    ],
    "vendidos": 220,
    "medidas": [
      {
        "largura": 80,
        "altura": 190,
        "preco": 1199.9,
        "estoque": 5,
        "pesoKg": 60.8,
        "rotulo": "0,80 x 0,80 x 1,90 m"
      },
      {
        "largura": 90,
        "altura": 190,
        "preco": 1239.9,
        "estoque": 30,
        "pesoKg": 68.4,
        "rotulo": "0,90 x 0,90 x 1,90 m"
      },
      {
        "largura": 100,
        "altura": 190,
        "preco": 1279.9,
        "estoque": 4,
        "pesoKg": 76,
        "rotulo": "1,00 x 1,00 x 1,90 m"
      }
    ],
    "opcoes": [],
    "descricao": [
      "Abertura em canto para aproveitar cada centímetro do banheiro. Entrada ampla e vidro temperado de 8 mm.",
      "O kit chega completo, com vidros temperados, perfis em alumínio preto, roldanas e todos os acessórios para instalar. É só medir o vão com cuidado, escolher a medida certa e agendar a instalação.",
      "Indicado para banheiros com o chuveiro no canto. Se o seu vão não bate com nenhuma medida da lista, chama a gente no WhatsApp que fazemos sob medida."
    ],
    "destaques": [
      "Vidro temperado de 8 mm, até 5 vezes mais resistente que o comum",
      "Kit completo com perfis, roldanas e acessórios",
      "Perfil em alumínio que não enferruja",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV3004",
      "Material": "Alumínio",
      "Acabamento": "Perfil em alumínio com pintura preta fosca",
      "Vidro": "Vidro temperado incolor 8 mm",
      "Abertura": "Correr",
      "Folhas": "4",
      "Fechamento": "Puxador em alumínio",
      "Roldanas": "Roldanas em aço inox",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Vidros temperados de 8 mm já lapidados",
      "Perfis de alumínio cortados na medida",
      "Roldanas, puxador e batedores",
      "Parafusos, buchas e guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV3005",
    "slug": "box-de-canto-vidro-incolor-perfil-prata",
    "nome": "Box de Canto Vidro Incolor Perfil Prata",
    "modelo": "box-canto",
    "categoria": "box-para-banheiro",
    "subcategoria": "box-de-canto",
    "linha": null,
    "cor": "prata",
    "vidro": "Vidro temperado incolor 8 mm",
    "folhas": 4,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "pronta-entrega"
    ],
    "vendidos": 26,
    "medidas": [
      {
        "largura": 80,
        "altura": 190,
        "preco": 1109.9,
        "estoque": 24,
        "pesoKg": 60.8,
        "rotulo": "0,80 x 0,80 x 1,90 m"
      },
      {
        "largura": 90,
        "altura": 190,
        "preco": 1149.9,
        "estoque": 23,
        "pesoKg": 68.4,
        "rotulo": "0,90 x 0,90 x 1,90 m"
      },
      {
        "largura": 100,
        "altura": 190,
        "preco": 1189.9,
        "estoque": 15,
        "pesoKg": 76,
        "rotulo": "1,00 x 1,00 x 1,90 m"
      }
    ],
    "opcoes": [],
    "descricao": [
      "Abertura em canto para aproveitar cada centímetro do banheiro. Entrada ampla e vidro temperado de 8 mm.",
      "O kit chega completo, com vidros temperados, perfis em alumínio prata, roldanas e todos os acessórios para instalar. É só medir o vão com cuidado, escolher a medida certa e agendar a instalação.",
      "Indicado para banheiros com o chuveiro no canto. Se o seu vão não bate com nenhuma medida da lista, chama a gente no WhatsApp que fazemos sob medida."
    ],
    "destaques": [
      "Vidro temperado de 8 mm, até 5 vezes mais resistente que o comum",
      "Kit completo com perfis, roldanas e acessórios",
      "Perfil em alumínio que não enferruja",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV3005",
      "Material": "Alumínio",
      "Acabamento": "Perfil em alumínio anodizado prata",
      "Vidro": "Vidro temperado incolor 8 mm",
      "Abertura": "Correr",
      "Folhas": "4",
      "Fechamento": "Puxador em alumínio",
      "Roldanas": "Roldanas em aço inox",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Vidros temperados de 8 mm já lapidados",
      "Perfis de alumínio cortados na medida",
      "Roldanas, puxador e batedores",
      "Parafusos, buchas e guia de instalação"
    ],
    "imagens": []
  },
  {
    "id": "AV3006",
    "slug": "box-de-correr-ate-o-teto-vidro-incolor-perfil-preto",
    "nome": "Box de Correr até o Teto Vidro Incolor Perfil Preto",
    "modelo": "box-teto",
    "categoria": "box-para-banheiro",
    "subcategoria": "box-frontal",
    "linha": null,
    "cor": "preto",
    "vidro": "Vidro temperado incolor 8 mm",
    "folhas": 2,
    "abertura": "Correr",
    "grade": false,
    "selos": [
      "mais-vendido",
      "pronta-entrega"
    ],
    "vendidos": 1166,
    "medidas": [
      {
        "largura": 120,
        "altura": 240,
        "preco": 1349.9,
        "estoque": 35,
        "pesoKg": 57.6
      },
      {
        "largura": 140,
        "altura": 240,
        "preco": 1449.9,
        "estoque": 26,
        "pesoKg": 67.2
      },
      {
        "largura": 160,
        "altura": 240,
        "preco": 1549.9,
        "estoque": 10,
        "pesoKg": 76.8
      }
    ],
    "opcoes": [],
    "descricao": [
      "Vai do piso ao teto, segura o vapor dentro do box e deixa o banheiro com aquele visual de projeto de arquiteto.",
      "O kit chega completo, com vidros temperados, perfis em alumínio preto, roldanas e todos os acessórios para instalar. É só medir o vão com cuidado, escolher a medida certa e agendar a instalação.",
      "Indicado para banheiros modernos e suítes. Se o seu vão não bate com nenhuma medida da lista, chama a gente no WhatsApp que fazemos sob medida."
    ],
    "destaques": [
      "Vidro temperado de 8 mm, até 5 vezes mais resistente que o comum",
      "Kit completo com perfis, roldanas e acessórios",
      "Perfil em alumínio que não enferruja",
      "Garantia de 1 ano contra defeitos de fabricação"
    ],
    "specs": {
      "Código": "AV3006",
      "Material": "Alumínio",
      "Acabamento": "Perfil em alumínio com pintura preta fosca",
      "Vidro": "Vidro temperado incolor 8 mm",
      "Abertura": "Correr",
      "Folhas": "2",
      "Fechamento": "Puxador em alumínio",
      "Roldanas": "Roldanas em aço inox",
      "Garantia": "1 ano"
    },
    "naCaixa": [
      "Vidros temperados de 8 mm já lapidados",
      "Perfis de alumínio cortados na medida",
      "Roldanas, puxador e batedores",
      "Parafusos, buchas e guia de instalação"
    ],
    "imagens": []
  }
];
