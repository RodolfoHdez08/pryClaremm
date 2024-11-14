import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../apiConfig';

const LegalBoundaryCrud = () => {
  const [legalBoundaries, setLegalBoundaries] = useState([]);
  const [newLegalBoundary, setNewLegalBoundary] = useState({ title: '', content: '' });
  const [editingLegalBoundary, setEditingLegalBoundary] = useState(null);

  useEffect(() => {
    fetchLegalBoundaries();
  }, []);

  // Fetch all legal boundaries
  const fetchLegalBoundaries = async () => {
    try {
      const response = await axios.get(`${API_URL}/legal-boundaries`);
      setLegalBoundaries(response.data);
    } catch (error) {
      console.error('Error al cargar los deslindes legales. Verifica tu conexión e intenta nuevamente.', error);
    }
  };

  // Create a new legal boundary
  const handleCreateLegalBoundary = async () => {
    if (!newLegalBoundary.title || !newLegalBoundary.content) {
      alert('¡Faltan datos! Asegúrate de completar ambos campos: título y contenido.');
      return;
    }
    try {
      await axios.post(`${API_URL}/legal-boundaries`, newLegalBoundary);
      setNewLegalBoundary({ title: '', content: '' });
      fetchLegalBoundaries();
    } catch (error) {
      console.error('¡Vaya! Algo salió mal al crear el deslinde legal.', error);
    }
  };

  // Save changes to an edited legal boundary
  const handleSaveLegalBoundary = async () => {
    if (!editingLegalBoundary || !editingLegalBoundary.title || !editingLegalBoundary.content) {
      alert('¡Por favor! Asegúrate de llenar tanto el título como el contenido.');
      return;
    }
    try {
      await axios.put(`${API_URL}/legal-boundaries/${editingLegalBoundary._id}`, editingLegalBoundary);
      setEditingLegalBoundary(null);
      fetchLegalBoundaries();
    } catch (error) {
      console.error('Hubo un error al guardar el deslinde legal. Intenta nuevamente.:', error);
    }
  };

  // Delete a legal boundary
  const handleDeleteLegalBoundary = async (id) => {
    try {
      await axios.delete(`${API_URL}/legal-boundaries/${id}`);
      fetchLegalBoundaries();
    } catch (error) {
      console.error('Hubo un error al eliminar el deslinde legal. Por favor, intenta de nuevo.', error);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Gestiona tus Deslindes Legales</h2>

      {/* Form to create a new legal boundary */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">Crear un Nuevo Límite Legal</div>
        <div className="card-body">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateLegalBoundary();
            }}
          >
            <div className="mb-3">
              <label className="form-label">Título del Deslinde</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa el título"
                value={newLegalBoundary.title}
                onChange={(e) => setNewLegalBoundary({ ...newLegalBoundary, title: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Detalles del Deslinde</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Ingresa los detalles del deslinde"
                value={newLegalBoundary.content}
                onChange={(e) => setNewLegalBoundary({ ...newLegalBoundary, content: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Registrar Nuevo Deslinde</button>
          </form>
        </div>
      </div>

      {/* List of existing legal boundaries */}
      <div className="card">
        <div className="card-header bg-secondary text-white">Deslindes Registrados</div>
        <div className="card-body">
          {legalBoundaries.length === 0 ? (
            <p className="text-center">Aún no hay deslindes legales. ¡Crea uno ahora!</p>
          ) : (
            <ul className="list-group">
              {legalBoundaries.map((legalBoundary) => (
                <li key={legalBoundary._id} className="list-group-item">
                  {editingLegalBoundary && editingLegalBoundary._id === legalBoundary._id ? (
                    <div>
                      <input
                        type="text"
                        className="form-control mb-2"
                        value={editingLegalBoundary.title}
                        onChange={(e) =>
                          setEditingLegalBoundary({ ...editingLegalBoundary, title: e.target.value })
                        }
                      />
                      <textarea
                        className="form-control mb-2"
                        rows="3"
                        value={editingLegalBoundary.content}
                        onChange={(e) =>
                          setEditingLegalBoundary({ ...editingLegalBoundary, content: e.target.value })
                        }
                      />
                      <button className="btn btn-success me-2" onClick={handleSaveLegalBoundary}>
                      Guardar ahora
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setEditingLegalBoundary(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h5>{legalBoundary.title}</h5>
                      <p>{legalBoundary.content}</p>
                      <small className="text-muted">
                      Versión Actual: {legalBoundary.version || 1} | Created: {new Date(legalBoundary.createdAt).toLocaleString()}
                      </small>
                      <div className="mt-2">
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => setEditingLegalBoundary(legalBoundary)}
                        >
                          Modificar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteLegalBoundary(legalBoundary._id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default LegalBoundaryCrud;
