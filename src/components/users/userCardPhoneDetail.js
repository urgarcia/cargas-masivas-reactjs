import { useEffect, useState } from 'react';
import { MdMobileFriendly } from 'react-icons/md';
 
const UserCardPhoneDetail = (props) => {
    const {detail} = props;
    const [state, setState] = useState({});
    useEffect(() => {
    },[])
    return (
        <>
            <div className="flex flex-col rounded p-1 border-2 border-neutral-300 gap-2
            hover:border-neutral-700 ease-in duration-500 cursor-pointer
            ">
                <div> <MdMobileFriendly /> </div>
                <div> {detail.telefono} </div>
            </div>
        </>
    );
}
 
export default UserCardPhoneDetail;