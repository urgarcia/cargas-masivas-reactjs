import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FiMapPin } from 'react-icons/fi';
import { MdOutlineContactPhone } from 'react-icons/md';

const UserTableComponent = (props) => {
    const { } = props;
    const [state, setState] = useState({
        columns: [
            { name: 'ID', selector: row => row.title, },
            { name: 'Nombre', selector: row => row.title, },
            { name: 'Paterno', selector: row => row.year, },
            { name: 'Materno', selector: row => row.year, },
        ],
        data: [
            { id: 1, title: 'Beetlejuice', year: '1988', },
            { id: 2, title: 'Ghostbusters', year: '1984', },
        ],
    });
    const ExpandedComponent = ({ data }) => <>
        <div className="flex flex-wrap px-1 py-2 gap-2 justify-between bg-neutral-100">
            <div className="flex flex-col flex-wrap">
                <div className='flex gap-2 border-b-[1px] border-neutral-300'>
                    <MdOutlineContactPhone />
                    <div>Teléfonos registrados</div>
                </div>
                <div className='flex'>{JSON.stringify(data, null, 2)}</div>
            </div>
            <div className="flex flex-col flex-wrap">
                <div className='flex gap-2 border-b-[1px] border-neutral-300'>
                    <FiMapPin />
                    <div>Direcciones registradas</div>
                </div>
                <div className='flex'>{JSON.stringify(data, null, 2)}</div>
            </div>
        </div>
        
    </>;

    useEffect(() => {
    }, [])
    return (
        <>
            <DataTable
                columns={state.columns}
                data={state.data}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                pagination
            />
        </>
    );
}

export default UserTableComponent;