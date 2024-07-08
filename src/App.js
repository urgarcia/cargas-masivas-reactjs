
import './styles/App.css';
import PeopleListComponent from './components/people/peopleList';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeComponent from './components/home/home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
