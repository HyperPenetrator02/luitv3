import React, { useState, useEffect } from 'react';

export default function ApiConfig({ onUpdate }) {
    const [show, setShow] = useState(false);
    const [apiUrl, setApiUrl] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('CUSTOM_API_URL');
        if (stored) setApiUrl(stored);
    }, []);

    const handleSave = () => {
        localStorage.setItem('CUSTOM_API_URL', apiUrl);
        setSaved(true);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handleClear = () => {
        localStorage.removeItem('CUSTOM_API_URL');
        setApiUrl('');
        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    if (!show) {
        return (
            <button
                onClick={() => setShow(true)}
                className="fixed bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold z-50"
                title="Configure Backend URL"
            >
                ⚙️ API Settings
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">⚙️ Backend API Configuration</h2>
                    <button onClick={() => setShow(false)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Backend URL (from Railway)
                    </label>
                    <input
                        type="text"
                        value={apiUrl}
                        onChange={(e) => setApiUrl(e.target.value)}
                        placeholder="https://your-app.up.railway.app"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Get this from Railway Dashboard → Settings → Domains
                    </p>
                </div>

                {saved && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                        ✅ Saved! Reloading page...
                    </div>
                )}

                <div className="flex gap-2">
                    <button
                        onClick={handleSave}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold"
                    >
                        Save & Reload
                    </button>
                    <button
                        onClick={handleClear}
                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-semibold"
                    >
                        Clear & Reset
                    </button>
                </div>

                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
                    <p className="font-semibold text-yellow-800">📌 Current Status:</p>
                    <p className="text-yellow-700 text-xs mt-1">
                        {apiUrl ? `Using: ${apiUrl}` : 'Using default from environment'}
                    </p>
                </div>
            </div>
        </div>
    );
}
