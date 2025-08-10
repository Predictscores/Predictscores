// FILE: pages/index.js
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// CombinedBets bez SSR-a (stabilno za live podatke)
const CombinedBets = dynamic(() => import('../components/CombinedBets'), { ssr: false });

function useDarkMode() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const isDark = saved ? saved === 'dark' : true;
    setDark(isDark);
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, []);
  const toggle = () => {
    setDark((d) => {
      const next = !d;
      if (next) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      if (typeof window !== 'undefined') localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };
  return { dark, toggle };
}

function HeaderBar() {
  const { toggle } = useDarkMode();
  // Minimalna varijanta (bez context-a) – info pil ostaje, bez tajmera
  return (
    <div className="flex items-start justify-between gap-4">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white">
        AI Top fudbalske i Kripto Prognoze
      </h1>

      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { if (typeof window !== 'undefined') window.location.reload(); }}
            className="px-4 py-2 rounded-xl bg-[#202542] text-white font-semibold"
            type="button"
          >
            Refresh all
          </button>
          <button
            onClick={toggle}
            className="px-4 py-2 rounded-xl bg-[#202542] text-white font-semibold"
            type="button"
          >
            Light mode
          </button>
        </div>

        <div className="px-4 py-2 rounded-full bg-[#202542] text-white text-sm inline-flex items-center gap-6">
          <span>Crypto next refresh: —</span>
          <span>Football last generated: —</span>
        </div>
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="mt-8 text-sm text-slate-300 flex flex-wrap items-center gap-3">
      <span>Confidence legend:</span>
      <span className="inline-flex items-center gap-1">
        <span className="inline-block w-3 h-3 rounded-full bg-emerald-400" /> High (≥75%)
      </span>
      <span className="inline-flex items-center gap-1">
        <span className="inline-block w-3 h-3 rounded-full bg-sky-400" /> Moderate (50–75%)
      </span>
      <span className="inline-flex items-center gap-1">
        <span className="inline-block w-3 h-3 rounded-full bg-amber-400" /> Low (&lt;50%)
      </span>
      <span className="inline-flex items-center gap-1">
        <span>🔥</span> Top Pick (≥90%)
      </span>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Head>
        <title>Predictscores — Live Picks</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-[#0f1116] text-white">
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          <HeaderBar />
          <div className="mt-6">
            <CombinedBets />
          </div>
          <Legend />
        </div>
      </main>
    </>
  );
}

export default function Index() {
  return <HomePage />;
}
