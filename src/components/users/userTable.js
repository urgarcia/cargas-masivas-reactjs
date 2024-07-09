import { useContext, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FiMapPin } from 'react-icons/fi';
import { MdOutlineContactPhone } from 'react-icons/md';
import { AxiosWithHeader } from '../../services/httpService';
import AuthContext from '../../context/authContext';
import UserCardPhoneDetail from './userCardPhoneDetail';
import UserCardAddressDetail from './userCardAddressDetail';

const UserTableComponent = (props) => {
    const { } = props;
    const authContext = useContext(AuthContext)
    const [state, setState] = useState({
        loading: true,
        columns: [
            { name: 'ID', selector: row => row.id, },
            { name: 'Nombre', selector: row => row.nombre, },
            { name: 'Paterno', selector: row => row.paterno, },
            { name: 'Materno', selector: row => row.materno, },
        ],
        data: [],
    });
    const ExpandedComponent = ({ data }) => <>
        <div className="flex flex-wrap px-1 py-2 gap-4 bg-neutral-100">
            <div className="flex flex-col flex-wrap max-w-[45vw] min-w-[45vw] overflow-x-hidden">
                <div className='flex gap-2 border-b-[1px] border-neutral-300'>
                    <MdOutlineContactPhone />
                    <div>Teléfonos registrados</div>
                </div>
                <div className='flex gap-2 mt-2 overflow-x-scroll w-full'>
                    {  data.telefonos.map( (detail) => <UserCardPhoneDetail detail={detail} /> ) }
                </div>
            </div>
            <div className="flex flex-col flex-wrap max-w-[45vw] min-w-[45vw] overflow-x-hidden">
                <div className='flex gap-2 border-b-[1px] border-neutral-300'>
                    <FiMapPin />
                    <div>Direcciones registradas</div>
                </div>
                <div className='flex gap-2 mt-2 overflow-x-scroll w-full'>
                    {  data.direcciones.map( (detail) => <UserCardAddressDetail detail={detail} /> ) }
                </div>
            </div>
        </div>
        
    </>;

    useEffect(() => {
        AxiosWithHeader("/api/people", "GET", null, authContext.token).then((peopleResponse) => {
            setState({...state, data: peopleResponse.data, loading: false})
        }).catch(() => {
            setState({...state, loading: false})
        })
    }, [])
    return (
        <>
            <DataTable
                columns={state.columns}
                data={state.data}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                pagination
                progressPending={state.loading}
            />
        </>
    );
}

export default UserTableComponent;