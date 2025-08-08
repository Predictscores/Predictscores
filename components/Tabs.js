// FILE: components/Tabs.js
import React, { useMemo, useState } from 'react';

export default function Tabs({ children, defaultLabel }) {
  // Uvek napravi bezbedan niz dece
  const items = useMemo(() => React.Children.toArray(children).filter(Boolean), [children]);

  // Izvuci label-e
  const labels = useMemo(
    () => items.map((el) => el?.props?.label).filter((l) => typeof l === 'string' && l.length > 0),
    [items]
  );

  // Aktivna kartica (ako nema dece, null)
  const first = labels.length > 0 ? labels[0] : null;
  const [active, setActive] = useState(defaultLabel && labels.includes(defaultLabel) ? defaultLabel : first);

  // Trenutni sadržaj
  const activeChild =
    items.find((el) => el?.props?.label === active) ??
    (items.length > 0 ? items[0] : null);

  // Ako nema ničega, prikaži fallback
  if (!activeChild) {
    return (
      <div className="p-4 rounded-xl bg-[#1f2339] text-slate-300">
        Nema sadržaja za prikaz.
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex gap-2 mb-4">
        {labels.map((label) => {
          const isActive = label === active;
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={
                'px-4 py-2 rounded-full text-sm font-semibold transition ' +
                (isActive
                  ? 'bg-[#151830] text-white'
                  : 'bg-[#1f2339] text-slate-300 hover:bg-[#202542]')
              }
              type="button"
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Body */}
      <div>{activeChild}</div>
    </div>
  );
}
