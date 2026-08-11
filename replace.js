const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const newEdu = 
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
;

const regex = /<section class="formats section-ink"[\s\S]*?<section class="journey-cta education-cta"[\s\S]*?<\/section>/;
const result = content.replace(regex, newEdu.trim());

fs.writeFileSync('index.html', result, 'utf8');
