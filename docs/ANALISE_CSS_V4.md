# ONRA — Revisão CSS V4

## Problema identificado na imagem enviada

O defeito mostrado não era apenas um corte visual isolado. A área dos portais utilizava `display:flex` com alteração de `flex-grow` no hover, títulos grandes e um breakpoint tardio em 860 px. Em larguras intermediárias, zoom do navegador e determinadas proporções de janela, os dois painéis continuavam lado a lado mesmo sem espaço tipográfico suficiente. Isso podia gerar compressão, cortes e deslocamentos aparentes.

## Correções estruturais

1. Os portais passaram de Flexbox para CSS Grid com duas colunas rigorosamente iguais.
2. Foi removida a mudança de largura no hover; a interação não provoca mais layout shift.
3. Em larguras de até 1024 px, os portais passam a ficar empilhados.
4. Todos os filhos de grids e portais receberam `min-width: 0` para impedir expansão por conteúdo intrínseco.
5. Títulos receberam limites de largura e escala responsiva sem quebras artificiais.
6. `body`, `.view`, heros e portais receberam proteção de largura máxima e overflow horizontal.
7. A responsividade foi reestruturada nos pontos 1180, 1024, 900, 760, 620 e 390 px.
8. Componentes complexos foram revistos: hero, manifesto, tabs, formatos, temas, processos, soluções, diferenciais, fundador, rodapés e diálogos.
9. O mobile deixou de herdar escalas excessivas do tablet.
10. O formulário lateral foi protegido para 100% da largura útil em telas pequenas.

## Validação

- CSS analisado com `tinycss2`: 248 regras, 0 erros de sintaxe.
- Testes automáticos em 15 larguras entre 320 e 1920 px.
- Nenhum overflow horizontal detectado.
- Nenhum elemento ultrapassou os limites do viewport nos testes.
- Teste específico no ponto crítico: 982 × 800 px.
- Teste de transição de breakpoint: 1024 px empilhado e 1025 px em duas colunas.

## Aplicação

Substituir integralmente o arquivo:

`css/styles.css`

Não manter o CSS V3 carregado em paralelo. Limpar cache do navegador ou utilizar versionamento no link, por exemplo:

`css/styles.css?v=4`
