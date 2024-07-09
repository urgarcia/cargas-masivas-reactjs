import { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import TitlePageComponent from '../utilities/titlePage';
import UserTableComponent from './userTable';

const UsersListComponent = (props) => {
    const { } = props;
    const [state, setState] = useState({});
    useEffect(() => {
    }, [])
    return (
        <>
            <div className="flex flex-wrap flex-col px-4 py-2">
                <TitlePageComponent Icon={FaUsers} name={"Usuarios"} description={"Consulta los usuarios registrados, telefonos y direcciones"}/>
                <UserTableComponent />
            </div>
        </>
    );
}

export default UsersListComponent;