// import { NextResponse } from 'next/server';
// import { Pool } from 'pg';

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// export async function POST(request: Request) {
//   try {
//     const { sheetId, data } = await request.json();

//     if (!sheetId || !data || !Array.isArray(data) || data.length === 0) {
//       return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
//     }

//     const client = await pool.connect();
//     try {
//       await client.query('BEGIN');

//       // Sanitize column names
//       const sanitizeColumnName = (name: string, index: number) => {
//         return `col_${index}`;
//       };

//       // Create a table for the sheet if it doesn't exist
//       const columns = Object.keys(data[0]).map((key, index) => sanitizeColumnName(key, index));
//       const createTableQuery = `
//         CREATE TABLE IF NOT EXISTS sheet_${sheetId} (
//           id SERIAL PRIMARY KEY,
//           ${columns.map(col => `"${col}" TEXT`).join(', ')}
//         )
//       `;
//       console.log('Create Table Query:', createTableQuery);
//       await client.query(createTableQuery);

//       // Clear existing data
//       await client.query(`DELETE FROM sheet_${sheetId}`);

//       // Insert new data
//       const insertQuery = `
//         INSERT INTO sheet_${sheetId} (${columns.map(col => `"${col}"`).join(', ')})
//         VALUES (${columns.map((_, i) => `$${i + 1}`).join(', ')})
//       `;
//       console.log('Insert Query:', insertQuery);

//       for (const row of data) {
//         const values = Object.values(row).map(val => val === '' ? null : val);
//         await client.query(insertQuery, values);
//       }

//       await client.query('COMMIT');
//       return NextResponse.json({ message: 'Data stored successfully' });
//     } catch (error) {
//       await client.query('ROLLBACK');
//       console.error('Database error:', error);
//       if (error instanceof Error) {
//         return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 });
//       } else {
//         return NextResponse.json({ error: 'An unknown database error occurred' }, { status: 500 });
//       }
//     } finally {
//       client.release();
//     }
//   } catch (error) {
//     console.error('Error storing sheet data:', error);
//     if (error instanceof Error) {
//       return NextResponse.json({ error: `Failed to store sheet data: ${error.message}` }, { status: 500 });
//     } else {
//       return NextResponse.json({ error: 'An unknown error occurred while storing sheet data' }, { status: 500 });
//     }
//   }
// }

import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function POST(request: Request) {
  try {
    const { sheetId, data } = await request.json();

    if (!sheetId || !data || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Drop the existing table if it exists
      await client.query(`DROP TABLE IF EXISTS sheet_${sheetId}`);

      // Create a new table for the sheet
      const columns = Object.keys(data[0]).map((key, index) => `column_${index} TEXT`);
      const createTableQuery = `
        CREATE TABLE sheet_${sheetId} (
          id SERIAL PRIMARY KEY,
          ${columns.join(', ')}
        )
      `;
      console.log('Create Table Query:', createTableQuery);
      await client.query(createTableQuery);

      // Insert new data
      const columnNames = Object.keys(data[0]).map((_, index) => `column_${index}`);
      const insertQuery = `
        INSERT INTO sheet_${sheetId} (${columnNames.join(', ')})
        VALUES (${columnNames.map((_, i) => `$${i + 1}`).join(', ')})
      `;
      console.log('Insert Query:', insertQuery);

      for (const row of data) {
        const values = Object.values(row);
        await client.query(insertQuery, values);
      }

      await client.query('COMMIT');
    //   return NextResponse.json({ message: 'Data stored successfully' });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Database error:', error);
      if (error instanceof Error) {
        return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 });
      } else {
        return NextResponse.json({ error: 'An unknown database error occurred' }, { status: 500 });
      }
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error storing sheet data:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: `Failed to store sheet data: ${error.message}` }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred while storing sheet data' }, { status: 500 });
    }
  }
}
