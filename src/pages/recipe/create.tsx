import React, { useState } from "react";
import { CreateRecipeDTO, createRecipe } from "../../utils/recipes.tsx";

import Cookies from 'universal-cookie';

const cookies = new Cookies();


const defaultRecipe: CreateRecipeDTO = {
    title: '',
    ingredients: [],
    method: [],
    file: new File([], ''),
}

const CreateRecipe: React.FunctionComponent<{}> = () => {

    const [recipe, setRecipe] = useState(defaultRecipe);

    const handleTitleChange = function(event: React.ChangeEvent<HTMLInputElement>){
        const title = event.target.value;
        setRecipe({...recipe, title});
    }

    const handleIngredientsChange = function(event: React.ChangeEvent<HTMLTextAreaElement>){
        const ingredients = event.target.value.split("\n");
        setRecipe({...recipe, ingredients});
        console.log(recipe);
    }

    const handleMethodChange = function(event: React.ChangeEvent<HTMLTextAreaElement>){
        const method = event.target.value.split("\n");
        setRecipe({...recipe, method});
        console.log(recipe);
    }

    const handleFileUpload = function(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files ? event.target.files[0] : new File([], '');
        console.log("file: ", file);
        setRecipe({...recipe, file})
    }

    const handleSubmit = async function(event){
        event.preventDefault();
        const newRecipe = await createRecipe(recipe);
        if (newRecipe) {
            console.log(newRecipe);
        }
    }

    return (
        <div>
            {cookies.get('access_token') ?
                <div>
                    <h3> Create Recipe</h3>
                    <form onSubmit={handleSubmit}>
                        <label>Title: <input type="text" onChange={handleTitleChange}></input> </label>
                        <label>Ingredients: <textarea onChange={handleIngredientsChange}></textarea></label>
                        <label>Method: <textarea onChange={handleMethodChange}></textarea></label>
                        <label>File: <input type="file" name="filename" onChange={handleFileUpload} /></label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            :
                <div> Sign in to carry out this action </div>
            }
            
        </div>

    )
}

export default CreateRecipe;
