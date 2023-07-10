import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { CustomContext } from '../../utils/Context';
import { Navigate } from 'react-router-dom';



const Form = () => {


    const {setUser, user} = useContext(CustomContext);

    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
      } = useForm(
        {mode: 'onBlur'}
      );

      
      const registerUser = (data) => {
          
        const {passwordAgain, ...other} = data;
        
        console.log(123);
        axios.post('http://localhost:8080/users', {
            ...other,
            categories: []

        }).then((res)=> {
            setUser({
                token: res.data.accessToken,
                ...res.data.user
            })
            localStorage.setItem('user', JSON.stringify({
                token: res.data.accessToken,
                ...res.data.user
            }))
            reset();
            navigate('/');

        })
        .catch((error)=> console.log(error.message))

    }

    const loginUser = (data) => {
          
        console.log(456);
        axios.post('http://localhost:8080/login', {
            ...data
        }).then((res)=> {
            setUser({
                token: res.data.accessToken,
                ...res.data.user
            })
            localStorage.setItem('user', JSON.stringify({
                token: res.data.accessToken,
                ...res.data.user
            }))
            reset();
            navigate('/');

        })
        .catch((error)=> console.log(error.message))

    }

    const onSubmit = (data) => {
        location.pathname === '/register' ? registerUser(data) : loginUser(data)
    }

    if(user.email.length){
        return <Navigate to={'/'}/>
    }
    

    return (
        <form noValidate className='form' onSubmit={handleSubmit(onSubmit)}>
                <h2 className='form__title'>
                    {
                        location.pathname === '/register' ? 'Sign Up' : 'Sign In'
                    }
                </h2>
                {
                    location.pathname === '/register' && <label htmlFor="">
                    <input {...register('login', {
                        required: {
                            message: "Login is required field",
                            value: true
                        },
                        maxLength: {
                            message: "Max length of the login 15 characters",
                            value: 15
                        },
                        minLength: {
                            message: "Min length of the login 3 characters",
                            value: 3
                        }

                    })} className='form__field' type="text"  placeholder='Enter login' />
                    <p className='form__error'>{errors.login && errors.login.message}</p>
                </label>
                
                }
                
                <label htmlFor="">
                    <input {...register('email', {
                        required: {
                            message: "Email is a required field",
                            value: true          
                        },
                        pattern: {
                            value: /^[^ ]+@[^ ]+\.[a-z]{2,5}$/,
                            message: 'Enter you email correctly',
                        }
                    })} className='form__field' type="email" placeholder='Enter email' />
                    <p className='form__error'>{errors.email && errors.email.message}</p>
                </label>

                {
                    location.pathname === '/register' && <label htmlFor="">
                    <InputMask
                        placeholder='+996(999)99-99-99'
                        mask={`+\\9\\96(999)99-99-99`}
                        type='tel'
                        className='form__field'
                        {...register('phone', {
                            required: {
                                value: true,
                                message: "Enter your phone"
                            },
                            pattern: {
                                value: /^\+996\(\d{3}\)\d{2}-\d{2}-\d{2}$/,
                                message: 'Enter you phone correctly',
                            },
                        })}
                    />
                    <p className='form__error'>{errors.phone && errors.phone.message}</p>
                </label>
                }

                
                {
                    location.pathname === '/register' &&  <label className='form__field-gender' htmlFor="">
                    <p className='form__field-title'>Choose gender: </p>
                    <input {...register('gender', {
                        required: {
                            value: true,
                            message: "Specify gender"
                        }
                    })} type="radio"  id='male' value='male'/>
                    <label className='form__label-gender' htmlFor="">male</label>

                    <input {...register('gender', {
                        required: {
                            value: true,
                            message: "Specify gender"
                        }
                    })} type="radio" id='female' value='female' />
                    <label className='form__label-gender' htmlFor="">female</label>
                </label>
                }
               

                <label htmlFor="">
                    <input {...register('password', {
                        required: {
                            message: 'Password must contain at least 1 capital letter and 1 number',
                            value: true
                        },
                        maxLength: {
                            message: 'Maximum length 20 characters',
                            value: 20,
                        },
                        minLength: {
                            message: 'Minimum length 8 characters',
                            value: 8,
                        },
                        pattern: {
                            message: 'Enter your password correctly',
                            value: /(?=.*[0-9])(?=.*[a-z]){6,}/g,
                        },
                    })} className='form__field' type="password" autoComplete='new-password' placeholder='Enter password' />
                    <p className='form__error'>{errors.password && errors.password.message}</p>
                </label>

               
                {
                    location.pathname === '/register' &&  <label htmlFor="">
                    <input {...register('passwordAgain', {
                        required: {
                            message: 'Repeat password',
                            value: true
                        },
                        validate: v => {
                            if(getValues('password') !== v){
                                return 'Passwords doesn\'t match'
                            }
                        }
                    })} className='form__field' type="password" placeholder='Password again' />
                    <p className='form__error'>{errors.passwordAgain && errors.passwordAgain.message}</p>
                </label>
                }
               
                {
                    location.pathname === '/register'
                     ? <button className='form__btn' type='submit'>Sign Up</button>
                     : <button className='form__btn' type='submit'>Sign In</button>
                }
                


                
                

                {
                    location.pathname === '/register' ? 
                    <p className='form__text'>
                        I already have  
                        <Link to="/login" className='form__link'> an account</Link>
                    </p>
                    :
                    <p className='form__text'>
                        I havn't  
                        <Link to="/register" className='form__link'> an account </Link>
                        yet
                    </p>
                }




            </form>
    );
};

export default Form;