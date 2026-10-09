import { useState } from 'react'

interface CodeSection {
  id: string
  title: string
  icon: string
  code: string
  explanation: string
}

const codeSections: CodeSection[] = [
  {
    id: 'onopen',
    title: 'onOpen() - Menu Custom',
    icon: '📋',
    code: `function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('⚡ AUDIT J&T')
    .addItem('1. Setup Sheet & Header Baru', 'setupDatabaseSheets')
    .addSeparator()
    .addItem('2. Tarik Data Outlet (Sync)', 'syncDataAdminDariOutlet')
    .addItem('3. Jalankan Audit & Rekap Kas Realtime', 'jalankanAuditDanKas')
    .addSeparator()
    .addItem('4. Aktifkan Otomatisasi Harian (23:00 WIB)', 'createDailyTrigger')
    .addToUi();
}`,
    explanation: 'Fungsi onOpen() dipanggil otomatis saat spreadsheet dibuka. Membuat menu custom "⚡ AUDIT J&T" dengan 4 fungsi yang bisa dijalankan user.'
  },
  {
    id: 'findColumn',
    title: 'findColumnIndex() - Pencari Header Fleksibel',
    icon: '🔍',
    code: `function findColumnIndex(headers, possibleNames) {
  // Pass 1: Exact match (case-insensitive)
  for (let i = 0; i < headers.length; i++) {
    const cleanHeader = headers[i].toString()
      .replace(/\\s+/g, ' ').trim().toLowerCase();
    for (let j = 0; j < possibleNames.length; j++) {
      if (cleanHeader === possibleNames[j].toLowerCase()) return i;
    }
  }
  // Pass 2: Partial match (contains)
  for (let i = 0; i < headers.length; i++) {
    const cleanHeader = headers[i].toString()
      .replace(/\\s+/g, ' ').trim().toLowerCase();
    for (let j = 0; j < possibleNames.length; j++) {
      if (cleanHeader.includes(possibleNames[j].toLowerCase())) return i;
    }
  }
  return -1; // Not found
}`,
    explanation: 'Mencari index kolom berdasarkan nama header. Melakukan 2 pass: pertama exact match, kedua partial match. Header dengan newline (enter) dinormalisasi jadi spasi.'
  },
  {
    id: 'parseYoyi',
    title: 'parseYoyiRows() - Parser YoYi',
    icon: '📦',
    code: `function parseYoyiRows(yoyiData) {
  const map = {};
  if (!yoyiData || yoyiData.length < 2) 
    return { map: map, ok: false };
  
  const h = yoyiData[0];
  const idxResi = findColumnIndex(h, ['No. Resi', 'Resi']);
  if (idxResi === -1) return { map: map, ok: false };
  
  // Cari kolom tanggal dengan prioritas
  const idxTgl = [
    findColumnIndex(h, ['Waktu serah terima']),
    findColumnIndex(h, ['Tanggal']),
    findColumnIndex(h, ['Waktu pemesanan'])
  ].filter(i => i !== -1);
  
  for (let j = 1; j < yoyiData.length; j++) {
    const row = yoyiData[j];
    const resi = String(row[idxResi]).trim();
    if (!resi) continue;
    
    map[resi] = {
      tanggal: formatTanggalStandard(row[idxTgl[0]]),
      dibatalkan: /batal/i.test(String(row[idxStatus] || '')),
      ecommerce: /^J[YXZ]/i.test(resi),
      diserahkan: String(row[idxSerah] || '').trim() !== '',
      ongkirYoYi: Number(row[idxOngkir]) || 0
    };
  }
  return { map: map, ok: true };
}`,
    explanation: 'Parse data YoYi menjadi Map dengan key = No. Resi. Mendukung format lama (4 kolom) dan export "Order Parcel" (45 kolom). Deteksi otomatis: ecommerce, dibatalkan, belum diserahkan.'
  },
  {
    id: 'parseQrms',
    title: 'parseQrmsRows() - Parser QRMS BCA',
    icon: '🏦',
    code: `function parseQrmsRows(bcaData) {
  const txs = [];
  const adaQrms = bcaData.some(row => 
    qrmsHeaderIdx(row) !== null
  );
  
  for (let r = 0; r < bcaData.length; r++) {
    const row = bcaData[r];
    const h = qrmsHeaderIdx(row);
    if (h) { idx = h; continue; } // skip header
    
    if (adaQrms) {
      const nominal = parseNominal(row[idx.amt]);
      const rrn = str(row[idx.rrn]);
      if (nominal <= 0 || !rrn) continue;
      
      txs.push({
        outlet: QRMS_OUTLET[normMerchantId(row[idx.mid])],
        tanggal: formatTanggalStandard(row[idx.tgl]),
        nominal: nominal,
        rrn: rrn,
        valid: !str(row[idx.rev]) && !str(row[idx.rfd])
      });
    }
  }
  return txs;
}`,
    explanation: 'Parse export QRMS BCA. Deteksi header otomatis (original amount + rrn). Support multi-outlet ditumpuk. Filter: reversal dan refund tidak dihitung sebagai pembayaran valid.'
  },
  {
    id: 'cocokQris',
    title: 'cocokQris() - Validasi Pembayaran QRIS',
    icon: '💳',
    code: `function cocokQris(adminObj, totalBayar, txs) {
  const ket = String(adminObj.keterangan || '').trim();
  
  return txs.some(t => {
    if (!t.valid) return false;
    
    // Metode 1: By RRN/Reference Number
    const byRrn = ket.length >= 6 && 
      [t.rrn, t.ref].some(k => 
        k.length >= 6 && 
        (ket.includes(k) || k.includes(ket))
      );
    
    // Metode 2: By Nominal + Outlet + Tanggal
    const byNominal = 
      Math.abs(t.nominal - totalBayar) < 10 &&
      (!t.outlet || !adminObj.outlet || 
        t.outlet === String(adminObj.outlet).trim()) &&
      (!t.tanggal || !adminObj.tanggal || 
        t.tanggal === adminObj.tanggal);
    
    return byRrn || byNominal;
  });
}`,
    explanation: 'Mencocokkan pembayaran QRIS admin dengan transaksi BCA. 2 metode: (1) By RRN - cocokkan string RRN/reference di keterangan, (2) By Nominal - selisih < Rp10 dengan outlet & tanggal sama.'
  },
  {
    id: 'trigger',
    title: 'createDailyTrigger() - Otomatisasi',
    icon: '⏰',
    code: `function createDailyTrigger() {
  // Hapus trigger lama
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() 
        === 'jalankanSyncDanAuditOtomatis') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  
  // Buat trigger baru: setiap hari jam 23:00
  ScriptApp.newTrigger('jalankanSyncDanAuditOtomatis')
    .timeBased()
    .everyDays(1)
    .atHour(23)
    .create();
}

function jalankanSyncDanAuditOtomatis() {
  syncDataAdminDariOutlet();  // Step 1: Sync
  jalankanAuditDanKas();       // Step 2: Audit
}`,
    explanation: 'Membuat trigger waktu-based yang menjalankan sync + audit otomatis setiap hari jam 23:00 WIB. Trigger lama dihapus dulu untuk menghindari duplikasi.'
  }
]

export default function CodeExplorer() {
  const [activeCode, setActiveCode] = useState(codeSections[0].id)
  const currentCode = codeSections.find(c => c.id === activeCode)!

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">Code Explorer</h2>
        <p className="text-gray-400">Jelajahi kode sumber dengan penjelasan per fungsi</p>
      </div>

      {/* Code Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {codeSections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveCode(section.id)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeCode === section.id
                ? 'bg-orange-500/20 border border-orange-500/40 text-orange-400'
                : 'bg-gray-800/50 border border-gray-700 text-gray-400 hover:text-gray-200'
            }`}
          >
            {section.icon} {section.title.split(' - ')[0]}
          </button>
        ))}
      </div>

      {/* Code Display */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-lg">{currentCode.icon}</span>
            <span className="text-sm font-bold text-gray-200">{currentCode.title}</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
          </div>
        </div>
        
        <pre className="p-4 overflow-x-auto text-xs md:text-sm leading-relaxed">
          <code className="text-gray-300 font-mono whitespace-pre">{currentCode.code}</code>
        </pre>
      </div>

      {/* Explanation */}
      <div className="mt-4 bg-blue-500/5 border border-blue-500/20 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-blue-400">💡</span>
          <span className="text-blue-400 font-bold text-sm">Penjelasan</span>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">{currentCode.explanation}</p>
      </div>

      {/* Constants & Config */}
      <div className="mt-8 bg-gray-800/30 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-orange-400 mb-4">⚙️ Konstanta & Konfigurasi</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-sm font-bold text-green-400 mb-2">QRMS_OUTLET</div>
            <pre className="text-xs text-gray-400 font-mono">
{`{
  '004567962': 'Pasir Balaraja',
  '004563110': 'Jayanti Cikande'
}`}
            </pre>
            <p className="text-xs text-gray-500 mt-2">Mapping Merchant ID BCA → nama outlet</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-sm font-bold text-blue-400 mb-2">OUTLETS (Sync)</div>
            <pre className="text-xs text-gray-400 font-mono">
{`[
  { nama: 'Pasir Balaraja',
    id: '1UldxA6SvfSWR...gaD0c' },
  { nama: 'Jayanti Cikande',
    id: '1YgbaqGNV43hG...xeNY' }
]`}
            </pre>
            <p className="text-xs text-gray-500 mt-2">Spreadsheet ID outlet untuk sync data</p>
          </div>
        </div>
      </div>

      {/* Regex Patterns */}
      <div className="mt-6 bg-gray-800/30 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-orange-400 mb-4">🔤 Pola Regex yang Digunakan</h3>
        <div className="space-y-3">
          {[
            { pattern: '/^J[YXZ]/i', desc: 'Deteksi resi ecommerce (JY, JX, JZ)' },
            { pattern: '/batal/i', desc: 'Deteksi resi dibatalkan di YoYi' },
            { pattern: '/^\\d{4}-\\d{2}-\\d{2} /', desc: 'Deteksi format tanggal YYYY-MM-DD HH:MM' },
            { pattern: '/\\s+/g', desc: 'Normalisasi whitespace (newline → spasi)' },
            { pattern: '/\\D/g', desc: 'Hapus non-digit dari Merchant ID' },
            { pattern: '/^\\d+(\\.\\d+)?$/', desc: 'Deteksi format angka sederhana (tanpa ribuan)' },
          ].map((regex, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-900/50 rounded-lg px-3 py-2">
              <code className="text-xs text-orange-400 font-mono shrink-0">{regex.pattern}</code>
              <span className="text-xs text-gray-400">→ {regex.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
