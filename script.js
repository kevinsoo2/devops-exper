// ===== DevOps Expert Academy - Main JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Preloader.init();
    Navigation.init();
    ThemeToggle.init();
    Particles.init();
    CounterAnimation.init();
    RoadmapFilter.init();
    ToolsFilter.init();
    Terminal.init();
    Testimonials.init();
    PricingToggle.init();
    ScrollReveal.init();
    ProgressBars.init();
    BackToTop.init();
    Newsletter.init();
});

// ===== Preloader =====
const Preloader = {
    init() {
        const preloader = document.getElementById('preloader');
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 1500);
        });
        // Fallback: hide after 3s max
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 3000);
    }
};

// ===== Navigation =====
const Navigation = {
    init() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');

        this.bindEvents();
        this.handleScroll();
    },

    bindEvents() {
        // Scroll effect
        window.addEventListener('scroll', () => this.handleScroll());

        // Hamburger menu
        this.hamburger.addEventListener('click', () => this.toggleMenu());

        // Close menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
                this.setActiveLink(link);
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                this.closeMenu();
            }
        });

        // Active link on scroll
        window.addEventListener('scroll', () => this.updateActiveLink());
    },

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    },

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    },

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    },

    setActiveLink(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    },

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
};


// ===== Theme Toggle =====
const ThemeToggle = {
    init() {
        this.btn = document.getElementById('theme-toggle');
        this.icon = this.btn.querySelector('i');
        
        // Check saved theme
        const savedTheme = localStorage.getItem('devops-theme') || 'dark';
        this.setTheme(savedTheme);
        
        this.btn.addEventListener('click', () => this.toggle());
    },

    toggle() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        this.setTheme(next);
        localStorage.setItem('devops-theme', next);
    },

    setTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            this.icon.className = 'fas fa-sun';
        } else {
            document.documentElement.removeAttribute('data-theme');
            this.icon.className = 'fas fa-moon';
        }
    }
};

// ===== Particles Background =====
const Particles = {
    init() {
        const container = document.getElementById('particles');
        if (!container) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            particle.style.width = (2 + Math.random() * 4) + 'px';
            particle.style.height = particle.style.width;
            
            // Random colors
            const colors = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#818cf8'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            container.appendChild(particle);
        }
    }
};

// ===== Counter Animation =====
const CounterAnimation = {
    init() {
        this.counters = document.querySelectorAll('.stat-number[data-target]');
        this.animated = false;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animated = true;
                    this.animateAll();
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => observer.observe(counter));
    },

    animateAll() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000;
            const start = 0;
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(start + (target - start) * eased);
                
                counter.textContent = current.toLocaleString('fr-FR');
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    // Add + suffix for large numbers
                    if (target >= 1000) {
                        counter.textContent = target.toLocaleString('fr-FR') + '+';
                    } else if (target === 95) {
                        counter.textContent = target + '%';
                    } else {
                        counter.textContent = target + '+';
                    }
                }
            };

            requestAnimationFrame(animate);
        });
    }
};


// ===== Roadmap Filter =====
const RoadmapFilter = {
    init() {
        this.filterBtns = document.querySelectorAll('.roadmap-filter .filter-btn');
        this.items = document.querySelectorAll('.roadmap-item');
        
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => this.filter(btn));
        });
    },

    filter(activeBtn) {
        // Update active button
        this.filterBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
        
        const filter = activeBtn.dataset.filter;
        
        this.items.forEach(item => {
            if (filter === 'all' || item.dataset.level === filter) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                item.classList.add('hidden');
            }
        });
    }
};

// ===== Tools Filter =====
const ToolsFilter = {
    init() {
        this.filterBtns = document.querySelectorAll('.tool-cat-btn');
        this.cards = document.querySelectorAll('.tool-card');
        
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => this.filter(btn));
        });
    },

    filter(activeBtn) {
        this.filterBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
        
        const category = activeBtn.dataset.category;
        
        this.cards.forEach((card, index) => {
            if (category === 'all' || card.dataset.category === category) {
                card.classList.remove('hidden');
                card.style.animation = `fadeInUp 0.4s ease ${index * 0.05}s forwards`;
            } else {
                card.classList.add('hidden');
            }
        });
    }
};

// ===== Interactive Terminal =====
const Terminal = {
    commands: {
        'docker ps': `CONTAINER ID   IMAGE          STATUS          PORTS                    NAMES
a1b2c3d4e5f6   nginx:latest   Up 2 hours      0.0.0.0:80->80/tcp       web-frontend
b2c3d4e5f6a1   redis:7        Up 2 hours      0.0.0.0:6379->6379/tcp   cache-redis
c3d4e5f6a1b2   postgres:15    Up 2 hours      0.0.0.0:5432->5432/tcp   db-postgres
d4e5f6a1b2c3   app:v2.1.0     Up 2 hours      0.0.0.0:3000->3000/tcp   api-backend`,
        
        'kubectl get pods': `NAME                          READY   STATUS    RESTARTS   AGE
frontend-6d8f9b7c4d-x2k9p    1/1     Running   0          4h
backend-api-5c4d3b2a1-m7n8    2/2     Running   0          4h
redis-cache-7e8f9a0b1-q3r4    1/1     Running   0          12h
postgres-db-0                  1/1     Running   0          2d
ingress-nginx-controller-abc   1/1     Running   0          7d`,
        
        'terraform plan': `Terraform will perform the following actions:

  # aws_instance.web will be created
  + resource "aws_instance" "web" {
      + ami           = "ami-0c55b159cbfafe1f0"
      + instance_type = "t3.medium"
      + tags = {
          + "Name" = "devops-expert-web"
          + "Env"  = "production"
        }
    }

Plan: 3 to add, 1 to change, 0 to destroy.`,
        
        'ansible-playbook deploy.yml': `PLAY [Deploy Application] ************************************

TASK [Gathering Facts] ***************************************
ok: [web-01]
ok: [web-02]
ok: [web-03]

TASK [Pull latest Docker image] ******************************
changed: [web-01]
changed: [web-02]
changed: [web-03]

TASK [Restart application service] ***************************
changed: [web-01]
changed: [web-02]
changed: [web-03]

PLAY RECAP ***************************************************
web-01: ok=3  changed=2  unreachable=0  failed=0
web-02: ok=3  changed=2  unreachable=0  failed=0
web-03: ok=3  changed=2  unreachable=0  failed=0`,
        
        'helm list': `NAME            NAMESPACE    REVISION  STATUS    CHART              APP VERSION
frontend        production   5         deployed  frontend-2.1.0     2.1.0
backend-api     production   8         deployed  backend-3.4.2      3.4.2
monitoring      monitoring   3         deployed  kube-prometheus-0.65.1  0.65.1
ingress-nginx   ingress      2         deployed  ingress-nginx-4.7.1    1.8.1
cert-manager    cert-mgr     1         deployed  cert-manager-1.12.3    1.12.3`
    },

    init() {
        this.body = document.getElementById('terminal-body');
        this.typedCommand = document.getElementById('typed-command');
        this.suggestions = document.querySelectorAll('.term-suggestion');
        this.isTyping = false;
        
        this.suggestions.forEach(btn => {
            btn.addEventListener('click', () => {
                if (!this.isTyping) {
                    this.executeCommand(btn.dataset.cmd);
                }
            });
        });

        // Auto-run first command after delay
        setTimeout(() => {
            this.executeCommand('docker ps');
        }, 2500);
    },

    async executeCommand(cmd) {
        if (this.isTyping) return;
        this.isTyping = true;
        
        // Clear previous output but keep prompt
        this.typedCommand.textContent = '';
        const oldOutputs = this.body.querySelectorAll('.terminal-output, .terminal-line:not(:last-child)');
        oldOutputs.forEach(el => el.remove());
        
        // Type command character by character
        for (let i = 0; i < cmd.length; i++) {
            this.typedCommand.textContent += cmd[i];
            await this.sleep(50 + Math.random() * 30);
        }
        
        await this.sleep(300);
        
        // Show output
        const output = document.createElement('div');
        output.className = 'terminal-output';
        output.textContent = this.commands[cmd] || 'Command not found';
        this.body.appendChild(output);
        
        // Add new prompt line
        const newLine = document.createElement('div');
        newLine.className = 'terminal-line';
        newLine.innerHTML = '<span class="prompt">$</span><span class="command" id="typed-command"></span><span class="cursor">|</span>';
        this.body.appendChild(newLine);
        this.typedCommand = newLine.querySelector('.command');
        
        this.isTyping = false;
    },

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};


// ===== Testimonials Slider =====
const Testimonials = {
    init() {
        this.cards = document.querySelectorAll('.testimonial-card');
        this.dots = document.querySelectorAll('.testimonial-dots .dot');
        this.currentIndex = 0;
        this.interval = null;
        
        if (this.cards.length === 0) return;
        
        // Dots click
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goTo(index));
        });
        
        // Auto-slide
        this.startAutoSlide();
    },

    goTo(index) {
        this.cards.forEach(card => card.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        this.currentIndex = index;
        this.cards[index].classList.add('active');
        this.dots[index].classList.add('active');
        
        // Reset auto-slide
        this.startAutoSlide();
    },

    next() {
        const nextIndex = (this.currentIndex + 1) % this.cards.length;
        this.goTo(nextIndex);
    },

    startAutoSlide() {
        if (this.interval) clearInterval(this.interval);
        this.interval = setInterval(() => this.next(), 5000);
    }
};

// ===== Pricing Toggle =====
const PricingToggle = {
    init() {
        this.toggle = document.getElementById('pricing-toggle');
        this.monthlyPrices = document.querySelectorAll('.price-amount.monthly');
        this.yearlyPrices = document.querySelectorAll('.price-amount.yearly');
        this.labels = document.querySelectorAll('.pricing-toggle > span');
        
        if (!this.toggle) return;
        
        this.toggle.addEventListener('change', () => this.update());
    },

    update() {
        const isYearly = this.toggle.checked;
        
        this.monthlyPrices.forEach(el => {
            el.style.display = isYearly ? 'none' : 'inline';
        });
        
        this.yearlyPrices.forEach(el => {
            el.style.display = isYearly ? 'inline' : 'none';
        });
        
        // Update active label
        this.labels.forEach(label => label.classList.remove('active'));
        this.labels[isYearly ? 1 : 0].classList.add('active');
    }
};

// ===== Scroll Reveal =====
const ScrollReveal = {
    init() {
        // Add reveal class to elements
        const elements = document.querySelectorAll(
            '.course-card, .tool-card, .lab-card, .cert-card, .blog-card, ' +
            '.community-stat, .lab-feature, .pricing-card, .section-header'
        );
        
        elements.forEach(el => el.classList.add('reveal'));
        
        // Observe
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Staggered animation for grid items
                    const siblings = entry.target.parentElement.querySelectorAll('.reveal');
                    siblings.forEach((sibling, index) => {
                        sibling.style.transitionDelay = `${index * 0.1}s`;
                    });
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        elements.forEach(el => observer.observe(el));
    }
};

// ===== Progress Bars =====
const ProgressBars = {
    init() {
        // Roadmap progress bars
        const progressBars = document.querySelectorAll('.progress-bar[data-progress]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const progress = bar.dataset.progress;
                    setTimeout(() => {
                        bar.style.width = progress + '%';
                    }, 300);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => observer.observe(bar));
        
        // Tool popularity bars
        const popularityBars = document.querySelectorAll('.popularity-bar[data-width]');
        
        const popObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    bar.style.setProperty('--bar-width', bar.dataset.width + '%');
                    bar.classList.add('animated');
                }
            });
        }, { threshold: 0.3 });

        popularityBars.forEach(bar => popObserver.observe(bar));
    }
};

// ===== Back to Top =====
const BackToTop = {
    init() {
        this.btn = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                this.btn.classList.add('visible');
            } else {
                this.btn.classList.remove('visible');
            }
        });
        
        this.btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
};

// ===== Newsletter Form =====
const Newsletter = {
    init() {
        const form = document.getElementById('newsletter-form');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            const btn = form.querySelector('button');
            
            // Simulate subscription
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Inscrit!';
                btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                input.value = '';
                
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-paper-plane"></i> S\'abonner';
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
};

// ===== Smooth Scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
    // Ctrl+K for search (placeholder)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Could open a search modal
        console.log('Search shortcut triggered');
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===== Parallax Effect on Hero =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    if (hero && window.scrollY < window.innerHeight) {
        const speed = 0.3;
        hero.style.transform = `translateY(${window.scrollY * speed}px)`;
        hero.style.opacity = 1 - (window.scrollY / window.innerHeight);
    }
});

// ===== Console Easter Egg =====
console.log('%c🚀 DevOps Expert Academy', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cBienvenue! Intéressé par le code source? Rejoignez notre communauté!', 'font-size: 14px; color: #06b6d4;');
console.log('%chttps://devops-expert.academy', 'font-size: 12px; color: #94a3b8;');
