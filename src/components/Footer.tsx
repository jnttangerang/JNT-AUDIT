export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900/50 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h4 className="text-orange-400 font-bold mb-3">⚡ AUDIT J&T</h4>
            <p className="text-sm text-gray-400">
              Sistem audit dan otomatisasi kas harian untuk operasional J&T Express.
              Full-stack architecture dengan Google Apps Script, Google Sheets, dan Vercel.
            </p>
          </div>

          {/* Architecture */}
          <div>
            <h4 className="text-gray-300 font-bold mb-3">🏗️ Arsitektur</h4>
            <ul className="text-sm text-gray-400 space-y-1.5">
              <li className="flex items-center gap-2">
                <span className="text-green-400">📊</span> Google Sheets (Database)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-400">⚡</span> Apps Script (Backend)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">🐙</span> GitHub (Source Code)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">▲</span> Vercel (Hosting)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-400">🤖</span> Qwen Coder (Dev)
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-gray-300 font-bold mb-3">⚙️ Fitur</h4>
            <ul className="text-sm text-gray-400 space-y-1.5">
              <li>• Setup database otomatis</li>
              <li>• Sync data multi-outlet</li>
              <li>• Audit cross-reference</li>
              <li>• Validasi QRIS BCA</li>
              <li>• Rekap kas harian presisi</li>
              <li>• Otomatisasi trigger harian</li>
            </ul>
          </div>

          {/* Developer */}
          <div>
            <h4 className="text-gray-300 font-bold mb-3">🤖 Developer</h4>
            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🤖</span>
                <span className="text-yellow-400 font-bold text-sm">Qwen Coder</span>
              </div>
              <p className="text-xs text-gray-400">
                AI Developer yang membangun seluruh sistem ini. 
                Dari backend Apps Script hingga frontend React.
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="text-[10px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded">Apps Script</span>
                <span className="text-[10px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded">React</span>
                <span className="text-[10px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded">TypeScript</span>
                <span className="text-[10px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded">Tailwind</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              Untuk: <span className="text-orange-400 font-medium">Bos Akmal</span> • 
              Sistem Audit & Otomatisasi Kas J&T
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span>📊 Google Sheets</span>
              <span>⚡ Apps Script</span>
              <span>🐙 GitHub</span>
              <span>▲ Vercel</span>
              <span>🤖 Qwen Coder</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-3 text-center">
            Dokumentasi interaktif ini di-host di Vercel, source code di GitHub, dikembangkan oleh Qwen Coder.
          </p>
        </div>
      </div>
    </footer>
  )
}
