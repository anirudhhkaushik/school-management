import { useForm } from "react-hook-form";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setMessage("");
    setError("");

    const formData = new FormData();
    for (const [k, v] of Object.entries(data)) {
      if (k === "image") formData.append("image", v[0]);
      else formData.append(k, v);
    }

    try {
      const res = await fetch("/api/schools", { method: "POST", body: formData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed");
      setMessage(result.message);
      reset();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <Head>
        <title>Add School</title>
      </Head>
      <div className="flex justify-center items-center min-h-screen p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Add School</h2>
            <Link href="/showSchools" className="text-blue-600 underline">View Schools</Link>
          </div>

          <input {...register("name", { required: "Name is required" })} placeholder="School Name" className="w-full p-3 border rounded" />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}

          <input {...register("address", { required: "Address is required" })} placeholder="Address" className="w-full p-3 border rounded" />
          {errors.address && <p className="text-red-600 text-sm">{errors.address.message}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <input {...register("city", { required: "City is required" })} placeholder="City" className="w-full p-3 border rounded" />
              {errors.city && <p className="text-red-600 text-sm">{errors.city.message}</p>}
            </div>
            <div>
              <input {...register("state", { required: "State is required" })} placeholder="State" className="w-full p-3 border rounded" />
              {errors.state && <p className="text-red-600 text-sm">{errors.state.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <input type="number" {...register("contact", { required: "Contact is required", minLength: { value: 7, message: "Too short" } })} placeholder="Contact Number" className="w-full p-3 border rounded" />
              {errors.contact && <p className="text-red-600 text-sm">{errors.contact.message}</p>}
            </div>
            <div>
              <input type="email" {...register("email_id", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } })} placeholder="Email" className="w-full p-3 border rounded" />
              {errors.email_id && <p className="text-red-600 text-sm">{errors.email_id.message}</p>}
            </div>
          </div>

          <div>
            <input type="file" accept="image/*" {...register("image", { required: "Image is required" })} className="w-full" />
            {errors.image && <p className="text-red-600 text-sm">{errors.image.message}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg">Submit</button>

          {message && <p className="text-green-700">{message}</p>}
          {error && <p className="text-red-700">{error}</p>}
        </form>
      </div>
    </>
  );
}