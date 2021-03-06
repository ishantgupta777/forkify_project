// Global app controller
import {Search} from './model/search';
import {element, renderLoader , clearLoader} from './view/base';
import {showRecipe ,clearSearchField } from  './view/searchView';
import Recipe from './model/recipe';
import {renderRecipe, clearRecipe} from './view/recipeView'

var data = {};

// search object---------------------------------------

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



// receipe object ----------------------------------------------

async function recipeControl(){

    let hash = window.location.hash.substring(1);

        // make recipe object
        data.recipe = new Recipe(hash);
    
    if(hash){
        try{
            //
            clearRecipe();
            renderLoader(element.recipePage);
            await data.recipe.getRecipe();
            clearLoader();
            data.recipe.parseIngredients();
            data.recipe.getTime();
            data.recipe.getServings();
            renderRecipe(data.recipe,true);

        }catch(err){

            alert(err);

        }
    }
 

}

window.addEventListener('hashchange',recipeControl);
window.addEventListener('load',recipeControl);