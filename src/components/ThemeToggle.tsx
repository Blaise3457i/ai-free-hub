import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';
import { cn } from '../lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { isDark, toggle } = useDarkMode();

  return (
    <button
      onClick={toggle}
      className={cn(
        "p-2 rounded-full transition-all duration-300 active:scale-90",
        "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
        className
      )}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-500" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700" />
      )}
    </button>
  );
}
