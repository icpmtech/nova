    // Improved performance with data layer separation
    const translations = {
      en: {
        mainTitle: "Nova Hub",
        subtitle: "Explore Nova projects visually and quickly",
        sectionTitles: {
          "Finance Tools": "Finance Tools",
          "Search Platforms": "Search Platforms",
          "LLM Platforms": "LLM Platforms",
          "Analytics & More": "Analytics & More"
        },
        controls: {
          fullscreen: "Fullscreen",
          minimize: "Minimize"
        },
        errors: {
          loading: "Failed to load content",
          retry: "Retry"
        }
      },
      pt: {
        mainTitle: "Nova Hub",
        subtitle: "Explora os projetos Nova de forma visual e rápida",
        sectionTitles: {
          "Finance Tools": "Ferramentas Financeiras",
          "Search Platforms": "Plataformas de Busca",
          "LLM Platforms": "Plataformas LLM",
          "Analytics & More": "Análises e Mais"
        },
        controls: {
          fullscreen: "Tela Cheia",
          minimize: "Minimizar"
        },
        errors: {
          loading: "Falha ao carregar conteúdo",
          retry: "Tentar novamente"
        }
      },
      es: {
        mainTitle: "Nova Hub",
        subtitle: "Explora los proyectos Nova de forma visual y rápida",
        sectionTitles: {
          "Finance Tools": "Herramientas Financieras",
          "Search Platforms": "Plataformas de Búsqueda",
          "LLM Platforms": "Plataformas LLM",
          "Analytics & More": "Analíticas y Más"
        },
        controls: {
          fullscreen: "Pantalla Completa",
          minimize: "Minimizar"
        },
        errors: {
          loading: "Error al cargar contenido",
          retry: "Reintentar"
        }
      },
      fr: {
        mainTitle: "Nova Hub",
        subtitle: "Explorez les projets Nova visuellement et rapidement",
        sectionTitles: {
          "Finance Tools": "Outils Financiers",
          "Search Platforms": "Plateformes de Recherche",
          "LLM Platforms": "Plateformes LLM",
          "Analytics & More": "Analyses et Plus"
        },
        controls: {
          fullscreen: "Plein Écran",
          minimize: "Réduire"
        },
        errors: {
          loading: "Échec du chargement du contenu",
          retry: "Réessayer"
        }
      }
    };

    // Categories and sites data
    const categories = {
      "Finance Tools": [
        {
          title: "Nova Charts",
          url: "https://nova-charts.netlify.app/",
          description: "Interactive financial charts and analytics"
        },
        {
          title: "Nova Finance Hub",
          url: "https://nova-finance-hub.netlify.app/",
          description: "Comprehensive financial management tools"
        },
        {
          title: "Market Wallet",
          url: "https://market-wallet.netlify.app/",
          description: "Track and manage your investment portfolio"
        },
        {
          title: "Agent Finance Demo",
          url: "https://agent-finance-demo.netlify.app/",
          description: "AI-powered financial assistant"
        }
      ],
      "Search Platforms": [
        {
          title: "Nova Search Dividends - All",
          url: "https://nova-search-dividends.netlify.app/all.html",
          description: "Complete dividend information search"
        },
        {
          title: "Nova Search Dividends",
          url: "https://nova-search-dividends.netlify.app/",
          description: "Dividend-focused search platform"
        },
        {
          title: "Nova Search Stock",
          url: "https://nova-search-stock.netlify.app/",
          description: "Stock information search engine"
        },
        {
          title: "NovaSearch",
          url: "https://novasearch.app/",
          description: "Main search platform for Nova ecosystem"
        },
        {
          title: "NovaSearch Hub",
          url: "https://novasearch.app/hubsearch",
          description: "Centralized search hub for all Nova resources"
        }
      ],
      "LLM Platforms": [
        {
          title: "ChatGPT",
          url: "https://chat.openai.com",
          description: "OpenAI's conversational AI"
        },
        {
          title: "Google Gemini",
          url: "https://gemini.google.com",
          description: "Google's multimodal AI assistant"
        },
        {
          title: "Claude AI",
          url: "https://claude.ai",
          description: "Anthropic's helpful AI assistant"
        },
        {
          title: "Microsoft Copilot",
          url: "https://copilot.microsoft.com",
          description: "Microsoft's AI companion"
        },
        {
          title: "Perplexity AI",
          url: "https://perplexity.ai",
          description: "AI-powered search and answers"
        },
        {
          title: "Chat Cantinho",
          url: "https://chat-cantinho.vercel.app/",
          description: "Custom chat interface for Nova ecosystem"
        }
      ],
      "Analytics & More": [
        {
          title: "Market Analytics Hub",
          url: "https://marketanalyticshubapp.azurewebsites.net/",
          description: "Advanced market analytics and insights"
        },
        {
          title: "Cantinho de Net",
          url: "https://cantinhode.net/",
          description: "Community platform for Nova users"
        },
        {
          title: "Example Site",
          url: "https://example.com",
          description: "Demo site for testing purposes"
        },
        {
          title: "Wikipedia",
          url: "https://wikipedia.org",
          description: "Free online encyclopedia"
        },
        {
          title: "OpenAI",
          url: "https://openai.com",
          description: "AI research and deployment"
        },
        {
          title: "GitHub",
          url: "https://github.com",
          description: "Code hosting platform"
        }
      ]
    };

    // DOM elements
    const content = document.getElementById("content");
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menuToggle");
    const scrollTop = document.getElementById("scrollTop");
    const overlay = document.getElementById("overlay");
    const loading = document.getElementById("loading");
    const navLinks = document.querySelectorAll(".nav-icon");
    const langButtons = document.querySelectorAll(".language-btn");

    // Current language
    let currentLang = "pt";

    // Safe storage implementation with improved error handling
    const safeStorage = {
      data: {},
      getItem: function(key) {
        try {
          return localStorage.getItem(key);
        } catch (e) {
          console.warn("LocalStorage access failed:", e);
          return this.data[key] || null;
        }
      },
      setItem: function(key, value) {
        try {
          localStorage.setItem(key, value);
        } catch (e) {
          console.warn("LocalStorage write failed:", e);
          this.data[key] = value;
        }
      }
    };

    // Function to update language tooltips with better accessibility
    function updateTooltips(lang) {
      navLinks.forEach(link => {
        const tooltipAttr = `data-tooltip-${lang}`;
        if (link.hasAttribute(tooltipAttr)) {
          link.setAttribute("data-tooltip", link.getAttribute(tooltipAttr));
          // Update aria-label for accessibility
          link.setAttribute("aria-label", link.getAttribute(tooltipAttr));
        }
      });
    }

    // Function to change language with improved transitions
    function changeLanguage(lang) {
      // Don't proceed if same language selected
      if (lang === currentLang) return;

      currentLang = lang;

      // Update active button and ARIA states
      langButtons.forEach(btn => {
        const isActive = btn.dataset.lang === lang;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", isActive);
      });

      // Update header text with fade effect
      const mainTitle = document.getElementById("main-title");
      const subtitle = document.getElementById("subtitle");

      // Fade out
      mainTitle.style.opacity = "0";
      subtitle.style.opacity = "0";

      setTimeout(() => {
        // Update text
        mainTitle.textContent = translations[lang].mainTitle;
        subtitle.textContent = translations[lang].subtitle;

        // Fade in
        mainTitle.style.opacity = "1";
        subtitle.style.opacity = "1";
      }, 200);

      // Update tooltips
      updateTooltips(lang);

      // Update section titles
      Object.keys(categories).forEach(category => {
        const sectionId = category.toLowerCase().replace(/\s+/g, "-");
        const sectionTitle = document.getElementById(sectionId);
        if (sectionTitle) {
          sectionTitle.textContent = translations[lang].sectionTitles[category];
        }
      });

      // Update control buttons
      document.querySelectorAll(".controls button").forEach(button => {
        const isFullscreen = button.textContent === "Fullscreen" ||
                           button.textContent === "Tela Cheia" ||
                           button.textContent === "Pantalla Completa" ||
                           button.textContent === "Plein Écran";

        if (isFullscreen) {
          button.textContent = translations[lang].controls.fullscreen;
        } else {
          button.textContent = translations[lang].controls.minimize;
        }
      });

      // Store language preference with safe storage
      safeStorage.setItem("novaagg-lang", lang);

      // Update HTML lang attribute
      document.documentElement.lang = lang;
    }

    // Language switcher event listeners with improved handling
    langButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        changeLanguage(btn.dataset.lang);
      });
    });

    // Mobile menu toggle with improved animation
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active");
      document.body.classList.toggle("sidebar-open");

      // Update aria-expanded state
      const isExpanded = sidebar.classList.contains("active");
      menuToggle.setAttribute("aria-expanded", isExpanded);
    });

    // Improved navigation handling for accessibility
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 640) {
          sidebar.classList.remove("active");
          document.body.classList.remove("sidebar-open");
          menuToggle.setAttribute("aria-expanded", "false");
        }

        // Update active state for all links
        navLinks.forEach(nav => nav.classList.remove("active"));
        link.classList.add("active");

        // Update aria-current for accessibility
        navLinks.forEach(nav => nav.removeAttribute("aria-current"));
        link.setAttribute("aria-current", "page");
      });
    });

    // Optimized frame creation with lazy loading
    function createFrame(site, category) {
      const frame = document.createElement("div");
      frame.className = "frame";
      frame.setAttribute("data-category", category);

      // Accessible controls
      const controls = document.createElement("div");
      controls.className = "controls";
      controls.setAttribute("aria-label", "Frame controls");

      const btnFull = document.createElement("button");
      btnFull.textContent = translations[currentLang].controls.fullscreen;
      btnFull.setAttribute("aria-label", `View ${site.title} in fullscreen`);
      btnFull.onclick = (e) => {
        e.preventDefault();
        frame.classList.add("fullscreen");
        overlay.classList.add("active");
        // Ensure iframe is loaded when going fullscreen
        const iframe = frame.querySelector('iframe');
        if (iframe && iframe.dataset.src) {
          iframe.src = iframe.dataset.src;
        }
        // Trap focus inside the fullscreen frame for accessibility
        frame.setAttribute("tabindex", "-1");
        frame.focus();
      };

      const btnMin = document.createElement("button");
      btnMin.textContent = translations[currentLang].controls.minimize;
      btnMin.setAttribute("aria-label", `Exit fullscreen for ${site.title}`);
      btnMin.onclick = (e) => {
        e.preventDefault();
        frame.classList.remove("fullscreen");
        overlay.classList.remove("active");
      };

      controls.appendChild(btnFull);
      controls.appendChild(btnMin);

      // Implement lazy loading for iframe
      const iframe = document.createElement("iframe");
      iframe.dataset.src = site.url; // Store URL but don't load yet
      iframe.loading = "lazy";
      iframe.title = site.title;
      iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms");
      iframe.setAttribute("aria-label", `${site.title} content`);

      // Add site title and description
      const siteTitle = document.createElement("div");
      siteTitle.className = "site-title";
      siteTitle.textContent = site.title;

      // Add description as tooltip
      if (site.description) {
        siteTitle.setAttribute("title", site.description);
        siteTitle.setAttribute("aria-label", `${site.title}: ${site.description}`);
      }

      // Assemble the frame
      frame.appendChild(controls);
      frame.appendChild(iframe);
      frame.appendChild(siteTitle);

      return frame;
    }

    // Generate content with improved structure and error handling
    function generateContent() {
      // Hide loading spinner when content is ready
      loading.style.display = "none";

      // Create sections with proper ARIA roles
      Object.entries(categories).forEach(([category, sites]) => {
        const anchorId = category.toLowerCase().replace(/\s+/g, "-");
        const section = document.createElement("section");
        section.setAttribute("aria-labelledby", anchorId);

        const title = document.createElement("h2");
        title.className = "section-title";
        title.id = anchorId;
        title.textContent = translations[currentLang].sectionTitles[category];

        const container = document.createElement("div");
        container.className = "container";
        container.setAttribute("role", "list");
        container.setAttribute("aria-label", translations[currentLang].sectionTitles[category]);

        // Create frames for each site
        sites.forEach(site => {
          const frame = createFrame(site, category);
          frame.setAttribute("role", "listitem");
          container.appendChild(frame);
        });

        section.appendChild(title);
        section.appendChild(container);
        content.appendChild(section);
      });

      // Initialize intersection observer for performance
      initObservers();
    }

    // Implementing debounced scroll handling for performance
    function debounce(func, wait) {
      let timeout;
      return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    }

    // Initialize all observers
    function initObservers() {
      // Lazy load images and iframes
      const lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const frame = entry.target;
            const iframe = frame.querySelector('iframe');

            // Load iframe when visible
            if (iframe && iframe.dataset.src && !iframe.src) {
              iframe.src = iframe.dataset.src;
            }

            // Stop observing once loaded
            lazyLoadObserver.unobserve(frame);
          }
        });
      }, {
        rootMargin: '100px', // Load a bit before they come into view
        threshold: 0.1
      });

      // Observe all frames
      document.querySelectorAll('.frame').forEach(frame => {
        lazyLoadObserver.observe(frame);
      });

      // Active section highlighting
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const sectionId = entry.target.querySelector('.section-title').id;

            // Update active navigation
            document.querySelectorAll('.nav-icon').forEach(link => {
              const isActive = link.getAttribute('href') === `#${sectionId}`;
              link.classList.toggle('active', isActive);

              if (isActive) {
                link.setAttribute('aria-current', 'page');
              } else {
                link.removeAttribute('aria-current');
              }
            });
          }
        });
      }, {
        threshold: [0.1, 0.3, 0.5],
        rootMargin: '-100px 0px -100px 0px'
      });

      // Observe all sections
      document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
      });
    }

    // Scroll to top button visibility with optimized handling
    const handleScroll = debounce(() => {
      const scrollPosition = window.scrollY;

      // Toggle scroll button visibility
      if (scrollPosition > 300) {
        scrollTop.classList.add("visible");
      } else {
        scrollTop.classList.remove("visible");
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);

    // Scroll to top button click handler with smooth animation
    scrollTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    // Improved overlay handler with keyboard support
    overlay.addEventListener("click", closeFullscreen);

    // Keyboard handler for fullscreen mode (ESC key)
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeFullscreen();
      }
    });

    function closeFullscreen() {
      const fullscreenFrame = document.querySelector(".frame.fullscreen");
      if (fullscreenFrame) {
        fullscreenFrame.classList.remove("fullscreen");
        overlay.classList.remove("active");
      }
    }

    // Check for saved language preference with safe storage
    const savedLang = safeStorage.getItem("novaagg-lang");
    if (savedLang && translations[savedLang]) {
      currentLang = savedLang;
    }

    // Initialize page with error handling
    document.addEventListener("DOMContentLoaded", () => {
      try {
        // Set active first nav item
        const firstNav = document.querySelector(".nav-icon");
        firstNav.classList.add("active");
        firstNav.setAttribute('aria-current', 'page');

        // Apply saved or default language
        changeLanguage(currentLang);

        // Generate content
        setTimeout(generateContent, 500);
      } catch (error) {
        console.error("Initialization error:", error);
        loading.innerHTML = `
          <div class="error-frame">
            <div class="error-icon">❌</div>
            <p>${translations[currentLang]?.errors?.loading || "Failed to load content"}</p>
            <button onclick="window.location.reload()" class="language-btn">
              ${translations[currentLang]?.errors?.retry || "Retry"}
            </button>
          </div>
        `;
      }
    });

    // Handle device theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      // Could be used to toggle between light/dark themes
      // Not implemented in this version
    });

    // Cleanup event listeners on unload to prevent memory leaks
    window.addEventListener("beforeunload", () => {
      window.removeEventListener("scroll", handleScroll);
    });
  
