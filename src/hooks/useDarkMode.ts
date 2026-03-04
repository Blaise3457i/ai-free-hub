import { useTheme } from '../context/ThemeContext';

export function useDarkMode() {
  const { isDark, toggle } = useTheme();
  return { isDark, toggle };
}
