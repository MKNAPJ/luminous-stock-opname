'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export default function InputStockOpname() {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    let photoUrl = '';
    if (photo) {
      const fileExt = photo.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from('photos')
        .upload(fileName, photo);

      if (uploadError) {
        setMessage('Upload foto gagal');
        return;
      }

      photoUrl = `https://ptyufinlyvmlzgcqaseo.supabase.co/storage/v1/object/public/photos/${fileName}`;
    }

    const { error } = await supabase.from('stock_opname').insert([{
      product_name: productName,
      quantity,
      notes,
      photo_url: photoUrl,
    }]);

    if (error) {
      setMessage('Gagal simpan data');
    } else {
      setMessage('Berhasil disimpan!');
      setProductName('');
      setQuantity(1);
      setNotes('');
      setPhoto(null);
    }
  };

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Input Stock Opname</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nama Produk"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Jumlah"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Keterangan"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files?.[0] || null)}
        />
        <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded">
          Simpan
        </button>
      </form>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </main>
  );
}
