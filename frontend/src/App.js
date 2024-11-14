import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import Home from './paginas/Home';
import Registro from './paginas/Registro';
import Login from './paginas/Login';
import Dashboard from './paginas/Dashboard';
import AdminDashboard from './paginas/AdminDashboard';
import PoliticaDetalle from './componentes/PoliticaDetalle';
import TermsDetail from './componentes/TermsDetail';
import DeslindeDetalles from './componentes/DeslindeDetalles';
import RecuperacionPassword from './paginas/RecuperacionPassword';
import RestablecerPassword from './paginas/RestablecerPassword';
import ContactEdit from './componentes/ContactEdit'; 
import AuditLogs from './componentes/AuditLogs';
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/politicas/:id" element={<PoliticaDetalle />} />
            <Route path="/terminos/:id" element={<TermsDetail />} />
            <Route path="/deslinde/:id" element={<DeslindeDetalles />} />
            <Route path="/forgot-password" element={<RecuperacionPassword />} />
            <Route path="/reset-password" element={<RestablecerPassword />} />
            <Route path="/contact-edit" element={<ContactEdit />} />
            <Route path="/auditlogs" element={<AuditLogs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
