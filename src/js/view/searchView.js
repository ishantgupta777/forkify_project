import {element} from './base'


function limitTitle(title, limit=17 ){
    
    if(title.length >= limit){
        var newTitle = [];
        title = title.split(' ');
        title.reduce((acc,cur)=>{
            if(acc + cur.length <=17)
            newTitle.push(cur);
            return acc + cur.length;
        },0);
        newTitle = newTitle.join(' ') + ' ...';
        return newTitle;
    }
    return title;
}



// type can be prev and next
function showButton(type,page){
    var button =
        `<button class="btn-inline results__btn--${type}" data-goto=${type=='prev'?page-1 : page+1}>
        
        <span>Page ${type=='prev'?page-1 : page+1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type=='prev'?'left' : 'right'}"></use>
        </svg>
        </button>`
        element.pageButton.insertAdjacentHTML('beforeend',button);
}

function pageButton(recipes,itemPerPage,page){
    var pages = Math.ceil(recipes.length/itemPerPage);
    if(page==1 &&  pages>1){
        showButton('next',page);
    }else if(page>1 && page < pages){
        showButton('prev',page);
        showButton('next',page);
    }else if(page==pages && pages>1){
        showButton('prev',page);
    }
}
export function clearSearchField(){
    element.searchPage.innerHTML = '';
    element.recipeList.innerHTML = '';
}

export function showRecipe(recipes,page=1,itemPerPage=10){

    let start = (page-1)*itemPerPage;
    let end = page * itemPerPage;
    recipes.slice(start,end).forEach((e)=>{

               var recipe  = `<li>
        <a class="results__link results__link--active" href="#${e.recipe_id}">
            <figure class="results__fig">
                <img src="${e.image_url}" alt="${limitTitle(e.title)}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitTitle(e.title)}</h4>
                <p class="results__author">${e.publisher}</p>
            </div>
        </a>
        </li>`;
        element.recipeList.insertAdjacentHTML('beforeend' ,recipe);
    });
    pageButton(recipes,itemPerPage,page);
}



