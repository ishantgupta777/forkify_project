// Global app controller
import {Search} from './model/search';
import {element, renderLoader , clearLoader} from './view/base';
import {showRecipe ,clearSearchField } from  './view/searchView';

var data = {};

async function searchResult(e){
    //preventing from reload
    e.preventDefault();

    //making search object
     data.search = new Search(element.searchField.value);

    //initial ui changes
    element.searchField.value = '';
    clearSearchField();

    //displaying results
    renderLoader(document.querySelector('.results'));
    await data.search.getRecipes();
    clearLoader();
    showRecipe(data.search.recipes);
};

element.searchSubmit.addEventListener('submit',searchResult);

element.pageButton.addEventListener('click',(e)=>{
   var target = e.target.closest('.btn-inline');
   if(target){
       var pageNum = target.dataset.goto;
       pageNum = parseInt(pageNum);
      clearSearchField();
       showRecipe(data.search.recipes,pageNum);
   }
})

