export default function FeatureCards() {
  const features = [
    {
      id: 1,
      title: 'Setup Sheet & Header',
      func: 'setupDatabaseSheets()',
      desc: 'Membuat 5 tab database dengan header terstruktur. Mendukung 16 kolom di RAW_Admin untuk data lengkap pengiriman.',
      icon: '🏗️',
      color: 'orange',
      details: [
        'RAW_YoYi - Data resi dari sistem YoYi',
        'RAW_Admin - 16 kolom input admin outlet',
        'RAW_KlikBCA - Export QRMS BCA',
        'Dashboard_Audit - Hasil audit realtime',
        'Kas_Outlet - Rekap kas harian'
      ]
    },
    {
      id: 2,
      title: 'Sync Data Outlet',
      func: 'syncDataAdminDariOutlet()',
      desc: 'Menarik data dari spreadsheet outlet (Pasir Balaraja & Jayanti Cikande) ke RAW_Admin secara terpusat.',
      icon: '🔄',
      color: 'blue',
      details: [
        'Outlet 1: Pasir Balaraja',
        'Outlet 2: Jayanti Cikande',
        'Normalisasi format tanggal otomatis',
        'Kalkulasi total biaya tambahan',
        'Deteksi metode bayar (Tunai/QRIS/Transfer)'
      ]
    },
    {
      id: 3,
      title: 'Audit & Rekap Kas',
      func: 'jalankanAuditDanKas()',
      desc: 'Cross-reference data Admin vs YoYi, validasi pembayaran QRIS, dan hitung kas outlet per hari.',
      icon: '🔍',
      color: 'green',
      details: [
        'Deteksi resi belum input admin',
        'Deteksi resi belum serah terima YoYi',
        'Validasi selisih ongkir (pembulatan vs selisih)',
        'Cocokkan QRIS dengan RRN BCA',
        'Pisahkan kas fisik vs digital'
      ]
    },
    {
      id: 4,
      title: 'Otomatisasi Harian',
      func: 'createDailyTrigger()',
      desc: 'Membuat trigger waktu untuk menjalankan sync + audit otomatis setiap hari jam 23:00 WIB.',
      icon: '⏰',
      color: 'purple',
      details: [
        'Trigger time-based harian',
        'Eksekusi jam 23:00 WIB',
        'Auto-delete trigger lama',
        'Sync → Audit berurutan',
        'Tanpa intervensi manual'
      ]
    }
  ]

  const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
    orange: { bg: 'bg-orange-500/5', border: 'border-orange-500/30', text: 'text-orange-400', badge: 'bg-orange-500/20' },
    blue: { bg: 'bg-blue-500/5', border: 'border-blue-500/30', text: 'text-blue-400', badge: 'bg-blue-500/20' },
    green: { bg: 'bg-green-500/5', border: 'border-green-500/30', text: 'text-green-400', badge: 'bg-green-500/20' },
    purple: { bg: 'bg-purple-500/5', border: 'border-purple-500/30', text: 'text-purple-400', badge: 'bg-purple-500/20' },
  }

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">Fitur Utama Sistem</h2>
        <p className="text-gray-400">4 fungsi utama yang dapat diakses dari menu "⚡ AUDIT J&T" di Google Sheets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map(feature => {
          const colors = colorMap[feature.color]
          return (
            <div key={feature.id} className={`${colors.bg} border ${colors.border} rounded-2xl p-6 transition-transform hover:scale-[1.02]`}>
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{feature.icon}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`${colors.badge} text-xs font-mono px-2 py-0.5 rounded`}>#{feature.id}</span>
                  </div>
                  <h3 className={`text-xl font-bold ${colors.text}`}>{feature.title}</h3>
                  <code className="text-xs text-gray-500 font-mono">{feature.func}</code>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-4">{feature.desc}</p>
              
              <ul className="space-y-1.5">
                {feature.details.map((detail, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className={`w-1.5 h-1.5 rounded-full ${colors.text.replace('text', 'bg')}`}></span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {/* Menu Structure */}
      <div className="mt-10 bg-gray-800/30 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-orange-400 mb-4">📋 Struktur Menu di Google Sheets</h3>
        <div className="font-mono text-sm bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <div className="text-gray-300">
            <div className="text-orange-400 font-bold mb-2">⚡ AUDIT J&T</div>
            <div className="pl-4 space-y-1">
              <div>├── 1. Setup Sheet & Header Baru</div>
              <div>├── ─────────────────</div>
              <div>├── 2. Tarik Data Outlet (Sync)</div>
              <div>├── 3. Jalankan Audit & Rekap Kas Realtime</div>
              <div>├── ─────────────────</div>
              <div>└── 4. Aktifkan Otomatisasi Harian (23:00 WIB)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
