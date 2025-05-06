import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Loading from '../components/Loading';
import api from '../services/api';


const ProductFormPage: React.FC = () => {
  const nav = useNavigate();
  const { id } = useParams<{id:string}>();
  const editMode = Boolean(id);
  const [form, setForm] = useState({ name:'', price:0, stock:0 });
  const [loading, setLoading] = useState(editMode);

  useEffect(() => {
    if(editMode) api.get(`/products/${id}`)
      .then(r=> setForm(r.data))
      .catch(()=>{})
      .finally(()=> setLoading(false));
  }, [editMode]);

  const submit = (e:React.FormEvent) => {
    e.preventDefault();
    const req = editMode ? api.put(`/products/${id}`, form)
                         : api.post('/products', form);
    req.then(()=> nav('/products')).catch(()=>{});
  };

  return loading ? <Loading /> : (
    <form onSubmit={submit} className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">{editMode ? 'Edit' : 'New'} Product</h2>
      <input type="text" placeholder="Name" value={form.name}
        onChange={e=>setForm({...form, name:e.target.value})}
        className="w-full mb-3 p-2 border rounded" required />
      <input type="number" placeholder="Price" value={form.price}
        onChange={e=>setForm({...form, price: +e.target.value})}
        className="w-full mb-3 p-2 border rounded" required />
      <input type="number" placeholder="Stock" value={form.stock}
        onChange={e=>setForm({...form, stock: +e.target.value})}
        className="w-full mb-3 p-2 border rounded" required />
      <button type="submit" className="px-4 py-2 bg-blue-500 rounded text-white">Save</button>
    </form>
  );
};
export default ProductFormPage;