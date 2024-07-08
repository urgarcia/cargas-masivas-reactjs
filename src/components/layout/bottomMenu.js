import { useEffect, useState } from 'react';
import { MdHome, MdPerson, MdSettings, MdWallet } from 'react-icons/md';

const BottomMenuComponent = (props) => {
    const { authorizedMenus } = props;

    const [state, setState] = useState({
        menuItems: [],
        iconMapper: {
            'MdHome': <MdHome />,
            'MdWallet': <MdWallet />,
            'MdSettings': <MdSettings />,
            'MdPerson': <MdPerson />,
        }
    });
    useEffect(() => {
        const fetchMenus = async () => {
          const response = await fetch('/api/menus'); // Replace with your API endpoint
          const data = await response.json();
          setState({ ...state, menuItems: data.filter((item) => authorizedMenus.includes(item.id))  });
        };
        fetchMenus();
      }, [authorizedMenus]); // Re-fetch menus if authorizedMenus changes
    
    return (
        <>
            <div class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <div class="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                    {state.menuItems.map((menuItem) => (
                        <button
                            key={menuItem.id}
                            type="button"
                            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                        >
                            <svg
                                className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox={menuItem.iconViewBox} // Use data from backend
                            >
                                <path d={menuItem.iconPath} /> {/* Use data from backend */}
                            </svg>
                            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                                {menuItem.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

export default BottomMenuComponent;