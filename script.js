(() => {
  "use strict";

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isTouch = window.matchMedia("(hover: none)").matches;

  // ==================== I18N (TRADUÇÃO PRÓPRIA) ====================
  // Para adicionar um idioma: 1) copie o bloco "en" abaixo e traduza os valores;
  // 2) adicione um botão <button class="lang-btn" data-lang="xx">XX</button> no .lang-switch.
  const translations = {
    pt: {
    "meta.title": "PixelMinds - Soluções Digitais",
    "meta.description": "PixelMinds - Soluções digitais: design, desenvolvimento web, aplicações mobile e marketing digital em Lubango, Huíla, Angola.",
    "meta.title404": "Página não encontrada (404) - PixelMinds",
    "nav.aria": "Navegação principal",
    "nav.about": "SOBRE",
    "nav.projects": "PROJECTOS",
    "nav.services": "SERVIÇOS",
    "nav.contacts": "CONTACTOS",
    "hud.clients": "CLIENTES",
    "hud.years": "ANOS XP",
    "hero.badge": "A Aceitar Novos Projectos",
    "hero.title1": "ONDE IDEIAS SE TORNAM",
    "hero.title2": "REALIDADE DIGITAL",
    "hero.desc": "Na PixelMinds, transformamos ideias em experiências digitais extraordinárias através de um design inovador, desenvolvimento de ponta e estratégias criativas.",
    "stat.projects": "Projectos",
    "stat.clients": "Clientes",
    "stat.years": "Anos XP",
    "hero.services": "NOSSOS SERVIÇOS",
    "logo.alt": "Logótipo da PixelMinds",
    "about.tag": "QUEM SOMOS?",
    "about.title": "SOBRE A <span class=\"gradient-text\">PIXELMINDS</span>",
    "about.lead": "Somos uma agência digital focada em criar soluções que combinam <span class=\"text-highlight\">criatividade</span>, <span class=\"text-highlight\">tecnologia</span> e <span class=\"text-highlight\">estratégia</span>.",
    "about.body": "Com mais de 8 anos de experiência no mercado digital, a PixelMinds dedica-se a entregar projectos que não apenas atendem, mas superam as expectativas dos nossos clientes. A nossa equipa multidisciplinar trabalha com as tecnologias mais modernas e metodologias ágeis.",
    "feat.perf.title": "Performance Excepcional",
    "feat.perf.text": "Soluções optimizadas para máxima velocidade e eficiência, tudo isso para aumentar a sua produtividade.",
    "feat.design.title": "Design Inovador",
    "feat.design.text": "Interfaces modernas que encantam e convertem.",
    "feat.fast.title": "Resultados Rápidos",
    "feat.fast.text": "Profissionais capazes e dedicados, trabalhando arduamente para entregar resultados em prazo útil.",
    "panel.title": "NOSSAS ESPECIALIDADES",
    "web.dev": "Desenvolvimento Web",
    "proj.tag": "O QUE TEMOS PARA SI?",
    "proj.title": "PROJECTOS EM <span class=\"gradient-text\">DESTAQUE</span>",
    "rating4": "4 de 5 estrelas",
    "rating5": "5 de 5 estrelas",
    "proj.transport.alt": "Logótipo da app de transporte",
    "proj.mindgest.alt": "Logótipo do MindGest",
    "proj.websys": "SISTEMA WEB",
    "proj.transport.title": "App de Transporte",
    "proj.transport.text": "Aplicativo mobile para serviço de táxi e aluguer de viaturas com rastreamento em tempo real, pagamentos integrados e sistema de avaliações.",
    "proj.site.title": "Site Empresarial",
    "proj.site.text": "Website institucional com animações sofisticadas, CMS personalizado e optimização SEO completa.",
    "proj.erp.title": "Software de Gestão e Facturação",
    "proj.erp.text": "Sistema de gestão e facturação, moderno e profissional. Com certificação pela AGT.",
    "proj.view": "Ver Projecto",
    "proj.more": "Ver mais",
    "serv.tag": "O QUE FAZEMOS?",
    "serv.title": "NOSSOS <span class=\"gradient-text\">SERVIÇOS</span>",
    "serv.visual": "Identidade Visual",
    "diff.title": "Nossos Diferenciais",
    "diff.fast.title": "Entrega Rápida",
    "diff.fast.text": "Projectos dentro do prazo garantido.",
    "diff.results.title": "Foco em Resultados",
    "diff.results.text": "ROI comprovado em cada projecto.",
    "diff.quality.title": "Qualidade Premium",
    "diff.quality.text": "Padrões de excelência em tudo.",
    "diff.support.title": "Suporte Dedicado",
    "diff.support.text": "Atendimento personalizado 24/7.",
    "contact.tag": "FALE CONNOSCO",
    "contact.title": "VAMOS CRIAR <span class=\"gradient-text\">ALGO INCRÍVEL</span>",
    "contact.intro": "Pronto para transformar a sua ideia em realidade? A PixelMinds está aqui para criar soluções digitais que fazem a diferença. Entre em contacto e vamos conversar sobre o seu próximo projecto!",
    "contact.phone": "Telefone",
    "contact.location": "Localização",
    "contact.hoursLabel": "Horário de Trabalho",
    "contact.hours": "Segunda a Sexta-feira: 08:00 - 17:00",
    "contact.social": "Redes Sociais",
    "wa.href": "https://wa.me/244922577520?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20vossos%20servi%C3%A7os.",
    "form.name": "Nome Completo",
    "form.name.ph": "O seu nome",
    "form.email.ph": "seu@email.com",
    "form.subject": "Assunto",
    "form.subject.ph": "Sobre o que quer falar?",
    "form.message": "Mensagem",
    "form.message.ph": "Conte-nos sobre o seu projecto...",
    "form.send": "ENVIAR MENSAGEM",
    "footer.tagline": "Onde ideias se tornam realidade digital.",
    "footer.quick": "Links Rápidos",
    "link.about": "Sobre",
    "link.projects": "Projectos",
    "link.services": "Serviços",
    "link.contacts": "Contactos",
    "footer.software": "Desenvolvimento de Software",
    "footer.marketing": "Marketing Digital",
    "footer.sheets": "Automação com Planilhas",
    "footer.support": "Suporte Técnico & Manutenção",
    "footer.process": "Automatização de Processos",
    "footer.rights": "© {year} PixelMinds. Todos os direitos reservados.",
    "footer.built": "Desenvolvido com paixão e café.",
    "err.title": "Página não encontrada",
    "err.text": "Ups! A página que procura não existe, foi movida ou o endereço foi escrito incorrectamente. Mas não se preocupe, ajudamos a encontrar o caminho de volta.",
    "err.home": "VOLTAR AO INÍCIO",
    "err.contact": "FALAR CONNOSCO",
    "err.visit": "Ou visite uma destas páginas:",
    "err.links.aria": "Ligações úteis",
    "js.menuOpen": "Abrir menu",
    "js.menuClose": "Fechar menu",
    "js.mailDefaultSubject": "Contacto via site",
    "js.mailName": "Nome",
    "js.mailEmail": "Email",
    "js.mailtoOpen": "A abrir a sua aplicação de email para enviar a mensagem.",
    "js.sending": "A ENVIAR...",
    "js.sent": "MENSAGEM ENVIADA!",
    "js.sentOk": "Mensagem enviada com sucesso! A PixelMinds responderá em breve.",
    "js.sendError": "Não foi possível enviar a mensagem. Tente novamente ou contacte-nos por WhatsApp.",
    },
    en: {
    "meta.title": "PixelMinds - Digital Solutions",
    "meta.description": "PixelMinds - Digital solutions: design, web development, mobile apps and digital marketing in Lubango, Huíla, Angola.",
    "meta.title404": "Page not found (404) - PixelMinds",
    "nav.aria": "Main navigation",
    "nav.about": "ABOUT",
    "nav.projects": "PROJECTS",
    "nav.services": "SERVICES",
    "nav.contacts": "CONTACTS",
    "hud.clients": "CLIENTS",
    "hud.years": "YEARS XP",
    "hero.badge": "Accepting New Projects",
    "hero.title1": "WHERE IDEAS BECOME",
    "hero.title2": "DIGITAL REALITY",
    "hero.desc": "At PixelMinds, we turn ideas into extraordinary digital experiences through innovative design, cutting-edge development and creative strategies.",
    "stat.projects": "Projects",
    "stat.clients": "Clients",
    "stat.years": "Years XP",
    "hero.services": "OUR SERVICES",
    "logo.alt": "PixelMinds logo",
    "about.tag": "WHO ARE WE?",
    "about.title": "ABOUT <span class=\"gradient-text\">PIXELMINDS</span>",
    "about.lead": "We are a digital agency focused on creating solutions that combine <span class=\"text-highlight\">creativity</span>, <span class=\"text-highlight\">technology</span> and <span class=\"text-highlight\">strategy</span>.",
    "about.body": "With over 8 years of experience in the digital market, PixelMinds is dedicated to delivering projects that not only meet but exceed our clients' expectations. Our multidisciplinary team works with the latest technologies and agile methodologies.",
    "feat.perf.title": "Exceptional Performance",
    "feat.perf.text": "Solutions optimised for maximum speed and efficiency, all to boost your productivity.",
    "feat.design.title": "Innovative Design",
    "feat.design.text": "Modern interfaces that delight and convert.",
    "feat.fast.title": "Fast Results",
    "feat.fast.text": "Capable, dedicated professionals working hard to deliver results on time.",
    "panel.title": "OUR SPECIALTIES",
    "web.dev": "Web Development",
    "proj.tag": "WHAT WE HAVE FOR YOU",
    "proj.title": "FEATURED <span class=\"gradient-text\">PROJECTS</span>",
    "rating4": "4 out of 5 stars",
    "rating5": "5 out of 5 stars",
    "proj.transport.alt": "Transport app logo",
    "proj.mindgest.alt": "MindGest logo",
    "proj.websys": "WEB SYSTEM",
    "proj.transport.title": "Transport App",
    "proj.transport.text": "Mobile app for taxi and car rental services with real-time tracking, integrated payments and a rating system.",
    "proj.site.title": "Corporate Website",
    "proj.site.text": "Institutional website with sophisticated animations, custom CMS and complete SEO optimisation.",
    "proj.erp.title": "Management and Invoicing Software",
    "proj.erp.text": "Modern, professional management and invoicing system. AGT-certified.",
    "proj.view": "View Project",
    "proj.more": "See more",
    "serv.tag": "WHAT WE DO",
    "serv.title": "OUR <span class=\"gradient-text\">SERVICES</span>",
    "serv.visual": "Visual Identity",
    "diff.title": "Our Differentiators",
    "diff.fast.title": "Fast Delivery",
    "diff.fast.text": "Projects delivered on time, guaranteed.",
    "diff.results.title": "Results-Driven",
    "diff.results.text": "Proven ROI on every project.",
    "diff.quality.title": "Premium Quality",
    "diff.quality.text": "Standards of excellence in everything.",
    "diff.support.title": "Dedicated Support",
    "diff.support.text": "Personalised support 24/7.",
    "contact.tag": "GET IN TOUCH",
    "contact.title": "LET'S CREATE <span class=\"gradient-text\">SOMETHING AMAZING</span>",
    "contact.intro": "Ready to turn your idea into reality? PixelMinds is here to create digital solutions that make a difference. Get in touch and let's talk about your next project!",
    "contact.phone": "Phone",
    "contact.location": "Location",
    "contact.hoursLabel": "Working Hours",
    "contact.hours": "Monday to Friday: 08:00 - 17:00",
    "contact.social": "Social Media",
    "wa.href": "https://wa.me/244922577520?text=Hello%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services.",
    "form.name": "Full Name",
    "form.name.ph": "Your name",
    "form.email.ph": "you@email.com",
    "form.subject": "Subject",
    "form.subject.ph": "What would you like to talk about?",
    "form.message": "Message",
    "form.message.ph": "Tell us about your project...",
    "form.send": "SEND MESSAGE",
    "footer.tagline": "Where ideas become digital reality.",
    "footer.quick": "Quick Links",
    "link.about": "About",
    "link.projects": "Projects",
    "link.services": "Services",
    "link.contacts": "Contacts",
    "footer.software": "Software Development",
    "footer.marketing": "Digital Marketing",
    "footer.sheets": "Spreadsheet Automation",
    "footer.support": "Technical Support &amp; Maintenance",
    "footer.process": "Process Automation",
    "footer.rights": "© {year} PixelMinds. All rights reserved.",
    "footer.built": "Built with passion and coffee.",
    "err.title": "Page not found",
    "err.text": "Oops! The page you are looking for doesn't exist, has been moved or the address was typed incorrectly. Don't worry, we'll help you find your way back.",
    "err.home": "BACK TO HOME",
    "err.contact": "TALK TO US",
    "err.visit": "Or visit one of these pages:",
    "err.links.aria": "Useful links",
    "js.menuOpen": "Open menu",
    "js.menuClose": "Close menu",
    "js.mailDefaultSubject": "Contact via website",
    "js.mailName": "Name",
    "js.mailEmail": "Email",
    "js.mailtoOpen": "Opening your email app to send the message.",
    "js.sending": "SENDING...",
    "js.sent": "MESSAGE SENT!",
    "js.sentOk": "Message sent successfully! PixelMinds will reply soon.",
    "js.sendError": "Could not send your message. Please try again or contact us on WhatsApp.",
    },
  };

  const DEFAULT_LANG = "pt";
  const I18N_ATTRS = ["placeholder", "aria-label", "alt", "content", "href"];
  let currentLang = DEFAULT_LANG;

  const t = (key) => {
    const dict = translations[currentLang] || {};
    if (key in dict) return dict[key];
    return key in translations[DEFAULT_LANG] ? translations[DEFAULT_LANG][key] : key;
  };

  const applyTranslations = () => {
    const year = String(new Date().getFullYear());
    const fill = (key) => t(key).replace("{year}", year);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = fill(el.getAttribute("data-i18n"));
    });

    // innerHTML: só com textos definidos neste ficheiro (nunca com dados do utilizador)
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = fill(el.getAttribute("data-i18n-html"));
    });

    I18N_ATTRS.forEach((attr) => {
      document.querySelectorAll(`[data-i18n-${attr}]`).forEach((el) => {
        el.setAttribute(attr, fill(el.getAttribute(`data-i18n-${attr}`)));
      });
    });
  };

  const setLang = (lang, persist = true) => {
    if (!translations[lang]) lang = DEFAULT_LANG;
    currentLang = lang;
    document.documentElement.lang = lang;

    applyTranslations();

    document.querySelectorAll("[data-lang]").forEach((btn) => {
      const active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    if (persist) {
      try {
        localStorage.setItem("lang", lang);
      } catch (_) {
        /* modo privado / storage bloqueado */
      }
    }

    document.dispatchEvent(new CustomEvent("site-languagechange", { detail: { lang } }));
  };

  const detectLang = () => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved && translations[saved]) return saved;
    } catch (_) {
      /* ignora */
    }
    const browser = (navigator.language || DEFAULT_LANG).slice(0, 2).toLowerCase();
    return translations[browser] ? browser : DEFAULT_LANG;
  };

  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
  });

  setLang(detectLang(), false);

  // ==================== PARTICLE SYSTEM ====================
  const canvas = document.getElementById("particles");

  if (canvas && !reducedMotion) {
    const ctx = canvas.getContext("2d");
    const isSmall = window.innerWidth < 768;
    const PARTICLE_COUNT = isSmall ? 35 : 90;
    const LINK_DISTANCE = isSmall ? 80 : 100;
    const LINK_DISTANCE_SQ = LINK_DISTANCE * LINK_DISTANCE;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(0, 217, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.update();
        p.draw();
      }

      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < LINK_DISTANCE_SQ) {
            const distance = Math.sqrt(distSq);
            ctx.strokeStyle = `rgba(0, 217, 255, ${0.1 * (1 - distance / LINK_DISTANCE)})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 150);
    });
  }

  // ==================== NAVIGATION ====================
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  const setMenu = (open) => {
    if (!navToggle || !navMenu) return;
    navMenu.classList.toggle("active", open);
    navToggle.classList.toggle("active", open);
    navToggle.setAttribute("aria-expanded", String(open));
    updateToggleLabel();
  };

  const isMenuOpen = () => !!navMenu && navMenu.classList.contains("active");

  const updateToggleLabel = () => {
    if (navToggle) {
      navToggle.setAttribute("aria-label", t(isMenuOpen() ? "js.menuClose" : "js.menuOpen"));
    }
  };
  updateToggleLabel();
  document.addEventListener("site-languagechange", updateToggleLabel);

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => setMenu(!isMenuOpen()));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isMenuOpen()) {
        setMenu(false);
        navToggle.focus();
      }
    });

    // Fecha o menu ao tocar fora dele
    document.addEventListener("click", (e) => {
      if (isMenuOpen() && !navbar.contains(e.target)) setMenu(false);
    });

    // Fecha o menu ao passar para o layout de desktop
    window.matchMedia("(min-width: 1025px)").addEventListener("change", (e) => {
      if (e.matches) setMenu(false);
    });
  }

  // Smooth scroll (ignora href="#" vazio, que fazia querySelector("#") lançar erro)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") {
        e.preventDefault();
        return;
      }

      let target = null;
      try {
        target = document.querySelector(href);
      } catch (_) {
        return;
      }
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
      history.replaceState(null, "", href);
      setMenu(false);
    });
  });

  // Link activo conforme a secção visível (scroll spy)
  const sections = document.querySelectorAll("section[id]");
  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((section) => spy.observe(section));
  }

  // Navbar: sombra + esconder ao descer (um único listener, throttled com rAF)
  let lastScroll = 0;
  let ticking = false;

  const onScroll = () => {
    const current = Math.max(window.scrollY, 0);

    navbar.classList.toggle("scrolled", current > 0);

    if (!isMenuOpen() && Math.abs(current - lastScroll) > 6) {
      navbar.classList.toggle(
        "nav-hidden",
        current > lastScroll && current > 200,
      );
      lastScroll = current;
    } else if (current <= 0) {
      navbar.classList.remove("nav-hidden");
      lastScroll = 0;
    }

    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true },
  );
  onScroll();

  // ==================== COUNTER ANIMATION ====================
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute("data-target"), 10) || 0;

    if (reducedMotion) {
      element.textContent = target;
      return;
    }

    const duration = 2000;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      element.textContent = Math.floor(progress * target);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        element.textContent = target;
      }
    };

    requestAnimationFrame(tick);
  };

  // ==================== REVEAL ON SCROLL ====================
  // Usa classes CSS (e não estilos inline) para não bloquear os efeitos :hover.
  const revealElements = document.querySelectorAll(
    ".stat-number, .project-card, .skill-category, .achievement-badge, .feature-item",
  );

  const reveal = (el) => {
    el.classList.add("is-visible");
    if (el.classList.contains("stat-number")) animateCounter(el);
  };

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    revealElements.forEach((el) => {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(reveal);
  }

  // ==================== PROGRESS BARS ====================
  const fillBars = (panel) => {
    panel.querySelectorAll(".progress-fill").forEach((fill) => {
      const progress = fill.getAttribute("data-progress");
      setTimeout(() => {
        fill.style.width = `${progress}%`;
      }, 100);
    });
  };

  const statsPanel = document.querySelector(".stats-panel");
  if (statsPanel) {
    if ("IntersectionObserver" in window) {
      const progressObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            fillBars(entry.target);
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.1 },
      );
      progressObserver.observe(statsPanel);
    } else {
      fillBars(statsPanel);
    }
  }

  // ==================== PROJECT CARDS (3D tilt só com rato) ====================
  if (!isTouch && !reducedMotion) {
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = (y - rect.height / 2) / 20;
        const rotateY = (rect.width / 2 - x) / 20;

        card.style.transform = `translateY(-10px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  // ==================== NOTIFICATION SYSTEM ====================
  const showNotification = (message, type = "success") => {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.setAttribute("role", type === "error" ? "alert" : "status");
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("closing");
      const remove = () => notification.remove();
      notification.addEventListener("animationend", remove, { once: true });
      setTimeout(remove, 700); // segurança (ex.: reduced motion)
    }, 4000);
  };

  // ==================== FORM HANDLING ====================
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;
      const endpoint = contactForm.getAttribute("action") || "";
      const formData = new FormData(contactForm);

      // Honeypot anti-spam: se preenchido, ignora silenciosamente
      if (formData.get("_gotcha")) return;

      const resetButton = (delay = 0) =>
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHTML;
        }, delay);

      // Enquanto o endpoint do Formspree for o placeholder ("seuID"),
      // usa mailto como alternativa funcional em vez de simular um envio.
      if (!endpoint || endpoint.includes("seuID")) {
        console.warn(
          "Formspree não configurado: substitua 'seuID' no atributo action do formulário.",
        );
        const subject = encodeURIComponent(formData.get("_subject") || t("js.mailDefaultSubject"));
        const body = encodeURIComponent(
          `${t("js.mailName")}: ${formData.get("name")}\n${t("js.mailEmail")}: ${formData.get("email")}\n\n${formData.get("message")}`,
        );
        window.location.href = `mailto:pixelminds26@gmail.com?subject=${subject}&body=${body}`;
        showNotification(t("js.mailtoOpen"), "success");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="btn-text">${t("js.sending")}</span>`;

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        submitBtn.innerHTML = `<span class="btn-text">${t("js.sent")}</span>`;
        showNotification(t("js.sentOk"), "success");
        contactForm.reset();
        resetButton(3000);
      } catch (err) {
        console.error("Erro ao enviar o formulário:", err);
        showNotification(t("js.sendError"), "error");
        resetButton();
      }
    });
  }

  // Efeito de foco nos campos (apenas com rato; no toque causava "saltos" com o teclado virtual)
  if (!isTouch && !reducedMotion) {
    document
      .querySelectorAll(".form-group input, .form-group textarea")
      .forEach((input) => {
        input.addEventListener("focus", () => {
          input.parentElement.style.transform = "translateY(-2px)";
        });
        input.addEventListener("blur", () => {
          input.parentElement.style.transform = "";
        });
      });
  }

  // ==================== CONSOLE MESSAGE ====================
  console.log(
    "%cPIXELMINDS",
    "font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #00D9FF, #7B2CBF); color: white; padding: 10px 20px; border-radius: 8px;",
  );
  console.log("%cSoluções Digitais", "font-size: 14px; color: #00F5A0;");
  console.log(
    "%cEntre em contacto: pixelminds26@gmail.com",
    "font-size: 12px; color: #00D9FF;",
  );

})();
