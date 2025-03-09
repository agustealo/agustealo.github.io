/* Slider */
JekyllTwilight.slider = function () {
    const slides = [
        {
            image: 'images/slider-images/image01.jpg',
            title: `<div class="slide-content"><div class="content-intro">
                <img alt="October Offer" src="images/logo-feat.png" />
                <br /><h3>| Developer | Hybrid</h3></div></div>`
        }
    ];
    let currentSlide = 0;
    const slideContainer = document.getElementById('home-slider');
    const slideCaption = document.getElementById('slidecaption');

    if (!slideContainer || !slideCaption) {
        console.warn("Slider elements not found.");
        return;
    }

    function showSlide() {
        slideContainer.style.backgroundImage = `url(${slides[currentSlide].image})`;
        slideCaption.innerHTML = slides[currentSlide].title;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide();
    }

    showSlide();
    setInterval(nextSlide, 12000);
};