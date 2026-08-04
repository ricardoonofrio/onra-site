# Guia de implementação — Onra

## Objetivo do protótipo

Este código demonstra a experiência solicitada para a Onra:

- a entrada apresenta apenas o posicionamento da marca, a fotografia de Leo Campos e os dois portais;
- Educação e Consultoria não aparecem simultaneamente na home;
- ao escolher uma jornada, o conteúdo principal é substituído sem recarregamento convencional;
- cada jornada possui atmosfera, hierarquia, conteúdo e conversão próprios;
- a URL passa a aceitar `?area=educacao` e `?area=consultoria`;
- o botão voltar do navegador restaura o estado anterior.

## Arquitetura

- `index.html`: conteúdo semântico dos três estados e diálogos.
- `css/styles.css`: sistema visual, responsividade, estados e movimentos.
- `js/config.js`: canais oficiais e domínio.
- `js/app.js`: roteamento, transições, tabs, menus, formulários e metadados.
- `assets/images`: fotografia otimizada, versão mobile e Open Graph.
- `docs/previews`: imagens de referência da entrega.

## Antes de publicar

1. Preencher `js/config.js` com WhatsApp, e-mail e domínio.
2. Confirmar o nome vigente da certificação ANBIMA.
3. Confirmar razão social, CNPJ e redação regulatória.
4. Substituir referências provisórias por materiais reais de mídia, palestras e instituições, quando disponíveis.
5. Adicionar política de privacidade definitiva.
6. Configurar analytics somente com consentimento aplicável.

## Comportamento obrigatório

### Estado inicial

Mostrar somente:

- hero institucional;
- fotografia de Leo;
- dois portais editoriais;
- manifesto curto;
- rodapé mínimo.

### Educação

- fundo claro e ritmo mais aberto;
- segmentação interna entre instituições e pessoas;
- formatos em linhas editoriais, sem grade repetitiva de cards;
- temas, processo, autoridade e CTA institucional.

### Consultoria

- ambiente escuro, reservado e sóbrio;
- situações de identificação em sequência editorial;
- processo contínuo;
- serviços em seletor vertical;
- apresentação de Leo, diferenciais, processo de entrada e CTA qualificado.

## Critérios mínimos de aceite

- Apenas um estado visível por vez.
- Home verdadeiramente curta e minimalista.
- Rotas compartilháveis no GitHub Pages.
- Botão voltar funcionando.
- Navegação e tabs utilizáveis por teclado.
- Foco visível.
- Layout específico para mobile.
- Respeito a `prefers-reduced-motion`.
- Nenhum dado, depoimento, número ou instituição fictícia.
- Nenhuma promessa de rentabilidade ou resultado.

## Publicação no GitHub Pages

Os arquivos podem substituir diretamente a raiz da branch publicada. A navegação por query string evita o problema de 404 em subdiretórios do GitHub Pages.
