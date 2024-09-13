import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Patientregister from './pages/Patientregister';
import Addtimeslot from './components/addTimeslot';
import Appoinment from './pages/appoinment';

import Home from './pages/Home'; 
import Doctordashboard from './components/doctorDashboard';
import Dailyappoinment from './components/dailyappoinment';
import Medicalhistory from './pages/medicalhistory';
import Viewtimeslot from './components/viewTimeslot';
import Registermedicine from './components/registerMedicine';
import Addrecord from './pages/addrecord';
import Addpatient from './components/addPatients';

import AllocateDrugs from './components/allocateDrugs';
import Adduser from './components/adduser';
import ViewRecord from './components/viewRecord';
import Invoice from './components/invoice';
import AvailableTimeslots from './components/availableTimeslot';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Patientregister />} />
          <Route path="/Appoinment" element={<Appoinment />} />
         
          <Route path="/add-user" element={<Adduser/>}/>
          <Route path="/available-time" element={<AvailableTimeslots/>}/>
        
          
          
          
          {/* Doctor Dashboard Routes */}
          <Route path="/dashboard/*" element={<Doctordashboard />}>
            <Route path="" element={<Medicalhistory/>} />
            
            <Route path="daily-appointments" element={<Dailyappoinment />} />
            <Route path="view-timeslots" element={<Viewtimeslot/>}/>
            <Route path="register-medicines" element={<Registermedicine/>}/>
            <Route path="addrecord/:patientId" element={<Addrecord/>}/>
            <Route path="add-patient" element={<Addpatient/>}/>
             <Route path="allocate-drugs/:patientId/:serialNumber" element={<AllocateDrugs />} /> 
             <Route path="view-record/:patientId/:serial_no" element={<ViewRecord/>}/> 
             <Route path="add-timeslot" element={<Addtimeslot/>}/>
             
             <Route path="invoice/:patientId/:serial_no" element={<Invoice/>}/>
             
             
          </Route>
        </Routes>
      </BrowserRouter>
      <br></br>
      
    </div>
  );
}

export default App;
