export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900/50 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h4 className="text-orange-400 font-bold mb-3">⚡ AUDIT J&T</h4>
            <p className="text-sm text-gray-400">
              Sistem audit dan otomatisasi kas harian untuk operasional J&T Express. 
              Dibangun dengan Google Apps Script.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-gray-300 font-bold mb-3">Fitur</h4>
            <ul className="text-sm text-gray-400 space-y-1.5">
              <li>• Setup database otomatis</li>
              <li>• Sync data multi-outlet</li>
              <li>• Audit cross-reference</li>
              <li>• Validasi QRIS BCA</li>
              <li>• Rekap kas harian presisi</li>
              <li>• Otomatisasi trigger harian</li>
            </ul>
          </div>

          {/* Tech */}
          <div>
            <h4 className="text-gray-300 font-bold mb-3">Teknologi</h4>
            <ul className="text-sm text-gray-400 space-y-1.5">
              <li>• Google Apps Script (V8)</li>
              <li>• Google Sheets API</li>
              <li>• SpreadsheetApp Service</li>
              <li>• ScriptApp Triggers</li>
              <li>• Utilities (format tanggal)</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-500">
            Developer: AI Developer • Untuk: Bos Akmal • 
            <span className="text-orange-400"> Sistem Audit & Otomatisasi Kas J&T</span>
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Dokumentasi interaktif dibuat untuk memahami alur kerja dan logika sistem.
          </p>
        </div>
      </div>
    </footer>
  )
}
