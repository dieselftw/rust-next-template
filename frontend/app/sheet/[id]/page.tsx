// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { doc, getDoc } from 'firebase/firestore';
// import { db, auth } from '../../../lib/firebase';

// interface Sheet {
//   id: string;
//   name: string;
//   url: string;
// }

// export default function SheetQuery({ params }: { params: { id: string } }) {
//   const [sheet, setSheet] = useState<Sheet | null>(null);
//   const [sqlQuery, setSqlQuery] = useState('');
//   const [queryResult, setQueryResult] = useState<any[] | null>(null);
//   const [error, setError] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     const fetchSheet = async () => {
//       if (!auth.currentUser) {
//         router.push('/login');
//         return;
//       }

//       try {
//         const sheetDoc = await getDoc(doc(db, 'sheets', params.id));
//         if (sheetDoc.exists()) {
//           setSheet({ id: sheetDoc.id, ...sheetDoc.data() } as Sheet);
//         } else {
//           setError('Sheet not found');
//         }
//       } catch (error) {
//         console.error("Error fetching sheet:", error);
//         setError('An error occurred while fetching the sheet.');
//       }
//     };

//     fetchSheet();
//   }, [params.id, router]);

//   const handleSqlQuery = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setQueryResult(null);
//     if (sqlQuery) {
//       try {
//         const response = await fetch('/api/execute-query', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ query: sqlQuery }),
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const result = await response.json();
//         setQueryResult(result);
//       } catch (error) {
//         console.error("Error executing SQL query:", error);
//         setError('An error occurred while executing the SQL query.');
//       }
//     }
//   };

//   const createTableWithSampleData = async () => {
    
//     setError('');
//     setQueryResult(null);
    
//     const createTableQuery = `
//       CREATE TABLE IF NOT EXISTS sample_data (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(100),
//         email VARCHAR(100),
//         age INT
//       );

//       INSERT INTO sample_data (name, email, age)
//       VALUES 
//         ('John Doe', 'john@example.com', 30),
//         ('Jane Smith', 'jane@example.com', 25),
//         ('Bob Johnson', 'bob@example.com', 35),
//         ('Alice Brown', 'alice@example.com', 28),
//         ('Charlie Wilson', 'charlie@example.com', 40);
//     `;

//     try {
//       const response = await fetch('/api/execute-query', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query: createTableQuery }),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       setQueryResult([{ message: 'Table created and sample data inserted successfully' }]);
//     } catch (error) {
//       console.error("Error creating table and inserting sample data:", error);
//       setError('An error occurred while creating the table and inserting sample data.');
//     }
//   };

//   if (!sheet) return <div>Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-3xl font-bold mb-8">Query Sheet: {sheet.name}</h1>
//       <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         <form onSubmit={handleSqlQuery}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sqlQuery">
//               SQL Query
//             </label>
//             <textarea
//               id="sqlQuery"
//               value={sqlQuery}
//               onChange={(e) => setSqlQuery(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               rows={4}
//               placeholder="Enter your SQL query here"
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Execute Query
//             </button>
//             <button
//               type="button"
//               onClick={() => router.push('/dashboard')}
//               className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Back to Dashboard
//             </button>
//           </div>
//         </form>
//         <div className="mt-4">
//           <button
//             onClick={createTableWithSampleData}
//             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Create Table with Sample Data
//           </button>
//         </div>
//         {error && <p className="text-red-500 mt-4">{error}</p>}
//       </div>
//       {queryResult && (
//         <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
//           <h2 className="text-2xl font-bold mb-4">Query Result</h2>
//           <table className="w-full">
//             <thead>
//               <tr>
//                 {Object.keys(queryResult[0]).map((key) => (
//                   <th key={key} className="text-left">{key}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {queryResult.map((row, index) => (
//                 <tr key={index}>
//                   {Object.values(row).map((value: any, idx) => (
//                     <td key={idx} className="py-2">{value}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }


// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { doc, getDoc } from 'firebase/firestore';
// import { db, auth } from '../../../lib/firebase';

// interface Sheet {
//   id: string;
//   name: string;
//   url: string;
// }

// export default function SheetQuery({ params }: { params: { id: string } }) {
//   const [sheet, setSheet] = useState<Sheet | null>(null);
//   const [sqlQuery, setSqlQuery] = useState('');
//   const [queryResult, setQueryResult] = useState<any[] | null>(null);
//   const [error, setError] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     const fetchSheet = async () => {
//       if (!auth.currentUser) {
//         router.push('/login');
//         return;
//       }

//       try {
//         const sheetDoc = await getDoc(doc(db, 'sheets', params.id));
//         if (sheetDoc.exists()) {
//           setSheet({ 
//             id: sheetDoc.id, 
//             name: sheetDoc.data().name,
//             url: 'https://docs.google.com/spreadsheets/d/1A83FfaFX4BFLn1iB8RgF3Lqm9EilB18hWoLMiEmKgLg/edit?pli=1&gid=0'
//           });
//         } else {
//           setError('Sheet not found');
//         }
//       } catch (error) {
//         console.error("Error fetching sheet:", error);
//         setError('An error occurred while fetching the sheet.');
//       }
//     };

//     fetchSheet();
//   }, [params.id, router]);

//   useEffect(() => {
//     if (!sheet) return;

//     const fetchDataAndStore = async () => {
//         try {
//           // Fetch data from Google Sheets
//           const response = await fetch('/api/fetch-sheet-data');
//           if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(`Failed to fetch sheet data: ${errorData.error}`);
//           }
//           const sheetData = await response.json();
          
//           console.log('Sheet Data:', JSON.stringify(sheetData, null, 2));
      
//           // Transform the data to ensure it's an array of objects
//           const transformedData = sheetData.map((row: string[]) => {
//             return row.reduce((acc: Record<string, string>, value: string, index: number) => {
//               acc[`column_${index}`] = value;
//               return acc;
//             }, {});
//           });
      
//           // Store data in SQL
//           const storeResponse = await fetch('/api/store-sheet-data', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ sheetId: sheet.id, data: transformedData }),
//           });
      
//           const responseData = await storeResponse.json();
          
//           if (!storeResponse.ok) {
//             throw new Error(`Failed to store sheet data: ${responseData.error}`);
//           }
      
//           console.log('Store Response:', responseData);
//           setQueryResult([{ message: responseData.message }]);
//         } catch (error) {
//           console.error("Error fetching or storing data:", error);
//           setError(`An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
//         }
//       };
      
      
      
      
      
      
      

//     const intervalId = setInterval(fetchDataAndStore, 5000);

//     return () => clearInterval(intervalId);
//   }, [sheet]);

//   const handleSqlQuery = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setQueryResult(null);
//     if (sqlQuery) {
//       try {
//         const response = await fetch('/api/execute-query', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ query: sqlQuery }),
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const result = await response.json();
//         setQueryResult(result);
//       } catch (error) {
//         console.error("Error executing SQL query:", error);
//         setError('An error occurred while executing the SQL query.');
//       }
//     }
//   };

//   if (!sheet) return <div>Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-3xl font-bold mb-8">Query Sheet: {sheet.name}</h1>
//       <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         <form onSubmit={handleSqlQuery}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sqlQuery">
//               SQL Query
//             </label>
//             <textarea
//               id="sqlQuery"
//               value={sqlQuery}
//               onChange={(e) => setSqlQuery(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               rows={4}
//               placeholder="Enter your SQL query here"
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Execute Query
//             </button>
//             <button
//               type="button"
//               onClick={() => router.push('/dashboard')}
//               className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Back to Dashboard
//             </button>
//           </div>
//         </form>
//         {error && <p className="text-red-500 mt-4">{error}</p>}
//       </div>
//       {queryResult && (
//         <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
//           <h2 className="text-2xl font-bold mb-4">Query Result</h2>
//           <table className="w-full">
//             <thead>
//               <tr>
//                 {Object.keys(queryResult[0]).map((key) => (
//                   <th key={key} className="text-left">{key}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {queryResult.map((row, index) => (
//                 <tr key={index}>
//                   {Object.values(row).map((value: any, idx) => (
//                     <td key={idx} className="py-2">{value}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../../lib/firebase';

interface Sheet {
  id: string;
  name: string;
  url: string;
}

export default function SheetQuery({ params }: { params: { id: string } }) {
  const [sheet, setSheet] = useState<Sheet | null>(null);
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResult, setQueryResult] = useState<any[] | null>(null);
  const [fetchStatus, setFetchStatus] = useState<string>('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchSheet = async () => {
      if (!auth.currentUser) {
        router.push('/login');
        return;
      }

      try {
        const sheetDoc = await getDoc(doc(db, 'sheets', params.id));
        if (sheetDoc.exists()) {
          setSheet({ 
            id: sheetDoc.id, 
            name: sheetDoc.data().name,
            url: 'https://docs.google.com/spreadsheets/d/1A83FfaFX4BFLn1iB8RgF3Lqm9EilB18hWoLMiEmKgLg/edit?pli=1&gid=0'
          });
        } else {
          setError('Sheet not found');
        }
      } catch (error) {
        console.error("Error fetching sheet:", error);
        setError('An error occurred while fetching the sheet.');
      }
    };

    fetchSheet();
  }, [params.id, router]);

  useEffect(() => {
    if (!sheet) return;

    const fetchDataAndStore = async () => {
      try {
        // Fetch data from Google Sheets
        const response = await fetch('/api/fetch-sheet-data');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to fetch sheet data: ${errorData.error}`);
        }
        const sheetData = await response.json();
        
        console.log('Sheet Data:', JSON.stringify(sheetData, null, 2));
    
        // Transform the data to ensure it's an array of objects
        const transformedData = sheetData.map((row: string[]) => {
          return row.reduce((acc: Record<string, string>, value: string, index: number) => {
            acc[`column_${index}`] = value;
            return acc;
          }, {});
        });
    
        // Store data in SQL
        const storeResponse = await fetch('/api/store-sheet-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sheetId: sheet.id, data: transformedData }),
        });
    
        const responseData = await storeResponse.json();
        
        if (!storeResponse.ok) {
          throw new Error(`Failed to store sheet data: ${responseData.error}`);
        }
    
        console.log('Store Response:', responseData);
        setFetchStatus(responseData.message);
      } catch (error) {
        console.error("Error fetching or storing data:", error);
        setFetchStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

    const intervalId = setInterval(fetchDataAndStore, 5000);

    return () => clearInterval(intervalId);
  }, [sheet]);

  const handleSqlQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setQueryResult(null);
    if (sqlQuery) {
      try {
        const response = await fetch('/api/execute-query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: sqlQuery }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setQueryResult(result);
      } catch (error) {
        console.error("Error executing SQL query:", error);
        setError('An error occurred while executing the SQL query.');
      }
    }
  };

  if (!sheet) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Query Sheet: {sheet.name}</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleSqlQuery}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sqlQuery">
              SQL Query
            </label>
            <textarea
              id="sqlQuery"
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={4}
              placeholder="Enter your SQL query here"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Execute Query
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Back to Dashboard
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {fetchStatus && <p className="text-green-500 mt-4">{fetchStatus}</p>}
      </div>
      {queryResult && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h2 className="text-2xl font-bold mb-4">Query Result</h2>
          <table className="w-full">
            <thead>
              <tr>
                {Object.keys(queryResult[0]).map((key) => (
                  <th key={key} className="text-left">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {queryResult.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value: any, idx) => (
                    <td key={idx} className="py-2">{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
