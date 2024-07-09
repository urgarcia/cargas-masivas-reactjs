import { useEffect, useState } from 'react';
import TitlePageComponent from '../utilities/titlePage';
import { FaUserNinja } from 'react-icons/fa6';
import ProfileCard from './profileCard';
 
const ProfileComponent = (props) => {
    const {} = props;
    const [state, setState] = useState({});
    useEffect(() => {
    },[])
    return (
        <>
            <div className="flex flex-wrap flex-col px-4 py-2">
                <TitlePageComponent Icon={FaUserNinja} name={"Perfil"} description={"Visualiza tu información personal"} />
                <div className="flex justify-center">
                    <ProfileCard />
                </div>
            </div>
        </>
    );
}
 
export default ProfileComponent;