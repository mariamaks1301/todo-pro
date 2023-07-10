import React, {useContext, useState} from 'react';
import { dataColors } from '../../utils/dataColors';
import { v4 as uuidv4 } from 'uuid';
import { CustomContext } from '../../utils/Context';
import axios from 'axios';

const Aside = () => {

    const {user, setUser} = useContext(CustomContext);

    const [active, setActive] = useState(false);
    const [color, setColor] = useState(dataColors[0]);
    const [category, setCategory] = useState('');


    const addCategory = ()=> {
        let newCategory = {
            categoryName: category,
            tasks: [],
            id: uuidv4(),
            color
        }

        // if(!user.categories.categoryName.include(category)){}
        // const existCategory = user.categories

        
        axios.patch(`http://localhost:8080/users/${user.id}`, {categories: [...user.categories, newCategory]})
            .then(({data})=> {
                setUser({
                    ...data,
                    token: user.token
                })
                localStorage.setItem('user', JSON.stringify({
                    ...data,
                    token: user.token
                }))
                setActive(false)
                setCategory('')
            })
            .catch((error)=> console.log(error.message))
    }


    return (
        <aside className='aside'>
            <div className='aside__all'>
                <span>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z" fill="#7C7C7C"/>
                    </svg>
                </span>
                <span className='aside__text'>Все задачи</span>
            </div>

            <ul className='aside__menu'>
                <li className='aside__item'>
                    <span style={{background: 'red'}} className='aside__color'/>
                    <span className='aside__text'>Покупки</span>
                    <span className='aside__item-delete'></span>
                </li>
                <li className='aside__item'>
                    <span style={{background: 'red'}} className='aside__color'/>
                    <span className='aside__text'>Покупки</span>
                    <span className='aside__item-delete'></span>
                </li>
                <li className='aside__item'>
                    <span style={{background: 'red'}} className='aside__color'/>
                    <span className='aside__text'>Покупки</span>
                    <span className='aside__item-delete'></span>
                </li>
                <li className='aside__item'>
                    <span style={{background: 'red'}} className='aside__color'/>
                    <span className='aside__text'>Покупки</span>
                    <span className='aside__item-delete'></span>
                </li>
                <li className='aside__item'>
                    <span style={{background: 'red'}} className='aside__color'/>
                    <span className='aside__text'>Покупки</span>
                    <span className='aside__item-delete'>

                    </span>
                </li>
            </ul>


            


                <div style={{position: 'relative'}}>
                    <div onClick={()=> setActive(prev => !prev)}  className='aside__all aside__create'>
                        <span>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                        <span className='aside__text'>Добавить папку</span>
                    </div>
                    <div style={{display: active ? 'flex' : 'none'}} className='aside__popup'>
                        <input 
                            
                            value={category}
                            onChange={(e)=> setCategory(e.target.value)}
                            className='aside__popup-field' 
                            type="text" 
                            placeholder='Name folder' />

                        <div className='aside__colors'>
                        {
                            dataColors.map(item=> (
                                <span 
                                    key={item} 
                                    style={{background: item, border: color === item ? '2px solid black' : ''}} 
                                    className='aside__col'
                                    onClick={()=> setColor(item)}
                                    value={color}
                                    />
                            ))
                        }

                        </div>
                        <button onClick={addCategory} type='button' className='btn__add'>Добавить</button>

                        <span onClick={()=> setActive(false)} className='aside__popup-close'>
                            <svg  width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path  d="M10.315 0C4.62737 0 0 4.62737 0 10.315C0 16.0026 4.62737 20.63 10.315 20.63C16.0026 20.63 20.63 16.0026 20.63 10.315C20.63 4.62737 16.0026 0 10.315 0ZM14.0497 12.928C14.1265 13.0009 14.1879 13.0885 14.2303 13.1855C14.2727 13.2826 14.2952 13.3872 14.2966 13.4931C14.298 13.599 14.2781 13.7041 14.2382 13.8022C14.1983 13.9003 14.1392 13.9894 14.0643 14.0643C13.9894 14.1392 13.9003 14.1983 13.8022 14.2382C13.7041 14.2781 13.599 14.298 13.4931 14.2966C13.3872 14.2952 13.2826 14.2727 13.1855 14.2303C13.0885 14.1879 13.0009 14.1265 12.928 14.0497L10.315 11.4373L7.70203 14.0497C7.55202 14.1922 7.35226 14.2705 7.14536 14.2679C6.93846 14.2652 6.74077 14.1819 6.59446 14.0355C6.44814 13.8892 6.36477 13.6915 6.36212 13.4846C6.35947 13.2777 6.43775 13.078 6.58028 12.928L9.19275 10.315L6.58028 7.70203C6.43775 7.55202 6.35947 7.35226 6.36212 7.14536C6.36477 6.93846 6.44814 6.74077 6.59446 6.59446C6.74077 6.44814 6.93846 6.36477 7.14536 6.36212C7.35226 6.35947 7.55202 6.43775 7.70203 6.58028L10.315 9.19275L12.928 6.58028C13.078 6.43775 13.2777 6.35947 13.4846 6.36212C13.6915 6.36477 13.8892 6.44814 14.0355 6.59446C14.1819 6.74077 14.2652 6.93846 14.2679 7.14536C14.2705 7.35226 14.1922 7.55202 14.0497 7.70203L11.4373 10.315L14.0497 12.928Z" fill="#5C5C5C"/>
                            </svg>
                        </span>
                    </div>
                    
                </div>
                
            
            
        </aside>
    );
};

export default Aside;