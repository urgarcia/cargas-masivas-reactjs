
import { Route, Routes } from 'react-router-dom';
import HomeComponent from '../home/home';
import WelcomeComponent from './welcome';
import BottomMenuComponent from './bottomMenu';
import UsersListComponent from '../users/usersList';
import ProfileComponent from '../profile/profile';
 
function Layout() {
    return (
        <>
            <div className="flex flex-wrap flex-col">
                <WelcomeComponent />
                <Routes>
                    <Route path="/" element={<UsersListComponent />} />
                    <Route path="/uploadFile" element={<HomeComponent />} />
                    <Route path="/profile" element={<ProfileComponent />} />
                </Routes>
                <BottomMenuComponent authorizedMenus={[1,2]}/>

            </div>
        </>
    );
}
export default Layout;
 