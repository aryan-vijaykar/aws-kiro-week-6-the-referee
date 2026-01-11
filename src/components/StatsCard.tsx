import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    color: string;
    trend?: number;
}

export const StatsCard = ({ title, value, icon: Icon, color, trend }: StatsCardProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-card p-6 rounded-2xl relative overflow-hidden group"
        >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${color} bg-opacity-20`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    {trend !== undefined && (
                        <span className={`text-sm font-semibold ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {trend >= 0 ? '+' : ''}{trend}%
                        </span>
                    )}
                </div>

                <div className="space-y-1">
                    <p className="text-gray-400 text-sm">{title}</p>
                    <p className="text-3xl font-bold">{value}</p>
                </div>
            </div>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
    );
};
