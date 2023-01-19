export function gallery() {
    // Masonry grid
    let masonryGrid = document.querySelector('.masonry-grid');
    var msnry = new Masonry(masonryGrid, {
        columnWidth: '.masonry-grid__item',
        gutter: '.gutter',
        percentPosition: true
    });
    // ======================================================================================
    const classArr = ['masonry-grid__item--l', 'masonry-grid__item--md'];
    // Need for random block size and random photo
    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // Create and insert elements for gallery
    function createItem(out) {
        let elems = [];
        let fragment = document.createDocumentFragment();
        for (let i = 0; i < 10; i++) {
            let randomId = randomNum(0, 60);
            let imgBlock = document.createElement('div');
            imgBlock.className = `masonry-grid__item ${classArr[randomNum(0, 1)]} image-block`;
            if (randomNum(0, 20) < 5 && imgBlock.classList.contains('masonry-grid__item--md')) {
                let firstRow = '';
                let restRow = '';
                imgBlock.classList.add('masonry-grid__item--grid')
                for (let i = 0; i <= 1; i++) {
                    let src = out[randomId + i].download_url;
                    firstRow += `
                    <div class="masonry-grid__item masonry-grid__item--s image-block">
                        <img class="image-block__img" src=${cropImg(src) } alt="Photo by ${out[randomId + i].author}">
                        <div class="image-block__buttons">
                            <a href=${out[randomId + i].download_url} class="image-block__btn image-block__btn--info" target="_blank"></a>
                            <a href=${out[randomId + i].url} class="image-block__btn image-block__btn--open" target="_blank"></a>
                        </div>
                    </div>`;
                }
                for (let i = 2; i < 11; i++) {
                    let src = out[randomId + i].download_url;
                    restRow += `
                    <div class="masonry-grid__item masonry-grid__item--xs image-block">
                        <img class="image-block__img" src=${cropImg(src) } alt="Photo by ${out[randomId + i].author}">
                        <div class="image-block__buttons">
                            <a href=${out[randomId + i].download_url} class="image-block__btn image-block__btn--info" target="_blank"></a>
                            <a href=${out[randomId + i].url} class="image-block__btn image-block__btn--open" target="_blank"></a>
                        </div>
                    </div>`;
                }
                imgBlock.innerHTML = firstRow + restRow;
            } else {
                let src = out[randomId + i + 10].download_url;
                imgBlock.innerHTML = `
                    <img class="image-block__img" src=${cropImg(src) } alt="Photo by ${out[randomId].author}">
                    <div class="image-block__buttons">
                        <a href=${out[randomId].download_url} class="image-block__btn image-block__btn--info" target="_blank" ></a>
                        <a href=${out[randomId].url} class="image-block__btn image-block__btn--open" target="_blank"></a>
                    </div>
                `;
            }
            fragment.appendChild(imgBlock);
            elems.push(imgBlock);
        }
        masonryGrid.appendChild(fragment);
        msnry.appended(elems);
    }
    // Crop images from API
    function cropImg(src) {
        let lastSlash = src.lastIndexOf('/');
        src = src.slice(0, lastSlash);
        lastSlash = src.lastIndexOf('/');
        src = src.slice(0, lastSlash) + '/500/500';
        return src
    }
    // Getting photos
    async function getResponse() {
        const response = await fetch(`https://picsum.photos/v2/list?page=${randomNum(1, 10)}&limit=80`)
            .then(res => res.json())
            .then((out) => {
                // console.log(out);
                createItem(out);
            }).catch(err => console.error(err));
    }
    // ======================================================================================
    // Add extra 10 image blocks to gallery list
    const loadMoreBtn = document.querySelector('.gallery__btn');
    let loadMoreCount = 0;

    loadMoreBtn.addEventListener('click', loadMoreWorks);

    function loadMoreWorks(e) {
        if (e.target.closest('.gallery__btn')) {
            loadMoreBtn.disabled = true;
            let enableLoadMoreBtn = setTimeout(() => {
                loadMoreBtn.disabled = null;
                clearTimeout(enableLoadMoreBtn);
            }, 2100);
            loadMoreCount++;
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
                getResponse();
                clearTimeout(loadingTimer);
                if (loadMoreCount === 2) loadMoreBtn.remove();
            }, 2000);
        }
    }
}