import { useEffect, useState } from 'react';

const WelcomeComponent = (props) => {
    const { } = props;
    const [state, setState] = useState({});
    useEffect(() => {
    }, [])
    return (
        <>
            <div className="flex flex-col p-2 bg-neutral-100 items-center">
                <div className='text-3xl'>Bienvenido</div>
                <div className='font-bold mt-[-.5rem]'>Uriel García</div>
                <div className='mt-[-.5rem]'>
                    <small className='bg-emerald-600 px-1 rounded text-white'>
                        Administrador
                    </small>
                </div>
            </div>
        </>
    );
}

export default WelcomeComponent;