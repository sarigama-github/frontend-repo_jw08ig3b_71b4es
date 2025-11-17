export default function About() {
  return (
    <section id="about" className="bg-black text-white py-20">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold">Italian Soul. German Heart. Indian Precision.</h2>
          <p className="mt-4 text-gray-300">Lamrrari stands at the intersection of artistry and engineering. Designed in Italy, powered by German innovation, and manufactured with world-class efficiency in India—every Lamrrari is crafted to command the avenues of Dubai and beyond.</p>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="rounded-lg border border-white/10 p-4 bg-zinc-900/50">
              <p className="text-gray-400">Manufacturing</p>
              <p className="font-semibold">Made in India</p>
            </div>
            <div className="rounded-lg border border-white/10 p-4 bg-zinc-900/50">
              <p className="text-gray-400">Powertrain</p>
              <p className="font-semibold">German Engineered</p>
            </div>
            <div className="rounded-lg border border-white/10 p-4 bg-zinc-900/50">
              <p className="text-gray-400">Design</p>
              <p className="font-semibold">Born in Italy</p>
            </div>
            <div className="rounded-lg border border-white/10 p-4 bg-zinc-900/50">
              <p className="text-gray-400">Market</p>
              <p className="font-semibold">UAE First</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-6">
          <p className="text-lg font-semibold">The Lamrrari Promise</p>
          <ul className="mt-4 space-y-3 text-gray-300 list-disc list-inside">
            <li>Ultra-luxury cabins with hand-stitched Italian leather</li>
            <li>Track-honed dynamics tuned for everyday sophistication</li>
            <li>Silently potent all-electric powertrains</li>
            <li>Tailored ownership for the most discerning clients</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
