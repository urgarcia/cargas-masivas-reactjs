
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, redirect } from 'react-router-dom';
import AuthContext from './context/authContext';

import LoginComponent from './components/auth/login';
import './styles/App.css';
import Layout from './components/layout/layout';
import AuthWrapper from './protectedWrapper/authWrapper';
import SplashScreenComponent from './components/layout/splashScreen';


function App() {
  const [state, setState] = useState({
    user: {}, token: null , loading: true
  });

  const logout = () =>{
    redirect('/')
    setState({user: {}, token: null, loading: false})
  }
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setState({...JSON.parse(userData), loading: false })
    }
  }, []);

  return (
    <>
      {state.loading ? 
        <SplashScreenComponent/>:       
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
                <Route path="/*" element={<LoginComponent setAppState={setState} appState={state} />} /> // Reemplaza con tu componente de login
              )}
            </Routes>

          </AuthContext.Provider>

        </Router>
      }
    </>
  );
}

export default App;
