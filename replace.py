import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_edu = '''    <!-- EDUCAÇÃO -->
    <section class="view view-education" data-view="education" aria-labelledby="education-title" hidden>
      
      <!-- 1. HERO -->
      <div class="edu-hero section-light">
        <div class="shell edu-hero-grid">
          <div class="edu-hero-copy reveal">
            <p class="eyebrow">EDUCAÇÃO FINANCEIRA</p>
            <h1 id="education-title">Entender o dinheiro muda a forma como fazemos escolhas.</h1>
            <p class="lead">Educação financeira para aproximar conhecimento, comportamento e decisões da vida real.</p>
            
            <div class="founder-line" style="margin: 2.5rem 0;">
              <span>Leo Campos</span>
              <span>+14 anos de experiência no mercado financeiro</span>
              <span>Educador financeiro e palestrante</span>
            </div>
            
            <button class="text-link" type="button" data-scroll-target="edu-formas">Conhecer as experiências <span>&darr;</span></button>
          </div>
          <figure class="edu-hero-media reveal" data-delay="100">
            <!-- PLACEHOLDER FOR LEO PALESTRANDO -->
            <img src="assets/images/leo-onra.webp" width="1200" height="1600" alt="Leo Campos educador financeiro" fetchpriority="high">
          </figure>
        </div>
      </div>

      <!-- 2. FORMAS DE EDUCAÇÃO -->
      <section class="edu-formas section-mist" id="edu-formas" aria-labelledby="formas-title">
        <div class="shell split-heading reveal">
          <div>
            <h2 id="formas-title">Conhecimento pode chegar de formas diferentes.</h2>
          </div>
          <p>A proposta muda conforme o público, o contexto e a profundidade necessária.</p>
        </div>

        <div class="shell edu-editorial-list reveal" data-delay="80">
          
          <article class="editorial-row">
            <div class="ed-meta">
              <span>01</span>
              <p class="eyebrow">Para instituições</p>
            </div>
            <div class="ed-content">
              <h3>Palestras &amp; Workshops</h3>
              <p>Experiências desenvolvidas para empresas, institutos, escolas, igrejas e eventos, com conteúdo adaptado ao perfil do público, linguagem acessível e aplicação prática.</p>
              <p class="ed-note">Projetos pontuais ou programas continuados podem ser desenvolvidos conforme a necessidade da instituição.</p>
              <p class="ed-note">Organização financeira, comportamento, crédito, investimentos, aposentadoria, projetos de vida e bem-estar financeiro são alguns dos temas que podem ser trabalhados.</p>
              <button class="text-link" type="button" data-open-contact="education">Levar para minha instituição <span>&nearr;</span></button>
            </div>
          </article>

          <article class="editorial-row">
            <div class="ed-meta">
              <span>02</span>
              <p class="eyebrow">Para aprender continuamente</p>
            </div>
            <div class="ed-content">
              <h3>Conteúdo Aberto</h3>
              <p>Vídeos, análises, reflexões e conteúdos gratuitos para quem deseja desenvolver uma relação mais consciente com o dinheiro e tomar decisões com mais clareza.</p>
              <a href="https://www.youtube.com/@leocamposfin" target="_blank" rel="noopener" class="text-link">Acompanhar os conteúdos <span>&nearr;</span></a>
            </div>
          </article>

          <article class="editorial-row highlight-row">
            <div class="ed-meta">
              <span>03</span>
              <span class="badge-soon">Em Breve</span>
            </div>
            <div class="ed-content">
              <h3>Raio-X da Vida Financeira</h3>
              <p class="sub-h3">Organize sua vida em 7 passos</p>
              <p>Um curso prático para ajudar você a compreender sua realidade financeira, organizar prioridades e construir uma base mais clara para tomar decisões.</p>
              <button class="text-link" type="button" data-open-contact="raiox">Quero ser avisado no lançamento <span>&nearr;</span></button>
            </div>
          </article>

          <article class="editorial-row">
            <div class="ed-meta">
              <span>04</span>
              <p class="eyebrow">Formação</p>
            </div>
            <div class="ed-content">
              <h3>Método Pleno</h3>
              <p>Uma jornada estruturada para quem deseja aprofundar sua organização financeira, planejar melhor e desenvolver maior autonomia para conduzir suas decisões.</p>
              <button class="text-link" type="button" data-open-contact="pleno">Entrar na lista de interesse <span>&nearr;</span></button>
            </div>
          </article>

        </div>
      </section>

      <!-- 3. FILOSOFIA EDUCACIONAL -->
      <section class="edu-philosophy section-paper" aria-labelledby="philosophy-title">
        <div class="shell split-heading reveal">
          <div>
            <h2 id="philosophy-title" style="max-width:32rem;">Educação financeira não começa nos números. Começa na forma como as pessoas compreendem suas escolhas.</h2>
          </div>
          <p>Por isso, os conteúdos não são construídos apenas em torno de orçamento, investimentos ou planilhas. Eles partem da realidade das pessoas, dos comportamentos, das prioridades e dos projetos que o dinheiro precisa sustentar.</p>
        </div>
        <div class="shell reveal" data-delay="80">
          <div class="principles-grid">
            <div class="principle-item">
              <h4>Clareza</h4>
              <p>Entender antes de decidir.</p>
            </div>
            <div class="principle-item">
              <h4>Aplicação</h4>
              <p>Transformar conhecimento em ação.</p>
            </div>
            <div class="principle-item">
              <h4>Contexto</h4>
              <p>Falar com a realidade de cada público.</p>
            </div>
            <div class="principle-item">
              <h4>Autonomia</h4>
              <p>Desenvolver capacidade para tomar melhores decisões.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. LEO EM AÇÃO -->
      <section class="edu-action section-light" aria-labelledby="action-title">
        <div class="shell split-heading reveal">
          <div>
            <h2 id="action-title">Experiência para ensinar o que faz parte da vida real.</h2>
          </div>
          <div>
            <p style="margin-bottom: 2rem;">Há mais de 14 anos atuando no mercado financeiro, Leo Campos reúne experiência profissional, formação em finanças e comunicação acessível para transformar temas financeiros em conteúdos que façam sentido para a vida real.</p>
            <p class="eyebrow" style="margin-bottom: 0.75rem; opacity: 0.5;">CREDENCIAIS</p>
            <p class="credentials-text">Consultor de Valores Mobiliários &middot; Especialista em Investimentos &middot; Administrador &middot; MBA em Finanças &middot; MBA em Planejamento Financeiro Pessoal e Familiar</p>
            
            <div class="action-links">
              <a href="https://www.youtube.com/@leocamposfin" target="_blank" rel="noopener">YouTube</a>
              <a href="https://www.instagram.com/leocamposfin/" target="_blank" rel="noopener">Instagram</a>
              <a href="https://br.linkedin.com/in/leocamposfin" target="_blank" rel="noopener">LinkedIn</a>
              <span>Papo que Rende / RedeTV ES</span>
            </div>
          </div>
        </div>
        
        <div class="shell action-photo-grid reveal" data-delay="80">
          <!-- PLACEHOLDERS FOR LEO EM AÇÃO -->
          <img src="assets/images/leo-onra.webp" class="photo-main" alt="Leo palestrando" loading="lazy">
          <div class="photo-secondary-wrap">
            <img src="assets/images/leo-consulting.webp" class="photo-sub" alt="Leo em workshop" loading="lazy">
            <div class="photo-caption">
              <p>Experiência prática com públicos diversos.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. CTA FINAL -->
      <section class="edu-final-cta section-ink" aria-labelledby="final-cta-title">
        <div class="shell reveal text-center" style="margin-bottom: 4rem;">
          <h2 id="final-cta-title" style="margin: 0 auto; max-width: 40rem;">Como a educação financeira pode fazer sentido para você?</h2>
        </div>
        <div class="shell split-cta-grid reveal" data-delay="80">
          
          <div class="split-cta-card">
            <h3>Para instituições</h3>
            <p>Leve uma palestra, workshop ou experiência de educação financeira para seu público.</p>
            <button class="cta-arrow" type="button" data-open-contact="education">Solicitar uma proposta <span>&nearr;</span></button>
          </div>
          
          <div class="split-cta-divider" aria-hidden="true"></div>

          <div class="split-cta-card">
            <h3>Para pessoas</h3>
            <p>Acompanhe conteúdos, conheça o Raio-X da Vida Financeira e explore as formações de Leo Campos.</p>
            <button class="cta-arrow" type="button" data-scroll-target="edu-formas">Explorar conteúdos e formações <span>&nearr;</span></button>
          </div>

        </div>
      </section>

      <footer class="site-footer footer-light">
        <div class="shell footer-grid">
          <button class="footer-brand" type="button" data-route="home"><img src="assets/images/logos/PNG Logo V02 Onra.png" alt="Onra" class="footer-brand-img"></button>
          <p>Educação financeira com contexto, profundidade e aplicação.</p>
          <div>
            <button type="button" data-route="consulting">Conhecer Consultoria</button>
            <button type="button" data-open-legal="privacy">Privacidade</button>
          </div>
        </div>
      </section>
    <!-- CONSULTORIA -->'''

new_content = re.sub(r'<!-- EDUCAÇÃO -->.*?<!-- CONSULTORIA -->', new_edu, content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
