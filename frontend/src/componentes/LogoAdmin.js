import React, { useState } from 'react';
import axios from 'axios';

const LogoAdmin = () => {
  const [logo, setLogo] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Manejo de cambio de archivo
  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    // Validación del tamaño del archivo (máximo 2 MB)
    if (file && file.size > 2 * 1024 * 1024) {
      setError('El tamaño del archivo debe ser menor a 2 MB');
      return;
    }

    setLogo(file);
    setError(null); // Resetea el mensaje de error al seleccionar un nuevo archivo
  };

  // Envío del formulario
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!logo) {
      setError('Por favor, selecciona un archivo de imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('logo', logo);

    try {
      const response = await axios.post('http://localhost:5000/api/logo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('Logo actualizado exitosamente.');
      setLogo(null); // Resetea el logo después de subirlo
    } catch (error) {
      console.error('Error al subir el logo:', error);
      setError('Error al subir el logo. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Subida y Actualización del Logo</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleFormSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label htmlFor="logo" className="form-label">Selecciona el logo:</label>
          <input
            type="file"
            id="logo"
            accept=".jpeg,.jpg,.png"
            onChange={handleLogoChange}
            className="form-control"
            required
          />
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">Actualizar Logo</button>
        </div>
      </form>
    </div>
  );
};

export default LogoAdmin;
