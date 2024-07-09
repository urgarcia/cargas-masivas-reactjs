
import { Route, Routes } from 'react-router-dom';
import HomeComponent from '../home/home';
import WelcomeComponent from './welcome';
import BottomMenuComponent from './bottomMenu';
import UsersListComponent from '../users/usersList';
import ProfileComponent from '../profile/profile';
import AdminWrapper from '../../protectedWrapper/adminWrapper';
 
function Layout() {
    return (
        <>
            <div className="flex flex-wrap flex-col">
                <WelcomeComponent />
                <div className='flex flex-wrap flex-col mb-[4rem]'>
                    <Routes>
                        <Route path="/" element={<UsersListComponent />} />
                        <Route path="/profile" element={<ProfileComponent />} />
                            <Route path="/uploadFile" element={
                                <AdminWrapper >
                                    <HomeComponent />
                                </AdminWrapper>
                            }/>
                    </Routes>
                </div>
                <BottomMenuComponent authorizedMenus={[1,2]}/>

            </div>
        </>
    );
}
export default Layout;
 