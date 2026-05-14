// Respect the user's reduced-motion preference for every animation below
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                block: 'start'
            });
        }
    });
});

// Reveal-on-scroll using IntersectionObserver (cheap, native, no scroll handler)
if (!prefersReducedMotion) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                obs.unobserve(entry.target); // stop watching once revealed — no rewrite battles
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });

    // Skip the hero — it's above the fold and should never be hidden
    document.querySelectorAll('section:not(.hero)').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
}

// Dynamic skill tags color randomizer on click — fun, harmless
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', function () {
        const colors = ['#FFE66D', '#00F5FF', '#FF66C4', '#CCFF00', '#B39DDB'];
        this.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    });
});

// Note: removed the old window.scroll parallax that fought the IntersectionObserver
//       transform on .hero (caused visible jitter, especially on mobile).
console.log('Portfolio loaded — Harjit Singh, Senior iOS Developer');
