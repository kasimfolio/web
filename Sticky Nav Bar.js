document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Set the default active link
    const defaultSection = document.querySelector('.nav-links a[href="#presentation"]');
    if (defaultSection) {
        defaultSection.classList.add('active');
    }
  
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default anchor behavior
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const offsetPosition = targetSection.offsetTop - 40; // Adjust the offset value as needed
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
  
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        let current = '';
  
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60 && pageYOffset < sectionTop + sectionHeight - 60) {
                current = section.getAttribute('id');
            }
        });

        // Handle the case when the page is scrolled to the bottom
        const lastSection = sections[sections.length - 1];
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
            current = lastSection.getAttribute('id');
        }
  
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});
