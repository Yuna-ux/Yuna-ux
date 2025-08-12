"use client";
import { useState } from 'react';
import supabase from '@/libs/supabase';

export default function RobloxScriptStorage() {
  const [code, setCode] = useState('');
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const showNotification = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!code.trim()) {
      showNotification('Please enter valid Lua code', true);
      setIsLoading(false);
      return;
    }

    const normalizedCode = code.trim().replace(/\s+/g, ' ');
    
    try {
      // 1. Check script limit
      const { count: scriptCount } = await supabase
        .from('scripts')
        .select('*', { count: 'exact', head: true });

      if (scriptCount >= 500) {
        showNotification('Script limit reached (500 max)', true);
        return;
      }

      // 2. Check for existing code
      const { data: existingScript } = await supabase
        .from('scripts')
        .select('id, access_count')
        .ilike('lua_code', normalizedCode)
        .single();

      let scriptId;
      
      if (existingScript) {
        // Update existing script
        scriptId = existingScript.id;
        const { error: updateError } = await supabase
          .from('scripts')
          .update({ 
            access_count: (existingScript.access_count || 0) + 1,
            updated_at: new Date().toISOString() 
          })
          .eq('id', existingScript.id);

        if (updateError) throw updateError;
      } else {
        // Create new script
        scriptId = crypto.randomUUID();
        const { error: insertError } = await supabase
          .from('scripts')
          .insert({ 
            id: scriptId,
            lua_code: normalizedCode,
            access_count: 1
          });

        if (insertError) throw insertError;
      }

      // 3. Copy link to clipboard
      const scriptLink = `${window.location.origin}/script/${scriptId}`;
      await navigator.clipboard.writeText(scriptLink);
      
      showNotification(
        existingScript 
          ? '✅ Link copied! (Existing script)' 
          : '✨ New script saved! Link copied.',
        false
      );

      // 4. Clear editor if new script
      if (!existingScript) {
        setCode('');
      }
      
    } catch (error) {
      console.error('Script processing error:', error);
      showNotification(`❌ Error: ${error.message || 'Failed to process script'}`, true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-md shadow-lg z-50 ${
          notification.isError ? 'bg-red-600' : 'bg-green-600'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-400 mb-2">Roblox Script Storage</h1>
          <p className="text-gray-400">Store and share your Roblox Lua scripts securely</p>
        </header>

        {/* Editor Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="bg-gray-800 rounded-lg overflow-hidden mb-4">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`-- Paste your Roblox Lua code here\n\n-- Example:\nlocal part = Instance.new("Part")\npart.Position = Vector3.new(0, 10, 0)\npart.Parent = workspace`}
              spellCheck="false"
              className="w-full h-96 p-4 bg-gray-800 text-gray-100 font-mono text-sm focus:outline-none resize-none"
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-6 rounded-lg font-semibold ${
              isLoading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-amber-500 hover:bg-amber-600 transition-colors'
            }`}
          >
            {isLoading ? 'Processing...' : 'Generate & Copy Link'}
          </button>
        </form>

        {/* Features & Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-amber-400 mb-2">🔒 Secure Storage</h3>
            <p>Your scripts are stored securely with UUID access links</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-amber-400 mb-2">♻️ Code Deduplication</h3>
            <p>Same code generates the same link automatically</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-amber-400 mb-2">📋 Easy Sharing</h3>
            <p>Links are copied to clipboard automatically</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-xs">
          <p>Max 500 scripts stored | Auto-delete after 30 days of inactivity</p>
        </footer>
      </div>
    </div>
  );
        }
