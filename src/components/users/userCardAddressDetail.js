import { useEffect, useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa';
 
const UserCardAddressDetail = (props) => {
    const {detail} = props;
    const [state, setState] = useState({});
    useEffect(() => {
    },[])
    return (
        <>
            <div className="flex flex-col rounded p-1 border-2 border-neutral-300 gap-2 min-w-[7rem]
            hover:border-neutral-700 ease-in duration-500 cursor-pointer relative
            ">
                <div className='absolute'> <FaLocationArrow  size={15} className='text-gray-500' /> </div>
                <div className='flex flex-col mt-3'> 
                    <div className="flex flex-wrap gap-2">
                        <div>{detail.calle}</div>
                        <div className='text-sm text-gray-500'>#{detail.numero_exterior}</div> 
                    </div>
                    {detail.numero_interior ? 
                    <div className='text-gray-700 text-sm mt-[-5px]'>INT: {detail.numero_interior}</div> : ""
                    }
                    <div className='text-gray-600 text-sm mt-[-5px]'>CP: { detail.cp }</div> 
                </div>
            </div>
        </>
    );
}
 
export default UserCardAddressDetail;