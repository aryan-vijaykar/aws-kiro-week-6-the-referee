import { Download, FileJson, FileImage, FileText, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ExportMenuProps {
    onExport: (format: 'json' | 'pdf' | 'image' | 'share') => void;
}

export const ExportMenu = ({ onExport }: ExportMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const exportOptions = [
        { id: 'json', label: 'Export JSON', icon: FileJson, color: 'text-blue-400' },
        { id: 'pdf', label: 'Export PDF', icon: FileText, color: 'text-red-400' },
        { id: 'image', label: 'Export Image', icon: FileImage, color: 'text-green-400' },
        { id: 'share', label: 'Share Link', icon: Share2, color: 'text-purple-400' },
    ];

    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="glass-card px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all"
            >
                <Download className="w-5 h-5" />
                <span className="font-medium">Export</span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 glass-card rounded-xl overflow-hidden z-50"
                    >
                        {exportOptions.map((option, index) => (
                            <motion.button
                                key={option.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => {
                                    onExport(option.id as any);
                                    setIsOpen(false);
                                }}
                                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-all text-left"
                            >
                                <option.icon className={`w-5 h-5 ${option.color}`} />
                                <span>{option.label}</span>
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
