# School Management (Next.js + MySQL)

**Covers the exact assignment requirements**: two pages (`addSchool.jsx`, `showSchools.jsx`), MySQL storage, react-hook-form validations, image upload to `public/schoolImages`, responsive UI with Tailwind.

## Quick Start

1. **Create DB + Table** (MySQL)
   ```sql
   CREATE DATABASE IF NOT EXISTS school_db;
   USE school_db;
   CREATE TABLE IF NOT EXISTS schools (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name TEXT,
     address TEXT,
     city TEXT,
     state TEXT,
     contact BIGINT,
     image TEXT,
     email_id TEXT
   );
   ```

2. **Set environment variables** (create `.env.local` in project root):
   ```bash
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=
   DB_NAME=school_db
   ```

3. **Install & Run**
   ```bash
   npm install
   npm run dev
   ```

4. **Pages**
   - `http://localhost:3000/addSchool` – form to add school (with validations + image upload).
   - `http://localhost:3000/showSchools` – product-style grid of schools (name, address, city, image).

## Deploy Notes (Vercel/Netlify)
- Use environment variables for DB connection (consider PlanetScale/Railway for hosted MySQL).
- Ensure `public/schoolImages` exists; on serverless you may want object storage (S3/Cloudinary).
- This repo keeps local image uploads (per assignment spec). For production hosting, switch to cloud storage.

## Tech
- Next.js (Pages Router), TailwindCSS, react-hook-form, MySQL2, formidable.