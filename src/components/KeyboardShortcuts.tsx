import { motion } from 'framer-motion';
import { Keyboard } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Shortcut {
    keys: string[];
    description: string;
}

const shortcuts: Shortcut[] = [
    { keys: ['Ctrl', 'K'], description: 'Open command palette' },
    { keys: ['Ctrl', 'E'], description: 'Export results' },
    { keys: ['Ctrl', 'H'], description: 'View history' },
    { keys: ['Ctrl', 'P'], description: 'Load preset' },
    { keys: ['Ctrl', 'R'], description: 'Reset constraints' },
    { keys: ['Ctrl', 'S'], description: 'Save configuration' },
    { keys: ['Ctrl', 'M'], description: 'Toggle matrix view' },
    { keys: ['Esc'], description: 'Close dialogs' },
];

export const KeyboardShortcuts = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === '/') {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="glass-card p-3 rounded-xl hover:bg-white/10 transition-all"
                title="Keyboard shortcuts (Ctrl + /)"
            >
                <Keyboard className="w-5 h-5" />
            </motion.button>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setIsOpen(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={(e) => e.stopPropagation()}
                        className="glass-card rounded-2xl p-8 max-w-2xl w-full"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3">
                                <Keyboard className="w-7 h-7" />
                                Keyboard Shortcuts
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {shortcuts.map((shortcut, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-center justify-between p-3 glass-card rounded-xl"
                                >
                                    <span className="text-gray-300">{shortcut.description}</span>
                                    <div className="flex gap-1">
                                        {shortcut.keys.map((key) => (
                                            <kbd
                                                key={key}
                                                className="px-2 py-1 bg-white/10 rounded text-sm font-mono"
                                            >
                                                {key}
                                            </kbd>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};
