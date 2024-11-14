import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../apiConfig';

const PoliticaCrud = () => {
  const [policies, setPolicies] = useState([]);
  const [newPolicy, setNewPolicy] = useState({ title: '', content: '' });
  const [editingPolicy, setEditingPolicy] = useState(null);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const response = await axios.get(`${API_URL}/policies`);
      setPolicies(response.data);
    } catch (error) {
      console.error('Error al obtener las políticas:', error);
    }
  };

  const handleCreatePolicy = async () => {
    if (!newPolicy.title || !newPolicy.content) {
      console.error('Título y contenido no pueden estar vacíos');
      return;
    }

    try {
      await axios.post(`${API_URL}/policies`, newPolicy);
      setNewPolicy({ title: '', content: '' });
      fetchPolicies();
    } catch (error) {
      console.error('Error al crear la política:', error);
    }
  };

  const handleEditPolicy = (policy) => {
    setEditingPolicy(policy);
  };

  const handleSavePolicy = async () => {
    if (!editingPolicy || !editingPolicy.title || !editingPolicy.content) {
      console.error('Título y contenido no pueden estar vacíos');
      return;
    }

    try {
      await axios.put(`${API_URL}/policies/${editingPolicy._id}`, editingPolicy);
      setEditingPolicy(null);
      fetchPolicies();
    } catch (error) {
      console.error('Error al guardar la nueva versión de la política:', error);
    }
  };

  const handleDeletePolicy = async (id) => {
    try {
      await axios.delete(`${API_URL}/policies/${id}`);
      fetchPolicies();
    } catch (error) {
      console.error('Error al eliminar la política:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gestión de Políticas</h2>

      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5>Crear Nueva Política</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Título de la política"
              value={newPolicy.title}
              onChange={(e) => setNewPolicy({ ...newPolicy, title: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Contenido</label>
            <textarea
              className="form-control"
              id="content"
              rows="3"
              placeholder="Contenido de la política"
              value={newPolicy.content}
              onChange={(e) => setNewPolicy({ ...newPolicy, content: e.target.value })}
            />
          </div>
          <button className="btn btn-success w-100" onClick={handleCreatePolicy}>
            Crear Política
          </button>
        </div>
      </div>

      <h3 className="mb-3">Políticas Existentes</h3>
      <div className="list-group">
        {policies.map((policy) => (
          <div key={policy._id} className="list-group-item list-group-item-action mb-2 shadow-sm">
            {editingPolicy && editingPolicy._id === policy._id ? (
              <div>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    value={editingPolicy.title}
                    onChange={(e) => setEditingPolicy({ ...editingPolicy, title: e.target.value })}
                  />
                </div>
                <div className="mb-2">
                  <textarea
                    className="form-control"
                    rows="3"
                    value={editingPolicy.content}
                    onChange={(e) => setEditingPolicy({ ...editingPolicy, content: e.target.value })}
                  />
                </div>
                <button className="btn btn-primary btn-sm me-2" onClick={handleSavePolicy}>
                  Guardar Cambios
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setEditingPolicy(null)}>
                  Cancelar
                </button>
              </div>
            ) : (
              <div>
                <h5>
                  {policy.title} {policy.isCurrent && <span className="badge bg-success">Vigente</span>}
                </h5>
                <p>{policy.content}</p>
                <small className="text-muted">Versión: {policy.version || 1} | Fecha: {new Date(policy.createdAt).toLocaleString()}</small>
                <div className="mt-2">
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditPolicy(policy)}>
                    Editar
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeletePolicy(policy._id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoliticaCrud;
