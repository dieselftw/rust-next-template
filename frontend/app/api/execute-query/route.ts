import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function POST(request: Request) {
  const { query } = await request.json();

  try {
    const client = await pool.connect();
    try {
      const result = await client.query(query);
      return NextResponse.json(result.rows);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return NextResponse.json({ error: 'An error occurred while executing the SQL query.' }, { status: 500 });
  }
}
