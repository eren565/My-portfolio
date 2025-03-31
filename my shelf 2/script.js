// Navigation Toggle (For Mobile)
function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

// Navigation Active Link Highlighting
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveNavLink() {
        let scrollPosition = window.scrollY;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                let currentId = section.getAttribute("id");

                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${currentId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", () => requestAnimationFrame(updateActiveNavLink));
});

// Typing Text Animation
const text = "IT Student | Developer | Innovator";
let index = 0;
let isDeleting = false;
const typingElement = document.getElementById("typing-text");

function typeEffect() {
    if (!typingElement) return; // Prevent errors if element is missing

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && index < text.length) {
        typingElement.textContent = text.substring(0, index + 1);
        index++;
    } else if (isDeleting && index > 0) {
        typingElement.textContent = text.substring(0, index - 1);
        index--;
    }

    if (index === text.length) {
        isDeleting = true;
        speed = 1000; // Pause before deleting
    } else if (index === 0) {
        isDeleting = false;
        speed = 500; // Pause before retyping
    }

    setTimeout(typeEffect, speed);
}

document.addEventListener("DOMContentLoaded", typeEffect);

// Image Animation (Triangle Effect)
const images = document.querySelectorAll(".anim-img");
const positions = [
    { x: 100, y: 0 },    
    { x: 200, y: 200 },  
    { x: 0, y: 200 }     
];

let imgIndex = 0;
let interval = null;

function animateImages() {
    images.forEach((img, i) => {
        let pos = positions[(imgIndex + i) % positions.length];
        img.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        img.style.transition = "transform 1s ease-in-out";
    });

    imgIndex = (imgIndex + 1) % positions.length;
}

// Observer for "About" Section Animation
const aboutSection = document.getElementById("about");

if (aboutSection) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!interval) {
                    animateImages(); 
                    interval = setInterval(animateImages, 1000);
                }
            } else {
                if (interval) { 
                    clearInterval(interval);
                    interval = null;
                }
            }
        });
    }, { threshold: 0.10 });

    observer.observe(aboutSection);
}

// graf

let currentProgress = 0;
function showChart(type, targetValue, color) {
    let container = document.getElementById("progress-container");
    let progressCircle = document.querySelector(".progress");
    let text = document.getElementById("progress-text");
    
    container.style.display = "flex";
    progressCircle.style.stroke = color;
    currentProgress = 0;
    let radius = progressCircle.r.baseVal.value;
    let circumference = 2 * Math.PI * radius;
    progressCircle.style.strokeDasharray = circumference;
    
    function animateProgress() {
        if (currentProgress < targetValue) {
            currentProgress += 1;
            let offset = circumference - (currentProgress / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
            text.textContent = currentProgress + "%";
            setTimeout(animateProgress, 20);
        }
    }
    animateProgress();
}