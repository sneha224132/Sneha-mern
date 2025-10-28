import React, { useState } from 'react';
import API from '../api/api';

export default function EditBookModal({ book, onClose, onUpdated }) {
  const [form, setForm] = useState({
    title: book.title, author: book.author, genre: book.genre, price: book.price, stock: book.stock, publishedYear: book.publishedYear || ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock), publishedYear: form.publishedYear ? Number(form.publishedYear) : undefined };
      const res = await API.put(`/api/books/${book._id}`, payload);
      onUpdated(res.data);
    } catch (err) {
      console.error(err);
      alert('Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <h5 className="modal-title">Edit Book</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          <input name="title" className="form-control mb-2" value={form.title} onChange={handleChange} />
          <input name="author" className="form-control mb-2" value={form.author} onChange={handleChange} />
          <input name="genre" className="form-control mb-2" value={form.genre} onChange={handleChange} />
          <input name="price" type="number" className="form-control mb-2" value={form.price} onChange={handleChange} />
          <input name="stock" type="number" className="form-control mb-2" value={form.stock} onChange={handleChange} />
          <input name="publishedYear" type="number" className="form-control mb-2" value={form.publishedYear} onChange={handleChange} />
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </div>
  );
}