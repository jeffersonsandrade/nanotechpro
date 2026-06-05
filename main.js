function sendWhatsApp(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const contact = form.contato.value;
    const email = form.email.value;
    const service = form.servico.value;
    const necessidade = form.necessidade.value;
    
    const message = `Olá, NanoTech Pro! Gostaria de solicitar uma avaliação técnica.%0A%0A*Nome:* ${name}%0A*Contato:* ${contact}%0A*E-mail:* ${email}%0A*Serviço:* ${service}%0A*Necessidade:* ${necessidade}`;
    
    // Redireciona para o WhatsApp
    window.open(`https://wa.me/5543991059128?text=${message}`, '_blank');
    
    // Reset e feedback visual
    form.reset();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Mensagem enviada! <i data-lucide="check" class="w-4 h-4 ml-2"></i>';
    lucide.createIcons();
    setTimeout(() => {
        btn.innerHTML = originalText;
    }, 3000);
}

// Initialize Icons
lucide.createIcons();

// --- Theme Toggle Logic ---
const themeToggles = document.querySelectorAll('#theme-toggle-desktop, #theme-toggle-mobile');

themeToggles.forEach(btn => {
    btn.addEventListener('click', function() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    });
});

// --- GSAP Initialization ---
gsap.registerPlugin(ScrollTrigger);

// Hero Animation
gsap.to(".gs-hero", {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out",
    delay: 0.2
});

// General Reveals
gsap.utils.toArray('.gs-reveal').forEach(function(elem) {
    gsap.to(elem, {
        y: 0,
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: elem,
            start: "top 85%",
        }
    });
});

// Cards Stagger Reveal
ScrollTrigger.batch(".gs-card", {
    start: "top 85%",
    onEnter: batch => gsap.to(batch, {
        opacity: 1, 
        y: 0, 
        stagger: 0.15, 
        duration: 1,
        ease: "power3.out"
    })
});

// Stats Counter Animation
const statsSection = document.getElementById('stats-section');
if (statsSection) {
    ScrollTrigger.create({
        trigger: statsSection,
        start: "top 85%",
        once: true,
        onEnter: () => {
            document.querySelectorAll('.stat-number').forEach(stat => {
                const target = +stat.getAttribute('data-target');
                const suffix = stat.getAttribute('data-suffix') || '';
                
                let obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 2,
                    ease: "power2.out",
                    onUpdate: function() {
                        stat.innerHTML = Math.floor(obj.val) + suffix;
                    }
                });
            });
        }
    });
}

// Process Timeline Animation
const tlProcess = gsap.timeline({
    scrollTrigger: {
        trigger: "#processo",
        start: "top 70%",
    }
});

tlProcess.fromTo("#processo .ring-2", {
    scale: 0,
    opacity: 0
}, {
    scale: 1,
    opacity: 1,
    stagger: 0.15,
    duration: 0.6,
    ease: "back.out(1.5)"
})
.fromTo("#processo p, #processo .text-xs", {
    y: 15,
    opacity: 0
}, {
    y: 0,
    opacity: 1,
    duration: 0.5,
    stagger: 0.05,
    ease: "power2.out"
}, "-=0.5");

// Mobile Menu Toggle
document.getElementById('mobile-menu-btn').addEventListener('click', function() {
    const nav = document.querySelector('nav').parentElement; // Seleciona a div wrapper
    const isHidden = nav.classList.contains('hidden');
    
    if(isHidden) {
        nav.classList.remove('hidden');
        nav.classList.add('flex', 'flex-col', 'absolute', 'top-full', 'left-0', 'w-full', 'bg-bgBase', 'border-b', 'border-borderColor', 'p-6', 'shadow-xl', 'max-h-[85vh]', 'overflow-y-auto');
        nav.querySelector('nav').classList.add('flex-col', 'items-start', 'w-full', 'mb-4');
        nav.querySelector('div').classList.remove('border-l', 'pl-6');
        nav.querySelector('div').classList.add('flex-col', 'w-full', 'items-start');
        
        nav.animate([
            { opacity: 0, transform: 'translateY(-15px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 300, easing: 'ease-out', fill: 'forwards' });
    } else {
        const animation = nav.animate([
            { opacity: 1, transform: 'translateY(0)' },
            { opacity: 0, transform: 'translateY(-15px)' }
        ], { duration: 250, easing: 'ease-in', fill: 'forwards' });
        
        animation.onfinish = () => {
            nav.classList.add('hidden');
            nav.classList.remove('flex', 'flex-col', 'absolute', 'top-full', 'left-0', 'w-full', 'bg-bgBase', 'border-b', 'border-borderColor', 'p-6', 'shadow-xl', 'max-h-[85vh]', 'overflow-y-auto');
            nav.querySelector('nav').classList.remove('flex-col', 'items-start', 'w-full', 'mb-4');
            nav.querySelector('div').classList.add('border-l', 'pl-6');
            nav.querySelector('div').classList.remove('flex-col', 'w-full', 'items-start');
        };
    }
});

// Auto-close mobile menu when a link or button is clicked
document.querySelectorAll('header a, header button').forEach(item => {
    item.addEventListener('click', () => {
        const btn = document.getElementById('mobile-menu-btn');
        // Ignore if clicking the menu toggle button itself or the theme toggle
        if (item !== btn && !item.closest('#mobile-menu-btn') && item.id !== 'theme-toggle-desktop' && window.innerWidth < 1024) {
            const nav = document.querySelector('header nav').parentElement;
            if (!nav.classList.contains('hidden')) {
                btn.click(); // Trigger the close animation
            }
        }
    });
});

// --- Cookie Banner Logic ---
document.addEventListener("DOMContentLoaded", () => {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const rejectBtn = document.getElementById('reject-cookies');
    const customizeBtn = document.getElementById('customize-cookies');
    const cookieOptions = document.getElementById('cookie-options');
    const savePrefsBtn = document.getElementById('save-cookie-prefs');
    const mainButtons = document.getElementById('cookie-main-buttons');

    // Expose function globally to open banner from footer
    window.openCookieBanner = () => {
        cookieBanner.style.display = 'flex';
        setTimeout(() => {
            cookieBanner.classList.remove('translate-y-32', 'opacity-0');
        }, 10);
        
        // Show options directly
        if(cookieOptions && mainButtons) {
            cookieOptions.classList.remove('hidden');
            cookieOptions.classList.add('flex');
            mainButtons.classList.add('hidden');
        }
    };

    if (!localStorage.getItem('cookie-consent')) {
        setTimeout(() => {
            cookieBanner.classList.remove('translate-y-32', 'opacity-0');
        }, 1000);
    } else {
        cookieBanner.style.display = 'none';
    }

    const closeBanner = (choice, details = null) => {
        localStorage.setItem('cookie-consent', choice);
        if(details) localStorage.setItem('cookie-details', JSON.stringify(details));
        cookieBanner.classList.add('translate-y-32', 'opacity-0');
        setTimeout(() => {
            cookieBanner.style.display = 'none';
        }, 700);
    };

    acceptBtn.addEventListener('click', () => closeBanner('accepted', { analytics: true, marketing: true }));
    rejectBtn.addEventListener('click', () => closeBanner('rejected', { analytics: false, marketing: false }));
    
    if(customizeBtn && cookieOptions && savePrefsBtn && mainButtons) {
        customizeBtn.addEventListener('click', () => {
            cookieOptions.classList.remove('hidden');
            cookieOptions.classList.add('flex');
            mainButtons.classList.add('hidden');
        });

        savePrefsBtn.addEventListener('click', () => {
            const analytics = document.getElementById('cookie-analytics').checked;
            const marketing = document.getElementById('cookie-marketing').checked;
            closeBanner('custom', { analytics, marketing });
        });
    }
});
