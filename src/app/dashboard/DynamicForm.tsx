import { Trash2, Plus, Upload, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_UPLOAD_BYTES } from '@/lib/image-upload';

export type ImageTarget =
  | { section: 'hero'; field: 'avatar' }
  | { section: 'about'; field: 'image' }
  | { section: 'projects' | 'skills'; field: 'image'; index: number };

// ================= Helper Component =================
const Input = ({ label, value, onChange, isTextarea = false, placeholder = '' }: any) => (
  <div className="mb-4 w-full">
    <label className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2">{label}</label>
    {isTextarea ? (
      <textarea
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 resize-y min-h-[100px] transition-colors"
      />
    ) : (
      <input
        type="text"
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
      />
    )}
  </div>
);

const ImageUploadField = ({ label, value, onChange, onUploaded }: any) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    setUploadError('');
    const extension = file.name.split('.').pop()?.toLowerCase();
    const extensionMimeTypes: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
      gif: 'image/gif',
      avif: 'image/avif',
    };
    const contentType = file.type.toLowerCase() || extensionMimeTypes[extension || ''] || '';
    if (!ALLOWED_IMAGE_TYPES.includes(contentType as (typeof ALLOWED_IMAGE_TYPES)[number])) {
      setUploadError('Format gambar tidak didukung. Gunakan JPEG, PNG, WebP, GIF, atau AVIF.');
      input.value = '';
      return;
    }

    const uploadFile = file.type ? file : new File([file], file.name, {
      type: contentType,
      lastModified: file.lastModified,
    });

    if (file.size > MAX_IMAGE_UPLOAD_BYTES) {
      setUploadError('Ukuran gambar maksimal 25 MB.');
      input.value = '';
      return;
    }

    setIsUploading(true);
    let uploadedUrl = '';
    try {
      // Load the browser-only Blob SDK when the user starts an upload, not while
      // the dashboard is rendering. This keeps its browser shims out of startup.
      const { upload } = await import('@vercel/blob/client');
      const blob = await upload(`portfolio/images/${file.name}`, uploadFile, {
        access: 'public',
        handleUploadUrl: '/api/upload',
        multipart: file.size > 5 * 1024 * 1024,
      });

      if (!blob.url) {
        throw new Error('Server tidak mengembalikan URL gambar.');
      }
      uploadedUrl = blob.url;
      onChange(blob.url);
      await onUploaded?.(blob.url);
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'Kesalahan tidak diketahui.';
      setUploadError(uploadedUrl
        ? `Gambar sudah diunggah, tetapi URL belum tersimpan: ${detail}`
        : `Gagal mengunggah gambar: ${detail}`);
    } finally {
      setIsUploading(false);
      input.value = '';
    }
  };

  return (
    <div className="mb-4 w-full">
      <label className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2">{label}</label>
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Preview & Text URL Input */}
        <div className="flex-1 w-full relative">
          <input
            type="text"
            value={value || ''}
            placeholder="https://..."
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors pr-12"
          />
          {value && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg overflow-hidden border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
        
        {/* Upload Button */}
        <div className="relative shrink-0">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          <button
            type="button"
            disabled={isUploading}
            className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
          >
            {isUploading ? <Loader2 size={16} className="animate-spin text-blue-400" /> : <Upload size={16} className="text-blue-400" />}
            {isUploading ? 'Uploading...' : 'Upload File'}
          </button>
        </div>
      </div>
      {uploadError && <p role="alert" className="mt-2 text-sm font-medium text-red-300">{uploadError}</p>}
    </div>
  );
};

export default function DynamicForm({ activeTab, data, setData, onImageUploaded }: {
  activeTab: string;
  data: any;
  setData: any;
  onImageUploaded: (target: ImageTarget, url: string) => Promise<void>;
}) {
  if (!data || !data[activeTab]) return null;

  const sectionData = data[activeTab];

  // ================= Helpers =================
  const updateField = (field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], [field]: value }
    }));
  };

  const updateNestedField = (parentField: string, childField: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [activeTab]: { 
        ...prev[activeTab], 
        [parentField]: { ...prev[activeTab][parentField], [childField]: value } 
      }
    }));
  };

  const updateArrayItem = (index: number, field: string, value: any) => {
    setData((prev: any) => {
      const arr = [...prev[activeTab]];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [activeTab]: arr };
    });
  };

  const addArrayItem = (defaultItem: any) => {
    setData((prev: any) => ({
      ...prev,
      [activeTab]: [...prev[activeTab], defaultItem]
    }));
  };

  const removeArrayItem = (index: number) => {
    setData((prev: any) => {
      const arr = [...prev[activeTab]];
      arr.splice(index, 1);
      return { ...prev, [activeTab]: arr };
    });
  };


  // ================= Forms =================

  if (activeTab === 'hero') {
    return (
      <div className="space-y-2">
        <Input label="Nama" value={sectionData.name} onChange={(v: string) => updateField('name', v)} />
        <Input label="Gelar / Profesi (contoh: Web Developer / Pelajar)" value={sectionData.title} onChange={(v: string) => updateField('title', v)} />
        <Input label="Subjudul / Deskripsi Singkat" isTextarea value={sectionData.subtitle} onChange={(v: string) => updateField('subtitle', v)} />
        <Input label="Slogan (contoh: Design. Build. Inspire.)" value={sectionData.tagline} onChange={(v: string) => updateField('tagline', v)} />
        <ImageUploadField
          label="Foto Profil"
          value={sectionData.avatar}
          onChange={(v: string) => updateField('avatar', v)}
          onUploaded={(url: string) => onImageUploaded({ section: 'hero', field: 'avatar' }, url)}
        />
      </div>
    );
  }

  if (activeTab === 'about') {
    return (
      <div className="space-y-6">
        <ImageUploadField
          label="Foto Utama (Opsional, 1x1 direkomendasikan)"
          value={sectionData.image}
          onChange={(v: string) => updateField('image', v)}
          onUploaded={(url: string) => onImageUploaded({ section: 'about', field: 'image' }, url)}
        />
        <Input label="Deskripsi Tentang Saya" isTextarea value={sectionData.description} onChange={(v: string) => updateField('description', v)} />
      </div>
    );
  }

  if (activeTab === 'projects') {
    const createDefaultProject = () => ({ id: Date.now().toString(), title: "Layanan Baru", description: "", category: "Jasa", image: "", technologies: [], price: "", website: "", whatsapp: "", whatsappText: "" });
    return (
      <div className="space-y-8">
        {sectionData.map((proj: any, i: number) => (
          <div key={`project-${i}`} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 relative group">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => removeArrayItem(i)} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20">
                <Trash2 size={16} />
              </button>
            </div>
            <h3 className="font-semibold text-lg mb-4 text-cyan-400">Layanan Bisnis #{i + 1}</h3>
            <Input label="ID (URL Slug tanpa spasi)" value={proj.id} onChange={(v: string) => updateArrayItem(i, 'id', v)} />
            <Input label="Nama Jasa / Bisnis" value={proj.title} onChange={(v: string) => updateArrayItem(i, 'title', v)} />
            <Input label="Link Website Project" value={proj.website || ''} onChange={(v: string) => updateArrayItem(i, 'website', v)} placeholder="https://contoh.com" />
            <div className="flex gap-4">
              <Input label="Kategori Jasa" value={proj.category} onChange={(v: string) => updateArrayItem(i, 'category', v)} />
              <Input label="Harga Jasa (Hanya Angka, contoh: 50000. Kosongkan jika Gratis)" value={proj.price || ''} onChange={(v: string) => updateArrayItem(i, 'price', v.replace(/\D/g, ''))} />
            </div>
            <Input label="Nomor WA Khusus Jasa Ini (contoh: 08123.. Kosongkan jika pakai WA utama)" value={proj.whatsapp || ''} onChange={(v: string) => updateArrayItem(i, 'whatsapp', v.replace(/\D/g, ''))} />
            <Input 
              label="Teks Pesan WhatsApp Otomatis (Teks pembuka saat klien chat Anda)" 
              isTextarea 
              value={proj.whatsappText || ''} 
              onChange={(v: string) => updateArrayItem(i, 'whatsappText', v)} 
              placeholder="Halo, saya tertarik dengan jasa ini..."
            />
            <ImageUploadField
              label="Gambar / Foto Jasa"
              value={proj.image}
              onChange={(v: string) => updateArrayItem(i, 'image', v)}
              onUploaded={(url: string) => onImageUploaded({ section: 'projects', field: 'image', index: i }, url)}
            />
            <Input 
              label="Deskripsi Lengkap Jasa (Gunakan tombol ENTER / baris baru untuk membuat paragraf baru)" 
              isTextarea 
              value={proj.description} 
              onChange={(v: string) => updateArrayItem(i, 'description', v)} 
            />
          </div>
        ))}
        <button
          onClick={() => addArrayItem(createDefaultProject())}
          className="w-full py-4 rounded-xl border border-dashed border-white/20 text-white/60 hover:text-white hover:border-white/40 flex items-center justify-center gap-2 transition-all"
        >
          <Plus size={18} /> Tambah Layanan Baru
        </button>
      </div>
    );
  }

  if (activeTab === 'skills') {
    const defaultSkill = { name: "New Skill", level: 50, category: "Frontend", description: "", image: "" };
    return (
      <div className="space-y-8">
        {sectionData.map((skill: any, i: number) => (
          <div key={`skill-${i}`} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 relative group">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => removeArrayItem(i)} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20">
                <Trash2 size={16} />
              </button>
            </div>
            <h3 className="font-semibold text-lg mb-4 text-emerald-400">Keahlian #{i + 1}</h3>
            <div className="flex gap-4">
              <Input label="Nama Keahlian" value={skill.name} onChange={(v: string) => updateArrayItem(i, 'name', v)} />
              <Input label="Kategori" value={skill.category} onChange={(v: string) => updateArrayItem(i, 'category', v)} />
            </div>
            <Input label="Deskripsi" value={skill.description} onChange={(v: string) => updateArrayItem(i, 'description', v)} />
            <ImageUploadField
              label="Logo / Ikon Keahlian"
              value={skill.image}
              onChange={(v: string) => updateArrayItem(i, 'image', v)}
              onUploaded={(url: string) => onImageUploaded({ section: 'skills', field: 'image', index: i }, url)}
            />
          </div>
        ))}
        <button
          onClick={() => addArrayItem(defaultSkill)}
          className="w-full py-4 rounded-xl border border-dashed border-white/20 text-white/60 hover:text-white hover:border-white/40 flex items-center justify-center gap-2 transition-all"
        >
          <Plus size={18} /> Add New Skill
        </button>
      </div>
    );
  }

  if (activeTab === 'experience') {
    const defaultExp = { id: Date.now().toString(), role: "New Role", company: "Company Name", period: "2024 - Present", description: "" };
    return (
      <div className="space-y-8">
        {sectionData.map((exp: any, i: number) => (
          <div key={`exp-${i}`} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 relative group">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => removeArrayItem(i)} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20">
                <Trash2 size={16} />
              </button>
            </div>
            <h3 className="font-semibold text-lg mb-4 text-purple-400">Pendidikan #{i + 1}</h3>
            <div className="flex gap-4">
              <Input label="Gelar / Jurusan" value={exp.role} onChange={(v: string) => updateArrayItem(i, 'role', v)} />
              <Input label="Sekolah / Universitas" value={exp.company} onChange={(v: string) => updateArrayItem(i, 'company', v)} />
            </div>
            <Input label="Periode (contoh: 2021 - 2024)" value={exp.period} onChange={(v: string) => updateArrayItem(i, 'period', v)} />
            <Input label="Deskripsi" isTextarea value={exp.description} onChange={(v: string) => updateArrayItem(i, 'description', v)} />
          </div>
        ))}
        <button
          onClick={() => addArrayItem(defaultExp)}
          className="w-full py-4 rounded-xl border border-dashed border-white/20 text-white/60 hover:text-white hover:border-white/40 flex items-center justify-center gap-2 transition-all"
        >
          <Plus size={18} /> Add New Experience
        </button>
      </div>
    );
  }

  if (activeTab === 'contact') {
    return (
      <div className="space-y-6">
        <h3 className="font-semibold text-lg text-pink-400">Info Dasar</h3>
        <Input label="Alamat Email" value={sectionData.email} onChange={(v: string) => updateField('email', v)} />
        <Input label="Nomor Telepon / WA Utama" value={sectionData.phone} onChange={(v: string) => updateField('phone', v.replace(/[^0-9+-\s]/g, ''))} />
        <Input label="Domisili (contoh: Jakarta, Indonesia)" value={sectionData.location} onChange={(v: string) => updateField('location', v)} />
        
        <h3 className="font-semibold text-lg text-pink-400 mt-8 mb-4 border-t border-white/10 pt-6">Tautan Sosial Media</h3>
        <Input label="GitHub" value={sectionData.social.github} onChange={(v: string) => updateNestedField('social', 'github', v)} placeholder="https://github.com/..." />
        <Input label="Instagram" value={sectionData.social.instagram} onChange={(v: string) => updateNestedField('social', 'instagram', v)} placeholder="https://instagram.com/..." />
      </div>
    );
  }

  return <div>No form available for this section.</div>;
}
