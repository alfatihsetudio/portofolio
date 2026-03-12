import { ArrowUpRight } from 'lucide-react';

export default function Footer({ name }: { name: string }) {
  return (
    <footer className="relative py-12 px-6 border-t border-white/[0.05] bg-black">
      <div className="max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm text-white/40 font-light">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </p>

        <a
          href="/dashboard"
          className="group flex items-center gap-2 text-xs text-white/20 hover:text-white/60 transition-colors uppercase tracking-[0.2em]"
        >
          Administrator
          <ArrowUpRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        </a>
      </div>
    </footer>
  );
}
