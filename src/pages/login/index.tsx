import React, { useEffect, useState } from "react";
import { loginUser, UserDTO } from "../../utils/user.tsx";

import Cookies from 'universal-cookie';

const cookies = new Cookies();


const defaultUser: UserDTO = {
    username: "",
    password: ""
}

const Login: React.FunctionComponent<{}> = () => {

    const [user, setUser] = useState(defaultUser);

    const handleUserNameChange = function(event: React.ChangeEvent<HTMLInputElement>){
        const username = event.target.value;
        setUser({...user, username});
    }

    const handlePasswordChange = function(event: React.ChangeEvent<HTMLInputElement>){
        const password = event.target.value;
        setUser({...user, password});
    }

    const handleSubmit = async function(event){
        event.preventDefault();
        const accessToken = await loginUser(user);
        console.log(accessToken);
        cookies.set('access_token', accessToken, {
            path: '/'
        });
        console.log(cookies.get('access_token'));
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Username: <input type="text" onChange={handleUserNameChange}></input> </label>
            <label>Password: <input type="password" onChange={handlePasswordChange} required></input></label>
            <input type="submit" value="Submit" />
        </form>
    )

}

export default Login;
