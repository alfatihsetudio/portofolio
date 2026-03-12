import { Trash2, Plus } from 'lucide-react';

export default function DynamicForm({ activeTab, data, setData }: { activeTab: string, data: any, setData: any }) {
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

  // Helper Input Component
  const Input = ({ label, value, onChange, isTextarea = false, placeholder = '' }: any) => (
    <div className="mb-4 w-full">
      <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">{label}</label>
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

  // ================= Forms =================

  if (activeTab === 'hero') {
    return (
      <div className="space-y-2">
        <Input label="Name" value={sectionData.name} onChange={(v: string) => updateField('name', v)} />
        <Input label="Title (e.g., Creative Developer)" value={sectionData.title} onChange={(v: string) => updateField('title', v)} />
        <Input label="Subtitle" isTextarea value={sectionData.subtitle} onChange={(v: string) => updateField('subtitle', v)} />
        <Input label="Tagline (e.g., Design. Build. Inspire.)" value={sectionData.tagline} onChange={(v: string) => updateField('tagline', v)} />
        <Input label="Avatar Image URL" value={sectionData.avatar} onChange={(v: string) => updateField('avatar', v)} placeholder={"https://..."} />
      </div>
    );
  }

  if (activeTab === 'about') {
    return (
      <div className="space-y-6">
        <Input label="About Description" isTextarea value={sectionData.description} onChange={(v: string) => updateField('description', v)} />
        
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">Highlights (Bullet Points)</label>
          <div className="space-y-3">
            {sectionData.highlights.map((hlt: string, i: number) => (
              <div key={i} className="flex gap-3">
                <input
                  type="text"
                  value={hlt}
                  onChange={(e) => {
                    const newH = [...sectionData.highlights];
                    newH[i] = e.target.value;
                    updateField('highlights', newH);
                  }}
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                />
                <button
                  onClick={() => {
                    const newH = [...sectionData.highlights];
                    newH.splice(i, 1);
                    updateField('highlights', newH);
                  }}
                  className="w-12 flex items-center justify-center bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={() => updateField('highlights', [...sectionData.highlights, "New highlight"])}
              className="flex items-center gap-2 mt-2 px-4 py-2 rounded-lg bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              <Plus size={16} /> Add Highlight
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'projects') {
    const defaultProject = { id: Date.now().toString(), title: "New Project", description: "", category: "Web App", image: "", link: "", technologies: ["React"] };
    return (
      <div className="space-y-8">
        {sectionData.map((proj: any, i: number) => (
          <div key={proj.id || i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 relative group">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => removeArrayItem(i)} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20">
                <Trash2 size={16} />
              </button>
            </div>
            <h3 className="font-semibold text-lg mb-4 text-cyan-400">Project #{i + 1}</h3>
            <Input label="ID (Lowercase URL Slug)" value={proj.id} onChange={(v: string) => updateArrayItem(i, 'id', v)} />
            <Input label="Title" value={proj.title} onChange={(v: string) => updateArrayItem(i, 'title', v)} />
            <div className="flex gap-4">
              <Input label="Category" value={proj.category} onChange={(v: string) => updateArrayItem(i, 'category', v)} />
              <Input label="Project Link URL" value={proj.link} onChange={(v: string) => updateArrayItem(i, 'link', v)} />
            </div>
            <Input label="Image URL" value={proj.image} onChange={(v: string) => updateArrayItem(i, 'image', v)} />
            <Input label="Description" isTextarea value={proj.description} onChange={(v: string) => updateArrayItem(i, 'description', v)} />
            <Input 
              label="Technologies (Comma-separated)" 
              value={(proj.technologies || []).join(', ')} 
              onChange={(v: string) => updateArrayItem(i, 'technologies', v.split(',').map(s => s.trim()))} 
            />
          </div>
        ))}
        <button
          onClick={() => addArrayItem(defaultProject)}
          className="w-full py-4 rounded-xl border border-dashed border-white/20 text-white/50 hover:text-white hover:border-white/40 flex items-center justify-center gap-2 transition-all"
        >
          <Plus size={18} /> Add New Project
        </button>
      </div>
    );
  }

  if (activeTab === 'skills') {
    const defaultSkill = { name: "New Skill", level: 50, category: "Frontend", description: "", image: "" };
    return (
      <div className="space-y-8">
        {sectionData.map((skill: any, i: number) => (
          <div key={skill.name + i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 relative group">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => removeArrayItem(i)} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20">
                <Trash2 size={16} />
              </button>
            </div>
            <h3 className="font-semibold text-lg mb-4 text-emerald-400">Skill #{i + 1}</h3>
            <div className="flex gap-4">
              <Input label="Name" value={skill.name} onChange={(v: string) => updateArrayItem(i, 'name', v)} />
              <Input label="Category" value={skill.category} onChange={(v: string) => updateArrayItem(i, 'category', v)} />
            </div>
            <Input label="Description" value={skill.description} onChange={(v: string) => updateArrayItem(i, 'description', v)} />
            <Input label="Image/Icon URL" value={skill.image} onChange={(v: string) => updateArrayItem(i, 'image', v)} />
          </div>
        ))}
        <button
          onClick={() => addArrayItem(defaultSkill)}
          className="w-full py-4 rounded-xl border border-dashed border-white/20 text-white/50 hover:text-white hover:border-white/40 flex items-center justify-center gap-2 transition-all"
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
          <div key={exp.id || i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 relative group">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => removeArrayItem(i)} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20">
                <Trash2 size={16} />
              </button>
            </div>
            <h3 className="font-semibold text-lg mb-4 text-purple-400">Experience #{i + 1}</h3>
            <div className="flex gap-4">
              <Input label="Role" value={exp.role} onChange={(v: string) => updateArrayItem(i, 'role', v)} />
              <Input label="Company" value={exp.company} onChange={(v: string) => updateArrayItem(i, 'company', v)} />
            </div>
            <Input label="Period (e.g. 2021 - 2024)" value={exp.period} onChange={(v: string) => updateArrayItem(i, 'period', v)} />
            <Input label="Description" isTextarea value={exp.description} onChange={(v: string) => updateArrayItem(i, 'description', v)} />
          </div>
        ))}
        <button
          onClick={() => addArrayItem(defaultExp)}
          className="w-full py-4 rounded-xl border border-dashed border-white/20 text-white/50 hover:text-white hover:border-white/40 flex items-center justify-center gap-2 transition-all"
        >
          <Plus size={18} /> Add New Experience
        </button>
      </div>
    );
  }

  if (activeTab === 'contact') {
    return (
      <div className="space-y-6">
        <h3 className="font-semibold text-lg text-pink-400">Basic Info</h3>
        <Input label="Email Address" value={sectionData.email} onChange={(v: string) => updateField('email', v)} />
        <Input label="Phone Number" value={sectionData.phone} onChange={(v: string) => updateField('phone', v)} />
        <Input label="Location (e.g. Jakarta, Indonesia)" value={sectionData.location} onChange={(v: string) => updateField('location', v)} />
        
        <h3 className="font-semibold text-lg text-pink-400 mt-8 mb-4 border-t border-white/10 pt-6">Social Media URLs</h3>
        <Input label="GitHub" value={sectionData.social.github} onChange={(v: string) => updateNestedField('social', 'github', v)} placeholder="https://github.com/..." />
        <Input label="LinkedIn" value={sectionData.social.linkedin} onChange={(v: string) => updateNestedField('social', 'linkedin', v)} placeholder="https://linkedin.com/..." />
        <Input label="Instagram" value={sectionData.social.instagram} onChange={(v: string) => updateNestedField('social', 'instagram', v)} placeholder="https://instagram.com/..." />
        <Input label="Twitter / X" value={sectionData.social.twitter} onChange={(v: string) => updateNestedField('social', 'twitter', v)} placeholder="https://x.com/..." />
      </div>
    );
  }

  return <div>No form available for this section.</div>;
}
