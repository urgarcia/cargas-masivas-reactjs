import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/authContext';
import { RiAdminLine } from 'react-icons/ri';
import { FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const ProfileCard = (props) => {
    const { } = props;
    const authContext = useContext(AuthContext)
    console.log('authContext', authContext)
    const [state, setState] = useState({
        user: authContext.user
    });
    useEffect(() => {
    }, [])
    return (
        <>
            <div>
                <div class=" mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-2 bg-white shadow-xl rounded-lg text-gray-900">
                    <div class="rounded-t-lg h-32 overflow-hidden bg-neutral-700">
                        <img class="object-cover object-top w-full" src='/imgs/K2i-Logo.png' alt='Mountain' />
                    </div>
                    <div class="bg-neutral-100 mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                        <RiAdminLine size={120} className='text-neutral-600' />
                    </div>
                    <div class="text-center mt-2">
                        <h2 class="font-semibold">{state.user.name}</h2>
                        <p class="text-gray-500">Web Developer Specialist at K2i</p>
                        <p class="text-gray-500">{state.user.email}</p>
                        <p class="text-neutral-100 rounded border-2 bg-gray-500 border-gay-500">{state.user.roles[0].name}</p>
                    </div>
                    <ul class="py-4 mt-2 text-gray-700 flex items-center justify-around">
                        <li class="flex flex-col items-center justify-around">
                            <FaCheck size={25} className='text-emerald-700' />
                            <div>Consulta</div>
                        </li>
                        <li class="flex flex-col items-center justify-between">
                            { state.user.roles[0].id == 1 ? 
                            <FaCheck size={25} className='text-emerald-700' /> :
                            <IoClose size={30} className='text-rose-700' />
                            }
                            <div>Carga Masiva</div>
                        </li>
                        <li class="flex flex-col items-center justify-around">
                            <FaCheck size={25} className='text-emerald-700' />
                            <div>Perfil</div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default ProfileCard;