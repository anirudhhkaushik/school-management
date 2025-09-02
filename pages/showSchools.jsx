import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch("/api/schools")
      .then(res => res.json())
      .then(data => setSchools(data))
      .catch(() => setSchools([]));
  }, []);

  return (
    <>
      <Head><title>Schools</title></Head>
      <div className="p-6 min-h-screen">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Schools</h1>
          <Link href="/addSchool" className="text-blue-600 underline">Add School</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((s) => (
            <div key={s.id} className="bg-white p-4 rounded-2xl shadow-lg">
              <img src={`/schoolImages/${s.image}`} alt={s.name} className="w-full h-44 object-cover rounded-lg" />
              <h3 className="text-lg font-bold mt-3">{s.name}</h3>
              <p className="text-gray-600">{s.address}</p>
              <p className="text-gray-800 font-medium">{s.city}</p>
            </div>
          ))}
          {schools.length === 0 && <p>No schools yet. Add one!</p>}
        </div>
      </div>
    </>
  );
}