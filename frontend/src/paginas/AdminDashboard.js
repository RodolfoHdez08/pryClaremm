import React, { useState } from 'react';
import PoliticaCrud from '../componentes/PoliticaCrud';
import TermsCrud from '../componentes/TermsCrud';
import SocialLinksManager from '../componentes/RedSocialLinks';
import LegalBoundaryCrud from '../componentes/LegalCrud';
import SloganManager from '../componentes/SloganAdmin';
import LogoAdmin from '../componentes/LogoAdmin';
import ContactEdit from '../componentes/ContactEdit'; 
import AuditLogs from '../componentes/AuditLogs';

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderContent = () => {
    switch (activeComponent) {
      case 'policy':
        return (
          <div className="card shadow p-4">
            <PoliticaCrud />
          </div>
        );
      case 'terms':
        return (
          <div className="card shadow p-4">
            <TermsCrud />
          </div>
        );
      case 'socialLinks':
        return (
          <div className="card shadow p-4">
            <SocialLinksManager />
          </div>
        );
      case 'legalBoundary':
        return (
          <div className="card shadow p-4">
            <LegalBoundaryCrud />
          </div>
        );
      case 'slogan':
        return (
          <div className="card shadow p-4">
            <SloganManager />
          </div>
        );
        case 'logoAd':
        return (
          <div className="card shadow p-4">
            <LogoAdmin />
          </div>
        );
        case 'contactedit':
        return (
          <div className="card shadow p-4">
            <ContactEdit />
          </div>
        );
        case 'hist-sesion':
        return (
          <div className="card shadow p-4">
            <AuditLogs />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Panel de Administrador</h1>
      <div className="row g-4">
        {!activeComponent && (
          <>
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Gestión de Políticas</h5>
                  <p className="card-text">Administra las políticas de privacidad del sistema.</p>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => setActiveComponent('policy')}
                  >Explorar la Gestión de Políticas
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Gestión de Términos</h5>
                  <p className="card-text">Administra los términos y condiciones del sistema.</p>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => setActiveComponent('terms')}
                  >Administrar Términos y Condiciones
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Gestión de Redes Sociales</h5>
                  <p className="card-text">Administra los enlaces de redes sociales del sistema.</p>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => setActiveComponent('socialLinks')}
                  >Personalizar las Redes Sociales
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Gestión de Deslindes Legales</h5>
                  <p className="card-text">Administra los deslindes legales del sistema.</p>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => setActiveComponent('legalBoundary')}
                  >Gestionar Ahora el Eslogan
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Gestión de Eslogan</h5>
                  <p className="card-text">Administra el eslogan de la empresa.</p>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => setActiveComponent('slogan')}
                  >Acceder a Deslindes Legales
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Gestión de logo.</h5>
                  <p className="card-text">Administra el logo.</p>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => setActiveComponent('logoAd')}
                    >Acceder a administracion del logo.
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Gestión de Contacto.</h5>
                  <p className="card-text">Administra el contacto.</p>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => setActiveComponent('contactedit')}
                    >Acceder a administracion de contacto.
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Gestión de Contacto.</h5>
                  <p className="card-text">Administra el contacto.</p>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => setActiveComponent('hist-sesion')}
                    >Acceder a administracion de contacto.
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {activeComponent && (
        <div className="mt-5">
          <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
            <button
              className="btn btn-warning mb-3 w-10 p-3 rounded-3 fw-bold shadow-lg hover-shadow-lg"
              style={{
                transition: 'transform 0.3s ease, background-color 0.3s ease',
              }}
              onClick={() => setActiveComponent(null)}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Regresar
            </button>


          </div>

          {renderContent()}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
