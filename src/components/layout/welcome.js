import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/authContext';

const WelcomeComponent = (props) => {
    const { } = props;
    const [state, setState] = useState({});
    const authContext = useContext(AuthContext)
    useEffect(() => {
    }, [])
    return (
        <>
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