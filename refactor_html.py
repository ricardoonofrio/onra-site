import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Duplicated IDs
    html = html.replace('id="founder-title"', 'id="founder-title-temp"', 1)
    html = html.replace('id="founder-title-temp"', 'id="founder-title-education"')
    html = html.replace('id="founder-title"', 'id="founder-title-consulting"')

    # 2. Convert button tags to a tags for routing
    html = html.replace('<button class="brand" type="button" data-route="home"', '<a href="?area=home" class="brand" data-route="home"')
    html = html.replace('</button>\n\n      <nav', '</a>\n\n      <nav')
    
    html = html.replace('<button type="button" data-route="education">Educação</button>', '<a href="?area=educacao" data-route="education">Educação</a>')
    html = html.replace('<button type="button" data-route="consulting">Consultoria</button>', '<a href="?area=consultoria" data-route="consulting">Consultoria</a>')
    html = html.replace('<button type="button" data-scroll-target="leo">Leo Campos</button>', '<a href="#leo" data-scroll-target="leo">Leo Campos</a>')
    html = html.replace('<button type="button" data-open-contact="general">Contato</button>', '<a href="#contato" data-open-contact="general">Contato</a>')

    html = html.replace('<button class="portal portal-education" type="button" data-route="education">', '<a href="?area=educacao" class="portal portal-education" data-route="education">')
    html = html.replace('<button class="portal portal-consulting" type="button" data-route="consulting">', '<a href="?area=consultoria" class="portal portal-consulting" data-route="consulting">')
    html = html.replace('</button>\n      </div>\n    </section>', '</a>\n      </div>\n    </section>')
    
    html = html.replace('<button type="button" data-route="home">Início</button>', '<a href="?area=home" data-route="home">Início</a>')
    html = html.replace('<button type="button" data-route="education">Educação Financeira</button>', '<a href="?area=educacao" data-route="education">Educação Financeira</a>')
    html = html.replace('<button type="button" data-route="consulting">Consultoria</button>', '<a href="?area=consultoria" data-route="consulting">Consultoria</a>')
    
    html = html.replace('<button class="footer-brand" type="button" data-route="home" aria-label="Voltar para o início da Onra">', '<a href="?area=home" class="footer-brand" data-route="home" aria-label="Voltar para o início da Onra">')
    html = html.replace('alt="Onra">\n        </button>', 'alt="Onra">\n        </a>')

    # 3. Remove styles
    html = html.replace(' style="margin: 2.5rem 0;"', '')
    html = html.replace(' style="margin-bottom: 0.25rem;"', '')
    html = html.replace(' style="margin-bottom: 0.75rem;"', '')
    html = html.replace(' style="max-width:32rem;"', '')
    html = html.replace(' style="margin-bottom: 3rem;"', '')
    html = html.replace(' style="max-width: 36rem; font-size: clamp(2rem, 3vw, 2.5rem);"', '')
    html = html.replace(' style="margin-bottom: 2rem; margin-top: 1rem;"', '')
    html = html.replace(' style="width: 100%; padding: 1rem; border-radius: 4px; border: 1px solid rgba(0,0,0,0.1); font-family: inherit; font-size: 1rem;"', ' class="form-input"')

    # 4. Tablist and Typo
    html = html.replace('<div class="shell solution-selector reveal" data-delay="80">', '<div class="shell solution-selector reveal" data-delay="80" role="tablist" aria-label="Soluções de consultoria">')
    html = html.replace('identifycar', 'identificar')

    # 5. Dialog ARIA
    html = html.replace('<dialog class="contact-dialog" id="contact-dialog" aria-labelledby="contact-title">', '<dialog class="contact-dialog" id="contact-dialog" aria-labelledby="contact-title" aria-describedby="contact-description">')
    
    # 6. Privacy Policy
    old_privacy = """<p>Esta versão demonstrativa não envia dados para servidores. Antes da publicação definitiva, o responsável técnico deverá inserir a política de privacidade, os dados da pessoa jurídica, os canais oficiais e a ferramenta de consentimento aplicável.</p>
      <p>Os formulários deste protótipo apenas preparam uma mensagem no dispositivo do visitante, conforme configuração em <code>js/config.js</code>.</p>"""
    new_privacy = """<p>Os dados fornecidos nos formulários deste site (como Nome, WhatsApp, Situação de Interesse e Mensagem) são coletados exclusivamente para viabilizar o nosso contato, compreender o seu momento e direcionar o atendimento mais adequado. Estas informações são transmitidas de forma segura e armazenadas em nosso sistema de gestão interna, não sendo comercializadas ou compartilhadas com terceiros sem sua autorização, exceto quando estritamente exigido por lei.</p>"""
    html = html.replace(old_privacy, new_privacy)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

if __name__ == "__main__":
    main()
