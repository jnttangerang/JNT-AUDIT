import { useState } from 'react'

interface FlowStep {
  id: number
  title: string
  description: string
  from: string
  to: string
  color: string
  details: string[]
}

const flowSteps: FlowStep[] = [
  {
    id: 1,
    title: 'Setup Awal',
    description: 'Persiapan struktur database',
    from: 'User',
    to: 'Google Sheets',
    color: 'orange',
    details: [
      'User klik "1. Setup Sheet & Header Baru"',
      'Fungsi setupDatabaseSheets() dijalankan',
      '5 tab dibuat: RAW_YoYi, RAW_Admin, RAW_KlikBCA, Dashboard_Audit, Kas_Outlet',
      'Header ditulis dengan format bold + background hijau (#d9ead3)',
      'Data export YoYi/QRMS yang sudah ada TIDAK ditimpa'
    ]
  },
  {
    id: 2,
    title: 'Input Data Manual',
    description: 'Paste data YoYi dan BCA',
    from: 'User',
    to: 'RAW_YoYi & RAW_KlikBCA',
    color: 'blue',
    details: [
      'Export "Order Parcel" dari YoYi → paste ke tab RAW_YoYi',
      'Export QRMS dari qr.klikbca.com → paste ke tab RAW_KlikBCA',
      'Format YoYi: minimal kolom "No. Resi" harus ada',
      'Format QRMS: deteksi header otomatis (original amount + rrn)',
      'Boleh 2 outlet ditumpuk dalam 1 export QRMS'
    ]
  },
  {
    id: 3,
    title: 'Sync Outlet',
    description: 'Tarik data dari spreadsheet outlet',
    from: 'Outlet Sheets',
    to: 'RAW_Admin',
    color: 'green',
    details: [
      'User klik "2. Tarik Data Outlet (Sync)"',
      'Buka spreadsheet Pasir Balaraja (ID: 1UldxA6...)',
      'Buka spreadsheet Jayanti Cikande (ID: 1Ygbaq...)',
      'Baca sheet "Resi Harian" dari masing-masing outlet',
      'Normalisasi: tanggal, ongkir, metode bayar, total biaya tambahan',
      'Hapus data lama di RAW_Admin, tulis data baru (replace)',
      'Data dari 2 outlet digabung dengan kolom "Outlet" sebagai pembeda'
    ]
  },
  {
    id: 4,
    title: 'Build Maps',
    description: 'Konversi data ke struktur lookup',
    from: 'RAW_*',
    to: 'JavaScript Maps',
    color: 'purple',
    details: [
      'adminMap: { resi → { tanggal, outlet, ongkirFinal, metodeOngkir, biayaTambahan, ... } }',
      'yoyiMap: { resi → { tanggal, dibatalkan, ecommerce, diserahkan, ongkirYoYi } }',
      'bcaTxs: [ { outlet, tanggal, nominal, rrn, ref, metode, valid } ]',
      'allResiSet: Union dari key adminMap dan yoyiMap'
    ]
  },
  {
    id: 5,
    title: 'Audit Loop',
    description: 'Iterasi setiap resi untuk audit',
    from: 'allResiSet',
    to: 'auditResults[]',
    color: 'red',
    details: [
      'Untuk setiap resi di allResiSet:',
      '1. Skip jika ecommerce (JY/JX/JZ)',
      '2. Cek alasan dilewati (batal/belum diserahkan)',
      '3. Tentukan status Admin dan YoYi',
      '4. Hitung selisih ongkir',
      '5. Validasi QRIS jika metode non-tunai',
      '6. Generate keterangan otomatis',
      '7. Akumulasi ke kasSummary (key: tanggal_outlet)'
    ]
  },
  {
    id: 6,
    title: 'Write Output',
    description: 'Tulis hasil ke Dashboard & Kas',
    from: 'auditResults & kasSummary',
    to: 'Dashboard_Audit & Kas_Outlet',
    color: 'emerald',
    details: [
      'Clear data lama di Dashboard_Audit (row 2+)',
      'Tulis auditResults[] ke Dashboard_Audit',
      'Sort kasSummary berdasarkan tanggal',
      'Clear data lama di Kas_Outlet (row 2+)',
      'Tulis kasRows[] ke Kas_Outlet',
      'Alert: jumlah resi diaudit & baris kas dihasilkan'
    ]
  },
  {
    id: 7,
    title: 'Otomatisasi',
    description: 'Trigger harian jam 23:00 WIB',
    from: 'ScriptApp',
    to: 'Auto-Execute',
    color: 'yellow',
    details: [
      'User klik "4. Aktifkan Otomatisasi Harian"',
      'Hapus trigger lama (jalankanSyncDanAuditOtomatis)',
      'Buat trigger baru: timeBased().everyDays(1).atHour(23)',
      'Setiap hari jam 23:00:',
      '  → syncDataAdminDariOutlet()',
      '  → jalankanAuditDanKas()',
      'Tanpa perlu buka spreadsheet!'
    ]
  }
]

const colorMap: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', dot: 'bg-orange-500' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', dot: 'bg-blue-500' },
  green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', dot: 'bg-green-500' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', dot: 'bg-purple-500' },
  red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', dot: 'bg-red-500' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', dot: 'bg-emerald-500' },
  yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', dot: 'bg-yellow-500' },
}

export default function DataFlowSection() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">Alur Data (Data Flow)</h2>
        <p className="text-gray-400">Langkah demi langkah bagaimana data mengalir dari input hingga output</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-700 hidden md:block"></div>

        <div className="space-y-4">
          {flowSteps.map((step) => {
            const colors = colorMap[step.color]
            const isExpanded = expandedStep === step.id
            
            return (
              <div key={step.id} className="relative">
                {/* Timeline dot */}
                <div className={`absolute left-4 top-6 w-5 h-5 rounded-full ${colors.dot} border-4 border-gray-900 z-10 hidden md:block`}></div>
                
                <div 
                  className={`${colors.bg} border ${colors.border} rounded-xl p-5 md:ml-14 cursor-pointer transition-all hover:scale-[1.01]`}
                  onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`${colors.text} font-bold text-lg`}>#{step.id}</span>
                      <div>
                        <h3 className={`font-bold ${colors.text}`}>{step.title}</h3>
                        <p className="text-sm text-gray-400">{step.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="hidden md:flex items-center gap-1 text-xs text-gray-500">
                        <span className="bg-gray-800 px-2 py-0.5 rounded">{step.from}</span>
                        <span>→</span>
                        <span className="bg-gray-800 px-2 py-0.5 rounded">{step.to}</span>
                      </div>
                      <span className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-700/50">
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                            <span className={`${colors.dot} w-1.5 h-1.5 rounded-full mt-1.5 shrink-0`}></span>
                            <span className={detail.startsWith('  ') ? 'pl-2 text-gray-400' : ''}>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Summary */}
      <div className="mt-10 bg-gray-800/30 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-orange-400 mb-4">📊 Ringkasan Alur</h3>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="bg-blue-500/20 text-blue-400 px-3 py-1.5 rounded-lg">Outlet Sheets</span>
          <span className="text-gray-500">→</span>
          <span className="bg-orange-500/20 text-orange-400 px-3 py-1.5 rounded-lg">RAW_Admin</span>
          <span className="text-gray-500">+</span>
          <span className="bg-blue-500/20 text-blue-400 px-3 py-1.5 rounded-lg">RAW_YoYi</span>
          <span className="text-gray-500">+</span>
          <span className="bg-green-500/20 text-green-400 px-3 py-1.5 rounded-lg">RAW_KlikBCA</span>
          <span className="text-gray-500">→</span>
          <span className="bg-purple-500/20 text-purple-400 px-3 py-1.5 rounded-lg">Audit Engine</span>
          <span className="text-gray-500">→</span>
          <span className="bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg">Dashboard_Audit</span>
          <span className="text-gray-500">+</span>
          <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg">Kas_Outlet</span>
        </div>
      </div>
    </div>
  )
}
