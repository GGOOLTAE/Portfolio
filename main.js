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
    navbarMenu.classList.remove('opened');
})

//navbar의 토글버튼(작은화면용) 클릭시 메뉴 나타나게 하기
const navbarToggleButton = document.querySelector('.navbar__toggle-btn');
navbarToggleButton.addEventListener('click', (e) => {
    navbarMenu.classList.toggle('opened');
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

//Scroll을 아래로 내렸을때 Home 컨텐츠를 투명화(css opacity:1->0)하기
const homeContainer = document.querySelector('.home__container');
const homeContainerHeight = homeContainer.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    homeContainer.style.opacity = 1 - window.scrollY / homeContainerHeight;
})

//Scroll을 아래로 내릴때 arrowUP 버튼을 불투명화(css opacity:0->1)하기
const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;
const arrowUp = document.querySelector('.arrowUp');
document.addEventListener('scroll', () => {
    if (window.scrollY > homeHeight / 2) {
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible');
    }
})

//arrowUp 클릭시 home으로 scrolling기능
arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
})


//Project 카테고리 클릭시, button의 data-filter값에 따라 프로젝트 data-type 필터링되게 하기
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (event) => {
    const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter // button내의 숫자인 span태그를 눌렀을경우, undefined가 뜨기 때문에, 부모노드인 버튼의 dataset-filter을 가져오려고 or을 사용함.
    if (filter == null) {
        return;
    }

    //기존 선택된 category버튼에서 selected 클래스 제거
    const selected = document.querySelector('.category__btn.selected');
    const target = (event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode);
    selected.classList.remove('selected');
    target.classList.add('selected');

    projectContainer.classList.add('animation-out');

    //setTimeout을 쓴이유는 2가지이다. (1) projectContainer.classList의 추가삭제시, opacity:1->0, 0->1 로 전환되는 사이에 시간을 주기위해.
    //                            (2) orkBtnContainer 클릭후, projectContainer이 투명화되기 전에, project의 투명도 설정이되는것을 방지하기위해.
    setTimeout(() => { // 
        projects.forEach((project) => {
            if (filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('animation-out');
    }, 300);

});




//scroll기능을 중복으로 사용하기 때문에, 함수를 통해 중복코드 방지 처리, 아래에 정의해놔도 함수선언식이므로, hoisting된다.
//scrollIntoView라는 함수명이 중복되었지만, DOM요소에 정의되어있는 함수와는 별개이기 때문에, 무한루프이슈는 발생하지 않는다.
function scrollIntoView(selector) { //직접 정의한 함수
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' }); //DOM요소에 정의한 함수
}


//[x] 1. 모든 섹션 요소들과 navBar메뉴아이템 들을 가지고 온다.
//[] 2. IntersectionObserver을 이용해서 모든 섹션을 관찰한다.
//[] 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화시킨다.
const sectionIds = ['#home', '#about', '#skills', '#work', '#testimonials', '#contact'];

const sections = sectionIds.map(id => document.querySelector(id));

const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}


const observerOption = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
}

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && entry.intersectionRatio > 0) { //요소가 화면 밖으로 나가는중일때,
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            if (entry.boundingClientRect.y < 0) { //아래로 스크롤링되어서 페이지가 올라옴
                selectedNavIndex = index + 1;
            } else {//위로 스크롤링되어서 페이지가 내려감
                selectedNavIndex = index - 1;
            }
        }
    })
}
const observer = new IntersectionObserver(observerCallback, observerOption);
sections.forEach(section => observer.observe(section));