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
    console.log(`backend URL: ${process.env.REACT_APP_BACKEND_URL}`);
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/recipes`);
    const { recipes } = data;
    return recipes;
}

const getRecipe = async (id: string) : Promise<GetRecipeDTO> => {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/recipe/${id}`);
    const { recipe } = data;
    return recipe;
}

const createRecipe = async (recipe: CreateRecipeDTO) : Promise<GetRecipeDTO> => {
    const headers = {
        'Authorization' : `Bearer ${cookies.get('access_token')}`
    }

    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/recipe/add`,recipe, { headers });
    const { newRecipe } = data;
    return newRecipe;
}

const editRecipe = async (recipe: GetRecipeDTO) : Promise<GetRecipeDTO> => {
    const headers = {
        'Authorization' : `Bearer ${cookies.get('access_token')}`
    }

    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/recipe/edit`,recipe, { headers });
    const { editRecipe } = data;
    return editRecipe;
}


export { getRecipes, getRecipe, createRecipe, editRecipe, GetRecipeDTO, CreateRecipeDTO }
