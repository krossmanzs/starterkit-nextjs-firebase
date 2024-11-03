import Image from "next/image";
import Link from "next/link";
import React from "react";

type CardProps = {
  imgUrl: string;
  caption: string;
  isLoading?: boolean;
  id?: string;
};

function CardDetail({ imgUrl, caption, id, isLoading = false }: CardProps) {
  return (
    <Link href={`/detail/${id}`}>
      <div className="bg-gradient-to-r transition-all from-[#E76824] to-[#4D2B28] rounded-xl p-4 flex flex-col h-64">
        {isLoading ? (
          // Render skeleton saat loading
          <div className="animate-pulse flex flex-col h-full">
            <div className="bg-gray-300 rounded-xl h-[70%] w-full mb-2"></div>
            <div className="bg-gray-300 h-6 w-3/4 rounded mx-auto mt-auto"></div>
          </div>
        ) : (
          // Render konten asli saat tidak loading
          <>
            <Image
              src={imgUrl}
              className="rounded-xl h-[70%] object-cover hover:scale-105 transition-transform mb-3"
              width={1080}
              height={1080}
              alt="Gambar Detail"
            />
            <p className="text-white text-sm md:text-xl font-bold text-center my-auto font-belanosima">
              {caption}
            </p>
          </>
        )}
      </div>
    </Link>
  );
}

export default CardDetail;
