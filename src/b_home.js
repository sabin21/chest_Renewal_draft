import './styles/common.css'
import './styles/common_ui.css'
import './styles/type_b.css'
import './common_ui.js'
import './components/AppHeader.js'
import './components/AppFooter.js'
import gsap from 'gsap'
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

new Swiper('.carousel-1', {
  modules: [Navigation, Pagination, Autoplay],
  loop: true,
  slidesPerView: 4.25,
  spaceBetween: 16,
  autoplay: {
    delay: 4000,
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
});

new Swiper('.carousel-2', {
  modules: [Navigation, Pagination, Autoplay],
  loop: true,
  slidesPerView: 4.5,
  spaceBetween: 8,
  autoplay: {
    delay: 4000,
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
})

// carousel-2 슬라이드 랜덤 기울기
// 원본 슬라이드에 랜덤 각도 부여
document.querySelectorAll('.carousel-2 .swiper-slide:not(.swiper-slide-duplicate)').forEach(slide => {
  const rot = +((Math.random() * 16 - 8).toFixed(2))
  slide.dataset.rotation = rot
  gsap.set(slide, { rotation: rot, transformOrigin: 'center center' })
})

// 루프 복제 슬라이드에 원본과 동일한 각도 적용
document.querySelectorAll('.carousel-2 .swiper-slide-duplicate').forEach(clone => {
  const original = document.querySelector(
    `.carousel-2 .swiper-slide:not(.swiper-slide-duplicate)[data-swiper-slide-index="${clone.dataset.swiperSlideIndex}"]`
  )
  if (!original) return
  clone.dataset.rotation = original.dataset.rotation
  gsap.set(clone, { rotation: parseFloat(original.dataset.rotation), transformOrigin: 'center center' })
})

// hover: 기울기 제거 + scale 확대 + z-index 앞으로
document.querySelectorAll('.carousel-2 .swiper-slide').forEach(slide => {
  slide.addEventListener('mouseenter', () => {
    // slide.style.outline = '1px solid rgba(0,0,0,0.15)'
    gsap.to(slide, {
      rotation: 0,
      scale: 1.1,
      zIndex: 10,
      filter: 'drop-shadow(4px 6px 8px rgba(0,0,0,0.1))',
      duration: 0.3,
      ease: 'power2.out',
    })
  })
  slide.addEventListener('mouseleave', () => {
    slide.style.outline = 'none'
    gsap.to(slide, {
      rotation: parseFloat(slide.dataset.rotation || 0),
      scale: 1,
      zIndex: 1,
      filter: 'drop-shadow(0px 0px 0px rgba(0,0,0,0))',
      duration: 0.3,
      ease: 'power2.out',
    })
  })
})
