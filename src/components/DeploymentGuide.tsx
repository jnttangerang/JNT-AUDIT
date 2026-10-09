import { useState } from 'react'

export default function DeploymentGuide() {
  const [activeSection, setActiveSection] = useState('overview')

  const sections = [
    { id: 'overview', label: '📋 Overview', icon: '📋' },
    { id: 'backend', label: '⚡ Backend Setup', icon: '⚡' },
    { id: 'frontend', label: '🎨 Frontend Setup', icon: '🎨' },
    { id: 'credentials', label: '🔐 Credentials', icon: '🔐' },
    { id: 'deployment', label: '🚀 Deployment', icon: '🚀' },
  ]

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">Panduan Deployment & Konfigurasi</h2>
        <p className="text-gray-400">Langkah-langkah setup sistem dari backend hingga frontend</p>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeSection === section.id
                ? 'bg-orange-500/20 border border-orange-500/40 text-orange-400'
                : 'bg-gray-800/50 border border-gray-700 text-gray-400 hover:text-gray-200'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeSection === 'overview' && <OverviewSection />}
        {activeSection === 'backend' && <BackendSection />}
        {activeSection === 'frontend' && <FrontendSection />}
        {activeSection === 'credentials' && <CredentialsSection />}
        {activeSection === 'deployment' && <DeploymentSection />}
      </div>
    </div>
  )
}

// ============ SECTION COMPONENTS ============

function OverviewSection() {
  return (
    <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-bold text-orange-400 mb-4">📋 Ringkasan Konfigurasi</h3>
      
      <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-400">💡</span>
          <span className="text-yellow-400 font-bold text-sm">Jawaban Cepat</span>
        </div>
        <ul className="text-sm text-gray-300 space-y-2">
          <li>✅ <strong>ID Spreadsheet</strong> → Isi di <code className="text-orange-400">Kode.gs</code> (Apps Script)</li>
          <li>✅ <strong>URL Apps Script</strong> → Isi di <code className="text-orange-400">.env</code> atau config frontend (Vercel)</li>
          <li>❌ <strong>Google API Key</strong> → <span className="text-green-400">TIDAK dibutuhkan!</span></li>
          <li>✅ <strong>Yang dibutuhkan lainnya</strong> → Lihat tab "Credentials" di bawah</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-900/50 rounded-lg p-4">
          <div className="text-sm font-bold text-green-400 mb-2">✅ Data Anda</div>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-gray-500">Spreadsheet ID:</span>
              <code className="text-green-400 block mt-1 break-all">1CEf0GwfUK7rMQp-WHTGr1e0qvWhE1M4uEKr-mPdSDiQ</code>
            </div>
            <div>
              <span className="text-gray-500">Apps Script URL:</span>
              <code className="text-green-400 block mt-1 break-all">https://script.google.com/macros/s/AKfycbwX-kM7FxHM-nC0zJXmwON7rx20xW6hNurp9y53lZ_oMawJgetwOXN5QKX6q6UHf1H-/exec</code>
            </div>
          </div>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4">
          <div className="text-sm font-bold text-blue-400 mb-2">📍 Dimana Isi?</div>
          <ul className="text-xs text-gray-400 space-y-1.5">
            <li>📊 <strong>Spreadsheet ID</strong> → Di Apps Script (Kode.gs)</li>
            <li>⚡ <strong>Apps Script URL</strong> → Di Frontend (Vercel env)</li>
            <li>🔑 <strong>API Key</strong> → Tidak perlu!</li>
            <li>🏪 <strong>Outlet IDs</strong> → Di Apps Script (Kode.gs)</li>
            <li>🏦 <strong>QRMS Merchant IDs</strong> → Di Apps Script (Kode.gs)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function BackendSection() {
  return (
    <div className="space-y-4">
      <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-orange-400 mb-4">⚡ Setup Backend (Google Apps Script)</h3>
        
        <div className="space-y-4">
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-sm font-bold text-gray-200 mb-2">📍 Langkah 1: Buka Apps Script Editor</div>
            <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
              <li>Buka spreadsheet ID: <code className="text-orange-400 text-xs">1CEf0GwfUK7rMQp-WHTGr1e0qvWhE1M4uEKr-mPdSDiQ</code></li>
              <li>Klik menu <strong>Extensions → Apps Script</strong></li>
              <li>Paste kode <code className="text-orange-400">Kode.gs</code> ke editor</li>
            </ol>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-sm font-bold text-gray-200 mb-2">📍 Langkah 2: Deploy sebagai Web App</div>
            <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
              <li>Klik <strong>Deploy → New deployment</strong></li>
              <li>Pilih type: <strong>Web app</strong></li>
              <li>Execute as: <strong>Me</strong></li>
              <li>Who has access: <strong>Anyone</strong> (untuk API publik)</li>
              <li>Copy URL deployment → ini adalah <strong>API URL</strong> Anda</li>
            </ol>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-sm font-bold text-green-400 mb-2">✅ URL Anda Sudah Benar!</div>
            <code className="text-xs text-green-400 break-all block bg-gray-950 p-3 rounded">
              https://script.google.com/macros/s/AKfycbwX-kM7FxHM-nC0zJXmwON7rx20xW6hNurp9y53lZ_oMawJgetwOXN5QKX6q6UHf1H-/exec
            </code>
            <p className="text-xs text-gray-500 mt-2">URL ini akan digunakan frontend untuk memanggil API backend.</p>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-sm font-bold text-gray-200 mb-2">📍 Langkah 3: Tambahkan Fungsi API (doGet/doPost)</div>
            <p className="text-xs text-gray-400 mb-2">Tambahkan kode berikut di <code className="text-orange-400">Kode.gs</code> agar frontend bisa akses data:</p>
            <pre className="text-xs text-gray-300 font-mono bg-gray-950 p-3 rounded overflow-x-auto">
{`// === TAMBAHKAN INI DI Kode.gs ===

// API Endpoint - GET
function doGet(e) {
  const action = e.parameter.action;
  let result;
  
  switch(action) {
    case 'getAudit':
      result = getAuditData();
      break;
    case 'getKas':
      result = getKasData();
      break;
    case 'sync':
      syncDataAdminDariOutlet();
      result = { success: true, message: 'Sync berhasil' };
      break;
    case 'audit':
      jalankanAuditDanKas();
      result = { success: true, message: 'Audit berhasil' };
      break;
    default:
      result = { error: 'Action tidak valid' };
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// API Endpoint - POST
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const action = data.action;
  let result;
  
  switch(action) {
    case 'sync':
      syncDataAdminDariOutlet();
      result = { success: true, message: 'Sync berhasil' };
      break;
    case 'audit':
      jalankanAuditDanKas();
      result = { success: true, message: 'Audit berhasil' };
      break;
    default:
      result = { error: 'Action tidak valid' };
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// Helper: Ambil data Dashboard_Audit untuk API
function getAuditData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Dashboard_Audit');
  if (!sheet) return { error: 'Sheet tidak ditemukan' };
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
  
  return { success: true, data: rows };
}

// Helper: Ambil data Kas_Outlet untuk API
function getKasData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Kas_Outlet');
  if (!sheet) return { error: 'Sheet tidak ditemukan' };
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
  
  return { success: true, data: rows };
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

function FrontendSection() {
  return (
    <div className="space-y-4">
      <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-purple-400 mb-4">🎨 Setup Frontend (Vercel)</h3>
        
        <div className="space-y-4">
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-sm font-bold text-gray-200 mb-2">📍 Langkah 1: Buat File Environment</div>
            <p className="text-xs text-gray-400 mb-2">Buat file <code className="text-orange-400">.env</code> atau <code className="text-orange-400">.env.local</code> di root project frontend:</p>
            <pre className="text-xs text-gray-300 font-mono bg-gray-950 p-3 rounded overflow-x-auto">
{`# .env.local
# URL API Apps Script (Backend)
VITE_API_URL=https://script.google.com/macros/s/AKfycbwX-kM7FxHM-nC0zJXmwON7rx20xW6hNurp9y53lZ_oMawJgetwOXN5QKX6q6UHf1H-/exec

# Spreadsheet ID (opsional, untuk referensi)
VITE_SPREADSHEET_ID=1CEf0GwfUK7rMQp-WHTGr1e0qvWhE1M4uEKr-mPdSDiQ`}
            </pre>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-sm font-bold text-gray-200 mb-2">📍 Langkah 2: Buat API Service</div>
            <p className="text-xs text-gray-400 mb-2">Buat file <code className="text-orange-400">src/services/api.ts</code>:</p>
            <pre className="text-xs text-gray-300 font-mono bg-gray-950 p-3 rounded overflow-x-auto">
{`const API_URL = import.meta.env.VITE_API_URL;

// GET: Ambil data audit
export async function fetchAuditData() {
  const response = await fetch(\`\${API_URL}?action=getAudit\`);
  return response.json();
}

// GET: Ambil data kas
export async function fetchKasData() {
  const response = await fetch(\`\${API_URL}?action=getKas\`);
  return response.json();
}

// POST: Trigger sync
export async function triggerSync() {
  const response = await fetch(API_URL, {
    method: 'POST',
    mode: 'no-cors', // Penting untuk Apps Script!
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'sync' })
  });
  return response;
}

// POST: Trigger audit
export async function triggerAudit() {
  const response = await fetch(API_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'audit' })
  });
  return response;
}`}
            </pre>
          </div>

          <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-400">⚠️</span>
              <span className="text-yellow-400 font-bold text-sm">PENTING: CORS Issue</span>
            </div>
            <p className="text-xs text-gray-400 mb-2">
              Apps Script Web App tidak mendukung CORS headers secara default. Solusi:
            </p>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Gunakan <code className="text-orange-400">mode: 'no-cors'</code> untuk POST requests</li>
              <li>• Untuk GET, gunakan URL langsung dengan parameter</li>
              <li>• Atau gunakan proxy di Vercel (vercel.json rewrites)</li>
            </ul>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-sm font-bold text-gray-200 mb-2">📍 Langkah 3: Konfigurasi Vercel (Proxy)</div>
            <p className="text-xs text-gray-400 mb-2">Buat file <code className="text-orange-400">vercel.json</code> di root project:</p>
            <pre className="text-xs text-gray-300 font-mono bg-gray-950 p-3 rounded overflow-x-auto">
{`{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://script.google.com/macros/s/AKfycbwX-kM7FxHM-nC0zJXmwON7rx20xW6hNurp9y53lZ_oMawJgetwOXN5QKX6q6UHf1H-/exec/:path*"
    }
  ]
}`}
            </pre>
            <p className="text-xs text-gray-500 mt-2">Dengan ini, frontend bisa panggil <code className="text-orange-400">/api?action=getAudit</code> tanpa CORS issue.</p>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-sm font-bold text-gray-200 mb-2">📍 Langkah 4: Set Environment di Vercel Dashboard</div>
            <ol className="text-xs text-gray-400 space-y-1 list-decimal list-inside">
              <li>Buka Vercel Dashboard → Project Settings</li>
              <li>Tab <strong>Environment Variables</strong></li>
              <li>Tambahkan:
                <ul className="ml-4 mt-1 space-y-0.5">
                  <li>• <code className="text-orange-400">VITE_API_URL</code> = URL Apps Script Anda</li>
                  <li>• <code className="text-orange-400">VITE_SPREADSHEET_ID</code> = ID Spreadsheet Anda</li>
                </ul>
              </li>
              <li>Redeploy project</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

function CredentialsSection() {
  return (
    <div className="space-y-4">
      <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-green-400 mb-4">🔐 Kebutuhan Credentials</h3>
        
        {/* API Key Answer */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">❌</span>
            <div>
              <div className="text-green-400 font-bold text-lg">Google API Key TIDAK Dibutuhkan!</div>
              <div className="text-xs text-gray-400">Alasan: Apps Script Web App sudah punya autentikasi built-in</div>
            </div>
          </div>
          <div className="text-sm text-gray-300 space-y-2">
            <p>Ketika Anda deploy Apps Script sebagai <strong>"Web App"</strong> dengan akses <strong>"Anyone"</strong>:</p>
            <ul className="text-xs text-gray-400 space-y-1 ml-4">
              <li>✅ URL deployment sudah menjadi "API key" itu sendiri</li>
              <li>✅ Apps Script otomatis handle autentikasi via Google account</li>
              <li>✅ Tidak perlu OAuth, tidak perlu API Key dari Google Cloud Console</li>
              <li>✅ Akses ke spreadsheet otomatis (karena script milik Anda)</li>
            </ul>
          </div>
        </div>

        {/* What IS needed */}
        <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
          <div className="text-sm font-bold text-orange-400 mb-3">✅ Yang Dibutuhkan:</div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 border border-gray-700 rounded-lg p-3">
              <span className="text-green-400 text-lg">1️⃣</span>
              <div>
                <div className="text-sm font-bold text-gray-200">Google Account</div>
                <p className="text-xs text-gray-400">Untuk akses Google Sheets & Apps Script. Sudah pasti Anda punya.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border border-gray-700 rounded-lg p-3">
              <span className="text-green-400 text-lg">2️⃣</span>
              <div>
                <div className="text-sm font-bold text-gray-200">Spreadsheet ID</div>
                <p className="text-xs text-gray-400 mb-1">Sudah ada: <code className="text-green-400">1CEf0GwfUK7rMQp-WHTGr1e0qvWhE1M4uEKr-mPdSDiQ</code></p>
                <p className="text-xs text-gray-500">Ditemukan di URL spreadsheet: docs.google.com/spreadsheets/d/<strong className="text-green-400">[ID_INI]</strong>/edit</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border border-gray-700 rounded-lg p-3">
              <span className="text-green-400 text-lg">3️⃣</span>
              <div>
                <div className="text-sm font-bold text-gray-200">Apps Script Deployment URL</div>
                <p className="text-xs text-gray-400 mb-1">Sudah ada: <code className="text-green-400 text-[10px] break-all">https://script.google.com/macros/s/AKfycbwX.../exec</code></p>
                <p className="text-xs text-gray-500">Didapat setelah Deploy → New deployment → Web app</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border border-gray-700 rounded-lg p-3">
              <span className="text-green-400 text-lg">4️⃣</span>
              <div>
                <div className="text-sm font-bold text-gray-200">Outlet Spreadsheet IDs</div>
                <p className="text-xs text-gray-400 mb-1">Sudah di-hardcode di <code className="text-orange-400">Kode.gs</code>:</p>
                <ul className="text-xs text-gray-500 space-y-0.5">
                  <li>• Pasir Balaraja: <code className="text-blue-400">1UldxA6SvfSWRpusxavv34kKJE2rDf-Y6fTTC2UgaD0c</code></li>
                  <li>• Jayanti Cikande: <code className="text-blue-400">1YgbaqGNV43hG70waQcgVbFivajfW0BmMCCzpeYBxeNY</code></li>
                </ul>
              </div>
            </div>
            <div className="flex items-start gap-3 border border-gray-700 rounded-lg p-3">
              <span className="text-green-400 text-lg">5️⃣</span>
              <div>
                <div className="text-sm font-bold text-gray-200">GitHub Account + Vercel Account</div>
                <p className="text-xs text-gray-400">Untuk deploy frontend. Keduanya gratis.</p>
              </div>
            </div>
          </div>
        </div>

        {/* What is NOT needed */}
        <div className="bg-gray-900/50 rounded-lg p-4">
          <div className="text-sm font-bold text-red-400 mb-3">❌ Yang TIDAK Dibutuhkan:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              'Google Cloud API Key',
              'OAuth 2.0 Client ID',
              'Service Account JSON',
              'Google Cloud Project',
              'Billing Account',
              'Custom Domain (opsional)',
              'Server/VPS',
              'Database Server (MySQL/PostgreSQL)'
            ].map(item => (
              <div key={item} className="flex items-center gap-2 text-xs text-gray-400 bg-red-500/5 border border-red-500/10 rounded px-2 py-1.5">
                <span className="text-red-400">✗</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Security Note */}
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4 mt-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-400">🔒</span>
            <span className="text-yellow-400 font-bold text-sm">Catatan Keamanan</span>
          </div>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• URL Apps Script Anda bersifat <strong>publik</strong> - siapapun yang punya URL bisa akses</li>
            <li>• Jangan share URL Apps Script di tempat publik</li>
            <li>• Untuk proteksi tambahan, bisa tambahkan token/secret di request</li>
            <li>• Data spreadsheet tetap aman karena hanya Google account Anda yang bisa edit</li>
            <li>• Pertimbangkan <code className="text-orange-400">"Anyone with Google account"</code> bukan <code className="text-orange-400">"Anyone"</code></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function DeploymentSection() {
  return (
    <div className="space-y-4">
      <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-blue-400 mb-4">🚀 Langkah Deployment</h3>
        
        <div className="space-y-4">
          {/* Step 1 */}
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-2 py-0.5 rounded">STEP 1</span>
              <span className="text-sm font-bold text-gray-200">Setup Backend (Apps Script)</span>
            </div>
            <div className="text-xs text-gray-400 space-y-1">
              <p>1. Buka spreadsheet → Extensions → Apps Script</p>
              <p>2. Paste kode <code className="text-orange-400">Kode.gs</code> + tambahkan doGet/doPost</p>
              <p>3. Deploy → New deployment → Web app → Anyone</p>
              <p>4. Copy URL deployment ✅ <span className="text-green-400">Sudah ada!</span></p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-purple-500/20 text-purple-400 text-xs font-bold px-2 py-0.5 rounded">STEP 2</span>
              <span className="text-sm font-bold text-gray-200">Push ke GitHub</span>
            </div>
            <pre className="text-xs text-gray-300 font-mono bg-gray-950 p-3 rounded overflow-x-auto">
{`# Di terminal, dari folder project frontend
git init
git add .
git commit -m "Initial commit - Audit J&T Frontend"
git branch -M main
git remote add origin https://github.com/USERNAME/audit-jt.git
git push -u origin main`}
            </pre>
          </div>

          {/* Step 3 */}
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-0.5 rounded">STEP 3</span>
              <span className="text-sm font-bold text-gray-200">Deploy ke Vercel</span>
            </div>
            <ol className="text-xs text-gray-400 space-y-1 list-decimal list-inside">
              <li>Buka <a href="https://vercel.com" className="text-blue-400 underline" target="_blank" rel="noreferrer">vercel.com</a> → Login dengan GitHub</li>
              <li>Klik <strong>"Add New → Project"</strong></li>
              <li>Import repository <code className="text-orange-400">audit-jt</code></li>
              <li>Framework: <strong>Vite</strong> (auto-detect)</li>
              <li>Tambah Environment Variables:
                <ul className="ml-4 mt-1 space-y-0.5">
                  <li>• <code className="text-orange-400">VITE_API_URL</code> = URL Apps Script</li>
                </ul>
              </li>
              <li>Klik <strong>Deploy</strong> → Tunggu ~1 menit</li>
              <li>✅ Frontend live di <code className="text-green-400">https://your-project.vercel.app</code></li>
            </ol>
          </div>

          {/* Step 4 */}
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-0.5 rounded">STEP 4</span>
              <span className="text-sm font-bold text-gray-200">Test & Verify</span>
            </div>
            <div className="text-xs text-gray-400 space-y-2">
              <p>Test API langsung di browser:</p>
              <code className="text-green-400 block bg-gray-950 p-2 rounded break-all text-[10px]">
                https://script.google.com/macros/s/AKfycbwX-kM7FxHM-nC0zJXmwON7rx20xW6hNurp9y53lZ_oMawJgetwOXN5QKX6q6UHf1H-/exec?action=getAudit
              </code>
              <p>Harus return JSON: <code className="text-orange-400">{"{ success: true, data: [...] }"}</code></p>
            </div>
          </div>

          {/* Final Checklist */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="text-sm font-bold text-green-400 mb-3">✅ Checklist Final</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                'Apps Script deployed sebagai Web App',
                'doGet/doPost sudah ditambahkan',
                'URL Apps Script di .env frontend',
                'GitHub repo sudah push',
                'Vercel auto-deploy berhasil',
                'Environment variables di Vercel',
                'API test berhasil di browser',
                'Frontend bisa fetch data dari API'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                  <span className="text-green-400">☐</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
