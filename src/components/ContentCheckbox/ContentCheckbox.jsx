import React from 'react';

const ContentCheckbox = ({isComplete}) => {
    return (
        <span className={`content__item-complete ${isComplete ? 'active' : ''}`}></span>
    );
};

export default ContentCheckbox;