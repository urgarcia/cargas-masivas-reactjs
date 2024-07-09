import { useContext, useEffect, useState } from 'react';
import { MdHome, MdPerson, MdSettings, MdWallet } from 'react-icons/md';
import AuthContext from '../../context/authContext';
import { SiMicrosoftexcel } from 'react-icons/si';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation

const BottomMenuComponent = (props) => {
  const { authorizedMenus } = props;
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation hook

  const [state, setState] = useState({
    menuItems: authContext.user.roles[0].menus,
    iconMapper: {
      'MdHome': <MdHome size={30} className='' />,
      'SiMicrosoftexcel': <SiMicrosoftexcel size={30} className='' />,
      'MdPerson': <MdPerson size={30} className='' />,
    },
  });

  useEffect(() => {
    const fetchMenus = async () => {
      const response = await fetch('/api/menus'); // Replace with your API endpoint
      const data = await response.json();
      setState({ ...state, menuItems: data.filter((item) => authorizedMenus.includes(item.id)) });
    };
    fetchMenus();
  }, [authorizedMenus]); // Re-fetch menus if authorizedMenus changes

  return (
    <>
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-neutral-200 dark:border-gray-200">
        <div className="flex h-full max-w-lg mx-auto font-medium justify-center">
          {state.menuItems.map((menuItem) => {
            const isActive = location.pathname === menuItem.url; // Check if path matches
            const buttonClassName = `inline-flex flex-col items-center justify-center px-5 text-neutral-600 ${
              isActive ? 'bg-gray-100 dark:bg-neutral-200' : 'hover:bg-gray-50 dark:hover:bg-gray-500'
            } group hover:text-neutral-200 ease-in duration-300`;

            return (
              <button
                key={menuItem.id}
                type="button"
                className={buttonClassName}
                onClick={() => navigate(menuItem.url)}
              >
                {state.iconMapper[menuItem.icon]}
                <span className="text-sm text-gray-500 dark:text-gray-600 group-hover:text-blue-600 dark:group-hover:text-neutral-100">
                  {menuItem.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BottomMenuComponent;
