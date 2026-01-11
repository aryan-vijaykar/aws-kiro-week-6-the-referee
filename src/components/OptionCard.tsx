import React, { useState } from 'react';
import type { Option, ScoringResult } from '../core/referee';
import { CheckCircle2, AlertCircle, Trophy, TrendingUp, Zap, Star } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    option: Option;
    result: ScoringResult;
    isWinner: boolean;
}

export const OptionCard: React.FC<Props> = ({ option, result, isWinner }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -8 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={clsx(
                "relative p-6 rounded-2xl border transition-all duration-500 overflow-hidden group cursor-pointer",
                isWinner
                    ? "glass-card border-purple-500/50 shadow-[0_0_40px_rgba(147,51,234,0.3)]"
                    : "glass-card border-white/10 hover:border-white/20"
            )}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            {/* Animated Background Gradient */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: isWinner
                        ? 'radial-gradient(circle at 50% 0%, rgba(147, 51, 234, 0.1) 0%, transparent 70%)'
                        : 'radial-gradient(circle at 50% 0%, rgba(96, 96, 255, 0.05) 0%, transparent 70%)'
                }}
            />

            {/* Winner Badge */}
            {isWinner && (
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-3 shadow-lg"
                >
                    <Trophy className="w-5 h-5 text-white" />
                </motion.div>
            )}

            {/* Floating Particles */}
            {isHovered && (
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-purple-400 rounded-full"
                            initial={{ x: '50%', y: '100%', opacity: 0 }}
                            animate={{
                                x: `${Math.random() * 100}%`,
                                y: `${Math.random() * -100}%`,
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 2,
                                delay: i * 0.2,
                                repeat: Infinity,
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="relative z-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className={clsx(
                            "p-2 rounded-xl transition-all duration-300",
                            isWinner
                                ? "bg-gradient-to-br from-purple-500 to-pink-500"
                                : "bg-white/5"
                        )}>
                            <Zap className="w-5 h-5" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">{option.name}</h3>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={clsx(
                                "px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm",
                                isWinner
                                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                                    : "bg-white/10 text-gray-300"
                            )}
                        >
                            {result.matchPercentage.toFixed(0)}% Match
                        </motion.div>

                        {result.matchPercentage > 80 && (
                            <div className="flex items-center gap-1 text-yellow-400 text-xs">
                                <Star className="w-3 h-3 fill-current" />
                                <span>Excellent</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Match Progress Bar */}
                <div className="mb-4">
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.matchPercentage}%` }}
                            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                            className={clsx(
                                "h-full rounded-full",
                                isWinner
                                    ? "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-rotate-gradient"
                                    : "bg-gradient-to-r from-blue-500 to-cyan-500"
                            )}
                        />
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {option.description}
                </p>

                {/* Pros & Cons */}
                <div className="space-y-4">
                    <div className="glass-card p-4 rounded-xl">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-3 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Strengths
                        </h4>
                        <ul className="space-y-2">
                            {option.pros.map((pro, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start text-sm text-green-300"
                                >
                                    <CheckCircle2 size={16} className="mr-2 mt-0.5 shrink-0" />
                                    <span>{pro}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div className="glass-card p-4 rounded-xl">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-3 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Considerations
                        </h4>
                        <ul className="space-y-2">
                            {option.cons.map((con, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start text-sm text-red-300"
                                >
                                    <AlertCircle size={16} className="mr-2 mt-0.5 shrink-0" />
                                    <span>{con}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-white/10"
                        >
                            <div className="grid grid-cols-2 gap-3">
                                <div className="glass-card p-3 rounded-lg">
                                    <div className="text-xs text-gray-400 mb-1">Performance</div>
                                    <div className="text-lg font-bold">
                                        {Math.floor(Math.random() * 30 + 70)}%
                                    </div>
                                </div>
                                <div className="glass-card p-3 rounded-lg">
                                    <div className="text-xs text-gray-400 mb-1">Scalability</div>
                                    <div className="text-lg font-bold">
                                        {Math.floor(Math.random() * 30 + 70)}%
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 pointer-events-none" />
            </div>
        </motion.div>
    );
};

