import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    correo: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordSuggestions, setPasswordSuggestions] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordChange = (e) => {
    const value = e.target.value;

    if (value.length > 16) {
      setErrorMessage('La contraseña no debe tener más de 16 caracteres.');
      return;
    }

    setFormData({ ...formData, password: value });
    setPasswordStrength(checkPasswordStrength(value));
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    const suggestions = [];

    if (password.length >= 8) {
      strength++;
    } else {
      suggestions.push('Debe tener al menos 8 caracteres');
    }
    if (/[A-Z]/.test(password)) {
      strength++;
    } else {
      suggestions.push('Debe incluir al menos una letra mayúscula');
    }
    if (/[a-z]/.test(password)) {
      strength++;
    } else {
      suggestions.push('Debe incluir al menos una letra minúscula');
    }
    if (/[0-9]/.test(password)) {
      strength++;
    } else {
      suggestions.push('Debe incluir al menos un número');
    }
    if (/[\W]/.test(password)) {
      strength++;
    } else {
      suggestions.push('Debe incluir al menos un carácter especial');
    }

    setPasswordSuggestions(suggestions);
    if (strength <= 2) return 'Débil';
    if (strength === 3) return 'Medio';
    if (strength >= 4) return 'Fuerte';
  };

  const validate = () => {
    let newErrors = {};
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;

    if (!formData.nombre.trim() || !nameRegex.test(formData.nombre)) {
      newErrors.nombre = 'El nombre solo debe contener letras, espacios y caracteres válidos (á, é, í, ó, ú, ñ)';
    }
    if (!formData.apellidos.trim() || !nameRegex.test(formData.apellidos)) {
      newErrors.apellidos = 'Los apellidos solo deben contener letras, espacios y caracteres válidos (á, é, í, ó, ú, ñ)';
    }

    if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = 'Correo inválido';
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.telefono)) {
      newErrors.telefono = 'El número de teléfono debe contener exactamente 10 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setErrorMessage('');
        setFormData({
          nombre: '',
          apellidos: '',
          telefono: '',
          correo: '',
          password: '',
          confirmPassword: '',
        });

        alert('Usuario registrado exitosamente.');

        setTimeout(() => navigate('/login'), 100);
      } else {
        setSuccessMessage('');
        setErrorMessage(result.message || 'Error al registrar usuario.');
      }
    } catch (error) {
      setErrorMessage('Error de red al registrar.');
      setSuccessMessage('');
      console.error('Error al registrar:', error);
    }
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h1 className="text-center mb-4">Registro</h1>

        {successMessage && <p className="alert alert-success">{successMessage}</p>}
        {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={(e) => {
                if (/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]*$/.test(e.target.value)) {
                  setFormData({ ...formData, nombre: e.target.value });
                }
              }}
              required
            />
            {errors.nombre && <p className="text-danger">{errors.nombre}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label">Apellidos</label>
            <input
              type="text"
              className="form-control"
              placeholder="Apellidos"
              value={formData.apellidos}
              onChange={(e) => {
                if (/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]*$/.test(e.target.value)) {
                  setFormData({ ...formData, apellidos: e.target.value });
                }
              }}
              required
            />
            {errors.apellidos && <p className="text-danger">{errors.apellidos}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label">Número Telefónico</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Número Telefónico"
              value={formData.telefono}
              onChange={(e) => {
                if (e.target.value === '' || /^\d{0,10}$/.test(e.target.value)) {
                  setFormData({ ...formData, telefono: e.target.value });
                }
              }}
              required
            />
            {errors.telefono && <p className="text-danger">{errors.telefono}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              placeholder="Correo"
              value={formData.correo}
              onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              required
            />
            {errors.correo && <p className="text-danger">{errors.correo}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handlePasswordChange}
              required
            />
            <div className={`mt-2 ${passwordStrength.toLowerCase()}`}>
              Fortaleza: {passwordStrength}
            </div>
            {passwordSuggestions.length > 0 && (
              <ul className="mt-2 text-warning">
                {passwordSuggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            )}
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label">Confirmar Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirmar Contraseña"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
            {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" className="btn btn-primary w-100">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
