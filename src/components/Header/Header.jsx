import React, { useContext } from 'react';
import { CustomContext } from '../../utils/Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {

    const {user, logOutUser} = useContext(CustomContext);
    return (
        <header className='header'>
            <div className='header__row row'>
                <h3 className='header__title'>My todo list</h3>
                <div className='row'>
                    <div className='header__accaunt row'>
                        <span>{user.login}</span>
                        <span>

                        </span>
                        <span onClick={logOutUser}>Log Out</span>
                    </div>
                    <div className='header__theme'>
                        <span></span>
                        <span></span>
                    </div>
                    <div className='header__language'>
                        <span></span>
                        <span></span>
                        <span></span>

                    </div>
                </div>
            </div>
            
            {/* <ul className='header__list'>
                <li className='header__list-item'>akhgkjahkghkahgkhakg</li>
                <li className='header__list-item'>akhgkjahkghkahgkhakg</li>
                <li className='header__list-item'>akhgkjahkghkahgkhakg</li>
                <li className='header__list-item'>akhgkjahkghkahgkhakg</li>
            </ul> */}
           
            
        </header>
    );
};

export default Header;