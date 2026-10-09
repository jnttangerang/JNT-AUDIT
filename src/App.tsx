import { useState } from 'react'
import HeroSection from './components/HeroSection'
import ArchitectureSection from './components/ArchitectureSection'
import SheetStructure from './components/SheetStructure'
import FeatureCards from './components/FeatureCards'
import DataFlowSection from './components/DataFlowSection'
import CodeExplorer from './components/CodeExplorer'
import AuditLogicSection from './components/AuditLogicSection'
import DeploymentGuide from './components/DeploymentGuide'
import Footer from './components/Footer'

function App() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: '📋 Overview' },
    { id: 'architecture', label: '🏗️ Arsitektur' },
    { id: 'sheets', label: '📊 Struktur Sheet' },
    { id: 'audit', label: '🔍 Logika Audit' },
    { id: 'flow', label: '🔄 Alur Data' },
    { id: 'code', label: '💻 Kode' },
    { id: 'deploy', label: '🚀 Deployment' },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <HeroSection />
      
      {/* Navigation Tabs */}
      <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-400'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && <FeatureCards />}
        {activeTab === 'architecture' && <ArchitectureSection />}
        {activeTab === 'sheets' && <SheetStructure />}
        {activeTab === 'audit' && <AuditLogicSection />}
        {activeTab === 'flow' && <DataFlowSection />}
        {activeTab === 'code' && <CodeExplorer />}
        {activeTab === 'deploy' && <DeploymentGuide />}
      </main>

      <Footer />
    </div>
  )
}

export default App
