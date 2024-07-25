"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";
import { z } from "zod";

export default function CreateContactForm() {
  const zodObject = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    name: z.string().min(3).max(255),
    address: z.string().min(5).max(255),
    city: z.string().min(3).max(255),
    state: z.string().min(2).max(100),
    contact: z.string().min(10).max(10),
  });

  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    const validatedData = zodObject.safeParse(data);
    console.log(validatedData);
    // const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (validatedData.success) {
      setLoading(true);
      const raw_image = data.profile[0];
      const formData = new FormData();
      formData.append("file", raw_image);
      formData.append("upload_preset", "edunify");

      try {
        const uploadResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dnnjgmqo0/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        if (!uploadResponse.ok) {
          throw new Error("Image upload failed");
        }
        const imageData = await uploadResponse.json();
        const imageUrl = imageData.public_id;

        const contactData = { ...data, image: imageUrl };

        const response = await fetch(`/api/create-school`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(contactData),
        });

        if (response.ok) {
          reset();
          toast.success("School Added successfully!");
          router.push("/showschool");
        } else {
          toast.error("Failed to Add School");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please enter valid details");
      return;
    }
    return;
  }
  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100">
      <Link href="/">
        <div className="absolute top-8 right-8 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Show All Schools
        </div>
      </Link>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-black text-2xl font-semibold mb-6">
          Add New School
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              id="name"
              className={`text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Enter School Name Min 3 characters"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">Name is required</p>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              {...register("address", { required: true })}
              type="text"
              id="address"
              className={`text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.address ? "border-red-500" : ""
              }`}
              placeholder="Min 5 characters"
            />
            {errors.address && (
              <p className="mt-2 text-sm text-red-600">Address is required</p>
            )}
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              {...register("city", { required: true })}
              type="text"
              id="city"
              className={`text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.city ? "border-red-500" : ""
              }`}
              placeholder="Min 2 characters"
            />
            {errors.city && (
              <p className="mt-2 text-sm text-red-600">City is required</p>
            )}
          </div>

          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State
            </label>
            <input
              {...register("state", { required: true })}
              type="text"
              id="state"
              className={`text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.state ? "border-red-500" : ""
              }`}
              placeholder="Min 3 characters"
            />
            {errors.state && (
              <p className="mt-2 text-sm text-red-600">State is required</p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              {...register("contact", { required: true })}
              type="tel"
              id="contact"
              className={`text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.contact ? "border-red-500" : ""
              }`}
              placeholder="9999989342"
            />
            {errors.contact && (
              <p className="mt-2 text-sm text-red-600">Phone is required</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              className={`text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="email@example.com"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">Email is required</p>
            )}
          </div>

          <div>
            <label
              htmlFor="profile"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Profile Picture
            </label>
            <input
              {...register("profile", { required: true })}
              type="file"
              id="profile"
              className={`mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 ${
                errors.profile ? "border-red-500" : ""
              }`}
              accept="image/*"
            />
            {errors.profile && (
              <p className="mt-2 text-sm text-red-600">Image is required</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 text-white font-semibold rounded-md shadow-md focus:outline-none ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  role="status"
                  className="w-5 h-5 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Creating please wait...
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
