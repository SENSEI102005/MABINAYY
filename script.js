// ========================================
// WANDERLUST TRAVEL - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // MOBILE NAVIGATION
    // ========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Change icon
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });
    
    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // ========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // DATE PICKER - SET MIN DATE
    // ========================================
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    checkinInput.setAttribute('min', today);
    checkoutInput.setAttribute('min', today);
    
    // Update checkout min date when checkin changes
    checkinInput.addEventListener('change', function() {
        const checkinDate = new Date(this.value);
        const nextDay = new Date(checkinDate);
        nextDay.setDate(nextDay.getDate() + 1);
        
        const minCheckout = nextDay.toISOString().split('T')[0];
        checkoutInput.setAttribute('min', minCheckout);
        
        // Reset checkout if it's before new min
        if (checkoutInput.value && checkoutInput.value < minCheckout) {
            checkoutInput.value = minCheckout;
        }
    });
    
    // ========================================
    // BOOKING BUTTONS FROM DESTINATIONS
    // ========================================
    const bookButtons = document.querySelectorAll('.btn-book');
    const destinationSelect = document.getElementById('destination');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const destination = this.getAttribute('data-destination');
            const price = this.getAttribute('data-price');
            
            // Set the destination in the booking form
            if (destinationSelect) {
                // Find the option that matches the destination
                const options = destinationSelect.querySelectorAll('option');
                options.forEach(option => {
                    if (option.value.includes(destination)) {
                        option.selected = true;
                    }
                });
                
                // Scroll to booking section
                const bookingSection = document.getElementById('booking');
                if (bookingSection) {
                    const offsetTop = bookingSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========================================
    // SERVICE INQUIRE BUTTONS
    // ========================================
    const inquireButtons = document.querySelectorAll('.btn-service');
    const serviceSelect = document.getElementById('service');
    
    inquireButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Find the parent service card and get the service name
            const card = this.closest('.service-card');
            const serviceName = card.querySelector('h3').textContent;
            
            // Set the service in the booking form
            if (serviceSelect) {
                const options = serviceSelect.querySelectorAll('option');
                options.forEach(option => {
                    if (option.value.toLowerCase().includes(serviceName.toLowerCase().split(' ')[0])) {
                        option.selected = true;
                    }
                });
                
                // Scroll to booking section
                const bookingSection = document.getElementById('booking');
                if (bookingSection) {
                    const offsetTop = bookingSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========================================
    // BOOKING FORM SUBMISSION
    // ========================================
    const bookingForm = document.getElementById('bookingForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close-modal');
    const btnModal = document.querySelector('.btn-modal');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Basic validation
            if (!data.destination || !data.service || !data.checkin || !data.checkout || 
                !data.guests || !data.package || !data.name || !data.email || !data.phone) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Validate dates
            const checkin = new Date(data.checkin);
            const checkout = new Date(data.checkout);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (checkin < today) {
                alert('Check-in date cannot be in the past.');
                return;
            }
            
            if (checkout <= checkin) {
                alert('Check-out date must be after check-in date.');
                return;
            }
            
            // Show success modal
            if (successModal) {
                successModal.classList.add('active');
                
                // Reset form
                bookingForm.reset();
            }
            
            // Log booking data (in real scenario, this would be sent to server)
            console.log('Booking submitted:', data);
            
            // Show confirmation message
            alert(`Thank you, ${data.name}! Your booking request for ${data.destination} has been submitted. We will contact you at ${data.email} shortly.`);
        });
    }
    
    // ========================================
    // MODAL FUNCTIONALITY
    // ========================================
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            successModal.classList.remove('active');
        });
    }
    
    if (btnModal) {
        btnModal.addEventListener('click', function() {
            successModal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal && successModal.classList.contains('active')) {
            successModal.classList.remove('active');
        }
    });
    
    // ========================================
    // SCROLL ANIMATIONS
    // ========================================
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .service-card, .destination-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial state for animated elements
    document.querySelectorAll('.feature-card, .service-card, .destination-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run on page load
    
    // ========================================
    // ACTIVE LINK HIGHLIGHTING
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a:not(.btn-nav)');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // ========================================
    // PACKAGE PRICE UPDATE
    // ========================================
    const packageSelect = document.getElementById('package');
    const destinationSelectBooking = document.getElementById('destination');
    
    function updatePriceDisplay() {
        if (!destinationSelectBooking || !packageSelect) return;
        
        const selectedOption = destinationSelectBooking.options[destinationSelectBooking.selectedIndex];
        const packageType = packageSelect.value;
        
        if (selectedOption && selectedOption.value) {
            // Extract base price from option text
            let basePrice = 0;
            const priceMatch = selectedOption.text.match(/\$(\d+)/);
            if (priceMatch) {
                basePrice = parseInt(priceMatch[1]);
                
                // Add package upgrade cost
                if (packageType === 'premium') {
                    basePrice += 200;
                } else if (packageType === 'luxury') {
                    basePrice += 500;
                }
                
                console.log(`Total price: $${basePrice}`);
            }
        }
    }
    
    if (packageSelect) {
        packageSelect.addEventListener('change', updatePriceDisplay);
    }
    
    if (destinationSelectBooking) {
        destinationSelectBooking.addEventListener('change', updatePriceDisplay);
    }
    
    // ========================================
    // IMAGE LAZY LOADING
    // ========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ========================================
    // FORM INPUT VALIDATION
    // ========================================
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = 'red';
                alert('Please enter a valid email address.');
            } else {
                this.style.borderColor = '#e0e0e0';
            }
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
            if (this.value && !phoneRegex.test(this.value)) {
                this.style.borderColor = 'red';
                alert('Please enter a valid phone number.');
            } else {
                this.style.borderColor = '#e0e0e0';
            }
        });
    }
    
    // ========================================
    // PREVENT FORM RESUBMISSION ON REFRESH
    // ========================================
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }
    
    console.log('Wanderlust Travel - Website initialized successfully!');
});
