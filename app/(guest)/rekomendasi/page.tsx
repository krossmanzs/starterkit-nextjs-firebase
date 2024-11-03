"use client";

import CardKuliner from "@/components/card-kuliner";
import React, { useEffect, useState } from "react";
import { RotateCw } from "lucide-react";
import SearchBar from "@/components/search-bar";
import SkeletonCard from "@/components/skeleton-kuliner-card";

interface Kuliner {
  id: string;
  address: string;
  gmapsLink: string;
  workingDays: string;
  imageUrls: string[];
  name: string;
  description: string;
  qualityRating: number;
  workingHours: {
    start: string;
    stop: string;
  };
  priceRating: number;
}

function Page() {
  const [data, setData] = useState<Kuliner[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/kuliner?limit=3&random=true");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result.kuliner); // Menyimpan data kuliner dari respons API
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center gap-8">
      <SearchBar />

      <div className=" bg-gradient-to-l shadow-xl from-[#E76824] to-[#4D2B28] rounded-3xl flex justify-between items-center">
        {/* Text Content */}
        <div className="text-left p-5">
          <h2 className="text-yellow-400 font-bold text-lg md:text-2xl lg:text-4xl mb-2">
            Ini adalah kuliner lampung yang kami rekomendasikan, semoga kamu
            suka ya..
          </h2>

          <button
            onClick={fetchData}
            className="flex gap-2 bg-white mt-5 text-[#4D2B28] font-semibold py-2 px-4 rounded-md shadow-md hover:bg-gray-100 transition-all"
          >
            Cari lagi
            <RotateCw />
          </button>
        </div>

        {/* Image */}
        <div className="hidden md:block rounded-xl overflow-hidden">
          <img
            className="h-full"
            src="/images/kuliner.png"
            alt="Kuliner Image"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-20 justify-center items-center py-8 ">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : data.map((item) => <CardKuliner key={item.id} data={item} />)}
      </div>
    </div>
  );
}

export default Page;
