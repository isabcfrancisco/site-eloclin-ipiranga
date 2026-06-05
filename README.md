# Eloclin Ipiranga - Site Institucional

Site institucional da **Eloclin Ipiranga**, clínica médica popular localizada em Ribeirão Preto - SP. O projeto é um frontend estático, desenvolvido com HTML5, CSS3 e JavaScript puro, sem frameworks ou dependências de build.

🌐 **Acesse:** [eloclin.com](https://eloclin.com)

---

## Índice

- [Visão Geral](#visão-geral)
- [Repositório do Backend](#repositório-do-backend)
- [Páginas](#páginas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Acessibilidade](#acessibilidade)
- [SEO](#seo)
- [Formulário de Contato](#formulário-de-contato)
- [Como Usar Localmente](#como-usar-localmente)
- [Deploy](#deploy)

---

## Visão Geral

O site apresenta a Eloclin Ipiranga ao público, destacando especialidades médicas, convênios aceitos, preços acessíveis, estrutura física da clínica e canais de contato. O design é responsivo, adaptado para dispositivos móveis e desktop, com foco em clareza, confiança e conversão via WhatsApp.

---

## Repositório do Backend

Este repositório contém apenas o **frontend** do projeto. O backend da Eloclin, responsável pelo envio de e-mails do formulário de contato, está em um repositório separado:

📦 **[github.com/isabcfrancisco/backend_eloclin](https://github.com/isabcfrancisco/backend_eloclin)**

O backend é uma API desenvolvida em **Python com Flask**, que recebe os dados do formulário e os encaminha por e-mail via [Resend](https://resend.com). Consulte o README do repositório de backend para instruções de configuração e deploy.

---

## Páginas

| Arquivo                        | Descrição                                                          |
|--------------------------------|--------------------------------------------------------------------|
| `index.html`                   | Página principal - hero, convênios, especialidades, preços, sobre, estrutura, valores, depoimentos e contato |
| `equipe.html`                  | Especialidades e valores da clínica                                |
| `exames.html`                  | Catálogo completo de exames e passo a passo de agendamento         |
| `politica-de-privacidade.html` | Política de privacidade                                            |
| `termos-de-uso.html`           | Termos de uso                                                      |

---

## Estrutura do Projeto

```
Site/
├── index.html
├── equipe.html
├── exames.html
├── politica-de-privacidade.html
├── termos-de-uso.html
├── styles.css
├── script.js
├── CNAME
├── assets/
│   └── js/
│       ├── main.js                  # Inicialização de todos os módulos
│       ├── menu.js                  # Menu hambúrguer e sticky header
│       ├── accordion.js             # Acordeão de especialidades (responsivo)
│       ├── reveal.js                # Animação de entrada via IntersectionObserver
│       ├── lightbox.js              # Galeria de fotos com lightbox acessível
│       ├── structure-carousel.js    # Carrossel da seção Estrutura
│       ├── testimonials-carousel.js # Carrossel de depoimentos
│       └── contact-form.js          # Envio assíncrono do formulário (Formspree)
└── imagens/
    ├── logo-eloclin-nova.png
    ├── logo-eloclin.png
    ├── favicon-16.png
    ├── favicon-32.png
    ├── favicon-180.png
    ├── foto1.jpeg … foto8.jpeg
    ├── foto-04.jpeg
    └── avaliacao1.jpeg … avaliacao3.jpeg
```

---

## Funcionalidades

### Menu de Navegação
Menu responsivo com botão hambúrguer para mobile. O header recebe a classe `scrolled` ao rolar a página, alterando sua aparência para melhor legibilidade.

### Acordeão de Especialidades
Lista as especialidades médicas em formato acordeão. O número de colunas se adapta automaticamente à largura da tela: 1 coluna em mobile, 2 em tablet e 3 em desktop.

### Animações de Entrada (Reveal)
Elementos com a classe `.reveal` surgem suavemente quando entram na viewport, usando a API `IntersectionObserver`. Em navegadores sem suporte, os elementos ficam visíveis por padrão.

### Galeria com Lightbox
A seção de estrutura exibe fotos da clínica em carrossel. Ao clicar em uma imagem, abre-se um lightbox com navegação por botões, teclado (← →, Esc) e clique fora para fechar.

### Carrosséis
Dois carrosséis independentes: um para a galeria de estrutura e outro para os depoimentos de pacientes. A rolagem é proporcional ao tamanho do card/item.

### Formulário de Contato
Envio assíncrono via `fetch` para o backend próprio da clínica (Flask + Resend). Inclui validação nativa do HTML5, estados de carregamento no botão e mensagens de feedback para o usuário.

---

## Tecnologias Utilizadas

| Tecnologia        | Uso                                                        |
|-------------------|------------------------------------------------------------|
| HTML5             | Estrutura semântica das páginas                            |
| CSS3              | Estilização com variáveis CSS, Flexbox e Grid              |
| JavaScript (ES6+) | Interatividade modular, sem frameworks                     |
| Google Fonts      | Tipografia: *Outfit* (display) e *Plus Jakarta Sans* (body)|
| Font Awesome 6.5  | Ícones                                                     |
| Flask + Resend    | Backend próprio para envio de e-mails do formulário de contato (repositório separado) |
| GitHub Pages      | Hospedagem                                                 |

---

## Acessibilidade

O projeto foi desenvolvido com atenção às diretrizes WCAG:

- **Skip link** para ir direto ao conteúdo principal (`#conteudo`)
- Atributos `aria-label`, `aria-expanded`, `aria-controls` e `role` nos componentes interativos
- Foco gerenciado no lightbox: trap de foco enquanto aberto e retorno ao elemento de origem ao fechar
- Navegação completa pelo teclado (Tab, Shift+Tab, Esc, setas)
- Imagens decorativas com `aria-hidden="true"`
- Contraste de cores adequado para leitura

---

## SEO

- Meta tags de descrição e Open Graph completas
- Dados estruturados com **Schema.org** (`MedicalClinic`) para melhor indexação em resultados de busca
- Tag `<link rel="canonical">` para evitar conteúdo duplicado
- Imagens com atributos `width`, `height` e `fetchpriority` para bom desempenho no Core Web Vitals
- Carregamento não-bloqueante das fontes Google com `media="print"` + `onload`

---

## Formulário de Contato

O formulário de contato é processado pelo **backend próprio da Eloclin**, desenvolvido em Python com Flask e integrado ao serviço de e-mail [Resend](https://resend.com). Ao ser submetido, o frontend envia os dados via `fetch` para a API, que dispara o e-mail diretamente para a clínica.

O código, as instruções de configuração e o deploy do backend estão em:

📦 **[github.com/isabcfrancisco/backend_eloclin](https://github.com/isabcfrancisco/backend_eloclin)**

---

## Como Usar Localmente

Por ser um projeto estático, não há etapa de build. Basta clonar o repositório e abrir os arquivos em um servidor local.

```bash
git clone https://github.com/isabcfrancisco/site-eloclin-ipiranga.git
cd site-eloclin-ipiranga
```

Em seguida, sirva os arquivos com qualquer servidor HTTP estático. Exemplos:

```bash
# Com Python
python3 -m http.server 8080

# Com Node.js (npx)
npx serve .

# Com a extensão Live Server do VS Code
# Clique com o botão direito em index.html > "Open with Live Server"
```

Acesse `http://localhost:8080` no navegador.

> **Atenção:** abrir o `index.html` diretamente via `file://` pode causar restrições do navegador em alguns recursos. O uso de um servidor local é recomendado.

---

## Deploy

O site é publicado via **GitHub Pages**. O domínio personalizado `www.eloclin.com` está configurado no arquivo `CNAME`.

Para republicar após alterações, basta fazer push para a branch `main`:

```bash
git add .
git commit -m "sua mensagem de commit"
git push origin main
```

O GitHub Pages detecta automaticamente as mudanças e publica a nova versão em instantes.

---

*Desenvolvido por Isabela C. Francisco, estudante de Engenharia da Computação, para a Eloclin Ipiranga - Ribeirão Preto, SP.*
