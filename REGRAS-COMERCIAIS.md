# Regras comerciais da Aura

Todas as regras abaixo moram em um lugar só: `assets/js/config.js`.
Mudou lá, muda no site inteiro: cards, página de produto, carrinho lateral, página do carrinho, central de ajuda e a mensagem que vai para o WhatsApp.

## 1. Desconto por volume (regra universal)

Vale para qualquer combinação de produtos do catálogo.

| Configuração atual | Valor |
|---|---|
| Ativo | sim |
| Faixa | acima de 10 itens no carrinho |
| Desconto | 8% sobre o subtotal dos produtos |
| Contagem | por unidades (2 janelas iguais contam como 2) |

Como alterar, em `config.js`:

```js
descontoVolume: {
  ativo: true,
  contarPor: 'unidades',          // ou 'produtos' para contar só itens diferentes
  faixas: [
    { acimaDe: 10, percentual: 8 },
    // { acimaDe: 20, percentual: 12 },   // exemplo de segunda faixa
  ],
},
```

- `acimaDe: 10` quer dizer que o desconto começa no 11º item.
- Com várias faixas, o site aplica sempre a maior faixa atingida e mostra quanto falta para a próxima.
- Para desligar, use `ativo: false`. O banner da home, o destaque do menu e as barras de progresso somem sozinhos.

## 2. Ordem do cálculo no carrinho

1. **Subtotal**: soma de preço da medida x quantidade de cada item.
2. **Desconto por volume**: percentual da faixa atingida sobre o subtotal.
3. **Total dos produtos**: subtotal menos o desconto por volume.
4. **Pix**: desconto do Pix (`pagamento.pixPercentual`, hoje 10%) aplicado em cima do total dos produtos, ou seja, os descontos acumulam.
5. **Frete**: somado no final (estimativa por região do CEP ou grátis na retirada).

Exemplo com 11 unidades de um produto de R$ 379,90:

| Etapa | Valor |
|---|---|
| Subtotal (11 x R$ 379,90) | R$ 4.178,90 |
| Desconto por volume (8%) | R$ 334,31 a menos |
| Total dos produtos | R$ 3.844,59 |
| No Pix (10% a mais) | R$ 3.460,13 |

## 3. Preços nos cards e na página de produto

- **A partir de**: menor preço entre as medidas do produto.
- **Pix**: preço x (1 menos o percentual do Pix), arredondado nos centavos.
- **Parcela**: preço dividido pelo número de parcelas (`pagamento.maxParcelas`, hoje 10x sem juros), com os centavos truncados para nunca passar do total.

## 4. Frete simulado

Estimativa pela região do CEP (`frete.regioes`). O valor final é sempre confirmado pela equipe no WhatsApp.

| Região | Valor | Prazo |
|---|---|---|
| Grande São Paulo | R$ 79,90 | 2 a 4 dias úteis |
| Sudeste | R$ 129,90 | 3 a 6 dias úteis |
| Sul | R$ 169,90 | 4 a 8 dias úteis |
| Centro-Oeste | R$ 199,90 | 5 a 9 dias úteis |
| Nordeste | R$ 249,90 | 7 a 12 dias úteis |
| Norte | R$ 289,90 | 9 a 15 dias úteis |

- Frete grátis a partir de R$ 4.000 no total dos produtos já com o desconto por volume (`frete.gratisAcimaDe`, use 0 para desligar).
- Itens sem estoque (estoque 0 na medida) entram como **sob encomenda** e somam `frete.prazoSobEncomenda` ao prazo.
- Retirada na loja: grátis, endereço e prazo em `retirada`.

## 5. Estoque, prazos e garantia

- **Pronta entrega**: produto com todas as medidas em estoque (`estoque` maior que 0). Sai em `frete.prazoProntaEntrega` (hoje até 2 dias úteis). Nos dados simulados, a Linha Essencial e o box incolor são pronta entrega.
- **Sob encomenda**: medida com `estoque: 0`. Soma `frete.prazoSobEncomenda` (hoje mais 10 dias úteis para fabricação). Nos dados simulados, a Linha Premium e o box fumê são fabricados sob encomenda.
- O selo "Pronta entrega" e o filtro do catálogo seguem essa regra. Se mudar o estoque de um produto em `produtos.js`, ajuste também o selo dele.
- **Garantia**: `garantia.essencial` (1 ano), `garantia.premium` (2 anos) e `garantia.box` (1 ano). Home, página de produto e central de ajuda leem daqui.
- **Regra de medida** (`site.regraMedida`): as medidas da loja são medidas de vão, a peça já sai de fábrica com a folga de instalação descontada. O cliente escolhe a medida igual à do vão ou a mais próxima abaixo.

## 6. Pedido pelo WhatsApp

Todo pedido finalizado no site abre o WhatsApp da loja (`whatsapp.numero`) com a mensagem pronta, começando por "Olá, Aura! Esse é o meu pedido:" e trazendo:

- número do pedido (ex.: AV2610014821, com a data do pedido e 4 dígitos aleatórios)
- cada item com nome, código, medida, opções (ex.: lado da abertura), quantidade, preço unitário e total
- subtotal, desconto por volume, frete estimado ou retirada, total e valor no Pix
- nome, WhatsApp, endereço ou retirada, forma de pagamento escolhida e observações

O botão "Comprar pelo WhatsApp" da página de produto também manda medida, quantidade, opções e valor.
