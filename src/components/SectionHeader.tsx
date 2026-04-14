

export interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function SectionHeader({ eyebrow, title, description, theme }: SectionHeaderProps & { theme?: 'light' | 'dark' }) {
  return (
    <div className="max-w-2xl space-y-3 mb-10">
      <p className={`text-xs font-semibold uppercase tracking-[0.36em] ${theme === 'light' ? 'text-cyan-600' : 'text-cyan-200/70'}`}>{eyebrow}</p>
      <h2 className={`text-3xl font-semibold tracking-tight sm:text-4xl ${theme === 'light' ? 'text-black' : 'text-white'}`}>{title}</h2>
      <p className={`max-w-xl text-sm leading-7 sm:text-base ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>{description}</p>
    </div>
  );
}
