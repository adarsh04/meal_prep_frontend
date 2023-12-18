import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

interface CreateRecipeDTO {
    title: string;
    ingredients: string[];
    method: string[];
}

interface GetRecipeDTO {
    id: string;
    title: string;
    ingredients: string[];
    method: string[];
}

const getRecipes = async () : Promise<GetRecipeDTO[]> => {
    const { data } = await axios.get('/api/v1/recipes');
    const { recipes } = data;
    return recipes;
}

const getRecipe = async (id: string) : Promise<GetRecipeDTO> => {
    const { data } = await axios.get(`/api/v1/recipe/${id}`);
    const { recipe } = data;
    return recipe;
}

const createRecipe = async (recipe: CreateRecipeDTO) : Promise<GetRecipeDTO> => {
    const headers = {
        'Authorization' : `Bearer ${cookies.get('access_token')}`
    }

    const { data } = await axios.post('/api/v1/recipe/add',recipe, { headers });
    const { newRecipe } = data;
    return newRecipe;
}


export { getRecipes, getRecipe, createRecipe, GetRecipeDTO, CreateRecipeDTO }
