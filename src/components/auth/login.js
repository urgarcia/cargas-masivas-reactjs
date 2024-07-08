import { useEffect, useState } from 'react';

const LoginComponent = (props) => {
    const { } = props;
    const [state, setState] = useState({});
    useEffect(() => {
    }, [])
    return (
        <>
            <div className='w-full h-[100vh] bg-neutral-200 flex flex-wrap justify-center items-center'>
                {/* <div className="max-w-[15rem] max-h-[15rem] rounded p-2 bg-neutral-400 flex flex-col"> */}
                    {/* FORM LOGIN */}
                    <div className='flex flex-col'>
                        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className='text-lg text-center '>Login</div>
                            <div className='text-center'>Proyecto Cargas Masivas</div>
                            <div class="mb-4 mt-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                                    Correo
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" />
                            </div>
                            <div class="mb-6">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                                    Contraseña
                                </label>
                                <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                                {/* <p class="text-red-500 text-xs italic"></p> */}
                            </div>
                            <div class="flex items-center ">
                                <button class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    Iniciar Sesión
                                </button>
                            </div>
                        </form>

                        <p class="text-center text-gray-500 text-xs">
                            &copy;2024 Uriel Garcia | Todos los derechos reservados.
                        </p>

                    </div>
                {/* </div> */}
            </div>
        </>
    );
}

export default LoginComponent;