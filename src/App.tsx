import { useState, useEffect, type ChangeEvent } from 'react';
import { Phone, Mail, Linkedin, Github, UserPlus, Edit2, Save, RotateCcw } from 'lucide-react';

// --- 1. DEFAULT DATA (HARDCODE YOUR INFO HERE) ---
const defaultProfile = {
  name: "Richard Chelson", // Change this!
  title: "Creative Developer",
  phone: "228-355-4895",
  email: "rchelson@gmail.com",
  bio: "Building cool apps with AI.",
  linkedin: "https://linkedin.com",
  github: "https://github.com",
  website: "https://example.com"
};

function App() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profile, setProfile] = useState(defaultProfile);

  // Load data from LocalStorage on startup
  useEffect(() => {
    const saved = localStorage.getItem('bizCardProfile');
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  // Save to LocalStorage whenever profile changes
  const saveProfile = () => {
    localStorage.setItem('bizCardProfile', JSON.stringify(profile));
    setIsEditMode(false);
  };

  // Reset to Default
  const resetProfile = () => {
    setProfile(defaultProfile);
    localStorage.removeItem('bizCardProfile');
    setIsEditMode(false);
  };

  // Handle text changes (Fixed for TypeScript)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Generate vCard for "Save Contact"
  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
TITLE:${profile.title}
TEL;TYPE=CELL:${profile.phone}
EMAIL:${profile.email}
URL:${profile.website}
NOTE:${profile.bio}
END:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.name.replace(' ', '_')}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dynamic Avatar based on name
  const avatarUrl = `https://api.dicebear.com/9.x/avataaars/svg?seed=${profile.name}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center p-4">
      
      {/* CARD CONTAINER */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden relative">
        
        {/* EDIT TOGGLE BUTTON */}
        <button 
          onClick={() => setIsEditMode(!isEditMode)}
          className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
        >
          {isEditMode ? <RotateCcw size={16} /> : <Edit2 size={16} />}
        </button>

        {isEditMode ? (
          // --- EDIT MODE ---
          <div className="p-8 space-y-4">
            <h2 className="text-xl font-bold text-center mb-4">Edit Profile</h2>
            <div className="space-y-3">
              <input name="name" value={profile.name} onChange={handleChange} placeholder="Name" className="w-full p-2 bg-black/40 rounded border border-gray-600" />
              <input name="title" value={profile.title} onChange={handleChange} placeholder="Job Title" className="w-full p-2 bg-black/40 rounded border border-gray-600" />
              <input name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone Number" className="w-full p-2 bg-black/40 rounded border border-gray-600" />
              <input name="email" value={profile.email} onChange={handleChange} placeholder="Email" className="w-full p-2 bg-black/40 rounded border border-gray-600" />
              <input name="bio" value={profile.bio} onChange={handleChange} placeholder="Short Bio" className="w-full p-2 bg-black/40 rounded border border-gray-600" />
            </div>
            <div className="flex gap-2 pt-4">
              <button onClick={resetProfile} className="flex-1 py-2 bg-red-500/80 hover:bg-red-600 rounded font-bold">Reset</button>
              <button onClick={saveProfile} className="flex-1 py-2 bg-green-500 hover:bg-green-600 rounded font-bold flex justify-center items-center gap-2">
                <Save size={18} /> Save
              </button>
            </div>
          </div>
        ) : (
          // --- VIEW MODE ---
          <div className="p-8 flex flex-col items-center text-center space-y-6">
            
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full border-4 border-white/30 shadow-lg overflow-hidden bg-gray-700">
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            </div>

            {/* Info */}
            <div>
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <p className="text-blue-400 font-medium text-lg">{profile.title}</p>
              <p className="text-gray-400 mt-2 text-sm max-w-xs mx-auto">{profile.bio}</p>
            </div>

            {/* SAVE CONTACT BUTTON */}
            <button 
              onClick={downloadVCard}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-blue-900/50"
            >
              <UserPlus size={20} /> Save Contact
            </button>

            {/* Social Links */}
            <div className="flex gap-4 justify-center pt-2">
              <a href={`tel:${profile.phone}`} className="p-3 bg-white/5 rounded-full hover:bg-blue-500 hover:text-white transition"><Phone size={20} /></a>
              <a href={`mailto:${profile.email}`} className="p-3 bg-white/5 rounded-full hover:bg-blue-500 hover:text-white transition"><Mail size={20} /></a>
              {profile.linkedin && <a href={profile.linkedin} target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-blue-500 hover:text-white transition"><Linkedin size={20} /></a>}
              {profile.github && <a href={profile.github} target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-blue-500 hover:text-white transition"><Github size={20} /></a>}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;