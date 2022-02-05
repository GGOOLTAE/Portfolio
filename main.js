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
        const scrollTo = document.querySelector(link);
        scrollTo.scrollIntoView({ behavior: 'smooth' });
    }
})

