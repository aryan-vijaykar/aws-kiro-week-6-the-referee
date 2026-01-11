import { motion } from 'framer-motion';
import { Bookmark, Plus } from 'lucide-react';
import { useState } from 'react';

interface Preset {
    id: string;
    name: string;
    description: string;
    constraints: any[];
}

const defaultPresets: Preset[] = [
    {
        id: 'startup',
        name: 'Startup MVP',
        description: 'Fast development, low cost, high agility',
        constraints: []
    },
    {
        id: 'enterprise',
        name: 'Enterprise Scale',
        description: 'High performance, scalability, security',
        constraints: []
    },
    {
        id: 'prototype',
        name: 'Rapid Prototype',
        description: 'Quick iteration, flexibility, minimal setup',
        constraints: []
    },
];

interface PresetsMenuProps {
    onLoadPreset: (preset: Preset) => void;
}

export const PresetsMenu = ({ onLoadPreset }: PresetsMenuProps) => {
    const [presets] = useState<Preset[]>(defaultPresets);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="glass-card px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all"
            >
                <Bookmark className="w-5 h-5" />
                <span className="font-medium">Presets</span>
            </motion.button>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-0 mt-2 w-80 glass-card rounded-xl p-4 z-50"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Load Preset</h3>
                        <button className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="space-y-2">
                        {presets.map((preset, index) => (
                            <motion.button
                                key={preset.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => {
                                    onLoadPreset(preset);
                                    setIsOpen(false);
                                }}
                                className="w-full p-3 glass-card rounded-xl hover:bg-white/10 transition-all text-left"
                            >
                                <div className="font-medium mb-1">{preset.name}</div>
                                <div className="text-xs text-gray-400">{preset.description}</div>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};
