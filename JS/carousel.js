document.addEventListener("DOMContentLoaded", () => {
    const indexes = [];
    window.showSlide = (carouselIndex) => {
        const carousel = document.querySelectorAll(".carousel-images")[carouselIndex];
        if (!carousel) return;
        const total = carousel.querySelectorAll(".carousel-slide").length;
        if (!total) return;
        indexes[carouselIndex] = ((indexes[carouselIndex] || 0) + total) % total;
        carousel.style.transform = "translateX(" + (-indexes[carouselIndex] * 100) + "%)";
    };
    window.nextSlide = (index) => { indexes[index] = (indexes[index] || 0) + 1; window.showSlide(index); };
    window.prevSlide = (index) => { indexes[index] = (indexes[index] || 0) - 1; window.showSlide(index); };
});
