export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center space-y-4">
        <h1 className="text-3xl font-bold">School Management</h1>
        <div className="flex gap-4 justify-center">
          <a className="px-5 py-3 rounded-xl bg-blue-600 text-white" href="/addSchool">Add School</a>
          <a className="px-5 py-3 rounded-xl bg-gray-800 text-white" href="/showSchools">Show Schools</a>
        </div>
      </div>
    </div>
  );
}