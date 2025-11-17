import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Models() {
  const [models, setModels] = useState([])

  useEffect(() => {
    fetch(`${API}/api/models`).then(r => r.json()).then(d => setModels(d.models || [])).catch(() => {})
  }, [])

  return (
    <section id="models" className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold">Our Models</h2>
        <p className="text-gray-400 mt-2">Three distinct expressions of electric supremacy.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {models.map(m => (
            <div key={m.id} className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 hover:bg-zinc-900 transition">
              <h3 className="text-xl font-semibold">{m.name}</h3>
              <p className="text-gray-400 text-sm">{m.tagline}</p>
              <div className="mt-4 text-sm text-gray-300 space-y-1">
                <p>Range: <span className="font-medium">{m.range_km} km</span></p>
                <p>Power: <span className="font-medium">{m.power_kw} kW</span></p>
                <p>Base Price: <span className="font-medium">${m.base_price.toLocaleString()}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
