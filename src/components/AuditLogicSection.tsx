export default function AuditLogicSection() {
  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">Logika Audit & Validasi</h2>
        <p className="text-gray-400">Penjelasan detail bagaimana sistem mencocokkan dan memvalidasi data</p>
      </div>

      {/* Audit Flow */}
      <div className="space-y-6">
        {/* Step 1: Data Collection */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-2 py-1 rounded">STEP 1</span>
            <h3 className="text-lg font-bold text-blue-400">Pengumpulan Data (Data Collection)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-3">
              <div className="text-sm font-bold text-orange-400 mb-1">adminMap</div>
              <p className="text-xs text-gray-400">Map dari RAW_Admin, key = No. Resi. Berisi: tanggal, outlet, ongkir, metode bayar, biaya tambahan, keterangan.</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-3">
              <div className="text-sm font-bold text-blue-400 mb-1">yoyiMap</div>
              <p className="text-xs text-gray-400">Map dari RAW_YoYi, key = No. Resi. Berisi: tanggal, status (batal/ecommerce), ongkir, sudah diserahkan atau belum.</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-3">
              <div className="text-sm font-bold text-green-400 mb-1">bcaTxs[]</div>
              <p className="text-xs text-gray-400">Array transaksi BCA dari QRMS. Berisi: outlet, tanggal, nominal, RRN, reference, tipe, valid (bukan reversal/refund).</p>
            </div>
          </div>
        </div>

        {/* Step 2: Filtering */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded">STEP 2</span>
            <h3 className="text-lg font-bold text-yellow-400">Filtering & Skip Logic</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-gray-900/50 rounded-lg p-3">
              <span className="text-red-400">🚫</span>
              <div>
                <div className="text-sm font-bold text-gray-200">Ecommerce (JY/JX/JZ)</div>
                <p className="text-xs text-gray-400">Resi dengan prefix JY, JX, atau JZ langsung di-skip. Tidak ditampilkan di Dashboard_Audit.</p>
                <code className="text-[10px] text-gray-500 font-mono">if (/^J[YXZ]/i.test(resi)) return;</code>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-gray-900/50 rounded-lg p-3">
              <span className="text-yellow-400">⚠️</span>
              <div>
                <div className="text-sm font-bold text-gray-200">Dibatalkan di YoYi</div>
                <p className="text-xs text-gray-400">Jika status paket mengandung kata "batal", ditandai "DILEWATI (Dibatalkan)".</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-gray-900/50 rounded-lg p-3">
              <span className="text-yellow-400">⚠️</span>
              <div>
                <div className="text-sm font-bold text-gray-200">Belum Diserahkan</div>
                <p className="text-xs text-gray-400">Jika kolom "Waktu serah terima" kosong di YoYi, ditandai "DILEWATI (Belum Diserahkan)".</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Cross Reference */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">STEP 3</span>
            <h3 className="text-lg font-bold text-green-400">Cross-Reference Admin ↔ YoYi</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-sm font-bold text-green-400 mb-2">✅ Ada di Admin + YoYi</div>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Status Admin: "Terinput Admin"</li>
                <li>• Status YoYi: "Tercatat YoYi"</li>
                <li>• Hitung selisih ongkir</li>
                <li>• Validasi QRIS jika metode non-tunai</li>
              </ul>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-sm font-bold text-red-400 mb-2">❌ Masalah Terdeteksi</div>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Hanya di Admin → "Cek Serah Terima YoYi"</li>
                <li>• Hanya di YoYi → "Cek inputan Admin"</li>
                <li>• Selisih &lt; 0 → "Admin kurang dari YoYi"</li>
                <li>• Selisih &gt; 0 → "Pembulatan (wajar)"</li>
              </ul>
            </div>
          </div>

          {/* Selisih Logic */}
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-sm font-bold text-orange-400 mb-2">📐 Logika Selisih Ongkir</div>
            <div className="font-mono text-xs text-gray-300 bg-gray-950 rounded p-3">
              <div>selisihOngkir = ongkirAdmin - ongkirYoYi</div>
              <div className="mt-2 text-green-400">jika selisih {'>'} 0 → "Pembulatan (wajar)"</div>
              <div className="text-red-400">jika selisih {'<'} 0 → "Cek Selisih Ongkir (Admin kurang dari YoYi)"</div>
              <div className="text-gray-400">jika selisih = 0 → (tidak ada catatan)</div>
            </div>
          </div>
        </div>

        {/* Step 4: QRIS Validation */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-purple-500/20 text-purple-400 text-xs font-bold px-2 py-1 rounded">STEP 4</span>
            <h3 className="text-lg font-bold text-purple-400">Validasi QRIS (BCA)</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-sm font-bold text-gray-200 mb-2">Kapan QRIS divalidasi?</div>
              <p className="text-xs text-gray-400">
                Hanya jika metode bayar ongkir ATAU metode bayar biaya tambahan mengandung kata "QRIS" atau "TRANSFER".
              </p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-sm font-bold text-gray-200 mb-2">Bagaimana pencocokan? (fungsi cocokQris)</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="border border-green-500/20 rounded p-2">
                  <div className="text-xs text-green-400 font-bold mb-1">Metode 1: By RRN/Reference</div>
                  <p className="text-[11px] text-gray-400">
                    Jika keterangan admin (min 6 char) mengandung RRN atau Reference Number BCA, atau sebaliknya.
                  </p>
                  <code className="text-[10px] text-gray-500 font-mono block mt-1">ket.includes(rrn) || rrn.includes(ket)</code>
                </div>
                <div className="border border-blue-500/20 rounded p-2">
                  <div className="text-xs text-blue-400 font-bold mb-1">Metode 2: By Nominal</div>
                  <p className="text-[11px] text-gray-400">
                    Jika selisih nominal {'<'} Rp10 DAN outlet sama DAN tanggal sama.
                  </p>
                  <code className="text-[10px] text-gray-500 font-mono block mt-1">Math.abs(t.nominal - totalBayar) {'<'} 10</code>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-sm font-bold text-gray-200 mb-2">Filter Transaksi BCA</div>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• <span className="text-red-400">Reversal</span> → tidak dihitung sebagai pembayaran</li>
                <li>• <span className="text-red-400">Refund</span> → tidak dihitung sebagai pembayaran</li>
                <li>• <span className="text-green-400">Valid</span> → hanya transaksi tanpa reversal/refund</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Step 5: Kas Calculation */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-1 rounded">STEP 5</span>
            <h3 className="text-lg font-bold text-emerald-400">Kalkulasi Kas Outlet</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-sm font-bold text-orange-400 mb-2">💵 Setoran Owner (Ongkir)</div>
              <p className="text-xs text-gray-400 mb-2">
                Total ongkir yang disetor owner ke rekening. Diambil dari ongkirAdmin, jika 0 pakai ongkirYoYi.
              </p>
              <code className="text-[10px] text-gray-500 font-mono">ongkirSetoran = ongkirAdmin {'>'} 0 ? ongkirAdmin : ongkirYoYi</code>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-sm font-bold text-green-400 mb-2">💰 Kas Fisik vs Digital</div>
              <p className="text-xs text-gray-400 mb-2">
                Biaya tambahan dikelompokkan berdasarkan metode bayar:
              </p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• <span className="text-green-400">Kas Fisik</span>: Metode = TUNAI / CASH</li>
                <li>• <span className="text-blue-400">Kas Digital</span>: Metode = QRIS / TRANSFER / lainnya</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 bg-gray-900/50 rounded-lg p-4">
            <div className="text-sm font-bold text-gray-200 mb-2">📊 Formula Kas_Outlet</div>
            <div className="font-mono text-xs text-gray-300 bg-gray-950 rounded p-3 space-y-1">
              <div>Key = <span className="text-orange-400">"tanggal_outlet"</span></div>
              <div>Total Setoran Owner = Σ ongkir per tanggal per outlet</div>
              <div>Kas Fisik = Σ biaya tambahan (TUNAI) per tanggal per outlet</div>
              <div>Kas Digital = Σ biaya tambahan (non-TUNAI) per tanggal per outlet</div>
              <div className="text-green-400 font-bold">Total Kas Outlet = Kas Fisik + Kas Digital</div>
            </div>
          </div>
        </div>
      </div>

      {/* Helper Functions */}
      <div className="mt-8 bg-gray-800/30 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-orange-400 mb-4">🔧 Helper Functions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'formatTanggalStandard()', desc: 'Normalisasi berbagai format tanggal ke "YYYY-MM-DD". Mendukung Date object, ISO string, dan format DD/MM/YYYY.' },
            { name: 'findColumnIndex()', desc: 'Pencari index header fleksibel. Exact match dulu, lalu partial match. Handle header dengan newline/enter.' },
            { name: 'parseYoyiRows()', desc: 'Parser YoYi berbasis header. Mendukung 4 kolom lama dan export "Order Parcel" hingga 45 kolom.' },
            { name: 'parseQrmsRows()', desc: 'Parser QRMS BCA. Deteksi header otomatis, support multi-outlet ditumpuk, dan format lama 4 kolom.' },
            { name: 'parseNominal()', desc: 'Parser angka dari berbagai format: "32400.00", "32.400,00", atau number langsung.' },
            { name: 'normMerchantId()', desc: 'Normalisasi Merchant ID ke 9 digit dengan leading zeros.' },
            { name: 'cocokQris()', desc: 'Mencocokkan pembayaran QRIS admin dengan transaksi BCA via RRN atau nominal+outlet+tanggal.' },
            { name: 'alasanDilewati()', desc: 'Menentukan alasan resi dilewati: dibatalkan, ecommerce, atau belum diserahkan.' },
          ].map(fn => (
            <div key={fn.name} className="bg-gray-900/50 border border-gray-600 rounded-lg p-3">
              <code className="text-xs text-orange-400 font-mono">{fn.name}</code>
              <p className="text-xs text-gray-400 mt-1">{fn.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
