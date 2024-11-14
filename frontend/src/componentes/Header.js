import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate de react-router-dom para redireccionar sin recargar la página

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const navigate = useNavigate(); // Hook de navegación

  useEffect(() => {
    const updateLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    // Escucha cambios en el almacenamiento para actualizar el estado de inicio de sesión
    window.addEventListener("storage", updateLoginStatus);

    // Limpia el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("storage", updateLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate('/'); // Redirecciona sin recargar la página
  };

  return (
    <header className="bg-dark text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="m-0">CLAREMM</h1>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link text-white" href="/">Inicio</a>
            </li>
            {isLoggedIn ? (
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={handleLogout}>Cerrar sesión</button>
              </li>
            ) : (
              <li className="nav-item">
                <a className="nav-link text-white" href="/login">Login</a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
