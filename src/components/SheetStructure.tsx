import { useState } from 'react'

interface SheetData {
  name: string
  color: string
  description: string
  headers: string[]
  notes?: string
}

const sheets: SheetData[] = [
  {
    name: 'RAW_YoYi',
    color: 'blue',
    description: 'Data export dari sistem YoYi (platform internal J&T). Berisi data resi pengiriman yang sudah diserahterimakan.',
    headers: [
      'No. Resi', 'Tanggal', 'Metode perhitungan', 'Perhitungan Biaya pengiriman (IDR)',
      'Waktu serah terima', 'Status paket', 'Waktu pemesanan'
    ],
    notes: 'Mendukung format export "Order Parcel" YoYi hingga 45 kolom. Parser fleksibel mencari header.'
  },
  {
    name: 'RAW_Admin',
    color: 'orange',
    description: 'Data terpusat dari 2 outlet. 16 kolom lengkap untuk audit pengiriman dan rekap kas.',
    headers: [
      'Tanggal', 'Outlet', 'Admin', 'No.', 'Tipe Produk', 'No. Resi', 'Nama Barang',
      'Ongkir Dasar', 'Ongkir Final', 'Metode Bayar Ongkir',
      'Biaya Tambahan (Amplop)', 'Biaya Tambahan (Packing)', 'Biaya Tambahan (Lainnya)',
      'Total Biaya Tambahan', 'Metode Bayar Biaya Tambahan', 'Keterangan'
    ],
    notes: '16 kolom header. Data di-sync otomatis dari spreadsheet outlet setiap hari.'
  },
  {
    name: 'RAW_KlikBCA',
    color: 'green',
    description: 'Export transaksi dari QRMS BCA (qr.klikbca.com). Digunakan untuk validasi pembayaran QRIS.',
    headers: [
      'Merchant ID', 'Transaction Date', 'Original Amount', 'RRN',
      'Reference Number', 'Payment Type', 'Reversal', 'Refund'
    ],
    notes: 'Mendukung format QRMS export (multi-outlet ditumpuk) dan format lama 4 kolom.'
  },
  {
    name: 'Dashboard_Audit',
    color: 'red',
    description: 'Output hasil audit. Menampilkan status setiap resi: apakah sudah di-admin, sudah di-YoYi, selisih ongkir, dan status QRIS.',
    headers: [
      'Tanggal', 'Outlet', 'No. Resi', 'Status Admin', 'Status YoYi',
      'Ongkir Admin', 'Ongkir YoYi', 'Selisih Ongkir', 'Status QRIS', 'Keterangan'
    ],
    notes: 'Resi ecommerce (JY/JX/JZ) tidak ditampilkan. Resi dibatalkan/belum diserahkan ditandai khusus.'
  },
  {
    name: 'Kas_Outlet',
    color: 'purple',
    description: 'Rekap kas harian per outlet. Memisahkan kas fisik (laci admin) dan kas digital (rekening owner).',
    headers: [
      'Tanggal', 'Outlet', 'Total Setoran Owner (Ongkir)',
      'Kas Fisik (Laci Admin)', 'Kas Digital (Rekening Owner)', 'Total Kas Outlet'
    ],
    notes: 'Total Kas Outlet = Kas Fisik + Kas Digital. Diurutkan berdasarkan tanggal.'
  }
]

const colorMap: Record<string, { bg: string; border: string; text: string; headerBg: string }> = {
  blue: { bg: 'bg-blue-500/5', border: 'border-blue-500/30', text: 'text-blue-400', headerBg: 'bg-blue-500/20' },
  orange: { bg: 'bg-orange-500/5', border: 'border-orange-500/30', text: 'text-orange-400', headerBg: 'bg-orange-500/20' },
  green: { bg: 'bg-green-500/5', border: 'border-green-500/30', text: 'text-green-400', headerBg: 'bg-green-500/20' },
  red: { bg: 'bg-red-500/5', border: 'border-red-500/30', text: 'text-red-400', headerBg: 'bg-red-500/20' },
  purple: { bg: 'bg-purple-500/5', border: 'border-purple-500/30', text: 'text-purple-400', headerBg: 'bg-purple-500/20' },
}

export default function SheetStructure() {
  const [activeSheet, setActiveSheet] = useState(0)
  const sheet = sheets[activeSheet]
  const colors = colorMap[sheet.color]

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">Struktur Database (5 Tab)</h2>
        <p className="text-gray-400">Klik tab untuk melihat detail header dan kolom masing-masing sheet</p>
      </div>

      {/* Sheet Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {sheets.map((s, i) => {
          const c = colorMap[s.color]
          return (
            <button
              key={s.name}
              onClick={() => setActiveSheet(i)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSheet === i
                  ? `${c.bg} ${c.border} border ${c.text}`
                  : 'bg-gray-800/50 border border-gray-700 text-gray-400 hover:text-gray-200'
              }`}
            >
              {s.name}
            </button>
          )
        })}
      </div>

      {/* Sheet Detail */}
      <div className={`${colors.bg} border ${colors.border} rounded-2xl p-6`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`text-2xl font-bold ${colors.text}`}>📊</div>
          <div>
            <h3 className={`text-xl font-bold ${colors.text}`}>{sheet.name}</h3>
            <p className="text-gray-400 text-sm">{sheet.description}</p>
          </div>
        </div>

        {/* Headers Table */}
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className={`${colors.headerBg} px-3 py-2 text-left rounded-tl-lg`}>Kolom</th>
                <th className={`${colors.headerBg} px-3 py-2 text-left`}>Nama Header</th>
                <th className={`${colors.headerBg} px-3 py-2 text-left rounded-tr-lg`}>Index</th>
              </tr>
            </thead>
            <tbody>
              {sheet.headers.map((header, i) => (
                <tr key={i} className="border-t border-gray-700/50">
                  <td className="px-3 py-2 text-gray-500 font-mono text-xs">{String.fromCharCode(65 + i)}</td>
                  <td className="px-3 py-2 text-gray-200 font-medium">{header}</td>
                  <td className="px-3 py-2 text-gray-500 font-mono text-xs">[{i}]</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sheet.notes && (
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 mt-4">
            <div className="text-xs text-gray-500 mb-1">📝 Catatan:</div>
            <p className="text-sm text-gray-300">{sheet.notes}</p>
          </div>
        )}
      </div>

      {/* RAW_Admin 16-column highlight */}
      {activeSheet === 1 && (
        <div className="mt-6 bg-gray-800/30 border border-gray-700 rounded-xl p-6">
          <h4 className="text-orange-400 font-bold mb-3">📐 Pengelompokan 16 Kolom RAW_Admin</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
              <div className="text-blue-400 text-sm font-bold mb-2">📋 Info Resi (Kolom A-G)</div>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>A: Tanggal</li>
                <li>B: Outlet</li>
                <li>C: Admin</li>
                <li>D: No. Urut</li>
                <li>E: Tipe Produk</li>
                <li>F: No. Resi (KEY)</li>
                <li>G: Nama Barang</li>
              </ul>
            </div>
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-3">
              <div className="text-orange-400 text-sm font-bold mb-2">💰 Ongkir (Kolom H-J)</div>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>H: Ongkir Dasar</li>
                <li>I: Ongkir Final</li>
                <li>J: Metode Bayar Ongkir</li>
              </ul>
            </div>
            <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
              <div className="text-green-400 text-sm font-bold mb-2">📦 Biaya Tambahan & Lainnya (Kolom K-P)</div>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>K: Biaya Tambahan (Amplop)</li>
                <li>L: Biaya Tambahan (Packing)</li>
                <li>M: Biaya Tambahan (Lainnya)</li>
                <li>N: Total Biaya Tambahan</li>
                <li>O: Metode Bayar Biaya Tambahan</li>
                <li>P: Keterangan</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
