import React, { useEffect, useState } from 'react';
import { GetRecipeDTO, getRecipes } from '../utils/recipes.tsx';


const Home: React.FunctionComponent<{}> = () => {

    const [recipes, setRecipes] = useState([] as GetRecipeDTO[]);

    useEffect(() => {
        const fetchRecipes = async() => {
            return await getRecipes();
        }

        fetchRecipes().then((recipes) => setRecipes(recipes));
    }, []);

    return (
        <div>
        {recipes && recipes.map((recipe) => 
        <div>
        <a href={`/recipe/${recipe.id}`}>{recipe.title}</a>
        </div>)}
        </div>
    )
}

export default Home;
