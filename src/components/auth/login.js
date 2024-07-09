import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/authContext';
import { AxiosWithHeader, AxiosWithoutHeader } from '../../services/httpService';
import SpinnerComponent from '../utilities/spinner';
import { createTopNotification } from '../utilities/notification';

const LoginComponent = (props) => {
    const { setAppState , appState} = props;
    const [state, setState] = useState({
        email: '', password: '', loading: false
    });
    const handleInputChange = (key, value) => {
        setState({ ...state, [key]: value });
      };
    const login = async () => {
        handleInputChange('loading', true)
        const responseToken = await AxiosWithoutHeader(
            "/api/login",
            "POST",
            { email: state.email, password: state.password}
        ).catch((err) => {
            createTopNotification(1000).fire({
                icon: "error",
                title: "Datos incorrectos"
            });
            handleInputChange('loading', false)
        })
        if(!responseToken){return}
        const responseUserData = await AxiosWithHeader(
            "/api/user",
            "GET",
            null,
            responseToken.data.accessToken,
        )
        const newState = { user: responseUserData.data.user , token: responseToken.data.accessToken}
        
        createTopNotification(1000).fire({
            icon: "success",
            title: "Bienvenido " + newState.user.name
        })
        setTimeout(() => {
            setAppState(newState)
            localStorage.setItem("userData", JSON.stringify(newState) )
            handleInputChange('loading', false)
        }, 1000);
    }
    useEffect(() => {
    }, [])
    return (
        <>
            <div className='w-full h-[100vh] bg-neutral-300 flex flex-col gap-2 flex-wrap justify-center items-center relative'>
                <div className=''>
                    <img className="object-cover object-top w-full max-w-[12rem]" src='/imgs/K2i-Logo.png' alt='Mountain' />
                </div>
                {/* <div className="max-w-[15rem] max-h-[15rem] rounded p-2 bg-neutral-400 flex flex-col"> */}
                    {/* FORM LOGIN */}
                    <div className='flex flex-col'>

                        { !state.loading ?
                            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                <div className='text-lg text-center '>Login</div>
                                <div className='text-center'>Proyecto Cargas Masivas</div>
                                <div className="mb-4 mt-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" >
                                        Correo
                                    </label>
                                    <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    value={state.email}
                                    onChange={(e) => handleInputChange(e.target.name, e.target.value) }
                                    name="email" type="text" placeholder="Email" />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" >
                                        Contraseña
                                    </label>
                                    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                    value={state.password}
                                    onChange={(e) => handleInputChange(e.target.name, e.target.value) }
                                    name="password" type="password" placeholder="******************" />
                                    {/* <p className="text-red-500 text-xs italic"></p> */}
                                </div>
                                <div className="flex items-center ">
                                    <button
                                    onClick={() => login() } 
                                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                        Iniciar Sesión
                                    </button>
                                </div>
                            </form>:
                            <div className="flex flex-col flex-wrap bg-white rounded items-center justify-center min-h-[20rem]">
                                <SpinnerComponent />
                            </div>
                        }
                        
                        <p className="text-center text-gray-700 text-xs">
                            &copy;2024 Uriel Garcia | Todos los derechos reservados.
                        </p>

                    </div>
                {/* </div> */}
            </div>
        </>
    );
}

export default LoginComponent;