export default function ArchitectureSection() {
  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">Arsitektur Full-Stack</h2>
        <p className="text-gray-400">Diagram arsitektur sistem dari database hingga frontend</p>
      </div>

      {/* Full Stack Architecture */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-2xl p-6 md:p-8 mb-8">
        <h3 className="text-xl font-bold text-center text-orange-400 mb-8">🏗️ Arsitektur Sistem Lengkap</h3>
        
        {/* Layer 1: Frontend */}
        <div className="mb-6">
          <div className="text-center mb-3">
            <span className="bg-purple-500/20 text-purple-400 text-xs font-bold px-3 py-1 rounded-full">LAYER 1: FRONTEND</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">🐙</div>
                <div>
                  <div className="text-purple-400 font-bold">GitHub</div>
                  <div className="text-xs text-gray-400">Source Code Repository</div>
                </div>
              </div>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Version control (Git)</li>
                <li>• CI/CD pipeline otomatis</li>
                <li>• Kolaborasi tim developer</li>
                <li>• Code review & history</li>
              </ul>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">▲</div>
                <div>
                  <div className="text-purple-400 font-bold">Vercel</div>
                  <div className="text-xs text-gray-400">Frontend Hosting & Deployment</div>
                </div>
              </div>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Auto-deploy dari GitHub</li>
                <li>• Edge network (CDN global)</li>
                <li>• SSL/HTTPS otomatis</li>
                <li>• Preview deployment per branch</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center my-4">
          <div className="flex flex-col items-center">
            <div className="text-gray-500 text-xl">↕️</div>
            <div className="text-[10px] text-gray-600">REST API / Fetch</div>
          </div>
        </div>

        {/* Layer 2: Backend */}
        <div className="mb-6">
          <div className="text-center mb-3">
            <span className="bg-orange-500/20 text-orange-400 text-xs font-bold px-3 py-1 rounded-full">LAYER 2: BACKEND / API</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">⚡</div>
                <div>
                  <div className="text-orange-400 font-bold">Google Apps Script</div>
                  <div className="text-xs text-gray-400">Backend Logic & API Server</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-300 font-bold mb-2">Fungsi Utama:</div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Web App (doGet/doPost) sebagai API</li>
                    <li>• Time-based Trigger (cron job)</li>
                    <li>• Business logic audit & validasi</li>
                    <li>• Cross-reference data antar sheet</li>
                  </ul>
                </div>
                <div>
                  <div className="text-xs text-gray-300 font-bold mb-2">Endpoint API:</div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• <code className="text-green-400">GET</code> /audit - Ambil data audit</li>
                    <li>• <code className="text-green-400">GET</code> /kas - Ambil rekap kas</li>
                    <li>• <code className="text-blue-400">POST</code> /sync - Trigger sync data</li>
                    <li>• <code className="text-blue-400">POST</code> /audit - Jalankan audit</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center my-4">
          <div className="flex flex-col items-center">
            <div className="text-gray-500 text-xl">↕️</div>
            <div className="text-[10px] text-gray-600">SpreadsheetApp API</div>
          </div>
        </div>

        {/* Layer 3: Database */}
        <div className="mb-6">
          <div className="text-center mb-3">
            <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full">LAYER 3: DATABASE</span>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl">📊</div>
              <div>
                <div className="text-green-400 font-bold">Google Spreadsheet</div>
                <div className="text-xs text-gray-400">Database & Data Storage</div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { name: 'RAW_YoYi', type: 'INPUT', desc: 'Data YoYi' },
                { name: 'RAW_Admin', type: 'INPUT', desc: 'Data Admin' },
                { name: 'RAW_KlikBCA', type: 'INPUT', desc: 'Data BCA' },
                { name: 'Dashboard_Audit', type: 'OUTPUT', desc: 'Hasil Audit' },
                { name: 'Kas_Outlet', type: 'OUTPUT', desc: 'Rekap Kas' },
              ].map(sheet => (
                <div key={sheet.name} className={`bg-gray-900/50 border border-gray-600 rounded-lg p-2 text-center ${sheet.type === 'INPUT' ? 'border-t-2 border-t-blue-400' : 'border-t-2 border-t-green-400'}`}>
                  <div className="text-[11px] font-mono text-gray-300">{sheet.name}</div>
                  <div className="text-[9px] text-gray-500 mt-0.5">{sheet.type}</div>
                  <div className="text-[9px] text-gray-600">{sheet.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Layer 4: External Sources */}
        <div className="flex justify-center my-4">
          <div className="flex flex-col items-center">
            <div className="text-gray-500 text-xl">↑</div>
            <div className="text-[10px] text-gray-600">Data Sources</div>
          </div>
        </div>

        <div>
          <div className="text-center mb-3">
            <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full">SUMBER DATA EKSTERNAL</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">📦</div>
              <div className="text-blue-400 font-bold text-sm">Outlet Spreadsheet</div>
              <div className="text-xs text-gray-400">Pasir Balaraja & Jayanti Cikande</div>
              <div className="text-[10px] text-gray-500 mt-1">Akses via SpreadsheetApp.openById()</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🚚</div>
              <div className="text-blue-400 font-bold text-sm">YoYi System</div>
              <div className="text-xs text-gray-400">Export Order Parcel</div>
              <div className="text-[10px] text-gray-500 mt-1">Manual paste ke RAW_YoYi</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🏦</div>
              <div className="text-blue-400 font-bold text-sm">QRMS BCA</div>
              <div className="text-xs text-gray-400">qr.klikbca.com</div>
              <div className="text-[10px] text-gray-500 mt-1">Manual paste ke RAW_KlikBCA</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Summary */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-bold text-orange-400 mb-4">🛠️ Tech Stack Lengkap</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center bg-gray-900/50 border border-gray-700 rounded-lg p-3">
            <div className="text-2xl mb-1">📊</div>
            <div className="text-sm text-gray-300 font-bold">Database</div>
            <div className="text-xs text-green-400">Google Sheets</div>
          </div>
          <div className="text-center bg-gray-900/50 border border-gray-700 rounded-lg p-3">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-sm text-gray-300 font-bold">Backend</div>
            <div className="text-xs text-orange-400">Apps Script</div>
          </div>
          <div className="text-center bg-gray-900/50 border border-gray-700 rounded-lg p-3">
            <div className="text-2xl mb-1">🐙</div>
            <div className="text-sm text-gray-300 font-bold">Source Code</div>
            <div className="text-xs text-purple-400">GitHub</div>
          </div>
          <div className="text-center bg-gray-900/50 border border-gray-700 rounded-lg p-3">
            <div className="text-2xl mb-1">▲</div>
            <div className="text-sm text-gray-300 font-bold">Hosting</div>
            <div className="text-xs text-blue-400">Vercel</div>
          </div>
          <div className="text-center bg-gray-900/50 border border-gray-700 rounded-lg p-3">
            <div className="text-2xl mb-1">🤖</div>
            <div className="text-sm text-gray-300 font-bold">Developer</div>
            <div className="text-xs text-yellow-400">Qwen Coder</div>
          </div>
        </div>
      </div>

      {/* Data Flow Diagram */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-orange-400 mb-4">🔄 Alur Data Full-Stack</h3>
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Flow Diagram */}
            <div className="flex items-center justify-between gap-2">
              {/* External Sources */}
              <div className="flex flex-col gap-2">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg px-3 py-2 text-center">
                  <div className="text-[10px] text-blue-400 font-bold">Outlet SS</div>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg px-3 py-2 text-center">
                  <div className="text-[10px] text-blue-400 font-bold">YoYi Export</div>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg px-3 py-2 text-center">
                  <div className="text-[10px] text-blue-400 font-bold">QRMS BCA</div>
                </div>
              </div>

              <div className="text-gray-500">→</div>

              {/* Database */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-6 text-center">
                <div className="text-xs text-green-400 font-bold">Google Sheets</div>
                <div className="text-[10px] text-gray-500">Database</div>
              </div>

              <div className="text-gray-500">↕️</div>

              {/* Backend */}
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg px-4 py-6 text-center">
                <div className="text-xs text-orange-400 font-bold">Apps Script</div>
                <div className="text-[10px] text-gray-500">Backend API</div>
              </div>

              <div className="text-gray-500">↕️</div>

              {/* Frontend */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg px-4 py-6 text-center">
                <div className="text-xs text-purple-400 font-bold">Vercel</div>
                <div className="text-[10px] text-gray-500">Frontend</div>
              </div>

              <div className="text-gray-500">←</div>

              {/* User */}
              <div className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-6 text-center">
                <div className="text-xs text-gray-300 font-bold">👤 User</div>
                <div className="text-[10px] text-gray-500">Bos Akmal</div>
              </div>
            </div>
          </div>
        </div>

        {/* Deployment Flow */}
        <div className="mt-6 bg-gray-900/50 rounded-lg p-4">
          <div className="text-sm font-bold text-purple-400 mb-3">🚀 Deployment Pipeline</div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">🤖 Qwen Coder</span>
            <span className="text-gray-500">→</span>
            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded">Write Code</span>
            <span className="text-gray-500">→</span>
            <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded">🐙 Git Push</span>
            <span className="text-gray-500">→</span>
            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded">GitHub Repo</span>
            <span className="text-gray-500">→</span>
            <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">▲ Vercel Auto-Deploy</span>
            <span className="text-gray-500">→</span>
            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded">✅ Live Production</span>
          </div>
        </div>
      </div>

      {/* Why This Architecture */}
      <div className="mt-8 bg-gray-800/30 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-orange-400 mb-4">💡 Mengapa Arsitektur Ini?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-sm font-bold text-green-400 mb-2">✅ Keuntungan</div>
            <ul className="text-xs text-gray-400 space-y-1.5">
              <li>• <span className="text-green-400">Gratis</span> - Semua layanan free tier</li>
              <li>• <span className="text-green-400">No server</span> - Tidak perlu manage server</li>
              <li>• <span className="text-green-400">Auto-deploy</span> - Push code = live update</li>
              <li>• <span className="text-green-400">Scalable</span> - Vercel CDN global</li>
              <li>• <span className="text-green-400">User-friendly</span> - Database bisa diedit manual</li>
              <li>• <span className="text-green-400">AI-powered</span> - Qwen Coder mempercepat dev</li>
            </ul>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-sm font-bold text-yellow-400 mb-2">⚠️ Catatan</div>
            <ul className="text-xs text-gray-400 space-y-1.5">
              <li>• Apps Script ada limit 90 menit/hari eksekusi</li>
              <li>• Sheets max ~50.000 baris optimal</li>
              <li>• API response via Apps Script agak lambat (~1-3 detik)</li>
              <li>• Cocok untuk skala UMKM, bukan enterprise</li>
              <li>• Tidak perlu DevOps engineer</li>
              <li>• Maintenance minimal</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
