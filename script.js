(() => {
  "use strict";

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isTouch = window.matchMedia("(hover: none)").matches;

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
    navToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };

  const isMenuOpen = () => !!navMenu && navMenu.classList.contains("active");

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
        const subject = encodeURIComponent(formData.get("_subject") || "Contacto via site");
        const body = encodeURIComponent(
          `Nome: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`,
        );
        window.location.href = `mailto:pixelminds26@gmail.com?subject=${subject}&body=${body}`;
        showNotification("A abrir a sua aplicação de email para enviar a mensagem.", "success");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="btn-text">A ENVIAR...</span>';

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        submitBtn.innerHTML = '<span class="btn-text">MENSAGEM ENVIADA!</span>';
        showNotification(
          "Mensagem enviada com sucesso! A PixelMinds responderá em breve.",
          "success",
        );
        contactForm.reset();
        resetButton(3000);
      } catch (err) {
        console.error("Erro ao enviar o formulário:", err);
        showNotification(
          "Não foi possível enviar a mensagem. Tente novamente ou contacte-nos por WhatsApp.",
          "error",
        );
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

  // ==================== DYNAMIC YEAR ====================
  const currentYear = String(new Date().getFullYear());
  document.querySelectorAll(".footer-bottom p").forEach((p) => {
    if (p.textContent.includes("2026")) {
      p.textContent = p.textContent.replace("2026", currentYear);
    }
  });
})();
