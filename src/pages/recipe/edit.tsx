import React, { useEffect, useState } from "react";
import { editRecipe, getRecipe } from "../../utils/recipes.tsx";

import Cookies from 'universal-cookie';
import { useParams } from "react-router-dom";

const cookies = new Cookies();


const defaultRecipe = {
    id: '',
    title: '',
    ingredients: '',
    method: ''
}

const EditRecipe: React.FunctionComponent<{}> = () => {

    const { id } = useParams();

    const [recipe, setRecipe] = useState(defaultRecipe);
    
    useEffect(() => {
        if (id) {
            const fetchRecipe = async() => {
                return await getRecipe(id);
            }

            fetchRecipe().then((recipe) => {
                let recipeIngredients = '';
                let recipeMethod = '';
                recipe.ingredients.forEach((value) => recipeIngredients = `${recipeIngredients}${value}\n`);
                recipe.method.forEach((value) => recipeMethod = `${recipeMethod}${value}\n`);
                const parsedRecipe = {...recipe, ingredients: recipeIngredients, method: recipeMethod};
                console.log("parsedRecipe: ", parsedRecipe);
                setRecipe(parsedRecipe);
            });
        }
    }, [id]);



    const handleTitleChange = function(event: React.ChangeEvent<HTMLInputElement>){
        const title = event.target.value;
        setRecipe({...recipe, title});
    }

    const handleIngredientsChange = function(event: React.ChangeEvent<HTMLTextAreaElement>){
        const ingredients = event.target.value;
        setRecipe({...recipe, ingredients});
        console.log(recipe);
    }

    const handleMethodChange = function(event: React.ChangeEvent<HTMLTextAreaElement>){
        const method = event.target.value;
        setRecipe({...recipe, method});
        console.log(recipe);
    }

    const handleSubmit = async function(event){
        event.preventDefault();
        const ingredients = recipe.ingredients.split('\n');
        const method = recipe.method.split('\n');
        const parsedRecipe = {...recipe, ingredients, method }
        const newRecipe = await editRecipe(parsedRecipe);
        if (newRecipe) {
            console.log(newRecipe);
        }
    }

    return (
        <div>
            {cookies.get('access_token') &&
                <div>
                    <h3> Edit Recipe</h3>
                    <form onSubmit={handleSubmit}>
                        <label>Title: <input type="text" onChange={handleTitleChange} value={recipe.title}></input> </label>
                        <label>Ingredients: <textarea onChange={handleIngredientsChange} value={recipe.ingredients}></textarea></label>
                        <label>Method: <textarea onChange={handleMethodChange} value={recipe.method}></textarea></label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            }
            
        </div>

    )
}

export default EditRecipe;
