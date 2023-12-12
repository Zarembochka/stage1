const slider = document.querySelector('.slider__inner');
const slides = Array.from(document.querySelectorAll('.slider__content'));
const progresses = Array.from(document.querySelectorAll('.progress__pagination'));
const btnArrowRight = document.querySelector('.arrow-right');
const btnArrowLeft = document.querySelector('.arrow-left');
const sliderWrapper = document.querySelector('.slider__wrapper');

let slideIndex = 0;
let progressTimer;
let isPaused = false;
let startTouchX = 0;
let endTouchX = 0;

const touchMoveForNextSlide = 50;

btnArrowRight.addEventListener('click', showNextSlide);
btnArrowLeft.addEventListener('click', showPreviousSlide);

sliderWrapper.addEventListener('mouseover', setSliderMousePause);
sliderWrapper.addEventListener('touchstart', setSliderTouchPause);
sliderWrapper.addEventListener('mouseout', removeSliderMousePause);
sliderWrapper.addEventListener('touchend', removeSliderTouchPause);

function setSliderMousePause() {
    isPaused = true;
}

function setSliderTouchPause(event) {
    event.preventDefault();
    setSliderMousePause();
    if (isPaused) {
        startTouchX = event.touches[0].clientX;
        sliderWrapper.addEventListener('touchmove', SliderTouchMove);
    }
}

function removeSliderMousePause() {
    isPaused = false;
}

function removeSliderTouchPause() {
    removeSliderMousePause();
    if (!isPaused) {
        sliderWrapper.removeEventListener('touchmove', SliderTouchMove);
        if (endTouchX !== 0) {
            checkShowAnotherSlide(startTouchX, endTouchX);
        }
        startTouchX = 0;
        endTouchX = 0;
    }
}

function SliderTouchMove(event) {
    if (isPaused) {
        endTouchX = event.touches[0].clientX;
    }
}

function checkShowAnotherSlide(startX, endX) {
    if (endX - startX >= touchMoveForNextSlide) {
        showPreviousSlide();
        //showNextSlide();
        return;
    }
    if (Math.abs(startX - endX) >= touchMoveForNextSlide) {
        showNextSlide();
        return;
    }
}

function showNextSlide() {
    slideIndex += 1;
    if (slideIndex > 2) {
        slideIndex = 0;
    }
    showSlide();
}

function showPreviousSlide() {
    slideIndex -= 1;
    if (slideIndex < 0) {
        slideIndex = 2;
    }
    showSlide();
}

function showSlide() {
    const activeSlide = document.querySelector('.slider__content-active');
    activeSlide.classList.remove('slider__content-active');
    slides.forEach((slide, index) => {
        if (index === slideIndex) {
            const slideWidth = slide.offsetWidth;
            slider.style.marginLeft = -slideIndex * 100 + '%';
            slide.classList.add('slider__content-active');
            fillProgress(slideIndex);
        }
    })
}

function fillProgress(index) {
    const activeProgress = document.querySelector('.progress__pagination-active');
    activeProgress.value = 0;
    activeProgress.classList.remove('progress__pagination-active');
    progresses[index].classList.add('progress__pagination-active');
    fillProgressByTime(progresses[index]);
}

function showProgress(element) {
    if (!isPaused) {
        element.value += 10;
        if (element.value === 500) {
            showNextSlide();
        }
    }
}

function fillProgressByTime(element) {
    clearInterval(progressTimer);
    progressTimer = setInterval(showProgress, 100, element);
}

fillProgressByTime(progresses[slideIndex]);