import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../apiConfig';

const TermsCrud = () => {
  const [terms, setTerms] = useState([]);
  const [newTerm, setNewTerm] = useState({ title: '', content: '' });
  const [editingTerm, setEditingTerm] = useState(null);

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      const response = await axios.get(`${API_URL}/terms`);
      setTerms(response.data);
    } catch (error) {
      console.error('Error al obtener los términos:', error);
    }
  };

  const handleCreateTerm = async () => {
    if (!newTerm.title || !newTerm.content) {
      console.error('Título y contenido no pueden estar vacíos');
      return;
    }

    try {
      await axios.post(`${API_URL}/terms`, newTerm);
      setNewTerm({ title: '', content: '' });
      fetchTerms();
    } catch (error) {
      console.error('Error al crear el término:', error);
    }
  };

  const handleEditTerm = (term) => {
    setEditingTerm(term);
  };

  const handleSaveTerm = async () => {
    if (!editingTerm || !editingTerm.title || !editingTerm.content) {
      console.error('Título y contenido no pueden estar vacíos');
      return;
    }

    try {
      await axios.put(`${API_URL}/terms/${editingTerm._id}`, editingTerm);
      setEditingTerm(null);
      fetchTerms();
    } catch (error) {
      console.error('Error al guardar el término:', error);
    }
  };

  const handleDeleteTerm = async (id) => {
    try {
      await axios.delete(`${API_URL}/terms/${id}`);
      fetchTerms();
    } catch (error) {
      console.error('Error al eliminar el término:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gestión de Términos y Condiciones</h2>

      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-info text-white">
          <h5>Crear Nuevo Término</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Título del término"
              value={newTerm.title}
              onChange={(e) => setNewTerm({ ...newTerm, title: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Contenido</label>
            <textarea
              className="form-control"
              id="content"
              rows="3"
              placeholder="Contenido del término"
              value={newTerm.content}
              onChange={(e) => setNewTerm({ ...newTerm, content: e.target.value })}
            />
          </div>
          <button className="btn btn-success w-100" onClick={handleCreateTerm}>
            Crear Término
          </button>
        </div>
      </div>

      <h3 className="mb-3">Términos Existentes</h3>
      <div className="list-group">
        {terms.map((term) => (
          <div key={term._id} className="list-group-item list-group-item-action mb-2 shadow-sm">
            {editingTerm && editingTerm._id === term._id ? (
              <div>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    value={editingTerm.title}
                    onChange={(e) => setEditingTerm({ ...editingTerm, title: e.target.value })}
                  />
                </div>
                <div className="mb-2">
                  <textarea
                    className="form-control"
                    rows="3"
                    value={editingTerm.content}
                    onChange={(e) => setEditingTerm({ ...editingTerm, content: e.target.value })}
                  />
                </div>
                <button className="btn btn-primary btn-sm me-2" onClick={handleSaveTerm}>
                  Guardar Cambios
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setEditingTerm(null)}>
                  Cancelar
                </button>
              </div>
            ) : (
              <div>
                <h5>
                  {term.title} <small className="text-muted">(v.{term.version})</small>
                </h5>
                <p>{term.content}</p>
                <small className="text-muted">Creado el: {new Date(term.createdAt).toLocaleString()}</small>
                <div className="mt-2">
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditTerm(term)}>
                    Editar
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTerm(term._id)}>
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

export default TermsCrud;
