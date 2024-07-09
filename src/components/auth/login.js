import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/authContext';
import { AxiosWithHeader, AxiosWithoutHeader } from '../../services/httpService';

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
        )

        const responseUserData = await AxiosWithHeader(
            "/api/user",
            "GET",
            null,
            responseToken.data.accessToken,
        )
        const newState = { user: responseUserData.data.user , token: responseToken.data.accessToken}
        setAppState(newState)
        localStorage.setItem("userData", newState)
        handleInputChange('loading', false)

    }
    useEffect(() => {
    }, [])
    return (
        <>
            <div className='w-full h-[100vh] bg-neutral-200 flex flex-wrap justify-center items-center'>
                {/* <div className="max-w-[15rem] max-h-[15rem] rounded p-2 bg-neutral-400 flex flex-col"> */}
                    {/* FORM LOGIN */}
                    <div className='flex flex-col'>
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
                        </form>

                        <p className="text-center text-gray-500 text-xs">
                            &copy;2024 Uriel Garcia | Todos los derechos reservados.
                        </p>

                    </div>
                {/* </div> */}
            </div>
        </>
    );
}

export default LoginComponent;