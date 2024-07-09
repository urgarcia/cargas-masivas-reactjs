import { useEffect, useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa';
 
const UserCardAddressDetail = (props) => {
    const {detail} = props;
    const [state, setState] = useState({});
    useEffect(() => {
    },[])
    return (
        <>
            <div className="flex flex-col rounded p-1 border-2 border-neutral-300 gap-2
            hover:border-neutral-700 ease-in duration-500 cursor-pointer
            ">
                <div> <FaLocationArrow /> </div>
                <div className='flex gap-1'> 
                    <div>{detail.calle}</div>
                    <div>#{detail.numero_exterior}</div> 
                    <div>{detail.numero_interior ? "Int: " + detail.numero_interior   : ""}</div> 
                </div>
            </div>
        </>
    );
}
 
export default UserCardAddressDetail;