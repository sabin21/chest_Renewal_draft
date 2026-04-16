import './styles/common.css'
import './styles/common_ui.css'
import './styles/type_c.css'
import './common_ui.js'
import './components/AppHeader.js'
import './components/AppFooter.js'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

document.addEventListener('DOMContentLoaded', () => {
  const allRows = [...document.querySelectorAll('.headline-row')]
  const baseWords = [...allRows[0].querySelectorAll('.word')]

  // row-2 이후는 텍스트 소스로만 사용, DOM에서 숨김
  allRows.slice(1).forEach(row => gsap.set(row, { display: 'none' }))

  // .word-text 자식이 있으면 그것의 텍스트, 없으면 word 전체 텍스트
  const getWordText = el => (el.querySelector('.word-text') || el).textContent.trim()

  // 하나라도 row-1과 다른 텍스트가 있는 word 인덱스 추출
  const diffIndices = baseWords.reduce((acc, w, i) => {
    const isDiff = allRows.slice(1).some(
      row => getWordText(row.querySelectorAll('.word')[i]) !== getWordText(w)
    )
    if (isDiff) acc.push(i)
    return acc
  }, [])

  // 모든 row의 텍스트 및 아이콘 src를 순서대로 수집
  const wordData = diffIndices.map(i => ({
    el: baseWords[i],
    textEl: baseWords[i].querySelector('.word-text') || baseWords[i],
    iconEl: baseWords[i].querySelector('.word-icon') || null,
    texts: allRows.map(row => getWordText(row.querySelectorAll('.word')[i])),
    icons: allRows.map(row => row.querySelectorAll('.word')[i].querySelector('.word-icon')?.src || null),
    current: 0,
    split: null,
  }))

  function createSplit(textEl) {
    return new SplitText(textEl, { type: 'chars' })
  }

  // 초기 SplitText (.word-text 만 분리)
  wordData.forEach(w => {
    w.split = createSplit(w.textEl)
  })

  function animateOut(onComplete) {
    // 너비 고정 → 텍스트 교체 중 flex 레이아웃 변화 차단
    wordData.forEach(w => {
      w.frozenWidth = w.el.offsetWidth
      gsap.set(w.el, { width: w.frozenWidth })
    })

    const tl = gsap.timeline({ onComplete })
    wordData.forEach((w, i) => {
      // 뒤 글자부터 하나씩 사라짐 (지우는 느낌)
      tl.to(w.split.chars, {
        autoAlpha: 0,
        duration: 0.06,
        ease: 'none',
        stagger: { each: 0.06, from: 'end' },
      }, i * 0.08)
    })
  }

  function animateIn(onComplete) {
    wordData.forEach(w => {
      w.current = (w.current + 1) % w.texts.length
      w.split.revert()
      w.textEl.textContent = w.texts[w.current]
      if (w.iconEl && w.icons[w.current]) w.iconEl.src = w.icons[w.current]

      // 새 텍스트의 자연 너비 측정
      gsap.set(w.el, { width: 'auto' })
      w.naturalWidth = w.el.offsetWidth
      gsap.set(w.el, { width: w.frozenWidth })

      w.split = createSplit(w.textEl)
      gsap.set(w.split.chars, { autoAlpha: 0 })
    })

    const tl = gsap.timeline({
      onComplete: () => {
        wordData.forEach(w => gsap.set(w.el, { clearProps: 'width' }))
        onComplete?.()
      },
    })

    wordData.forEach((w, i) => {
      const offset = i * 0.08
      // 너비 전환 → flex 전체 자연스럽게 이동
      tl.to(w.el, {
        width: w.naturalWidth,
        duration: 0.2,
        ease: 'power2.out',
      }, offset)
      // 앞 글자부터 하나씩 나타남 (타자 치는 느낌)
      tl.to(w.split.chars, {
        autoAlpha: 1,
        duration: 0.06,
        ease: 'none',
        stagger: { each: 0.06, from: 'start' },
      }, offset)
    })
  }

  function cycle() {
    animateOut(() => animateIn(() => gsap.delayedCall(4, cycle)))
  }

  gsap.delayedCall(4, cycle)
})


