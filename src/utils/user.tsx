import axios from 'axios';

interface UserDTO {
    username: string;
    password: string;
}

const loginUser = async (user: UserDTO) : Promise<string> => {
    console.log('loginUser');
    const { data } = await axios.post('/auth/login', user);
    const { access_token } = data;
    console.log(access_token);
    return access_token;
}

const registerUser = async (newUser: UserDTO): Promise<UserDTO> => {
    console.log('registerUser');
    const { data } = await axios.post('/auth/register', newUser);
    console.log('got here');
    console.log(data);
    const { access_token } = data;
    console.log(data.access_token);
    return data.access_token;
}

export { loginUser, registerUser, UserDTO }
