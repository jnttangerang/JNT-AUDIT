export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-orange-950/30">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            <span className="text-orange-400 text-sm font-medium">Google Apps Script • Aktif 24/7</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
              ⚡ AUDIT J&T
            </span>
          </h1>
          
          <h2 className="text-xl md:text-2xl text-gray-300 mb-6">
            Sistem Audit & Otomatisasi Kas Harian
          </h2>
          
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed mb-8">
            Platform otomatisasi untuk audit pengiriman J&T Express yang menyinkronkan data dari 
            <span className="text-orange-400 font-semibold"> 2 outlet</span>, memvalidasi terhadap data 
            <span className="text-blue-400 font-semibold"> YoYi</span>, dan mencocokkan pembayaran 
            <span className="text-green-400 font-semibold"> QRIS/BCA</span> secara real-time.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl px-5 py-3">
              <div className="text-2xl font-bold text-orange-400">16</div>
              <div className="text-xs text-gray-400">Header Kolom</div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl px-5 py-3">
              <div className="text-2xl font-bold text-blue-400">5</div>
              <div className="text-xs text-gray-400">Tab Database</div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl px-5 py-3">
              <div className="text-2xl font-bold text-green-400">2</div>
              <div className="text-xs text-gray-400">Outlet Aktif</div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl px-5 py-3">
              <div className="text-2xl font-bold text-purple-400">4</div>
              <div className="text-xs text-gray-400">Menu Fungsi</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4 text-left">
              <div className="text-orange-400 text-lg mb-1">🔄 Sync Otomatis</div>
              <p className="text-gray-400 text-sm">Tarik data dari 2 outlet spreadsheet setiap hari jam 23:00 WIB</p>
            </div>
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4 text-left">
              <div className="text-blue-400 text-lg mb-1">🔍 Audit Realtime</div>
              <p className="text-gray-400 text-sm">Cross-reference Admin vs YoYi dengan validasi QRIS BCA</p>
            </div>
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4 text-left">
              <div className="text-green-400 text-lg mb-1">💰 Rekap Kas</div>
              <p className="text-gray-400 text-sm">Kas fisik & digital per outlet per tanggal secara presisi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
