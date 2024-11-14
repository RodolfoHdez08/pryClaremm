import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/password/enviarcodigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email }),
      });

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setMessage('Error al enviar el correo.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-5" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="card-title text-center mb-4">Recuperación de Contraseña</h2>

        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label">Correo electrónico:</label>
            <input
              type="email"
              className="form-control"
              id="correo"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Enviar Token</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
