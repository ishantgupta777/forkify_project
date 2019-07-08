import axios from 'axios';
export class Search{
    constructor(query){
        this.query = query;
    }
    async getRecipes(){
        const key = 'df30d18ffad368953dd792c139dbb642' ;
        try{
            let result = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.recipes = result.data.recipes;
        }catch(error){
            alert(error);
        }

    }
    
}