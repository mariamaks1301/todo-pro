import React, { useContext }  from 'react';
import { CustomContext } from '../../utils/Context';
import { Navigate } from 'react-router-dom';
import Aside from './Aside';
import Header from '../../components/Header/Header';
import { ToastContainer } from 'react-toastify';
import HomeContent from './HomeContent';

const Home = () => {

    const {user, setUser} = useContext(CustomContext);


    if(user.email.length === 0){
        return <Navigate to={'/login'}/>
    }

    return (
        <div className='home'>

            <Header/>
            <div className='row'>
                <Aside/>
                <HomeContent/>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Home;