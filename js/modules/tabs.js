export function tabs() {
    let tabsButtons = document.querySelector('.tabs__buttons');
    
    tabsButtons.addEventListener('click', showTab);
    
    function showTab(e) {
        if (e.target.closest('.tabs__btn')) {
            let targetBtn = e.target.closest('.tabs__btn');
            let btns = tabsButtons.querySelectorAll('[data-tab-btn]');
            let content = document.querySelectorAll('[data-tab-content]');
    
            btns.forEach(btn => btn.classList.remove('tabs__btn--active'));
            targetBtn.classList.add('tabs__btn--active')
            content.forEach(tab => {
                if (tab.dataset.tabContent === targetBtn.dataset.tabBtn) {
                    tab.classList.add('tabs__item--active');
                } else {
                    tab.classList.remove('tabs__item--active');
                }
            });
        }
    }
}