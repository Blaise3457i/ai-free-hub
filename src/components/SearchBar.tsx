import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function SearchBar({ 
  placeholder = "Search AI tools, prompts, and tutorials...", 
  className = "",
  value,
  onChange
}: SearchBarProps) {
  const [internalQuery, setInternalQuery] = useState('');
  const navigate = useNavigate();

  const query = value !== undefined ? value : internalQuery;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onChange && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalQuery(newValue);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative group ${className}`}>
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
        <input 
          type="text" 
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
          className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-[2rem] pl-16 pr-6 py-6 text-lg focus:outline-none focus:ring-4 focus:ring-purple-500/10 dark:text-white transition-all shadow-xl"
        />
      </div>
    </form>
  );
}
