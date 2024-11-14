import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

const Footer = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [latestPolicies, setLatestPolicies] = useState([]);
  const [latestTerms, setLatestTerms] = useState([]);
  const [latestDisclaimer, setLatestDisclaimer] = useState(null);

  // Fetch social links
  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/social-links');
        const activeLinks = response.data.filter(link => link.status === 'active');
        setSocialLinks(activeLinks);
      } catch (error) {
        console.error('Error fetching social links:', error);
      }
    };

    fetchSocialLinks();
  }, []);

  // Fetch latest policies
  useEffect(() => {
    const fetchLatestPolicies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/policies');
        const latestPolicy = response.data.reduce((prev, current) => {
          return (prev.version > current.version) ? prev : current;
        });
        setLatestPolicies([latestPolicy]);
      } catch (error) {
        console.error('Error fetching policies:', error);
      }
    };

    fetchLatestPolicies();
  }, []);

  // Fetch latest terms
  useEffect(() => {
    const fetchLatestTerms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/terms');
        const latestTerm = response.data.reduce((prev, current) => {
          return (prev.version > current.version) ? prev : current;
        });
        setLatestTerms([latestTerm]);
      } catch (error) {
        console.error('Error fetching terms:', error);
      }
    };

    fetchLatestTerms();
  }, []);

  // Fetch latest disclaimer
  useEffect(() => {
    const fetchLatestDisclaimer = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/legal-boundaries');
        const latestDisclaimer = response.data.reduce((prev, current) => {
          return (prev.version > current.version) ? prev : current;
        });
        setLatestDisclaimer(latestDisclaimer);
      } catch (error) {
        console.error('Error fetching disclaimer version:', error);
      }
    };

    fetchLatestDisclaimer();
  }, []);

  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="footer-rights mb-0">CLAREMM</p>
          </div>
          
          {/* Redes sociales */}
          <div className="col-md-6 d-flex justify-content-end align-items-center">
            <div className="social-icons">
              {socialLinks.map(link => (
                <a 
                  key={link._id} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={link.platform} 
                  className="text-white mx-2"
                >
                  <FontAwesomeIcon icon={
                    link.platform === 'Facebook' ? faFacebookF :
                    link.platform === 'Instagram' ? faInstagram :
                    link.platform === 'WhatsApp' ? faWhatsapp : null
                  } />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="row mt-3">
          {/* Enlaces legales */}
          <div className="col-md-6">
            <ul className="list-unstyled">
              {latestPolicies.map(policy => (
                <li key={policy._id}>
                  <Link to={`/politicas/${policy._id}`} className="text-white">
                    {policy.title}
                  </Link>
                </li>
              ))}
              {latestTerms.map(term => (
                <li key={term._id}>
                  <Link to={`/terminos/${term._id}`} className="text-white">
                    {term.title}
                  </Link>
                </li>
              ))}
              {latestDisclaimer && (
                <li key={latestDisclaimer._id}>
                  <Link to={`/deslinde/${latestDisclaimer._id}`} className="text-white">
                    {latestDisclaimer.title}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
