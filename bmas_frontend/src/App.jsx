import React, { useState } from 'react';

function App() {
  const [dbStatus, setDbStatus] = useState('Connected');
  const [backendStatus, setBackendStatus] = useState('Online');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob [animation-delay:2s]"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob [animation-delay:4s]"></div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/60 border-b border-slate-800/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-black text-xl tracking-wider shadow-lg shadow-indigo-500/20">
              B
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                BMAS
              </span>
              <span className="text-xs block text-slate-500 font-medium tracking-widest uppercase -mt-1">
                Management System
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-400">
            <a href="#architecture" className="hover:text-indigo-400 transition-colors duration-200">Architecture</a>
            <a href="#status" className="hover:text-indigo-400 transition-colors duration-200">System Status</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors duration-200">Components</a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Development Mode
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in">
            🚀 System Architecture Initialized Successfully
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            Spring Boot & React <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Enterprise Stack
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed mb-8">
            Welcome to the base layout of your final year project. The workspace has been refactored into completely separated backend and frontend modules to adhere to clean-code guidelines and architectural standards.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#status"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center"
            >
              Check Stack Status
            </a>
            <a
              href="#architecture"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 font-semibold hover:text-white hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center"
            >
              Explore Architecture
            </a>
          </div>
        </section>

        {/* Stack Status Section */}
        <section id="status" className="mb-24 scroll-mt-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-white mb-3">System Status</h2>
            <p className="text-slate-400">Live monitoring of project dependencies and services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Frontend Status */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl shadow-xl hover:border-slate-700/80 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Frontend</span>
                <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">React App</h3>
              <p className="text-slate-400 text-sm mb-4">Vite dev server initialized with React Router & Axios.</p>
              <div className="space-y-2 text-xs text-slate-500">
                <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                  <span>Framework</span>
                  <span className="font-semibold text-slate-300">React 19</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                  <span>Styling</span>
                  <span className="font-semibold text-slate-300">Tailwind CSS v4</span>
                </div>
                <div className="flex justify-between">
                  <span>Routing</span>
                  <span className="font-semibold text-slate-300">React Router Dom</span>
                </div>
              </div>
            </div>

            {/* Backend Status */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl shadow-xl hover:border-slate-700/80 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Backend</span>
                <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{backendStatus}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Spring Boot API</h3>
              <p className="text-slate-400 text-sm mb-4">Maven configuration updated with full enterprise dependencies.</p>
              <div className="space-y-2 text-xs text-slate-500">
                <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                  <span>JDK Version</span>
                  <span className="font-semibold text-slate-300">Java 21 / 25</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                  <span>Spring Version</span>
                  <span className="font-semibold text-slate-300">3.3.5</span>
                </div>
                <div className="flex justify-between">
                  <span>Security Layer</span>
                  <span className="font-semibold text-slate-300">Spring Security</span>
                </div>
              </div>
            </div>

            {/* Database Status */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl shadow-xl hover:border-slate-700/80 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">Database</span>
                <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{dbStatus}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">PostgreSQL</h3>
              <p className="text-slate-400 text-sm mb-4">Connected to `bmas_db` on port 5432 using native driver.</p>
              <div className="space-y-2 text-xs text-slate-500">
                <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                  <span>DB Name</span>
                  <span className="font-semibold text-slate-300">bmas_db</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                  <span>ORM Layer</span>
                  <span className="font-semibold text-slate-300">Hibernate / JPA</span>
                </div>
                <div className="flex justify-between">
                  <span>DDL Update Mode</span>
                  <span className="font-semibold text-slate-300">update</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Directory Structure */}
        <section id="architecture" className="mb-24 scroll-mt-24">
          <div className="bg-slate-900/40 border border-slate-800/60 p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full filter blur-3xl"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 block">Folder Anatomy</span>
                <h2 className="text-3xl font-extrabold text-white mb-4">Refactored Project Structure</h2>
                <p className="text-slate-400 mb-6 leading-relaxed text-sm md:text-base">
                  We have cleanly separated the application into `bmas_backend` and `bmas_frontend`, with an additional `docs` directory at the project root. This conforms with the mandatory project specifications and ensures code cleanliness.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-bold mt-1">✔</div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200">No Root Pollution</h4>
                      <p className="text-xs text-slate-500 mt-0.5">All backend components relocated into the `bmas_backend` directory.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-bold mt-1">✔</div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200">Spring Boot Standard Layout</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Custom `com.bmas` package containing layers like controllers, services, repositories, and config.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 text-xs font-bold mt-1">✔</div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200">Modern Frontend Scaffold</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Vite project template, clean directories, routing, Axios configuration, and Tailwind CSS styles.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 font-mono text-xs md:text-sm text-slate-400 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4 text-slate-500">
                  <span>🗂 Project Structure Map</span>
                  <span className="w-3 h-3 rounded-full bg-slate-800"></span>
                </div>
                <div className="space-y-1 overflow-x-auto whitespace-pre">
                  <span className="text-indigo-400">project-root/</span>
                  <div>├── <span className="text-purple-400 font-semibold">bmas_backend/</span></div>
                  <div>│   ├── <span className="text-slate-500">src/main/java/com/bmas/</span> (controller, service, repository, etc.)</div>
                  <div>│   ├── <span className="text-slate-500">src/main/resources/</span> (application.properties, data.sql)</div>
                  <div>│   ├── <span className="text-slate-300">pom.xml</span></div>
                  <div>│   └── <span className="text-slate-500">README.md</span></div>
                  <div>├── <span className="text-pink-400 font-semibold">bmas_frontend/</span></div>
                  <div>│   ├── <span className="text-slate-500">src/</span> (components, pages, services, hooks, etc.)</div>
                  <div>│   ├── <span className="text-slate-500">public/</span></div>
                  <div>│   ├── <span className="text-slate-300">package.json</span></div>
                  <div>│   └── <span className="text-slate-500">README.md</span></div>
                  <div>└── <span className="text-amber-400 font-semibold">docs/</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-10 mt-12 text-center text-slate-500 text-xs">
        <p className="mb-2">BMAS - Business Management & Analysis System &copy; {new Date().getFullYear()}</p>
        <p>Built with Spring Boot, React, Tailwind CSS, and PostgreSQL</p>
      </footer>
    </div>
  );
}

export default App;
