document.addEventListener("DOMContentLoaded", () => {
    // --- Preloading & Image Sequence Logic ---
    const heroImg = document.getElementById("hero-canvas");
    if(heroImg) {
        const frameCount = 205;
        const currentFrame = index => (
            `public/images/ezgif-frame-${index.toString().padStart(3, '0')}.png`
        );

        const images = [];
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }

        const heroScroll = document.getElementById("hero-scroll");

        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop - heroScroll.offsetTop;
            const maxScrollTop = heroScroll.scrollHeight - window.innerHeight;
            
            if(scrollTop >= -window.innerHeight && scrollTop <= maxScrollTop + window.innerHeight) {
                const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScrollTop));
                const frameIndex = Math.min(
                    frameCount - 1,
                    Math.floor(scrollFraction * frameCount)
                );
    
                if (images[frameIndex]) {
                    requestAnimationFrame(() => {
                        heroImg.src = images[frameIndex].src;
                    });
                }
            }
        });
    }

    // Intersection Observer for fade-in elements
    const fadeElements = document.querySelectorAll(".fade-in");
    
    if (fadeElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Process section mobile adjustments
    const handleResize = () => {
        const connectors = document.querySelectorAll(".process-connector");
        if (window.innerWidth <= 768) {
            connectors.forEach(c => c.style.display = 'none'); // Optional: replace with vertical connectors in logic or CSS
        } else {
            connectors.forEach(c => c.style.display = 'block');
        }
    };
    
    // Initial check
    handleResize();
    window.addEventListener('resize', handleResize);
});
