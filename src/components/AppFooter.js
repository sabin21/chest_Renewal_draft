import footer1 from '../assets/footer_1.png'
import footer2 from '../assets/footer_2.png'

class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="footer-link-bar">
        <img src="${footer1}" alt="">
      </div>
      <div class="footer-body-wrap">
        <img src="${footer2}" class="img-full" alt="">
      </div>
    `;
  }
}

customElements.define('app-footer', AppFooter);
