import { useEffect, useState, MouseEvent } from 'react';

type Theme = 'system' | 'light' | 'dark';

function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>(localStorage.theme || 'system');

  useEffect(() => {
    if (localStorage.theme) return setTheme(localStorage.theme);

    const isSystemDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    isSystemDark ? setTheme('dark') : setTheme('light');
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
          className="w-8 h-8 rounded-full inline-flex items-center justify-center text-xl
          outline-2 outline-offset-2 outline-amber-300 dark:outline-sky-950
          transition duration-300
          hover:bg-stone-100 dark:hover:bg-slate-900
          focus:bg-stone-50 dark:focus:bg-sky-950 focus:outline"
          onClick={(e) => handleToggleTheme(e, 'dark')}
        >
          <span className="i-ph-moon" />
          <span className="sr-only">Dark mode</span>
        </button>
      ) : (
        <button
          className="w-8 h-8 rounded-full inline-flex items-center justify-center text-xl
          outline-2 outline-offset-2 outline-amber-300 dark:outline-sky-950
          transition duration-300
          hover:bg-stone-100 dark:hover:bg-slate-900
          focus:bg-stone-50 dark:focus:bg-sky-950 focus:outline"
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
