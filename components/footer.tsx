import { Globe, Instagram, Phone, Youtube } from "lucide-react";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="bg-gradient-to-b text-sm from-[#E76824] to-[#4D2B28] w-full px-8 mt-4 rounded-t-xl flex md:gap-6 md:pl-16 py-4 text-justify justify-center items-center  pb-16 font-belanosima">
      <div className="container flex flex-col md:flex-row gap-3 justify-between">
        <div className="md:w-[30%]">
          <p className="text-white font-bold text-lg md:text-3xl">MENGAN PAI</p>
          <p className="text-white text-sm">
            Temukan berbagai kuliner di Bandar Lampung lengkap dengan rating,
            lokasi, jam buka, harga, dan ulasan di Mengan Pai
          </p>
        </div>
        <div className="md:w-[20%]">
          <p className="text-white font-bold text-lg md:text-3xl">Menu</p>
          <ul>
            <li>
              <Link href="/">
                <p className="text-white">Beranda</p>
              </Link>
              <Link href="/rekomendasi">
                <p className="text-white">Rekomendasi</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:w-[20%]">
          <p className="text-white font-bold text-lg md:text-3xl">
            Kontak Kami
          </p>
          <ul className="space-y-2">
            <li className="flex gap-1 text-white">
              <Instagram />
              @mengan.Pai
            </li>
            <li className="flex gap-1 text-white">
              <Youtube />
              Mengan Pai
            </li>
            <li className="flex gap-1 text-white">
              <Phone />
              082212345678
            </li>
            <li className="flex gap-1 text-white">
              <Globe />
              www.menganpai.com
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
