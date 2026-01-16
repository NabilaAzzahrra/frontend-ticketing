"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

export default function DashboardPage() {
  const options = [
    { value: "1", label: "Nabila Azzahra" },
    { value: "2", label: "Assep Manarul Hidayah" },
    { value: "3", label: "Adi Apriyanto" },
  ];
  const Select = dynamic(() => import("react-select"), {
    ssr: false,
  });
  return (
    <div className="p-6 mx-96">
      <div className="mt-24 py-4 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">Profile</div>
          <div className="font-bold text-2xl">Nabila Azzahra 👋</div>
        </div>
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
        facilis sapiente beatae animi aliquam iusto temporibus odit obcaecati
        cumque similique?
      </div>
      <div className="flex gap-5">
        <div className="bg-white rounded-b-lg shadow mt-4 py-6 px-8 w-1/2">
          <div className="font-semibold text-lg">Data Akun</div>
          <hr />
          <table className="mt-4">
            <tr>
              <td>NIK</td>
              <td className="px-2">:</td>
              <td>3279044906020001</td>
            </tr>
            <tr>
              <td>Nama</td>
              <td className="px-2">:</td>
              <td>Nabila Azzahra</td>
            </tr>
            <tr>
              <td>Email</td>
              <td className="px-2">:</td>
              <td>nabila@gmail.com</td>
            </tr>
            <tr>
              <td>Status</td>
              <td className="px-2">:</td>
              <td>Aktif</td>
            </tr>
          </table>
        </div>
        <div className="bg-white rounded-b-lg shadow mt-4 py-6 px-8 w-1/2">
          <div className="font-semibold text-lg">Data Diri</div>
          <hr />
          <table className="mt-4">
            <tr>
              <td>No Hanphone</td>
              <td className="px-2">:</td>
              <td>6281361280514</td>
            </tr>
            <tr>
              <td>Divisi</td>
              <td className="px-2">:</td>
              <td>IT</td>
            </tr>
            <tr>
              <td>Posisi</td>
              <td className="px-2">:</td>
              <td>Staff IT</td>
            </tr>
            <tr>
              <td>Tanda Tangan</td>
              <td className="px-2">:</td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
      <div className="mt-2 italic text-sm">
        <span className="text-red-500 font-bold">*</span><span className="font-bold">Note:</span> Jika terdapat data yang ingin di update harap <span >klik disini</span>
      </div>
    </div>
  );
}
