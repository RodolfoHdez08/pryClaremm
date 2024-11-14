import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SocialLinksManager = () => {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ platform: '', url: '', status: 'active' });

  // Fetch all social links on component mount
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/social-links');
        setLinks(response.data);
      } catch (error) {
        console.error('Ups, algo salió mal al recuperar los enlaces sociales. ¡Intenta de nuevo!', error);
      }
    };

    fetchLinks();
  }, []);

  // Add a new social link
  const addLink = async () => {
    if (!newLink.platform || !newLink.url) {
      alert('¡Faltan algunos datos! Asegúrate de incluir la plataforma y la URL.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/social-links', newLink);
      setLinks([...links, response.data]);
      setNewLink({ platform: '', url: '', status: 'active' });
    } catch (error) {
      console.error('Algo salió mal al agregar el enlace social. ¿Puedes probar de nuevo?', error);
    }
  };

  // Delete a social link
  const deleteLink = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/social-links/${id}`);
      setLinks(links.filter((link) => link._id !== id));
    } catch (error) {
      console.error('Hubo un problema al intentar eliminar el enlace social. Inténtalo de nuevo.', error);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Administrar tus Redes Sociales</h2>

      {/* Form to add a new link */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">Crear Nuevo Enlace</div>
        <div className="card-body">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addLink();
            }}
          >
            <div className="mb-3">
              <label className="form-label">Red Social</label>
              <input
                type="text"
                className="form-control"
                placeholder="Por ejmemplo Facebook, Instagram, Twitter"
                value={newLink.platform}
                onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">URL</label>
              <input
                type="url"
                className="form-control"
                placeholder="Agrega tu enlace, como https://facebook.com/ejemplo"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={newLink.status}
                onChange={(e) => setNewLink({ ...newLink, status: e.target.value })}
              >
                <option value="active">Activo Ahora</option>
                <option value="inactive">Fuera de Servicio</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">
            Agregar URL
            </button>
          </form>
        </div>
      </div>

      {/* List of social links */}
      <div className="card">
        <div className="card-header bg-secondary text-white">Redes Sociales Registrados</div>
        <div className="card-body">
          {links.length === 0 ? (
            <p className="text-center">No hay redes sociales registrados. ¡Añadelo!</p>
          ) : (
            <ul className="list-group">
              {links.map((link) => (
                <li key={link._id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{link.platform}</strong>: <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a> 
                    <span className={`badge ms-2 ${link.status === 'active' ? 'bg-success' : 'bg-warning'}`}>
                      {link.status}
                    </span>
                  </div>
                  <div>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteLink(link._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialLinksManager;
