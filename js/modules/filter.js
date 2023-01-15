export function filter() {

    const filterButtons = document.querySelector('.filter__buttons');
    const filterList = document.querySelector('.filter__list');
    const loadMoreBtn = document.querySelector('.work__btn');

    // Filter works
    filterButtons.addEventListener('click', filterItems);
    // Make active category btn
    function filterItems(e) {
        if (e.target.closest('.filter__btn')) {
            const category = e.target.closest('.filter__btn');

            Array.from(filterButtons.children).forEach(btn => {
                if (btn === category) {
                    btn.classList.add('filter__btn--active');
                } else {
                    btn.classList.remove('filter__btn--active');
                }
            });

            showItems(category);
        }
    };
    // Show category items
    function showItems(category) {
        Array.from(filterList.children).forEach(item => {
            if (category.dataset.filterBtn === item.dataset.filterItem) {
                item.style.display = null;
            } else {
                item.style.display = 'none';
            }
        });
        if (category.dataset.filterBtn === 'all') {
            Array.from(filterList.children).forEach(item => item.style.display = null);
        };
    };

    // Add start 12 items to filter list
    // window.addEventListener('load', addFilterItems);
    function addFilterItems(plus = 0) {
        let category = ['graphic_design', 'web_design', 'landing_pages', 'wordpress'];
        for (let i = 1; i <= 3; i++) {
            for (let j = 0; j < 4; j++) {
                let categoryTitle = category[j].split('_').map(word => word = word.slice(0, 1).toUpperCase() + word.slice(1)).join(' ');
                let categoryFileName = category[j].replace('_', '-');
                

                filterList.insertAdjacentHTML('beforeend', `
                    <div class="filter__item item-filtred" data-filter-item="${category[j]}" style="display:none">
                        <img class="item-filtred__img" src="./img/content/${category[j]}/${categoryFileName + (j + i + plus)}.jpg" alt="${category[j]}">
                        <div class="item-filtred__links">
                            <a class="item-filtred__link" href="#">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M13.9131 2.72817L12.0948 0.891285C11.2902 0.0808612 9.98305 0.0759142 9.17681 0.882615L7.15921 2.89256C6.35161 3.69885 6.34818 5.01032 7.15051 5.82074L8.30352 4.68897C8.18678 4.32836 8.33041 3.9153 8.61593 3.62946L9.89949 2.35187C10.3061 1.94624 10.9584 1.94913 11.3595 2.35434L12.4513 3.45805C12.8528 3.86283 12.8511 4.51713 12.447 4.92318L11.1634 6.20241C10.8918 6.47296 10.4461 6.62168 10.1002 6.52626L8.97094 7.65887C9.77453 8.47177 11.0803 8.47466 11.8889 7.66837L13.9039 5.65924C14.7141 4.85254 14.7167 3.53983 13.9131 2.72817ZM6.52613 10.0918C6.62191 10.4441 6.46857 10.8997 6.19093 11.1777L4.99227 12.3752C4.58074 12.7845 3.91595 12.7833 3.50671 12.369L2.39297 11.2475C1.98465 10.8349 1.98729 10.1633 2.39824 9.75473L3.59804 8.55769C3.89032 8.26607 4.31044 8.12025 4.67711 8.24375L5.83354 7.0715C5.01493 6.2462 3.68249 6.24207 2.86059 7.06324L0.915197 9.0042C0.0922615 9.8266 0.0883685 11.1629 0.90651 11.9886L2.75817 13.8618C3.57595 14.6846 4.90724 14.6912 5.73111 13.8701L7.67649 11.9287C8.49852 11.1054 8.5024 9.77166 7.68553 8.9443L6.52613 10.0918ZM6.25787 9.56307C5.98013 9.84189 5.53427 9.84105 5.26179 9.55812C4.98792 9.27434 4.9901 8.82039 5.26613 8.53993L8.59075 5.16109C8.86679 4.88227 9.31174 4.88311 9.58513 5.16398C9.86048 5.44569 9.85876 5.90088 9.5817 6.18299L6.25787 9.56307Z"
                                        fill="none" />
                                </svg>
                            </a>
                            <a class="item-filtred__link" href="#"></a>
                        </div>
                        <div class="item-filtred__title">creative design</div>
                        <div class="item-filtred__category">${categoryTitle}</div>
                    </div>
                `);
            }
        }
        // show only filtered items, but added all 12 items
        showItems(document.querySelector('.filter__btn--active'));
    };
    addFilterItems();

    // Add extra 12 items to filter list
    loadMoreBtn.addEventListener('click', loadMoreWorks);
    let loadMoreCount = 0;

    function loadMoreWorks(e) {
        if (e.target.closest('.work__btn')) {
            loadMoreBtn.disabled = true;
            let enableLoadMoreBtn = setTimeout(() => {
                loadMoreBtn.disabled = null;
                clearTimeout(enableLoadMoreBtn);
            }, 2100);
            loadMoreCount++;
            loadMoreCount < 2 ? loading(3) : loading(6);
        }
    };
    function loading(plus) {
        loadMoreBtn.insertAdjacentHTML('afterbegin', `
            <span class="loading">
                <span class="loading__dot"></span>
                <span class="loading__dot"></span>
                <span class="loading__dot"></span>
                <span class="loading__dot"></span>
            </span>
        `);
        let loadingTimer = setTimeout(() => {
            document.querySelector('.loading').remove();
            addFilterItems(plus);
            clearTimeout(loadingTimer);
            if (plus === 6) loadMoreBtn.remove();
        }, 2000);
    };
}