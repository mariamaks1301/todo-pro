import React from 'react';
import { useContext } from 'react';
import { CustomContext } from '../../utils/Context';
import ContentCategory from '../../components/ContentCategory/ContentCategory';

const HomeContent = () => {

    const {user, status} = useContext(CustomContext);

    return (
        <div className='content'>
            {
                status === 'all' ? user.categories.map((item)=> (
                    <ContentCategory key={item.id} status={item.categoryName}/>
                )) : <ContentCategory  status={status}/>
            }
        </div>
    );
};

export default HomeContent;