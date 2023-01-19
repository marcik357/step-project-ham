export function slider() {
    const btnPrev = document.querySelector('.slider__button--prev');
    const btnNext = document.querySelector('.slider__button--next');
    let sliderList = document.querySelector('.slider__list');
    let pagination = document.querySelector('.slider__pagination');
    let translateX = 0;
    // Add pagination dots with images
    Array.from(sliderList.children).forEach((slide,index) => {
        let imgSrc = slide.querySelector('.testimonial-item__img').getAttribute('src');
        let active;
        index === 0 ? active = 'slider__dot--active' : active = '';
        pagination.insertAdjacentHTML('beforeend', `
            <div data-dot='${index + 1}' class="slider__dot ${active}">
                <img class="slider__img-dot" src="${imgSrc}" alt="Hasan Ali">
            </div>
        `);
    })
    // Clone extreme slides
    let cloneLast = sliderList.children[sliderList.children.length - 1].cloneNode(true);
    let cloneFirst = sliderList.children[0].cloneNode(true);
    sliderList.prepend(cloneLast);
    sliderList.append(cloneFirst);
    // It's need to be here :)
    sliderList.style.translate = '0%';
    // Arrow buttons listeners
    btnPrev.addEventListener('click', showPrevSlide);
    btnNext.addEventListener('click', showNextSlide);
    // Show prev slide by click on arrow
    function showPrevSlide(e) {
        pagination.removeEventListener('click', showTestimonial);
        // Need to catch transition on extreme slide, need to be here :)
        let x = document.querySelector('.slider').getBoundingClientRect().x;
        let y = document.querySelector('.slider').getBoundingClientRect().y;
        if (e.target.closest('.slider__button--prev')) {
            let translate = setInterval(() => {
                sliderList.style.translate = `${translateX += 5}%`;
                btnPrev.disabled = true;
                if (translateX % 100 === 0) {
                    [...sliderList.children].forEach((slide, index) => {
                        if (Math.abs(parseInt(sliderList.style.translate) / 100 - 1) == index) {
                            activateDot(slide.dataset.slide);
                        }
                    })
                    clearInterval(translate);
                    setTimeout(() => {
                        btnPrev.disabled = null;
                        pagination.addEventListener('click', showTestimonial);
                    }, 200);
                }
            }, 20);
            if (parseInt(sliderList.style.translate) === 0) {
                translateX = parseInt(`-${sliderList.children.length - 2}00`);
            }
        }
    }
    // Show next slide by click on arrow
    function showNextSlide(e) {
        pagination.removeEventListener('click', showTestimonial);
        // Need to catch transition on extreme slide, need to be here :)
        let x = document.querySelector('.slider').getBoundingClientRect().x;
        let y = document.querySelector('.slider').getBoundingClientRect().y;
        if (e.target.closest('.slider__button--next')) {
            let translate = setInterval(() => {
                sliderList.style.translate = `${translateX -= 5}%`;
                btnNext.disabled = true;
                if (translateX % 100 === 0) {
                    [...sliderList.children].forEach((slide, index) => {
                        if (Math.abs(parseInt(sliderList.style.translate) / 100 - 1) == index) {
                            activateDot(slide.dataset.slide);
                            if (Math.abs(parseInt(sliderList.style.translate) / 100) == sliderList.children.length - 2) {
                                translateX = 0;
                                sliderList.style.translate = '0%';
                            }
                        }
                    })
                    clearInterval(translate);
                    setTimeout(() => {
                        btnNext.disabled = null;
                        pagination.addEventListener('click', showTestimonial);
                    }, 200);
                }
            }, 20);
        }
    }
    // ======================================================================================
    // Pagination part
    pagination.addEventListener('click', showTestimonial);
    // Toggle active pagination dot
    function activateDot(active) {
        Array.from(pagination.children).forEach(dot => {
            dot.dataset.dot === active ? dot.classList.add('slider__dot--active'): dot.classList.remove('slider__dot--active');
        })
    };
    // Show testimonial by click pagination dot
    function showTestimonial(e) {
        if (e.target.closest('.slider__img-dot')) {
            let offset;
            activateDot(e.target.closest('.slider__dot').dataset.dot);
            Array.from(pagination.children).forEach((dot, index) => {
                if (dot === e.target.closest('.slider__img-dot').parentElement) {
                    offset = -(index) * 100;
                }
            })
            if (offset > translateX) {
                let translate = setInterval(() => {
                    sliderList.style.translate = `${parseInt(sliderList.style.translate) + 5}%`;
                    btnPrev.disabled = true;
                    pagination.removeEventListener('click', showTestimonial);
                    if (parseInt(sliderList.style.translate) === offset) {
                        clearInterval(translate);
                        let stopClick = setTimeout(() => {
                            btnPrev.disabled = null;
                            pagination.addEventListener('click', showTestimonial);
                            clearTimeout(stopClick);
                        }, 200);
                    }
                }, 20);
            } else if (offset < translateX) {
                let translate = setInterval(() => {
                    sliderList.style.translate = `${parseInt(sliderList.style.translate) - 5}%`;
                    btnNext.disabled = true;
                    pagination.removeEventListener('click', showTestimonial);
                    if (parseInt(sliderList.style.translate) === offset) {
                        clearInterval(translate);
                        let stopClick = setTimeout(() => {
                            btnNext.disabled = null;
                            pagination.addEventListener('click', showTestimonial);
                            clearTimeout(stopClick);
                        }, 200);
                    }
                }, 20);
            }
            translateX = offset;
        }
    }
}