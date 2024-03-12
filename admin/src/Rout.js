import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Adminlog } from './pages/adminlog';
import { Edit } from './pages/edit';
import { Display } from './pages/display';
import { Details } from './pages/details';
import {Show} from './pages/show';

export const Rout = () => {
     return (
          <Router>
               <Routes>
                    <Route path="" element={<Adminlog />} />
                    <Route path="display" element={<Display />} />
                    <Route path="details" element={<Details />} />
                    <Route path="edit/:id" element={<Edit/>} />
                    <Route path="show/" element={<Show/>}/>
               </Routes>
          </Router>
     );
};
