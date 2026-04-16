import './styles/common.css'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

import './styles/common_ui.css'
import './styles/type_a.css'
import './common_ui.js'
import './components/AppHeader.js'
import './components/AppFooter.js'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
gsap.registerPlugin(CSSPlugin)
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'

const heroImgWrap = document.querySelector('.hero-img-wrap');
const heroImgItems = document.querySelectorAll('.hero-img-item');
const TOTAL = heroImgItems.length;

// 대관람차 설정
const RADIUS = 700;          // 바퀴 반지름 (px)
const ACTIVE_ANGLE = 160;    // active 아이템이 위치할 각도 (180 = 좌측)
const SIZE_ACTIVE = 570;     // active 아이템 크기 (px)
const SIZE_DEFAULT = 350;    // 나머지 아이템 크기 (px)

function getWheelCenter() {
  return {
    x: heroImgWrap.offsetWidth / 2 + 180,
    y: heroImgWrap.offsetHeight * 0.5 - 200,
  };
}

function updateHeroImgActive(activeIndex, animate = true) {
  const { x: cx, y: cy } = getWheelCenter();
  const step = 360 / TOTAL;

  heroImgItems.forEach((item, i) => {
    const diff = (i - activeIndex + TOTAL) % TOTAL;
    const angleDeg = ACTIVE_ANGLE + diff * step;
    const rad = (angleDeg * Math.PI) / 180;
    const x = cx + RADIUS * Math.cos(rad);
    const y = cy + RADIUS * Math.sin(rad);
    const isActive = diff === 0;
    const size = isActive ? SIZE_ACTIVE : SIZE_DEFAULT;

    item.classList.toggle('active', isActive);

    if (animate) {
      gsap.to(item, { left: x, top: y, width: size, height: size, duration: 0.8, ease: 'power2.inOut' });
    } else {
      gsap.set(item, { left: x, top: y, width: size, height: size });
    }
  });
}

updateHeroImgActive(0, false);

new Swiper('.carousel-hero', {
  modules: [Navigation, Pagination, Autoplay, EffectFade],
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  loop: true,
  slidesPerView: 1,
  spaceBetween: 0,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
  on: {
    slideChange(swiper) {
      updateHeroImgActive(swiper.realIndex);
    },
  },
});

