"use client";
import dynamic from "next/dynamic";
import { MapPin, Clock, Phone, Mail, Users, Target, Award } from "lucide-react";
import Image from "next/image";

// Dynamically import the map component to avoid SSR issues with Leaflet
const OfficeLocationMap = dynamic(
  () => import("../../../components/OfficeLocationMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 w-full bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    ),
  }
);

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <section className="relative py-20 text-white">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')] bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About Our Company</h1>
            <p className="text-xl opacity-90">
              We are dedicated to delivering exceptional products and services
              that empower our customers and transform industries.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Story Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-16">
            <div className="md:flex">
              <div className="md:w-1/2 p-12">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-slate-600 mb-4">
                  Founded in 2025, our company began as a small startup with a
                  big dream: to revolutionize the way people interact with
                  technology. What started as a passionate team of five has
                  grown into an industry leader with over many employees.
                </p>
                <p className="text-slate-600 mb-4">
                  Throughout our journey, we've remained committed to our core
                  principle of putting customers first. This customer-centric
                  approach has allowed us to expand our offerings and reach
                  markets across the globe.
                </p>
                <p className="text-slate-600">
                  Today, we continue to innovate and evolve, staying ahead of
                  industry trends while maintaining the personal touch that has
                  defined us from the beginning.
                </p>
              </div>
              <div className="md:w-1/2 bg-gray-200 min-h-[300px]">
                {/* Placeholder for company image */}
                <div className="w-full h-full flex items-center justify-center">
                  <Image
                    src="https://dcastalia.com/blog/wp-content/uploads/2023/03/IT-Company.jpg"
                    alt="Company Image"
                    width={730}
                    height={600}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Our Location
            </h2>
            <OfficeLocationMap />
          </div>
        </div>
      </section>
    </div>
  );
}
