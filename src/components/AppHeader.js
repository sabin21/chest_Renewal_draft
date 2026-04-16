class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `

      <div class="util-bar">
        <div class="right-block">
          <img src="/src/assets/header_util_right.png" alt="">
        </div>  
      </div>
      <div class="gnb-bar">
        <div class="logo-wrap">
          <img src="/src/assets/logo_default.svg">
        </div>
        <div class="gnb-menu-wrap">
          <div class="inner-menu-bar">
            <a href="#" class="menu-item">캠페인</a>
            <a href="#" class="menu-item">기부</a>
            <a href="#" class="menu-item">나눔문화 활성화</a>
            <a href="#" class="menu-item">사랑의 열매</a>
          </div>
        </div>
        <div class="btn-gnb-burger">
        <div class="line-wrap">
          <span class="line line-1"></span>
          <span class="line line-2"></span>
          <span class="line line-3"></span>
        </div>
      </div>
      </div>
      
    `;

    this.querySelector('.btn-gnb-burger').addEventListener('click', (e) => {
      e.currentTarget.classList.toggle('active');
    });
  }
}

customElements.define('app-header', AppHeader);
