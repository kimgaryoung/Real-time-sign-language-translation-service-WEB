// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Play button animation
const playButton = document.querySelector('.play-button');
if (playButton) {
    playButton.addEventListener('click', function() {
        alert('Video demo would play here');
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;

            // 1. 공통 동작: 일단 모든 요소를 화면에 보이게 위로 올림
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';

            // 2. [핵심] 오직 'pricing-card'인 경우에만 0.6초 뒤에 스타일을 풀어줌
            // (이유: 얘는 마우스 올리면 움직여야 하니까)
            if (target.classList.contains('pricing-card')) {
                setTimeout(() => {
                    target.style.transform = ''; 
                    target.style.transition = ''; 
                }, 600);
            }
            
            // 주의: usecase-card나 다른 애들은 절대 풀어주면 안 됩니다!
            // 풀어주는 순간 CSS 원래 설정(투명/아래)으로 돌아가서 튕기게 됩니다.

            // 감시 해제
            observer.unobserve(target);
        }
    });
}, observerOptions);

// Apply scroll animation to elements
document.querySelectorAll('.feature-card, .usecase-card, .testimonial').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

document.querySelectorAll('.feature-card, .usecase-card, .testimonial, .pricing-card, .faq-item, .contact-form, .contact-info').forEach((el) => {
    // 초기 상태: 투명하고 아래로 50px 내려가 있음
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.6s ease-out';
    
    // 관찰 시작
    observer.observe(el);
});

// FAQ Accordion Functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close other open items (optional - remove this block if you want multiple open)
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            }
        });

        // Toggle current item
        item.classList.toggle('active');
        const answer = item.querySelector('.faq-answer');
        
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = null;
        }
    });
});

// Simple Form Submission Handler (Demo purpose)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('.submit-btn');
        const originalText = btn.innerText;
        
        btn.innerText = 'Sending...';
        btn.style.opacity = '0.7';
        
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you shortly.');
            this.reset();
            btn.innerText = originalText;
            btn.style.opacity = '1';
        }, 1500);
    });
}

