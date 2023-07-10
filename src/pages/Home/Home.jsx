import React, { useContext }  from 'react';
import { CustomContext } from '../../utils/Context';
import { Navigate } from 'react-router-dom';
import Aside from './Aside';

const Home = () => {

    const {user, setUser} = useContext(CustomContext);
    console.log(user);

    if(user.email.length === 0){
        return <Navigate to={'/login'}/>
    }

    return (
        <div>
            <h2>{user.login}</h2>
            <Aside/>
        </div>
    );
};

export default Home;