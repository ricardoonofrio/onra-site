# Onra — protótipo premium em HTML, CSS e JavaScript

Este projeto foi reconstruído do zero como uma experiência de página única com três estados:

1. **Início** — hero minimalista e dois grandes portais.
2. **Educação** — conteúdo completo revelado após a escolha.
3. **Consultoria** — conteúdo completo revelado após a escolha.

## Estrutura

```text
index.html
css/styles.css
js/config.js
js/app.js
assets/images/
assets/icons/
site.webmanifest
```

## Como visualizar

Abra `index.html` diretamente ou execute um servidor local:

```bash
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Configuração obrigatória antes da publicação

Edite `js/config.js`:

```js
window.ONRA_CONFIG = {
  whatsappNumber: "5527999999999",
  contactEmail: "contato@seudominio.com.br",
  canonicalBase: "https://onra.com.br/"
};
```

- O número do WhatsApp deve conter apenas números, com DDI e DDD.
- É possível configurar apenas WhatsApp, apenas e-mail ou ambos.
- Sem configuração, o formulário apenas copia a mensagem e informa que o protótipo ainda precisa de um canal oficial.

## Publicação no GitHub Pages

Substitua os arquivos da branch publicada pelos arquivos deste pacote. Como a navegação usa `?area=educacao` e `?area=consultoria`, ela funciona em subdiretórios do GitHub Pages sem gerar erro 404.

## Pontos que o programador deve validar

- Dados legais da pessoa jurídica e CNPJ.
- Texto regulatório definitivo.
- Nome vigente da certificação ANBIMA.
- WhatsApp, e-mail e domínio oficial.
- Política de privacidade e consentimento.
- Materiais reais de portfólio: fotos, vídeos, logos e depoimentos autorizados.
- Analytics e eventos de conversão.

## Decisões técnicas

- Sem framework: menor peso e maior facilidade de hospedagem.
- HTML semântico e componentes acessíveis.
- Navegação com History API e URL compartilhável.
- Suporte ao botão voltar do navegador.
- Tabs acessíveis por teclado.
- `prefers-reduced-motion` implementado.
- Imagens em WebP e Open Graph dedicado.
