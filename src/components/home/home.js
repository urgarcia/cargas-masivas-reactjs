import { useEffect, useState } from 'react';
import DragComponent from '../dragDrop/dragContainer';
import WelcomeComponent from './welcome';
import BottomMenuComponent from '../layout/bottomMenu';
 
const HomeComponent = (props) => {
    const {} = props;
    const [state, setState] = useState({
        authorizedMenus: [1,2]
    });
    useEffect(() => {
    },[])
    return (
        <>

            <div className="flex flex-wrap flex-col">
                <WelcomeComponent />
                <DragComponent />
                <BottomMenuComponent authorizedMenus={state.authorizedMenus}/>
            </div>
        </>
    );
}
 
export default HomeComponent;