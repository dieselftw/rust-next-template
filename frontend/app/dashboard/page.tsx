'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Sheet {
  id: string;
  name: string;
  url: string;
}

export default function Dashboard() {
  const [user, setUser] = useState(auth.currentUser);
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [newSheetName, setNewSheetName] = useState('');
  const [newSheetUrl, setNewSheetUrl] = useState('');
  const [error, setError] = useState('');
  const [editingSheet, setEditingSheet] = useState<Sheet | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchSheets(user.uid);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchSheets = async (userId: string) => {
    const q = query(collection(db, "sheets"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const sheetList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Sheet));
    setSheets(sheetList);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleAddSheet = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (user && newSheetName && newSheetUrl) {
      try {
        const existingSheet = sheets.find(sheet => sheet.name.toLowerCase() === newSheetName.toLowerCase());
        if (existingSheet) {
          setError('A sheet with this name already exists.');
          return;
        }

        await addDoc(collection(db, "sheets"), {
          userId: user.uid,
          name: newSheetName,
          url: newSheetUrl,
        });
        setNewSheetName('');
        setNewSheetUrl('');
        fetchSheets(user.uid);
      } catch (error) {
        console.error("Error adding sheet:", error);
        setError('An error occurred while adding the sheet.');
      }
    }
  };

  const handleDeleteSheet = async (sheetId: string) => {
    try {
      await deleteDoc(doc(db, "sheets", sheetId));
      fetchSheets(user!.uid);
    } catch (error) {
      console.error("Error deleting sheet:", error);
      setError('An error occurred while deleting the sheet.');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <p className="mb-4">Welcome, {user.email}</p>
      <button 
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-8"
      >
        Logout
      </button>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Add New Sheet</h2>
        <form onSubmit={handleAddSheet} className="mb-4">
          <input
            type="text"
            placeholder="Sheet Name"
            value={newSheetName}
            onChange={(e) => setNewSheetName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
          <input
            type="text"
            placeholder="Sheet URL"
            value={newSheetUrl}
            onChange={(e) => setNewSheetUrl(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Sheet
          </button>
        </form>
        {error && <p className="text-red-500 mb-4">{error}</p>}
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-2xl font-bold mb-4">Your Sheets</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">URL</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sheets.map((sheet) => (
              <tr key={sheet.id} className="border-t">
                <td className="py-2">{sheet.name}</td>
                <td className="py-2">{sheet.url}</td>
                <td className="py-2">
                  <Link href={`/sheet/${sheet.id}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">
                      Query
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteSheet(sheet.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
