import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ correo: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadRecaptcha = () => {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };
    loadRecaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recaptchaResponse = document.querySelector('#g-recaptcha-response').value;

    if (!recaptchaResponse) {
      setErrorMessage('Por favor completa el reCAPTCHA');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken: recaptchaResponse }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Inicio de sesión exitoso.');
        setErrorMessage('');
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('userRole', result.user.role);
        localStorage.setItem("isLoggedIn", "true");

        if (result.user.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setSuccessMessage('');
        setErrorMessage(result.message || 'Error al iniciar sesión.');
      }
    } catch (error) {
      alert('Error de red al iniciar sesión.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
        
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              id="correo"
              placeholder="Correo"
              value={formData.correo}
              onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <div className="g-recaptcha" data-sitekey="6Lc5pV0qAAAAAFyeHTlFcFJOlMWTXzQGwlbeA88_"></div>
          </div>

          <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
        </form>

        <div className="text-center mt-3">
          <a href="/registro" className="text-decoration-none">Registrarse </a>|
          <a href="/forgot-password" className="text-decoration-none"> ¿Olvidaste la contraseña?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
