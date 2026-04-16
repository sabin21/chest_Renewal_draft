import './styles/common.css'

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.btn-side-toggle');
    const sideNavWrap = document.querySelector('.app-sidenav-wrap');
    const mainWrap = document.querySelector('.app-main');

    if (toggleBtn && sideNavWrap) {
        toggleBtn.addEventListener('click', () => {
            sideNavWrap.classList.toggle('active');
            mainWrap.classList.toggle('sidenav-active');
        });
    }
});
