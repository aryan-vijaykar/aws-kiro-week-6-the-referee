import React, { useState } from 'react';
import type { Constraint } from '../core/referee';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface Props {
    constraint: Constraint;
    value: number;
    onChange: (value: number) => void;
}

export const ConstraintSlider: React.FC<Props> = ({ constraint, value, onChange }) => {
    const [isDragging, setIsDragging] = useState(false);

    const getImportanceLabel = (val: number) => {
        if (val < 0.3) return 'Low';
        if (val < 0.7) return 'Medium';
        return 'High';
    };

    const getImportanceColor = (val: number) => {
        if (val < 0.3) return 'text-blue-400';
        if (val < 0.7) return 'text-yellow-400';
        return 'text-purple-400';
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 p-5 glass-card rounded-xl border border-white/10 hover:border-white/20 transition-all group"
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <motion.div
                        animate={{
                            rotate: isDragging ? 360 : 0,
                            scale: isDragging ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <Sparkles className={`w-4 h-4 ${getImportanceColor(value)}`} />
                    </motion.div>
                    <label className="text-gray-200 font-medium">{constraint.label}</label>
                </div>

                <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${getImportanceColor(value)}`}>
                        {getImportanceLabel(value)}
                    </span>
                    <motion.span
                        key={value}
                        initial={{ scale: 1.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-white text-sm font-bold bg-white/10 px-3 py-1 rounded-full"
                    >
                        {(value * 100).toFixed(0)}%
                    </motion.span>
                </div>
            </div>

            {/* Slider Container */}
            <div className="relative">
                {/* Background Track */}
                <div className="h-3 bg-white/5 rounded-full overflow-hidden relative">
                    {/* Animated Gradient Fill */}
                    <motion.div
                        className="h-full rounded-full relative overflow-hidden"
                        style={{ width: `${value * 100}%` }}
                        animate={{
                            background: [
                                'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                                'linear-gradient(90deg, #764ba2 0%, #667eea 100%)',
                                'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                            ],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    >
                        {/* Shimmer Effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{
                                x: ['-100%', '200%'],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        />
                    </motion.div>

                    {/* Glow Effect */}
                    {isDragging && (
                        <motion.div
                            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-400 blur-md"
                            style={{ left: `${value * 100}%` }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.8 }}
                        />
                    )}
                </div>

                {/* Actual Input Slider */}
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={() => setIsDragging(false)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                {/* Custom Thumb */}
                <motion.div
                    className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-20"
                    style={{ left: `calc(${value * 100}% - 10px)` }}
                    animate={{
                        scale: isDragging ? 1.3 : 1,
                    }}
                >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg border-2 border-white/50" />
                </motion.div>
            </div>

            {/* Labels */}
            <div className="flex justify-between text-xs text-gray-500 mt-3">
                <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-400/50" />
                    Low Priority
                </span>
                <span className="flex items-center gap-1">
                    Critical
                    <span className="w-2 h-2 rounded-full bg-purple-400/50" />
                </span>
            </div>

            {/* Hover Tooltip */}
            {isDragging && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 p-2 glass-card rounded-lg text-xs text-center text-gray-300"
                >
                    Adjusting importance level
                </motion.div>
            )}
        </motion.div>
    );
};

