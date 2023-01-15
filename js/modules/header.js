export function scrollBottom() {
    // Change header size on scroll down
    window.addEventListener('scroll', headerChange);
    window.addEventListener('DOMContentLoaded', headerChange);
    function headerChange() {
        let header = document.querySelector('.header')
        if (window.scrollY > 10) {
            header.classList.add('header--small')
        } else {
            header.classList.remove('header--small')
        }
    };
    // ======================================================================================
    // Scroll to anchor
    const navMenu = document.querySelector('.nav');
    navMenu.addEventListener('click', function (e) {
        if (e.target.classList.contains('nav__link')) {
            let link = e.target;
            e.preventDefault();
            toggleMobileMenu();
            window.scrollTo({
                top: Math.floor(window.scrollY + document.querySelector(link.hash).getBoundingClientRect().top - parseFloat(window.getComputedStyle(navMenu.parentElement).height)),
                behavior: "smooth"
            });
        }
    });
    // ======================================================================================
    // Mobile menu
    const burger = document.querySelector('.burger');
    const headerNav = document.querySelector('.header__nav')
    // Toggle showing mobile menu
    burger.addEventListener('click', toggleMenu);
    function toggleMenu(e) {
        if (e.target.closest('.burger')) {
            toggleMobileMenu();
        }
    }
    // Toggle showing mobile menu, style burger icon, locking scroll
    function toggleMobileMenu() {
        headerNav.classList.toggle('menu-open');
        burger.classList.toggle('menu-open');
        document.body.classList.toggle('lock');
    }
    // Close mobile menu by click outside the menu
    document.querySelector('.wrapper').addEventListener('click', unlockBody);
    function unlockBody(e) {
        if (document.querySelector('.menu-open') && !e.target.closest('.burger')) {
            toggleMobileMenu();
        }
    }
}