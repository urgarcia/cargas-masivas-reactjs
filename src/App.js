
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuthContext from './context/authContext';

import LoginComponent from './components/auth/login';
import './styles/App.css';
import Layout from './components/layout/layout';
import AuthWrapper from './protectedWrapper/authWrapper';


function App() {
  const [state, setState] = useState({
    user: {}, token: null 
  });

  const logout = () =>{
    setState({user: {}, token: null})
  }
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setState(userData)
    }
  }, []);

  return (
    <Router>

      <AuthContext.Provider value={{...state, logout}}>

        <Routes>
          {state.token ? (
            <Route path="/*"  element={
              <AuthWrapper>
                <Layout />
              </AuthWrapper>
            }
            />
          ) : (
            <Route path="/" element={<LoginComponent setAppState={setState} appState={state} />} /> // Reemplaza con tu componente de login
          )}
        </Routes>

      </AuthContext.Provider>

    </Router>
  );
}

export default App;
