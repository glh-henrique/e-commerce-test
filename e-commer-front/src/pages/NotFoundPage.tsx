import React from 'react';
import { Link } from 'react-router-dom';
const NotFoundPage: React.FC = () => (
  <div className="p-4 text-center"><h2>Page Not Found</h2><Link to="/products" className="text-blue-500">Go Home</Link></div>
);
export default NotFoundPage;