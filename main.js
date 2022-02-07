'use strict'

// scroll 최상단일때 navbar 배경 투명화하고, scroll내리면 milkblue 색 적용하기
// + scroll 최상단일때 navbar__menu__item에 마우스 올리면, milkblue 적용하고, scroll내린상태로 마우스올리면 darkblue색 적용하기
const navbar = document.querySelector('#navbar');
const navbar__menu__item = document.querySelectorAll('.navbar__menu__item');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
        for (let i = 0; i < navbar__menu__item.length; i++) {
            navbar__menu__item.item(i).classList.add('navbar__menu__item--milk')
        }
    } else {
        navbar.classList.remove('navbar--dark');
        for (let i = 0; i < navbar__menu__item.length; i++) {
            navbar__menu__item.item(i).classList.remove('navbar__menu__item--milk')
        }
    }
});


//Navbar__menu 클릭시 scrolling기능 추가
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener('click', (event) => {
    const link = event.target.dataset.link; //html 태그에 data-link 속성을 추가하고, 이동해야할 태그의 id을 부여했다.
    if (link != null) {
        scrollIntoView(link);
    }
})

//Contact Me 클릭시 contact로 scrolling 기능 추가
const homeContactBtn = document.querySelector('.home__contact')
homeContactBtn.addEventListener('click', (event) => {
    scrollIntoView('#contact');
})

//Navbar__logo 클릭시 home으로 scrolling 기능
const navbarLogo = document.querySelector('.navbar__logo');
navbarLogo.addEventListener('click', (event) => {
    scrollIntoView('#home');
})



//scroll기능을 중복으로 사용하기 때문에, 함수를 통해 중복코드 방지 처리, 아래에 정의해놔도 hoisting된다.
//scrollIntoView라는 함수명이 중복되었지만, DOM요소에 정의되어있는 함수와는 별개이기 때문에, 무한루프이슈는 발생하지 않는다.
function scrollIntoView(selector) { //직접 정의한 함수
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' }); //DOM요소에 정의한 함수
}


//Scroll을 아래로 내렸을때 Home 컨텐츠를 투명화(css opacity:1->0)하기
const homeContainer = document.querySelector('.home__container');
const homeDOMRect = homeContainer.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    homeContainer.style.opacity = 1 - window.scrollY / homeDOMRect;
})

