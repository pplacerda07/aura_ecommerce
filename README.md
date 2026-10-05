# Aura · E-commerce de esquadrias e box de vidro

Site estático (HTML, CSS e JavaScript puro). Não precisa instalar nada nem rodar build.

## Como abrir

- Mais simples: dê dois cliques em `index.html`.
- Com servidor local (recomendado para testar o preenchimento automático de CEP):

```bash
python -m http.server 5510
```

Depois acesse http://localhost:5510

Para publicar, envie a pasta inteira para qualquer hospedagem de site estático (Vercel, Netlify, Hostinger, cPanel etc.).

## Páginas

| Arquivo | O que é |
|---|---|
| `index.html` | Home: hero, categorias, vitrine com abas, desconto por volume, linhas, como comprar, como medir, sobre, depoimentos e dúvidas |
| `catalogo.html` | Catálogo com filtros, busca e ordenação. Aceita `?categoria=`, `?linha=`, `?cor=`, `?selo=`, `?q=`, `?ordem=` e `?favoritos=1` |
| `produto.html?p=slug` | Página do produto: escolha de medida, preço dinâmico, frete por CEP, WhatsApp com medida e quantidade |
| `carrinho.html` | Carrinho e finalização. O pedido vai pronto para o WhatsApp |
| `sobre.html` | Sobre a empresa |
| `ajuda.html` | Central de ajuda: como medir, frete, instalação, garantia, trocas, pagamento, desconto por volume e contato |

## Onde mexer

| Quero mudar | Arquivo |
|---|---|
| Número do WhatsApp, dados da empresa, CNPJ, endereço, horários | `assets/js/config.js` |
| Regra de desconto por volume, desconto do Pix, parcelas, frete, retirada | `assets/js/config.js` (detalhes em `REGRAS-COMERCIAIS.md`) |
| Produtos, preços, medidas, estoque, descrições | `assets/js/produtos.js` |
| Cores, fontes, espaçamentos, visual dos componentes | `assets/css/styles.css` |
| Avisos da faixa preta do topo | `config.js` em `site.avisos` |
| Prazos (pronta entrega e sob encomenda), garantia por linha, regra de medida | `config.js` em `frete`, `garantia` e `site.regraMedida` |
| Depoimentos | `config.js` em `depoimentos` |

## Como colocar as fotos

Todos os espaços de imagem estão como mockup (uma tela cinza com um rótulo discreto dizendo qual foto vai ali).

**Fotos de produto**: salve em `assets/img/produtos/` e liste no produto, em `assets/js/produtos.js`:

```js
imagens: [
  'assets/img/produtos/AV1001-1.jpg', // recorte em fundo branco (aparece no card)
  'assets/img/produtos/AV1001-2.jpg', // produto instalado
  'assets/img/produtos/AV1001-3.jpg', // desenho com as medidas
  'assets/img/produtos/AV1001-4.jpg', // detalhe do acabamento
],
```

**Fotos institucionais** (home, sobre, ajuda): no HTML, cada espaço é assim:

```html
<div data-mockup="Foto da fábrica" data-ratio="4/5.6"></div>
```

Para usar uma foto, acrescente `data-src`:

```html
<div data-mockup="Foto da fábrica" data-ratio="4/5.6" data-src="assets/img/fabrica.jpg"></div>
```

Quando terminar de colocar as fotos, desligue os rótulos em `config.js`: `site.mostrarRotulosDeImagem: false`.

Tamanhos sugeridos: produto 1200 x 1500 px (4:5) ou 1200 x 1200 px; hero 1400 x 1400 px; categorias 1200 x 900 px. Prefira `.webp` ou `.jpg` com até 300 KB.

## Antes de publicar

- [ ] Trocar número do WhatsApp, telefone, e-mail, endereço, razão social e CNPJ em `config.js`
- [ ] Trocar `empresa.site` pelo domínio final (é o link do produto que vai na mensagem do WhatsApp). O domínio também aparece nas tags `og:image` e `og:url` do `<head>` das 6 páginas HTML (troque `https://auravidros.com.br` por lá também)
- [ ] Conferir a lista de feriados em `whatsapp.feriados` (nesses dias o site não mostra "online agora")
- [ ] Trocar os números da empresa (`empresa.numeros`) pelos reais
- [ ] Trocar os depoimentos de exemplo por depoimentos reais de clientes
- [ ] Colocar as fotos e desligar os rótulos de imagem
- [ ] Revisar preços, medidas e estoque em `produtos.js`
- [ ] Revisar a política de trocas e garantia da `ajuda.html` com o seu contador ou advogado
- [ ] Instalar GA4, Meta Pixel e Google Tag Manager se for anunciar

## Estrutura

```
index.html, catalogo.html, produto.html, carrinho.html, sobre.html, ajuda.html
assets/
  css/styles.css            design system e componentes
  css/paginas/*.css         estilos específicos de cada página
  js/config.js              regras comerciais e dados da empresa
  js/produtos.js            catálogo (50 produtos simulados)
  js/core.js                preço, carrinho, desconto, frete e mensagens do WhatsApp
  js/ui.js                  cabeçalho, rodapé, carrinho lateral, pop-up do WhatsApp, card de produto
  js/paginas/*.js           lógica de cada página
  img/                      logo, favicon e imagem de compartilhamento
```

O carrinho e os favoritos ficam salvos no navegador do cliente (localStorage). Não existe banco de dados: o pedido é enviado e confirmado pelo WhatsApp.
