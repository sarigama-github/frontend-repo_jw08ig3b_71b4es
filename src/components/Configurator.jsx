import { useEffect, useMemo, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Configurator() {
  const [models, setModels] = useState([])
  const [options, setOptions] = useState({ colors: [], wheels: [], interiors: [], addons: [] })
  const [form, setForm] = useState({ model_id: '', color_id: '', wheels_id: '', interior_id: '', addons: [], region: 'UAE' })
  const [price, setPrice] = useState(null)
  const [saving, setSaving] = useState(false)
  const [savedId, setSavedId] = useState(null)

  useEffect(() => {
    fetch(`${API}/api/models`).then(r => r.json()).then(d => setModels(d.models || []))
    fetch(`${API}/api/config-options`).then(r => r.json()).then(d => setOptions(d))
  }, [])

  useEffect(() => {
    if (models.length && !form.model_id) {
      setForm(f => ({ ...f, model_id: models[0].id }))
    }
  }, [models])

  useEffect(() => {
    if (!options.colors.length) return
    setForm(f => ({
      ...f,
      color_id: f.color_id || options.colors[0].id,
      wheels_id: f.wheels_id || options.wheels[0].id,
      interior_id: f.interior_id || options.interiors[0].id,
    }))
  }, [options])

  const model = useMemo(() => models.find(m => m.id === form.model_id), [models, form.model_id])

  const calcPrice = async () => {
    const res = await fetch(`${API}/api/price`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
      model_id: form.model_id,
      color_id: form.color_id,
      wheels_id: form.wheels_id,
      interior_id: form.interior_id,
      addons: form.addons,
    })})
    const data = await res.json()
    setPrice(data)
  }

  useEffect(() => { if (form.model_id && form.color_id) { calcPrice() } }, [form])

  const toggleAddon = (id) => {
    setForm(f => ({ ...f, addons: f.addons.includes(id) ? f.addons.filter(a => a !== id) : [...f.addons, id] }))
  }

  const saveBuild = async () => {
    if (!model) return
    setSaving(true)
    setSavedId(null)
    const color = options.colors.find(c => c.id === form.color_id)
    const wheels = options.wheels.find(c => c.id === form.wheels_id)
    const interior = options.interiors.find(c => c.id === form.interior_id)

    const payload = {
      model_id: model.id,
      model_name: model.name,
      color: color?.name,
      wheels: wheels?.name,
      interior: interior?.name,
      addons: form.addons,
      region: form.region,
      price: price?.price || model.base_price,
    }

    const res = await fetch(`${API}/api/builds`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json()
    setSaving(false)
    if (data.ok) setSavedId(data.id)
  }

  return (
    <section id="configurator" className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold">Build Your Lamrrari</h2>
            <p className="text-gray-400 mt-2">Tailor it to your taste. See instant pricing for UAE.</p>
          </div>
          {price && <div className="text-right">
            <p className="text-xs uppercase text-gray-400">Estimated Price</p>
            <p className="text-2xl font-semibold">${price.price?.toLocaleString()} <span className="text-sm text-gray-400">{price.currency}</span></p>
          </div>}
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl border border-white/10 bg-zinc-900/50 p-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400">Model</label>
                <select value={form.model_id} onChange={e => setForm(f => ({ ...f, model_id: e.target.value }))} className="mt-1 w-full bg-zinc-900 border border-white/10 rounded-lg p-2">
                  {models.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400">Exterior Color</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {options.colors.map(c => (
                    <button key={c.id} onClick={() => setForm(f => ({ ...f, color_id: c.id }))} className={`w-10 h-10 rounded-full border ${form.color_id === c.id ? 'ring-2 ring-white' : 'border-white/20'}`} style={{ background: c.hex }} title={`${c.name} ${c.price ? `(+$${c.price})` : ''}`} />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400">Wheels</label>
                <select value={form.wheels_id} onChange={e => setForm(f => ({ ...f, wheels_id: e.target.value }))} className="mt-1 w-full bg-zinc-900 border border-white/10 rounded-lg p-2">
                  {options.wheels.map(w => <option key={w.id} value={w.id}>{w.name} {w.price ? `(+${w.price})` : ''}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400">Interior</label>
                <select value={form.interior_id} onChange={e => setForm(f => ({ ...f, interior_id: e.target.value }))} className="mt-1 w-full bg-zinc-900 border border-white/10 rounded-lg p-2">
                  {options.interiors.map(i => <option key={i.id} value={i.id}>{i.name} {i.price ? `(+${i.price})` : ''}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-400">Add-ons</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {options.addons.map(a => (
                  <button key={a.id} onClick={() => toggleAddon(a.id)} className={`px-3 py-1 rounded-full border text-sm ${form.addons.includes(a.id) ? 'bg-white text-black border-white' : 'border-white/20 hover:border-white/40'}`}>
                    {a.name} {a.price ? `(+${a.price})` : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6">
            <h3 className="font-semibold text-lg">Summary</h3>
            <div className="mt-4 space-y-2 text-sm text-gray-300">
              <p><span className="text-gray-400">Model:</span> {model?.name}</p>
              <p><span className="text-gray-400">Color:</span> {options.colors.find(c => c.id === form.color_id)?.name}</p>
              <p><span className="text-gray-400">Wheels:</span> {options.wheels.find(w => w.id === form.wheels_id)?.name}</p>
              <p><span className="text-gray-400">Interior:</span> {options.interiors.find(i => i.id === form.interior_id)?.name}</p>
              <p><span className="text-gray-400">Add-ons:</span> {form.addons.length ? form.addons.join(', ') : 'None'}</p>
            </div>
            <button onClick={saveBuild} disabled={saving} className="mt-6 w-full px-4 py-3 rounded-lg bg-white text-black font-semibold disabled:opacity-60">
              {saving ? 'Saving...' : 'Save Build'}
            </button>
            {savedId && <p className="mt-3 text-green-400 text-sm">Saved! ID: {savedId}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
