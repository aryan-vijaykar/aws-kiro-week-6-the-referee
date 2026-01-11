import { motion } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';
import type { Option } from '../core/referee';

interface ComparisonMatrixProps {
    options: Option[];
    features: string[];
}

export const ComparisonMatrix = ({ options, features }: ComparisonMatrixProps) => {
    const getRandomScore = () => Math.random() > 0.3 ? (Math.random() > 0.5 ? 'yes' : 'partial') : 'no';

    return (
        <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Feature</th>
                            {options.map((option) => (
                                <th key={option.id} className="px-6 py-4 text-center text-sm font-semibold">
                                    {option.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {features.map((feature, index) => (
                            <motion.tr
                                key={feature}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="border-b border-white/5 hover:bg-white/5 transition-colors"
                            >
                                <td className="px-6 py-4 text-sm text-gray-300">{feature}</td>
                                {options.map((option) => {
                                    const score = getRandomScore();
                                    return (
                                        <td key={option.id} className="px-6 py-4 text-center">
                                            {score === 'yes' && <Check className="w-5 h-5 text-green-400 mx-auto" />}
                                            {score === 'partial' && <Minus className="w-5 h-5 text-yellow-400 mx-auto" />}
                                            {score === 'no' && <X className="w-5 h-5 text-red-400 mx-auto" />}
                                        </td>
                                    );
                                })}
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
