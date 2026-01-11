import { useState, useMemo } from 'react';
import { frontendConstraints, frontendOptions } from './data/scenarios';
import { RefereeEngine, type UserInput } from './core/referee';
import { ConstraintSlider } from './components/ConstraintSlider';
import { OptionCard } from './components/OptionCard';
import { ThemeToggle } from './components/ThemeToggle';
import { ExportMenu } from './components/ExportMenu';
import { FloatingParticles } from './components/FloatingParticles';
import { StatsCard } from './components/StatsCard';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { SearchBar } from './components/SearchBar';
import { HistoryPanel } from './components/HistoryPanel';
import { PresetsMenu } from './components/PresetsMenu';
import { KeyboardShortcuts } from './components/KeyboardShortcuts';
import {
  Sparkles,
  Scale,
  Info,
  TrendingUp,
  Target,
  Zap,
  BarChart3,
  Grid3x3,
  List,
  RefreshCw,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [inputs, setInputs] = useState<UserInput[]>(
    frontendConstraints.map(c => ({ constraintId: c.id, value: 0.5 }))
  );
  const [viewMode, setViewMode] = useState<'cards' | 'matrix'>('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [showStats, setShowStats] = useState(true);

  const engine = useMemo(() => new RefereeEngine(frontendOptions, frontendConstraints), []);
  const results = useMemo(() => engine.evaluate(inputs), [engine, inputs]);

  const handleInputChange = (id: string, val: number) => {
    setInputs(prev => prev.map(p => p.constraintId === id ? { ...p, value: val } : p));
  };

  const handleExport = (format: 'json' | 'pdf' | 'image' | 'share') => {
    console.log(`Exporting as ${format}...`);
    // Export logic here
    alert(`Export as ${format.toUpperCase()} - Feature coming soon!`);
  };

  const handleReset = () => {
    setInputs(frontendConstraints.map(c => ({ constraintId: c.id, value: 0.5 })));
  };

  const winner = results[0];
  const filteredResults = results.filter(res =>
    frontendOptions.find(o => o.id === res.optionId)?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const comparisonFeatures = [
    'Component Architecture',
    'State Management',
    'Routing',
    'TypeScript Support',
    'Server-Side Rendering',
    'Static Site Generation',
    'Developer Experience',
    'Community Support',
    'Learning Curve',
    'Performance Optimization',
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Particles Background */}
      <FloatingParticles />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">

          {/* Top Navigation Bar */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8 flex items-center justify-between flex-wrap gap-4"
          >
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-3 glass-card rounded-xl"
              >
                <Scale className="text-purple-400 w-6 h-6" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">THE REFEREE</h1>
                <p className="text-xs text-gray-400">Decision Intelligence Platform</p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <SearchBar onSearch={setSearchQuery} />
              <PresetsMenu onLoadPreset={(preset) => console.log('Load preset:', preset)} />
              <ExportMenu onExport={handleExport} />
              <HistoryPanel />
              <KeyboardShortcuts />
              <ThemeToggle />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="glass-card p-3 rounded-xl hover:bg-white/10 transition-all"
                title="Reset all constraints"
              >
                <RefreshCw className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-card p-3 rounded-xl hover:bg-white/10 transition-all"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Hero Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="inline-flex items-center justify-center p-4 glass-card rounded-2xl mb-6 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Scale className="text-purple-400 mr-3 w-8 h-8 relative z-10" />
              <span className="text-purple-400 font-bold tracking-wide text-xl relative z-10">TECH STACK ARBITER</span>
              <Sparkles className="text-pink-400 ml-3 w-6 h-6 relative z-10" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200 leading-tight">
              Make Decisions with
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-rotate-gradient">
                Confidence & Clarity
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Don't guess. <span className="text-white font-semibold">Decide.</span> Input your constraints and let our intelligent engine find your optimal technology match with data-driven insights.
            </p>
          </motion.header>

          {/* Stats Dashboard */}
          <AnimatePresence>
            {showStats && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-400" />
                    Quick Stats
                  </h2>
                  <button
                    onClick={() => setShowStats(!showStats)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Hide
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatsCard
                    title="Options Analyzed"
                    value={results.length}
                    icon={Target}
                    color="from-blue-500 to-cyan-500"
                    trend={12}
                  />
                  <StatsCard
                    title="Best Match"
                    value={`${winner.matchPercentage.toFixed(0)}%`}
                    icon={TrendingUp}
                    color="from-green-500 to-emerald-500"
                    trend={8}
                  />
                  <StatsCard
                    title="Constraints Set"
                    value={inputs.filter(i => i.value > 0.5).length}
                    icon={Zap}
                    color="from-purple-500 to-pink-500"
                  />
                  <StatsCard
                    title="Avg. Compatibility"
                    value={`${(results.reduce((acc, r) => acc + r.matchPercentage, 0) / results.length).toFixed(0)}%`}
                    icon={Scale}
                    color="from-orange-500 to-red-500"
                    trend={-3}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar: Constraints */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-4 space-y-6"
            >
              <div className="glass-card p-6 rounded-2xl border border-white/10 shadow-2xl sticky top-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Info className="text-purple-400" />
                  Your Constraints
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                  Adjust the sliders to set your priorities. Higher values indicate greater importance.
                </p>
                {frontendConstraints.map(c => (
                  <ConstraintSlider
                    key={c.id}
                    constraint={c}
                    value={inputs.find(i => i.constraintId === c.id)?.value || 0}
                    onChange={(v) => handleInputChange(c.id, v)}
                  />
                ))}
              </div>
            </motion.div>

            {/* Main: Comparisons */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-8"
            >
              {/* Verdict Section */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-8 glass-card p-8 rounded-3xl border border-purple-500/30 shadow-2xl relative overflow-hidden group"
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 opacity-50" />
                <motion.div
                  className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <Sparkles size={120} />
                </motion.div>

                <div className="relative z-10">
                  <h2 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    The Referee's Verdict
                  </h2>
                  <div className="text-4xl font-light text-white mb-4">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200"
                    >
                      {frontendOptions.find(o => o.id === winner.optionId)?.name}
                    </motion.span>
                    {' '}is your best match.
                  </div>
                  <p className="text-gray-300 leading-relaxed max-w-2xl">
                    Based on your priorities for{' '}
                    <span className="text-white font-semibold">Performance</span>,{' '}
                    <span className="text-white font-semibold">Scalability</span>, and{' '}
                    <span className="text-white font-semibold">Developer Experience</span>,
                    this option minimizes trade-offs while hitting your critical markers.
                  </p>

                  {/* Match Percentage Bar */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Overall Match</span>
                      <span className="text-lg font-bold text-purple-400">{winner.matchPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${winner.matchPercentage}%` }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-rotate-gradient"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* View Mode Toggle */}
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">All Options</h2>
                <div className="flex gap-2 glass-card p-1 rounded-xl">
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${viewMode === 'cards'
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                    Cards
                  </button>
                  <button
                    onClick={() => setViewMode('matrix')}
                    className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${viewMode === 'matrix'
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    <List className="w-4 h-4" />
                    Matrix
                  </button>
                </div>
              </div>

              {/* Results Display */}
              <AnimatePresence mode="wait">
                {viewMode === 'cards' ? (
                  <motion.div
                    key="cards"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {filteredResults.map((res, index) => (
                      <motion.div
                        key={res.optionId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <OptionCard
                          option={frontendOptions.find(o => o.id === res.optionId)!}
                          result={res}
                          isWinner={res.optionId === winner.optionId}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="matrix"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <ComparisonMatrix
                      options={frontendOptions.filter(o =>
                        filteredResults.some(r => r.optionId === o.id)
                      )}
                      features={comparisonFeatures}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;

