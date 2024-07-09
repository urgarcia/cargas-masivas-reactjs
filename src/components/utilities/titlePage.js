import { useEffect, useState } from 'react';

const TitlePageComponent = (props) => {
    const { Icon, name, description } = props;
    const [state, setState] = useState({});
    useEffect(() => {
    }, [])
    return (
        <>
            <div className="flex flex-wrap border-b-[1px] border-neutral-200 pb-2">
                    <div className="flex flex-col">
                        <div className="flex gap-2">
                            <Icon size={30}  className='text-neutral-600'/>
                            <div className='text-xl'>{name}</div>
                        </div>
                        <div>{description}</div>
                    </div>
                    <div className="flex">
                        
                    </div>
                </div>
        </>
    );
}

export default TitlePageComponent;