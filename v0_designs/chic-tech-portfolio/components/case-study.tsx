import Image from 'next/image'

export default function CaseStudy() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Featured Case Study */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-6">
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                  Case Study
                </span>
              </div>
              <h2 className="section-title mb-6">Neural Flow AI Platform</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Developed a comprehensive machine learning visualization platform that transforms complex neural network data into intuitive, interactive dashboards. The platform processes millions of data points in real-time while maintaining a responsive, glassmorphic user interface.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Impact</h4>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">40% faster</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">data processing</p>
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Scale</h4>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">10M+</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">daily records</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Python', 'TensorFlow', 'WebGL', 'PostgreSQL'].map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="glass-card h-96 rounded-2xl overflow-hidden">
                <Image
                  src="/neural-flow.png"
                  alt="Neural Flow Platform"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass-card p-4 backdrop-blur-xl">
                <p className="text-sm font-semibold text-foreground">Award Winner</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Best Innovation 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Challenge & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="glass-card">
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30">
              <span className="text-sm font-semibold text-red-700 dark:text-red-300">Challenge</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">Real-time Processing</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              The main challenge was processing and visualizing millions of neural network data points in real-time without compromising performance or user experience. Traditional approaches were too slow for interactive use.
            </p>
          </div>

          <div className="glass-card">
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30">
              <span className="text-sm font-semibold text-green-700 dark:text-green-300">Solution</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">GPU Acceleration</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Implemented WebGL-based rendering with GPU acceleration for data visualization, combined with optimized backend algorithms. This reduced processing time by 40% while enabling real-time interactivity.
            </p>
          </div>
        </div>

        {/* Process Timeline */}
        <div className="glass-card p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-8 text-foreground">Development Process</h3>
          <div className="space-y-6">
            {[
              { phase: 'Research', description: 'Analyzed ML visualization requirements and performance constraints' },
              { phase: 'Design', description: 'Created glassmorphic UI with responsive layouts and smooth interactions' },
              { phase: 'Development', description: 'Built optimized React components with WebGL rendering pipeline' },
              { phase: 'Optimization', description: 'Implemented caching, lazy loading, and GPU acceleration' },
              { phase: 'Launch', description: 'Deployed to production with monitoring and analytics' },
            ].map((item, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-grow pt-1">
                  <h4 className="font-bold text-foreground mb-1">{item.phase}</h4>
                  <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
