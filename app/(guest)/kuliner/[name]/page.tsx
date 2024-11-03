"use client";

import CardKuliner from "@/components/card-kuliner";
import React, { useEffect, useState } from "react";
import { RotateCw } from "lucide-react";
import SearchBar from "@/components/search-bar";
import SkeletonCard from "@/components/skeleton-kuliner-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Data {
  kuliner: Kuliner[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

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

function Page({ params }: { params: { name: string } }) {
  const [data, setData] = useState<Data>();
  const [loading, setLoading] = useState(true);
  const decodedName = decodeURIComponent(params.name);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/kuliner?limit=6&search=${params.name}&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result); // Menyimpan data kuliner dari respons API
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, params.name]); // Fetch ulang data ketika `page` atau `name` berubah

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <SearchBar />

      <div className="justify-center ">
        <h2 className="font-belanosima text-black-200 font-semi-bold text-2xl mb-2 text-center">
          Berikut hasil pencarian....
        </h2>
        <h1 className="font-belanosima text-[50px] text-black-800 font-bold text-2xl text-center">
          {decodedName}
        </h1>
      </div>

      {data?.kuliner.length === 0 ? (
        <h2 className="font-belanosima text-red-500 font-semi-bold text-2xl mb-2 text-center">
          Tidak ada hasil yang ditemukan
        </h2>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 justify-center items-center py-8 ">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              : data?.kuliner.map((item) => (
                  <CardKuliner key={item.id} data={item} />
                ))}
          </div>

          <Pagination>
            <PaginationContent className="bg-amber-800 rounded-md text-white py-2 px-3">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(page > 1 ? page - 1 : 1)}
                />
              </PaginationItem>
              {Array.from(
                { length: data?.totalPages || 0 },
                (_, index) => index + 1
              ).map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={pageNumber === page}
                    className={`${
                      pageNumber === page ? "bg-red-300" : "bg-white"
                    } text-[#4D2B28] w-fit px-2 ml-1`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {data && data.totalPages > 3 && <PaginationEllipsis />}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    handlePageChange(
                      page < (data?.totalPages || 1) ? page + 1 : page
                    )
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
}

export default Page;
