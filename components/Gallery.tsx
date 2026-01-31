"use client"

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Gallery() {
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/photos")
      .then(res => res.json())
      .then(data => setPhotos(data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {photos.map((url) => (
        <Image width={200} height={200} key={url} src={url} alt="Photo" className="w-full h-auto object-cover" />
      ))}
    </div>
  );
}