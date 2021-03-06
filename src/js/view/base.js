export const element = {
    searchSubmit : document.querySelector('.search'),
    searchField : document.querySelector('.search__field'),
    recipeList : document.querySelector('.results__list'),
    pageButton : document.querySelector('.results__pages'),
    searchPage : document.querySelector('.results__pages'),
    recipePage : document.querySelector('.recipe')
}
export const renderLoader = parent => {
    const loader = `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.loader`);
    if (loader) loader.parentElement.removeChild(loader);
};