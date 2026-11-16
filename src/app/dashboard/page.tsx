'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Database, LogOut, CheckCircle2, AlertCircle, Save } from 'lucide-react';
import DynamicForm, { type ImageTarget } from './DynamicForm';
import type { PortfolioData } from '@/lib/data';

export default function DashboardPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [activeTab, setActiveTab] = useState('hero');
  const dataRef = useRef<PortfolioData | null>(null);
  const router = useRouter();

  dataRef.current = data;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const json = await res.json();
        setData(json as PortfolioData);
      }
    } catch {
      setStatus({ type: 'error', message: 'Failed to load data' });
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = async (portfolioData: PortfolioData) => {
    const res = await fetch('/api/portfolio', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(portfolioData),
    });

    if (!res.ok) {
      const result = await res.json().catch(() => null);
      const message = res.status === 401
        ? 'Sesi admin berakhir. Silakan login kembali.'
        : result?.error || `Gagal menyimpan data (HTTP ${res.status}).`;
      throw new Error(message);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    setIsSaving(true);
    setStatus({ type: null, message: '' });

    try {
      await saveData(data);
      setStatus({ type: 'success', message: 'Perubahan tersimpan dan sudah diverifikasi.' });
      setTimeout(() => setStatus({ type: null, message: '' }), 4000);
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Gagal menyimpan perubahan.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUploaded = async (target: ImageTarget, url: string) => {
    const currentData = dataRef.current;
    if (!currentData) throw new Error('Data portofolio belum siap disimpan.');

    let nextData: PortfolioData;
    if (target.section === 'projects' || target.section === 'skills') {
      const items = [...(currentData[target.section] || [])];
      if (!items[target.index]) throw new Error('Item gambar tidak ditemukan. Muat ulang dashboard lalu coba lagi.');
      items[target.index] = { ...items[target.index], [target.field]: url };
      nextData = { ...currentData, [target.section]: items } as PortfolioData;
    } else {
      nextData = {
        ...currentData,
        [target.section]: { ...currentData[target.section], [target.field]: url },
      };
    }

    dataRef.current = nextData;
    setData(nextData);
    setIsSaving(true);
    setStatus({ type: null, message: '' });

    try {
      await saveData(nextData);
      setStatus({ type: 'success', message: 'Gambar tersimpan dan URL-nya sudah diverifikasi.' });
      setTimeout(() => setStatus({ type: null, message: '' }), 4000);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Gambar terunggah, tetapi gagal menyimpan URL-nya.';
      setStatus({ type: 'error', message });
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
      </div>
    );
  }

  const tabs = Object.keys(data || {});

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Database className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight">Portfolio Admin</span>
          </div>

          <div className="flex items-center gap-4">
            {status.type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`flex items-center gap-2 text-sm ${
                  status.type === 'success' ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {status.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {status.message}
              </motion.div>
            )}

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium text-sm hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-white/10 text-white border border-white/10'
                  : 'text-white/60 hover:text-white/80 hover:bg-white/[0.02] border border-transparent'
              }`}
            >
              <span className="capitalize">{tab}</span> Data
            </button>
          ))}
          
          <div className="mt-8 pt-8 border-t border-white/[0.05]">
             <a href="/" className="text-xs text-white/50 hover:text-white/70 transition-colors uppercase tracking-widest block px-4">
              ← Go to Website
            </a>
          </div>
        </aside>

        {/* Editor Area */}
        <div className="flex-1 min-w-0 bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 lg:p-8 backdrop-blur-xl">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold capitalize bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
              Edit {activeTab}
            </h2>
            <span className="text-xs text-emerald-400/80 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Visual Editor Mode
            </span>
          </div>
          
          <p className="text-sm text-white/60 mb-8 font-normal">
            Fill in the fields below to update your portfolio section. Changes are saved directly to the database.
          </p>

          <div className="relative">
            <DynamicForm
              activeTab={activeTab}
              data={data}
              setData={setData}
              onImageUploaded={handleImageUploaded}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
