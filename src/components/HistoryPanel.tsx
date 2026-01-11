import { motion } from 'framer-motion';
import { History, Trash2, Clock } from 'lucide-react';
import { useState } from 'react';

interface HistoryItem {
    id: string;
    timestamp: Date;
    constraints: any[];
    winner: string;
}

export const HistoryPanel = () => {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const clearHistory = () => {
        setHistory([]);
    };

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="glass-card px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all relative"
            >
                <History className="w-5 h-5" />
                <span className="font-medium">History</span>
                {history.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-purple-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {history.length}
                    </span>
                )}
            </motion.button>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 300 }}
                    className="fixed right-0 top-0 h-full w-96 glass-card border-l border-white/10 z-50 overflow-y-auto"
                >
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <History className="w-6 h-6" />
                                History
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {history.length === 0 ? (
                            <div className="text-center py-12 text-gray-400">
                                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>No history yet</p>
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={clearHistory}
                                    className="w-full mb-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-xl flex items-center justify-center gap-2 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Clear History
                                </button>

                                <div className="space-y-4">
                                    {history.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="glass-card p-4 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-semibold">{item.winner}</span>
                                                <span className="text-xs text-gray-400">
                                                    {item.timestamp.toLocaleTimeString()}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-400">
                                                {item.timestamp.toLocaleDateString()}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </>
    );
};
