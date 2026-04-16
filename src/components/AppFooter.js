class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="footer-link-bar">
        <img src="/src/assets/footer_1.png" alt="">
      </div>
      <div class="footer-body-wrap">
        <img src="/src/assets/footer_2.png" class="img-full" alt="">
      </div>
    `;
  }
}

customElements.define('app-footer', AppFooter);
