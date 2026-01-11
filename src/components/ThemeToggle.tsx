import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(true);

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('light-theme');
    };

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="glass-card p-3 rounded-xl hover:bg-white/10 transition-all"
            aria-label="Toggle theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: isDark ? 0 : 180 }}
                transition={{ duration: 0.3 }}
            >
                {isDark ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                    <Moon className="w-5 h-5 text-blue-400" />
                )}
            </motion.div>
        </motion.button>
    );
};
