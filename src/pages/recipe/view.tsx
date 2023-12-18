import React, { useEffect, useState } from "react";
import { GetRecipeDTO, getRecipe } from "../../utils/recipes.tsx"
import { useParams } from "react-router-dom";

const ViewRecipe: React.FunctionComponent<{}> = () => {

    const [recipe, setRecipe] = useState<GetRecipeDTO>();

    const { id } = useParams();

    const { title, ingredients, method } = recipe || {};

    useEffect(() => {
        if (id) {
            const fetchRecipe = async() => {
                return await getRecipe(id);
            }

            fetchRecipe().then((recipe) => setRecipe(recipe));
        }
    }, [id]);

    return (
        <div>
            {recipe &&
                <div>
                    <h1>{title}</h1>
                    <h3>Ingredients</h3>
                    <ul>
                        {ingredients && ingredients.map((ingredient) => <li>{ingredient}</li>)}
                    </ul>
                    <h3>Method</h3>
                    <ul>
                        {method && method.map((item) => <li>{item}</li>)}
                    </ul>
                </div>
            }
        </div>
    )

}

export default ViewRecipe;
