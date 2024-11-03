"use client";

import CardDetail from "@/components/carddetail";
import ReviewCard from "@/components/reviewcard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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

function Page({ params }: { params: { id: string } }) {
  const [dataKuliner, setDataKuliner] = useState<Kuliner>();
  const [dataLainnya, setDataLainnya] = useState<Kuliner[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response1 = await fetch(`/api/kuliner?id=${params.id}`);
      const response2 = await fetch("/api/kuliner?limit=6&random=true");

      if (!response1.ok || !response2.ok) {
        throw new Error("Failed to fetch data");
      }

      const result1 = await response1.json();
      const result2 = await response2.json();
      setDataKuliner(result1.kuliner);
      setDataLainnya(result2.kuliner);
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
    <div className="container">
      {/* Skeleton atau Gambar */}
      {loading ? (
        <div className="animate-pulse bg-gray-300 w-full h-[400px] rounded-xl"></div>
      ) : (
        <div className="relative w-full h-[400px]">
          <Image
            src={
              dataKuliner?.imageUrls[0] ||
              "https://via.placeholder.com/1080x1080"
            }
            className="rounded-xl object-cover object-center"
            layout="fill"
            quality={90}
            alt="Gambar Bakso"
          />
        </div>
      )}

      <div className="bg-gradient-to-b from-[#E76824] to-[#4D2B28] w-full mt-4 rounded-xl flex flex-col gap-6 p-4 text-justify">
        {/* Skeleton atau Nama Kuliner */}
        <div className="text-white font-bold text-3xl font-belanosima">
          {loading ? (
            <div className="animate-pulse bg-gray-300 h-8 w-1/2 rounded-md"></div>
          ) : (
            <p>{dataKuliner?.name}</p>
          )}
        </div>

        {/* Skeleton atau Deskripsi */}
        <div className="bg-white rounded-xl p-4 font-belanosima">
          {loading ? (
            <div className="animate-pulse space-y-2">
              <div className="bg-gray-300 h-4 rounded-md w-full"></div>
              <div className="bg-gray-300 h-4 rounded-md w-3/4"></div>
              <div className="bg-gray-300 h-4 rounded-md w-5/6"></div>
            </div>
          ) : (
            <p>{dataKuliner?.description}</p>
          )}
        </div>

        {/* Skeleton atau Alamat */}
        <div className="bg-white rounded-xl p-4">
          <p className="font-bold text-xl font-belanosima">ALAMAT</p>
          {loading ? (
            <div className="animate-pulse bg-gray-300 h-4 w-3/4 rounded-md"></div>
          ) : (
            <p>{dataKuliner?.address}</p>
          )}
        </div>

        {/* Skeleton atau Review */}
        <div className="bg-white rounded-xl p-4">
          <p className="font-bold text-xl font-belanosima">REVIEW</p>
          <ScrollArea className="h-36">
            {loading ? (
              [...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-gray-300 h-6 w-full rounded-md mb-2"
                ></div>
              ))
            ) : (
              <>
                <ReviewCard loading={loading} />
                <ReviewCard loading={loading} />
                <ReviewCard loading={loading} />
                <ReviewCard loading={loading} />
              </>
            )}
          </ScrollArea>
        </div>
      </div>

      {/* Rekomendasi Lainnya */}
      <div>
        <p className="font-bold text-xl py-6 text-center">
          Rekomendasi Lainnya:
        </p>
        <div className="flex gap-4 justify-around px-32">
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {loading
                ? [...Array(6)].map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="md:basis-1/2 lg:basis-1/4 w-48"
                    >
                      <div className="animate-pulse bg-gray-300 h-64 w-full rounded-md"></div>
                    </CarouselItem>
                  ))
                : dataLainnya.map((item, index) => (
                    <CarouselItem
                      key={index}
                      className="md:basis-1/2 lg:basis-1/4"
                    >
                      <div className="p-1">
                        <CardDetail
                          id={item.id}
                          isLoading={loading}
                          imgUrl={item.imageUrls[0]}
                          caption={item.name}
                        />
                      </div>
                    </CarouselItem>
                  ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Page;
