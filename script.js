/* ==========================================================================
   ONE PIECE CREW SHOWCASE - INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initPreloader();
    initScrollSpy();
    initSpotlightTracking();
    initMobileNav();
    initParticles();
});

/* ==========================================================================
   SIMULATED PRELOADER & LOADING BAR
   ========================================================================== */
function initPreloader() {
    const loader = document.getElementById("loader");
    const fill = document.querySelector(".loader-bar-fill");
    const status = document.querySelector(".loader-status");
    
    const loadingPhases = [
        { progress: 20, text: "Unfurling the sails..." },
        { progress: 45, text: "Navigating the Grand Line..." },
        { progress: 70, text: "Recruiting the swordsman..." },
        { progress: 90, text: "Preparing the Thousand Sunny..." },
        { progress: 100, text: "Ready to set sail!" }
    ];
    
    let currentPhaseIdx = 0;
    let currentProgress = 0;
    
    // Simulate loading progress
    const interval = setInterval(() => {
        if (currentPhaseIdx < loadingPhases.length) {
            const phase = loadingPhases[currentPhaseIdx];
            if (currentProgress < phase.progress) {
                currentProgress += Math.floor(Math.random() * 5) + 2;
                if (currentProgress > phase.progress) currentProgress = phase.progress;
                
                fill.style.width = `${currentProgress}%`;
                status.textContent = phase.text;
            } else {
                currentPhaseIdx++;
            }
        } else {
            clearInterval(interval);
            // Hide loading screen
            setTimeout(() => {
                loader.classList.add("loaded");
            }, 300);
        }
    }, 60);

    // Backup to ensure loader is hidden regardless of timing
    window.addEventListener("load", () => {
        clearInterval(interval);
        fill.style.width = "100%";
        status.textContent = "Ready to set sail!";
        setTimeout(() => {
            loader.classList.add("loaded");
        }, 500);
    });
}

/* ==========================================================================
   SPOTLIGHT TRACKING ENGINE WITH INTERPOLATION (LERP)
   ========================================================================== */
function initSpotlightTracking() {
    const sections = document.querySelectorAll(".crew-section");
    
    // Structure to store tracking states for each section
    const trackingStates = new Map();
    
    sections.forEach(section => {
        // Initialize state
        trackingStates.set(section, {
            targetX: 50,
            targetY: 50,
            currentX: 50,
            currentY: 50,
            isHovered: false
        });
        
        // Mouse Move event
        section.addEventListener("mousemove", (e) => {
            updateTargetCoordinates(e, section);
        });
        
        // Touch Move event for mobile/tablet tracking
        section.addEventListener("touchmove", (e) => {
            // Prevent scrolling when dragging fingers on sections to allow smooth tracking
            if (e.touches.length > 0) {
                updateTargetCoordinates(e.touches[0], section);
            }
        }, { passive: true });
        
        // Mouse Enter / Touch Start
        const setHoverTrue = () => {
            const state = trackingStates.get(section);
            if (state) state.isHovered = true;
        };
        section.addEventListener("mouseenter", setHoverTrue);
        section.addEventListener("touchstart", setHoverTrue, { passive: true });
        
        // Mouse Leave / Touch End
        const resetToCenter = () => {
            const state = trackingStates.get(section);
            if (state) {
                state.isHovered = false;
                state.targetX = 50;
                state.targetY = 50;
            }
        };
        section.addEventListener("mouseleave", resetToCenter);
        section.addEventListener("touchend", resetToCenter);
    });
    
    // Calculate relative percentage coordinates
    function updateTargetCoordinates(event, section) {
        const state = trackingStates.get(section);
        if (!state) return;
        
        const rect = section.getBoundingClientRect();
        const rawX = event.clientX - rect.left;
        const rawY = event.clientY - rect.top;
        
        // Convert to percentage
        state.targetX = (rawX / rect.width) * 100;
        state.targetY = (rawY / rect.height) * 100;
    }
    
    // Animation Loop for Smooth Lerping (Linear Interpolation)
    function animateSpotlights() {
        let needsUpdate = false;
        
        sections.forEach(section => {
            const state = trackingStates.get(section);
            if (!state) return;
            
            // Difference between current and target
            const dx = state.targetX - state.currentX;
            const dy = state.targetY - state.currentY;
            
            // If there is still a noticeable difference, update
            if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
                // Lerp formula: Current = Current + (Target - Current) * EaseFactor
                // A factor of 0.08 yields a buttery smooth, organic trail
                state.currentX += dx * 0.08;
                state.currentY += dy * 0.08;
                
                section.style.setProperty("--mouse-x", `${state.currentX}%`);
                section.style.setProperty("--mouse-y", `${state.currentY}%`);
                needsUpdate = true;
            }
        });
        
        requestAnimationFrame(animateSpotlights);
    }
    
    // Kick off animation loop
    animateSpotlights();
}

/* ==========================================================================
   SCROLL SPY & PROGRESS INDICATOR
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll(".scroll-container > section");
    const navItems = document.querySelectorAll(".sidebar .nav-item");
    const scrollProgress = document.getElementById("scroll-progress");
    const scrollContainer = document.querySelector(".scroll-container");
    
    // Intersection Observer to detect current active section
    const observerOptions = {
        root: scrollContainer,
        rootMargin: "0px",
        threshold: 0.5 // Section is active when at least 50% is visible
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.getAttribute("id");
                
                // Set active section class
                sections.forEach(sec => sec.classList.remove("active"));
                entry.target.classList.add("active");
                
                // Update navigation active state
                navItems.forEach(item => {
                    item.classList.remove("active");
                    if (item.getAttribute("data-target") === targetId) {
                        item.classList.add("active");
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
    
    // Scroll progress bar calculations
    scrollContainer.addEventListener("scroll", () => {
        const scrollTop = scrollContainer.scrollTop;
        const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        const percentage = (scrollTop / scrollHeight) * 100;
        
        scrollProgress.style.width = `${percentage}%`;
    });
    
    // Intercept navigation link click for smooth scrolling
    navItems.forEach(item => {
        const link = item.querySelector(".nav-link");
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = item.getAttribute("data-target");
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Scroll target element into view smoothly
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
                
                // Close sidebar on mobile if open
                const sidebar = document.querySelector(".sidebar");
                const toggleBtn = document.getElementById("sidebar-toggle-btn");
                if (sidebar.classList.contains("mobile-open")) {
                    sidebar.classList.remove("mobile-open");
                    toggleBtn.classList.remove("toggle-active");
                }
            }
        });
    });
    
    // Click on Hero scroll indicator
    const heroScrollIndicator = document.querySelector(".scroll-indicator");
    if (heroScrollIndicator) {
        heroScrollIndicator.addEventListener("click", () => {
            const firstCrewSection = document.querySelector(".crew-section");
            if (firstCrewSection) {
                firstCrewSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }
}

/* ==========================================================================
   MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileNav() {
    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.getElementById("sidebar-toggle-btn");
    
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            sidebar.classList.toggle("mobile-open");
            toggleBtn.classList.toggle("toggle-active");
        });
    }
    
    // Close mobile nav when clicking outside of it
    document.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target) && sidebar.classList.contains("mobile-open")) {
                sidebar.classList.remove("mobile-open");
                toggleBtn.classList.remove("toggle-active");
            }
        }
    });
}

/* ==========================================================================
   FLOATING CANVAS PARTICLE ENGINE (GLOWING EMBERS)
   ========================================================================== */
function initParticles() {
    const canvas = document.getElementById("particle-canvas");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let particles = [];
    
    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 100; // Start below screen
            this.size = Math.random() * 2 + 1; // Size 1px to 3px
            this.speedY = -(Math.random() * 0.8 + 0.4); // Floating upwards
            this.speedX = Math.random() * 0.4 - 0.2; // Small drift
            this.life = Math.random() * 1500 + 1000; // Lifetime in ticks
            this.maxLife = this.life;
            this.opacity = Math.random() * 0.5 + 0.1;
            
            // Randomly select gold or soft crimson hue
            this.colorType = Math.random() > 0.85 ? "crimson" : "gold";
            if (this.colorType === "gold") {
                this.r = 212; this.g = 175; this.b = 55; // #d4af37
            } else {
                this.r = 230; this.g = 57; this.b = 70; // #e63946
            }
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.life--;
            
            // Fade out near end of life
            this.opacity = (this.life / this.maxLife) * 0.6;
            
            // Reset if out of bounds or dead
            if (this.y < 0 || this.life <= 0 || this.x < 0 || this.x > canvas.width) {
                this.reset();
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.opacity})`;
            
            // Soft blur glow on particles
            ctx.shadowBlur = this.size * 2;
            ctx.shadowColor = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.opacity})`;
            
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadow for efficiency
        }
    }
    
    // Set sizing
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener("resize", () => {
        resizeCanvas();
        // Re-init particles to fit new scale
        createParticles();
    });
    
    function createParticles() {
        particles = [];
        // Cap count based on screen size for performance
        const density = window.innerWidth < 768 ? 40 : 100;
        for (let i = 0; i < density; i++) {
            particles.push(new Particle());
            // Pre-warm particle locations so they don't all start at bottom at load
            particles[i].y = Math.random() * canvas.height;
        }
    }
    
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        requestAnimationFrame(loop);
    }
    
    // Initial Setup
    resizeCanvas();
    createParticles();
    loop();
}
