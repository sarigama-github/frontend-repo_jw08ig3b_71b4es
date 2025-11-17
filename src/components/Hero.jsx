import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/m8wpIQzXWhEh9Yek/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 flex flex-col gap-6">
        <div className="mt-10 sm:mt-20 max-w-2xl">
          <p className="uppercase tracking-[0.35em] text-xs text-gray-300">Italia • Germania • India • UAE</p>
          <h1 className="mt-3 text-4xl sm:text-6xl font-extrabold leading-tight">
            Lamrrari
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400">Ultra Luxury EV SUVs</span>
          </h1>
          <p className="mt-4 text-gray-300 text-base sm:text-lg">
            Crafted in Italy with German engineering under the hood, manufactured with precision in India. Born to conquer the boulevards of the UAE.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          <a href="#configurator" className="px-5 py-3 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition">Build Yours</a>
          <a href="#about" className="px-5 py-3 rounded-full border border-white/30 hover:border-white transition">Discover Lamrrari</a>
        </div>
      </div>
    </section>
  );
}
