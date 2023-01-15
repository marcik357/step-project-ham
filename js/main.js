import { scrollBottom } from './modules/header.js';
import { tabs } from './modules/tabs.js';
import { filter } from './modules/filter.js';
import { slider } from './modules/slider.js';
import { gallery } from './modules/gallery.js';

scrollBottom();
tabs();
filter();
slider();
gallery();

document.querySelector('.footer__text--year').textContent = new Date().getFullYear();