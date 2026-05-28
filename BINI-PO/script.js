// Mobile Menu Toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// Close menu when clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// Smooth Scrolling with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Typing Animation
const texts = [
    "Front-End Developer",
    "Tech Club Leader",
    "Web Designer",
    "CS Student"
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);
    
    const typingElement = document.getElementById("typing-text");
    if (typingElement) {
        typingElement.textContent = letter;
    }
    
    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000);
    } else {
        setTimeout(type, 100);
    }
}

type();

// Contact Form Handler - Sends to tolosatolesa@gmail.com
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const name = document.getElementById("user-name").value;
        const email = document.getElementById("user-email").value;
        const subject = document.getElementById("user-subject").value;
        const message = document.getElementById("user-message").value;
        
        if (!name || !email || !subject || !message) {
            showStatus("Please fill in all fields", "error");
            return;
        }
        
        if (!email.includes("@") || !email.includes(".")) {
            showStatus("Please enter a valid email address", "error");
            return;
        }
        
        // Show loading
        const submitBtn = contactForm.querySelector("button");
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;
        
        // Simulate email sending (replace with actual EmailJS later)
        setTimeout(() => {
            showStatus(`✅ Thank you ${name}! I've received your message. I'll reply to ${email} within 24 hours.`, "success");
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            console.log("Message received:", { name, email, subject, message });
            console.log("Would be sent to: tolosatolesa@gmail.com");
        }, 1500);
    });
}

function showStatus(message, type) {
    if (formStatus) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        
        setTimeout(() => {
            formStatus.textContent = "";
            formStatus.className = "form-status";
        }, 5000);
    }
}

// Certificate Click Handler
document.querySelectorAll(".certificate-card").forEach((card) => {
    const certLink = card.querySelector(".cert-link");
    
    card.style.cursor = "pointer";
    card.addEventListener("click", (e) => {
        if (e.target.closest(".cert-link")) return;
        if (certLink) {
            window.open(certLink.href, "_blank");
        }
    });
});

// Scroll animations for skill bars
const skillSection = document.querySelector(".skills");
let animated = false;

function animateSkillBars() {
    if (animated) return;
    const bars = document.querySelectorAll(".skill-progress");
    bars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = "0";
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
    animated = true;
}

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
            animateSkillBars();
        }
    });
}, { threshold: 0.3 });

if (skillSection) {
    observer.observe(skillSection);
}

// Update footer year
const yearElement = document.querySelector(".footer-bottom p");
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace("2026", currentYear);
}

console.log("Portfolio ready! ✅");