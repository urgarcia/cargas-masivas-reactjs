import { useEffect, useState } from 'react';
import SpinnerComponent from '../utilities/spinner';
 
const SplashScreenComponent = (props) => {
    const {loading} = props;
    const [state, setState] = useState({});
    useEffect(() => {
    },[])
    return (
        <>
            <div className="flex flex-wrap justify-center items-center h-screen ">
                <SpinnerComponent ></SpinnerComponent>
            </div>
        </>
    );
}
 
export default SplashScreenComponent;