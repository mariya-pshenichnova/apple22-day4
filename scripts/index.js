import Swiper from '../lib/swiper-bundle.esm.browser.min';

//simplebar

new SimpleBar(document.querySelector('.country__list'), {
    classNames:{
        scrollbar: 'country__scrollbar',
        track: 'country__track'
    }
});




//slider

new Swiper('.goods__block', {
    slidesPerView: 1, 
    spaceBetween: 20,
    breakpoints: {
        320: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 24,
        },
        1440: {
            slidesPerView: 3,
            spaceBetween: 24,
        }
    },

    navigation: {
        prevEl: '.goods__arrow_prev',
        nextEl: '.goods__arrow_next'
    },
    preventClicks: true,
    a11y: false,
});

//modal

const productMore = document.querySelectorAll('.product__more');

const model = document.querySelector('.modal');

productMore.forEach((btn) => {
    btn.addEventListener('click', () => {modal.classList.add('modal_open')})
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('modal_open')
    }
});

const formPlaceholder = document.querySelector('.form__placeholder');
const formInput = document.querySelector('.form__input');

formInput.forEach((input, i) => {
    input.addEventListener('focus', () => {
        formPlaceholder[i].classList.add('form__placeholder_active')
    })

input.addEventListener('blur', () => {
    if (input.value === '') {
        formPlaceholder[i].classList.remove('form__placeholder_active')
    }
})
});




//price

const dataCurrency = {};

const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat('EU',{
        style: 'currency',
        currency,
        maximumFractionDigits: 2,
    }).format(value)
}


const showPrice = (currency = 'USD') => {
    const priceElems = document.querySelectorAll('[data-price');
    priceElems.forEach(elem => {
        elem.textContent = formatCurrency(elem.dataset.price * dataCurrency[currency], currency);
    })
}

const myHeaders = new Headers();
myHeaders.append("apikey", "Zy6FU4Kefc3gktAofQcwAEfogiSqpAnm");

const requestOption = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

fetch("https://api.apilayer.com/fixer/latest?base=USD", requestOption)
.then(response => response.json())
.then(result => {
    Object.assign(dataCurrency, result.rates)
    showPrice();
})
.catch(error => console.log('error', error));


//choices

const countryBtn = document.querySelector('.country__btn');
const countryWrapper = document.querySelector('.country__wrapper');

countryBtn.addEventListener('click', () => {
    countryWrapper.classList.add('country__wrapper_open')
});

countryWrapper.addEventListener('click', ({target}) => {
    if (target.classList.contains('country__choise')) {
        countryWrapper.classList.remove('country__wrapper_open');
        showPrice(target.dataset.currency);
    }
});