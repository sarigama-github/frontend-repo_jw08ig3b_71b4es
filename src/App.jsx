import Hero from './components/Hero'
import Models from './components/Models'
import Configurator from './components/Configurator'
import About from './components/About'

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Models />
      <Configurator />
      <About />
      <footer className="bg-black text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Lamrrari. All rights reserved.</p>
          <p className="text-gray-500 text-xs">An ultra luxury EV marque — engineered for the UAE.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
