import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/authContext';
import { BiLogOut } from 'react-icons/bi';
import { AxiosWithHeader } from '../../services/httpService';

const WelcomeComponent = (props) => {
    const { } = props;
    const authContext = useContext(AuthContext)
    const logout = async () =>{
        AxiosWithHeader('/api/logout', 'GET', null, authContext.token)
        authContext.logout()
    }
    useEffect(() => {
    }, [])
    return (
        <>
            <div 
            onClick={() => logout()}
            className="flex flex-col items-center absolute top-[1rem] right-[1rem] p-1 border-[2px] border-gray-700 rounded cursor-pointer
            hover:scale-105 duration-500 ease-in
            ">
                <BiLogOut /> 
                <div className='text-sm text-gray-700'>Salir</div>
            </div>
            <div className="flex flex-col p-2 bg-neutral-100 items-center">
                <div className='text-3xl'>Bienvenido</div>
                <div className='font-bold mt-[-.5rem]'>{authContext.user.name}</div>
                <div className='mt-[-.5rem]'>
                    <small className='bg-emerald-600 px-1 rounded text-white'>
                        {authContext.user.roles[0].name}
                    </small>
                </div>
            </div>
        </>
    );
}

export default WelcomeComponent;