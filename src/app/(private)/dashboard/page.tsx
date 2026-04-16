'use client';
import { useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
    </div>
  );
}
