import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder = 'Search options...' }: SearchBarProps) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (value: string) => {
        setQuery(value);
        onSearch(value);
    };

    const handleClear = () => {
        setQuery('');
        onSearch('');
    };

    return (
        <motion.div
            animate={{
                scale: isFocused ? 1.02 : 1,
            }}
            className="relative"
        >
            <div className={`glass-card rounded-xl flex items-center gap-3 px-4 py-3 transition-all ${isFocused ? 'ring-2 ring-purple-500/50' : ''
                }`}>
                <Search className="w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
                />
                <AnimatePresence>
                    {query && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={handleClear}
                            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4 text-gray-400" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};
