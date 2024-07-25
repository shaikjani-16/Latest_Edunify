// "use client";
// import { useEffect, useState } from "react";
// import SchoolCard from "../../components/schoolCard";
// import Link from "next/link";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const ShowSchoolsPage = ({ initialSchools }) => {
//   const [schools, setSchools] = useState(initialSchools);
//   const [loading, setLoading] = useState(false);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="flex items-center space-x-2">
//           <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin"></div>
//           <p className="text-gray-700">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4 relative">
//       <h1 className="text-3xl font-bold text-center mb-8">Schools</h1>
//       <Link href="/newSchool">
//         <div className="absolute top-8 right-8 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
//           Add School
//         </div>
//       </Link>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {schools.map((school) => (
//           <SchoolCard key={school.id} school={school} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export async function getServerSideProps() {
//   try {
//     const schools = await prisma.school.findMany();
//     return {
//       props: {
//         initialSchools: schools,
//       },
//     };
//   } catch (error) {
//     console.error("Failed to fetch schools:", error);
//     return {
//       props: {
//         initialSchools: [],
//       },
//     };
//   }
// }

// export default ShowSchoolsPage;
// src/app/showschool/page.jsx

import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function ShowSchoolPage() {
  // Fetch data on the server-side directly
  const schools = await prisma.school.findMany();
  console.log(schools);

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Link href="/createschool">
        <div className="absolute top-8 right-8 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Add New School
        </div>
      </Link>
      <div className="p-8">
        <h1 className="text-black text-2xl font-semibold mb-6">
          List of Schools
        </h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                State
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schools.map((school) => (
              <tr key={school.id}>
                <td className=" text-black px-6 py-4 whitespace-nowrap">
                  {school.name}
                </td>
                <td className="text-black px-6 py-4 whitespace-nowrap">
                  {school.address}
                </td>
                <td className="text-black px-6 py-4 whitespace-nowrap">
                  {school.city}
                </td>
                <td className="text-black px-6 py-4 whitespace-nowrap">
                  {school.state}
                </td>
                <td className="text-black px-6 py-4 whitespace-nowrap">
                  <img
                    style={{ width: "200px", height: "200px" }}
                    src={`https://res.cloudinary.com/dnnjgmqo0/image/upload/c_scale,f_auto,h_400,q_auto,w_400/v1/${school.image}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
