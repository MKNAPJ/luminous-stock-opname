'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

const initialProducts = [
  { kode: 'CTS', nama: 'Calming Tone-up Sunscreen' },
  { kode: 'BBC', nama: 'Blemish Balm BB Cream' },
  { kode: 'BPC', nama: 'Bobble Pore Cleanser' },
  { kode: 'CIC', nama: 'Cica Intensive Cream' },
  { kode: 'SPG', nama: 'Soft Peeling Gel' },
  { kode: 'GFS', nama: 'Glutathione First Serum' },
  { kode: 'ROS', nama: 'Recovery Oil Serum' },
  { kode: 'SC', nama: 'Sun Cream' },
  { kode: 'WCC', nama: 'Water Capture Cream' },
  { kode: 'NC', nama: 'Night Cream' },
  { kode: 'ME', nama: 'Multi Essence' },
  { kode: 'AP', nama: 'Ampul Premium' },
  { kode: 'BG 25', nama: 'Bubble Gem 25' },
  { kode: 'BG 130 mg', nama: 'Bubble Gem 130 mg' },
  { kode: 'MG 15 mL', nama: 'Mask Gel 15 mL' },
  { kode: 'MG 250 mL', nama: 'Mask Gel 250 mL' },
  { kode: 'MG 1000 mL', nama: 'Mask Gel 1000 mL' },
]

export default function StockForm() {
  const [formData, setFormData] = useState<any[]>([])

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...formData]
    updated[index] = {
      ...initialProducts[index],
      ...(updated[index] || {}),
      [field]: value,
    }
    setFormData(updated)
  }

  const handleSubmit = async () => {
    const payload = formData.map(item => ({
      ...item,
      stok_awal: parseInt(item.stok_awal || 0),
      masuk: parseInt(item.masuk || 0),
      keluar: parseInt(item.keluar || 0),
      stok_akhir:
        parseInt(item.stok_awal || 0) +
        parseInt(item.masuk || 0) -
        parseInt(item.keluar || 0),
      tanggal: new Date().toISOString(),
    }))

    const { data, error } = await supabase.from('stock_opname').insert(payload)
    if (error) alert('Gagal input data: ' + error.message)
    else alert('Berhasil input data')
  }

  return (
    <div className="overflow-auto">
      <table className="table-auto w-full text-sm border border-gray-200">
        <thead className="bg-yellow-200">
          <tr>
            <th className="border px-2">Kode</th>
            <th className="border px-2">Nama</th>
            <th className="border px-2">Stok Awal</th>
            <th className="border px-2">Masuk</th>
            <th className="border px-2">Keluar</th>
            <th className="border px-2">Catatan</th>
          </tr>
        </thead>
        <tbody>
          {initialProducts.map((item, index) => (
            <tr key={item.kode}>
              <td className="border px-2">{item.kode}</td>
              <td className="border px-2">{item.nama}</td>
              <td className="border px-2">
                <input
                  type="number"
                  className="w-full"
                  onChange={e =>
                    handleChange(index, 'stok_awal', e.target.value)
                  }
                />
              </td>
              <td className="border px-2">
                <input
                  type="number"
                  className="w-full"
                  onChange={e => handleChange(index, 'masuk', e.target.value)}
                />
              </td>
              <td className="border px-2">
                <input
                  type="number"
                  className="w-full"
                  onChange={e => handleChange(index, 'keluar', e.target.value)}
                />
              </td>
              <td className="border px-2">
                <input
                  type="text"
                  className="w-full"
                  onChange={e => handleChange(index, 'catatan', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded"
      >
        Simpan Stock Opname
      </button>
    </div>
  )
}
