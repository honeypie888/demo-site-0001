import { featuresData, reviewsData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    

    lucide.createIcons();


    renderFeatures();
    

    renderReviews();


    initAnimations();


    window.addEventListener('scroll', handleScroll);
});

function renderFeatures() {
    const container = document.querySelector('#features .grid');
    
    featuresData.forEach((feature, index) => {
        const card = document.createElement('div');
        card.className = 'feature-card group bg-white p-8 rounded-2xl border border-brand-accent/30 hover:border-brand-primary/50 relative overflow-hidden reveal-up';
        
        card.innerHTML = `
            <div class="absolute top-0 right-0 w-32 h-32 bg-brand-cream rounded-bl-[100px] -mr-8 -mt-8 transition-all group-hover:bg-brand-primary/10"></div>
            
            <div class="w-14 h-14 bg-brand-dark text-brand-primary rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                <i data-lucide="${feature.icon}" class="w-7 h-7"></i>
            </div>
            
            <h3 class="font-serif text-2xl font-bold text-brand-dark mb-3 relative z-10">${feature.title}</h3>
            <p class="text-brand-muted leading-relaxed relative z-10">${feature.desc}</p>
        `;
        
        container.appendChild(card);
    });
    

    lucide.createIcons();
}

function renderReviews() {
    const container = document.getElementById('reviews-grid');
    const starsContainer = document.getElementById('stars-container');



    let starsHtml = '';
    for(let i=0; i<5; i++) {
        if (i < 4) starsHtml += `<i data-lucide="star" class="w-5 h-5 fill-brand-primary text-brand-primary"></i>`;
        else starsHtml += `<i data-lucide="star" class="w-5 h-5 text-brand-primary/40"></i>`;
    }
    starsContainer.innerHTML = starsHtml;

    reviewsData.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'bg-brand-cream p-8 rounded-xl reveal-up border border-transparent hover:border-brand-primary/20 transition-all';
        
        let reviewStars = '';
        for(let i=0; i<5; i++) {
            if(i < review.rating) reviewStars += `<i data-lucide="star" class="w-4 h-4 fill-brand-primary text-brand-primary"></i>`;
            else reviewStars += `<i data-lucide="star" class="w-4 h-4 text-gray-300"></i>`;
        }

        reviewCard.innerHTML = `
            <div class="flex items-center gap-1 mb-4">
                ${reviewStars}
            </div>
            <p class="text-brand-dark italic mb-6">"${review.text}"</p>
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-serif font-bold">
                    ${review.name.charAt(0)}
                </div>
                <div>
                    <h5 class="font-bold text-sm text-brand-dark">${review.name}</h5>
                    <span class="text-xs text-brand-muted">${review.date}</span>
                </div>
            </div>
        `;
        container.appendChild(reviewCard);
    });

    lucide.createIcons();
}

function handleScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');

    } else {
        navbar.classList.remove('nav-scrolled');
    }
}

function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);


    gsap.to('.hero-content', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
    });


    gsap.to('.parallax-bg', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
            trigger: 'header',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });


    gsap.utils.toArray('.feature-card').forEach((card, i) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });


    gsap.utils.toArray('#reviews-grid > div').forEach((card, i) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: '#reviews-grid',
                start: 'top 80%',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
}
