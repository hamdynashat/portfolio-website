// Theme Customization Menu
const themeMenuToggle = document.getElementById('theme-menu-toggle');
const themeMenu = document.getElementById('theme-menu');
const closeThemeMenu = document.getElementById('close-theme-menu');
const colorOptions = document.querySelectorAll('.color-option');
const floatingIconsToggle = document.getElementById('floating-icons-toggle');
const animationsToggle = document.getElementById('animations-toggle');
const floatingIcons = document.querySelector('.floating-icons');
const body = document.body;

// Check for saved preferences
const currentTheme = localStorage.getItem('theme') || 'dark';
const floatingIconsEnabled = localStorage.getItem('floating-icons') !== 'false';
const animationsEnabled = localStorage.getItem('animations') !== 'false';

// Apply saved preferences
body.setAttribute('data-theme', currentTheme);
floatingIconsToggle.checked = floatingIconsEnabled;
animationsToggle.checked = animationsEnabled;

if (!floatingIconsEnabled) {
    floatingIcons.classList.add('hidden');
}

if (!animationsEnabled) {
    body.classList.add('no-animations');
}

// Update active color option
updateActiveColorOption(currentTheme);

// Theme menu toggle
themeMenuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    themeMenu.classList.toggle('active');
});

// Close theme menu
closeThemeMenu.addEventListener('click', () => {
    themeMenu.classList.remove('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!themeMenu.contains(e.target) && !themeMenuToggle.contains(e.target)) {
        themeMenu.classList.remove('active');
    }
});

// Color theme options
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        const theme = option.getAttribute('data-theme');
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateActiveColorOption(theme);
    });
});

// Floating icons toggle
floatingIconsToggle.addEventListener('change', () => {
    const enabled = floatingIconsToggle.checked;
    localStorage.setItem('floating-icons', enabled);
    
    if (enabled) {
        floatingIcons.classList.remove('hidden');
    } else {
        floatingIcons.classList.add('hidden');
    }
});

// Animations toggle
animationsToggle.addEventListener('change', () => {
    const enabled = animationsToggle.checked;
    localStorage.setItem('animations', enabled);
    
    if (enabled) {
        body.classList.remove('no-animations');
    } else {
        body.classList.add('no-animations');
    }
});

function updateActiveColorOption(theme) {
    colorOptions.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-theme') === theme) {
            option.classList.add('active');
        }
    });
}

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Close menu when clicking outside
    if (navMenu.classList.contains('active')) {
        document.addEventListener('click', closeMenuOnOutsideClick);
    } else {
        document.removeEventListener('click', closeMenuOnOutsideClick);
    }
});

function closeMenuOnOutsideClick(event) {
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.removeEventListener('click', closeMenuOnOutsideClick);
    }
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.removeEventListener('click', closeMenuOnOutsideClick);
    });
});

// Smooth scrolling for navigation links with active state
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Remove active class from all nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Update active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const currentSectionElement = document.getElementById('current-section');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    // Update navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Update current section display
    if (currentSectionElement) {
        const sectionNames = {
            'home': 'Home',
            'about': 'About',
            'what-i-do': 'Services',
            'skills': 'Skills',
            'projects': 'Projects',
            'experience': 'Experience',
            'contact': 'Contact'
        };
        currentSectionElement.textContent = sectionNames[current] || 'Home';
    }
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentTheme = body.getAttribute('data-theme');
    
    if (window.scrollY > 100) {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 212, 255, 0.15), 0 0 0 1px rgba(0, 212, 255, 0.2)';
        } else {
            navbar.style.background = 'rgba(250, 248, 245, 0.95)';
            navbar.style.boxShadow = '0 8px 32px rgba(139, 115, 85, 0.2)';
        }
    } else {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(10, 10, 15, 0.85)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 212, 255, 0.1), 0 0 0 1px rgba(0, 212, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(250, 248, 245, 0.85)';
            navbar.style.boxShadow = '0 8px 32px rgba(139, 115, 85, 0.1)';
        }
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about, .what-i-do, .skills, .projects, .experience, .contact');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Initialize EmailJS (replace with your actual public key)
(function() {
    // Check if EmailJS is available and configured
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key
    }
})();

// Form submission handling with EmailJS
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Get submit button
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Prepare template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: 'hamdynashat125@gmail.com' // Your email
        };
        
        // Check if EmailJS is properly configured
        if (typeof emailjs === 'undefined' || 
            'YOUR_PUBLIC_KEY'.includes('YOUR_') || 
            'YOUR_SERVICE_ID'.includes('YOUR_')) {
            // Fallback: Open email client with pre-filled message
            const emailBody = `Hello Hamdy,\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\nBest regards,\n${name}`;
            const mailtoLink = `mailto:hamdynashat125@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
            
            window.open(mailtoLink);
            showNotification('Your email client will open with a pre-filled message. Please send it to complete your contact request.', 'info');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }
        
        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                // Fallback to mailto if EmailJS fails
                const emailBody = `Hello Hamdy,\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\nBest regards,\n${name}`;
                const mailtoLink = `mailto:hamdynashat125@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
                
                showNotification('Direct email sending failed. Opening your email client as backup...', 'info');
                setTimeout(() => {
                    window.open(mailtoLink);
                }, 1000);
            })
            .finally(function() {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText.replace(/<[^>]*>/g, ''), 50);
        }, 1000);
    }
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    aboutObserver.observe(aboutSection);
}

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth theme transitions
function smoothThemeTransition() {
    body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
}

// Enhanced theme toggle with smooth transitions
themeToggleBtn.addEventListener('click', () => {
    smoothThemeTransition();
});

// Add neon glow effects on hover for dark theme
document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        addNeonEffects();
    }
});

function addNeonEffects() {
    // Add neon effects to interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .social-link, .nav-link, .project-card, .service-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 212, 255, 0.3), 0 0 60px rgba(0, 212, 255, 0.1)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.boxShadow = '';
        });
    });
}

// Update neon effects when theme changes
themeToggleBtn.addEventListener('click', () => {
    setTimeout(() => {
        const currentTheme = body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            addNeonEffects();
        } else {
            // Remove neon effects for light theme
            const interactiveElements = document.querySelectorAll('.btn, .social-link, .nav-link, .project-card, .service-card');
            interactiveElements.forEach(element => {
                element.style.boxShadow = '';
            });
        }
    }, 300);
});

// Add typing effect to hero description
function typeDescription() {
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        const text = heroDescription.textContent;
        heroDescription.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                heroDescription.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 30);
    }
}

// Initialize description typing after title
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        typeDescription();
    }, 2000);
});

// Add scroll-based animations
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add smooth reveal animations for sections
const revealElements = document.querySelectorAll('.skill-category, .project-card, .service-card, .experience-item, .education-item, .cert-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
    revealObserver.observe(element);
});

// Add floating animation to profile image
document.addEventListener('DOMContentLoaded', () => {
    const profileImage = document.querySelector('.profile-image img, .profile-placeholder');
    if (profileImage) {
        setInterval(() => {
            profileImage.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                profileImage.style.transform = 'translateY(0)';
            }, 2000);
        }, 4000);
    }
});

// Add particle effect for dark theme
function createParticles() {
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme !== 'dark') return;
    
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 212, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        hero.appendChild(particle);
    }
}

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles for dark theme
document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        createParticles();
    }
});

// Update particles when theme changes
themeToggleBtn.addEventListener('click', () => {
    setTimeout(() => {
        const currentTheme = body.getAttribute('data-theme');
        const existingParticles = document.querySelectorAll('.particle');
        existingParticles.forEach(particle => particle.remove());
        
        if (currentTheme === 'dark') {
            createParticles();
        }
    }, 300);
});