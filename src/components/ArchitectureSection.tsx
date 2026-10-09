export default function ArchitectureSection() {
  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">Arsitektur Sistem</h2>
        <p className="text-gray-400">Diagram alur data dan komponen sistem audit J&T</p>
      </div>

      {/* Main Architecture Diagram */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-2xl p-6 md:p-8">
        <h3 className="text-xl font-bold text-center text-orange-400 mb-8">🏗️ Diagram Arsitektur</h3>
        
        {/* Data Sources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Outlet 1 */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">📦</div>
            <div className="text-blue-400 font-bold">Outlet 1</div>
            <div className="text-sm text-gray-400">Pasir Balaraja</div>
            <div className="text-xs text-gray-500 mt-1 font-mono">ID: 1UldxA6...D0c</div>
            <div className="text-xs text-gray-500 font-mono">Sheet: "Resi Harian"</div>
          </div>
          
          {/* Outlet 2 */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">📦</div>
            <div className="text-blue-400 font-bold">Outlet 2</div>
            <div className="text-sm text-gray-400">Jayanti Cikande</div>
            <div className="text-xs text-gray-500 mt-1 font-mono">ID: 1Ygbaq...xeNY</div>
            <div className="text-xs text-gray-500 font-mono">Sheet: "Resi Harian"</div>
          </div>
          
          {/* YoYi + BCA */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-green-400 font-bold">Data Eksternal</div>
            <div className="text-sm text-gray-400">YoYi Export + QRMS BCA</div>
            <div className="text-xs text-gray-500 mt-1">Manual paste ke RAW_YoYi & RAW_KlikBCA</div>
          </div>
        </div>

        {/* Arrows */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center">
            <div className="text-orange-400 text-2xl">⬇️</div>
            <div className="text-xs text-gray-500">Sync + Manual Input</div>
          </div>
        </div>

        {/* Central Database */}
        <div className="bg-orange-500/10 border-2 border-orange-500/40 rounded-2xl p-6 mb-8">
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-orange-400">🗄️ Google Sheets (Database Utama)</div>
            <div className="text-sm text-gray-400">Spreadsheet Induk Audit J&T</div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {['RAW_YoYi', 'RAW_Admin', 'RAW_KlikBCA', 'Dashboard_Audit', 'Kas_Outlet'].map((name, i) => (
              <div key={name} className={`bg-gray-900/50 border border-gray-600 rounded-lg p-2 text-center ${i < 3 ? 'border-t-2 border-t-blue-400' : 'border-t-2 border-t-green-400'}`}>
                <div className="text-xs font-mono text-gray-300">{name}</div>
                <div className="text-[10px] text-gray-500 mt-1">{i < 3 ? 'INPUT' : 'OUTPUT'}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Processing */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center">
            <div className="text-orange-400 text-2xl">⬇️</div>
            <div className="text-xs text-gray-500">jalankanAuditDanKas()</div>
          </div>
        </div>

        {/* Processing Engine */}
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6 mb-8">
          <div className="text-center mb-4">
            <div className="text-xl font-bold text-purple-400">⚙️ Processing Engine</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-3 text-center">
              <div className="text-lg mb-1">🔗</div>
              <div className="text-xs text-gray-300 font-medium">Cross-Reference</div>
              <div className="text-[10px] text-gray-500">Admin ↔ YoYi</div>
            </div>
            <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-3 text-center">
              <div className="text-lg mb-1">💳</div>
              <div className="text-xs text-gray-300 font-medium">QRIS Validation</div>
              <div className="text-[10px] text-gray-500">RRN ↔ Keterangan</div>
            </div>
            <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-3 text-center">
              <div className="text-lg mb-1">📊</div>
              <div className="text-xs text-gray-300 font-medium">Selisih Ongkir</div>
              <div className="text-[10px] text-gray-500">Admin - YoYi</div>
            </div>
            <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-3 text-center">
              <div className="text-lg mb-1">💰</div>
              <div className="text-xs text-gray-300 font-medium">Kas Aggregation</div>
              <div className="text-[10px] text-gray-500">Fisik + Digital</div>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center">
            <div className="text-green-400 text-2xl">⬇️</div>
            <div className="text-xs text-gray-500">Hasil Audit</div>
          </div>
        </div>

        {/* Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <div className="text-red-400 font-bold mb-2">📋 Dashboard_Audit</div>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>✅ Status setiap resi (Admin/YoYi)</li>
              <li>✅ Selisih ongkir & keterangan</li>
              <li>✅ Status QRIS (VALID/UNPAID)</li>
              <li>✅ Filter: Ecommerce & Batal dilewati</li>
            </ul>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <div className="text-green-400 font-bold mb-2">💰 Kas_Outlet</div>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>✅ Total setoran owner per hari</li>
              <li>✅ Kas fisik (laci admin)</li>
              <li>✅ Kas digital (rekening owner)</li>
              <li>✅ Total kas outlet = Fisik + Digital</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mt-8 bg-gray-800/30 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-orange-400 mb-4">🛠️ Tech Stack</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-1">📊</div>
            <div className="text-sm text-gray-300">Google Sheets</div>
            <div className="text-xs text-gray-500">Database & UI</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-sm text-gray-300">Apps Script</div>
            <div className="text-xs text-gray-500">Logic Engine</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">🔗</div>
            <div className="text-sm text-gray-300">SpreadsheetApp</div>
            <div className="text-xs text-gray-500">Multi-SS Access</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">⏰</div>
            <div className="text-sm text-gray-300">ScriptApp Trigger</div>
            <div className="text-xs text-gray-500">Time-based Auto</div>
          </div>
        </div>
      </div>
    </div>
  )
}
