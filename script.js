// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
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

// Sleep Calculator Function
function calculateSleep() {
    const age = parseInt(document.getElementById('age').value);
    const wakeTime = document.getElementById('wakeTime').value;
    const resultDiv = document.getElementById('calculatorResult');

    if (!age || !wakeTime) {
        alert('Mohon isi semua data!');
        return;
    }

    // Determine recommended sleep hours based on age
    let recommendedHours;
    let category;

    if (age < 1) {
        recommendedHours = 15.5;
        category = 'Bayi (0-1 tahun)';
    } else if (age < 3) {
        recommendedHours = 13;
        category = 'Balita (1-2 tahun)';
    } else if (age < 6) {
        recommendedHours = 11;
        category = 'Anak Prasekolah (3-5 tahun)';
    } else if (age < 13) {
        recommendedHours = 10;
        category = 'Anak Sekolah (6-12 tahun)';
    } else if (age < 18) {
        recommendedHours = 9;
        category = 'Remaja (13-17 tahun)';
    } else if (age < 65) {
        recommendedHours = 8;
        category = 'Dewasa (18-64 tahun)';
    } else {
        recommendedHours = 7.5;
        category = 'Lansia (65+ tahun)';
    }

    // Calculate bedtime
    const [wakeHour, wakeMinute] = wakeTime.split(':').map(Number);
    const wakeDate = new Date();
    wakeDate.setHours(wakeHour, wakeMinute, 0);

    const bedDate = new Date(wakeDate.getTime() - (recommendedHours * 60 * 60 * 1000));
    const bedHour = bedDate.getHours();
    const bedMinute = bedDate.getMinutes();

    const bedTimeString = `${bedHour.toString().padStart(2, '0')}:${bedMinute.toString().padStart(2, '0')}`;
    const wakeTimeString = `${wakeHour.toString().padStart(2, '0')}:${wakeMinute.toString().padStart(2, '0')}`;

    // Calculate sleep cycles (90 minutes each)
    const sleepCycles = Math.round(recommendedHours * 60 / 90);

    // Display results
    resultDiv.innerHTML = `
        <div class="result-content">
            <h3>Rekomendasi Waktu Tidur Anda</h3>
            <div class="result-info">
                <h4>Kategori Usia:</h4>
                <p>${category}</p>
            </div>
            <div class="result-info">
                <h4>Durasi Tidur yang Direkomendasikan:</h4>
                <p>${recommendedHours} jam</p>
            </div>
            <div class="result-info">
                <h4>Waktu Tidur Ideal:</h4>
                <p>${bedTimeString} WIB</p>
            </div>
            <div class="result-info">
                <h4>Waktu Bangun:</h4>
                <p>${wakeTimeString} WIB</p>
            </div>
            <div class="result-info">
                <h4>Siklus Tidur:</h4>
                <p>${sleepCycles} siklus (@ 90 menit)</p>
            </div>
            <p style="margin-top: 20px; font-size: 0.95rem; opacity: 0.9;">
                <i class="fas fa-info-circle"></i> Tidur terdiri dari siklus 90 menit. 
                Bangun di akhir siklus akan membuat Anda lebih segar!
            </p>
        </div>
    `;
}

// Contact Form Handler
function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Simulate form submission
    alert(`Terima kasih ${name}! Pesan Anda telah terkirim.\n\nKami akan menghubungi Anda melalui ${email} atau ${phone} secepatnya.`);
    
    // Reset form
    document.getElementById('contactForm').reset();
}

// Newsletter Form Handler
function handleNewsletter(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    
    alert(`Terima kasih! Anda telah berlangganan newsletter dengan email: ${email}`);
    
    event.target.reset();
}

// Scroll Animation (Optional - adds fade-in effect on scroll)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.durasi-card, .tip-card, .dampak-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});