import { useEffect, useState, MouseEvent } from 'react';
import { Theme } from '../types';

function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>(localStorage.theme || 'system');

  useEffect(() => {
    if (localStorage.theme) return setTheme(localStorage.theme);

    const isSystemDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    setTheme(isSystemDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleToggleTheme = (
    e: MouseEvent<HTMLButtonElement>,
    selectedTheme: Theme,
  ) => {
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    e.currentTarget.blur();
  };

  return (
    <>
      {theme === 'light' ? (
        <button
          className={'btn btn-footer w-8 h-8 text-xl'}
          onClick={(e) => handleToggleTheme(e, 'dark')}
        >
          <span className="i-ph-moon" />
          <span className="sr-only">Dark mode</span>
        </button>
      ) : (
        <button
          className={'btn btn-footer w-8 h-8 text-xl'}
          onClick={(e) => handleToggleTheme(e, 'light')}
        >
          <span className="i-ph-sun" />
          <span className="sr-only">Light mode</span>
        </button>
      )}
    </>
  );
}

export default ThemeSwitcher;
