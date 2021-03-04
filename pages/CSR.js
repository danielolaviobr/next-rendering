import { createClient } from "pexels";
import { useCallback, useEffect, useState } from "react";

const client = createClient(process.env.NEXT_PUBLIC_API_KEY);

const CSR = () => {
  const [photos, setPhotos] = useState([]);

  const loadImages = useCallback(async () => {
    const response = await client.photos.curated({ per_page: 30 });
    const photosUrls = response.photos.map((data) => data.src.medium);
    setPhotos(photosUrls);
  }, [client]);

  useEffect(() => {
    loadImages();
  }, []);

  if (photos.length === 0) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div className="grid grid-flow-col grid-cols-6 grid-rows-5 gap-6 p-4">
      {photos.map((photo) => (
        <img key={photo} src={photo} className="rounded" />
      ))}
    </div>
  );
};

export default CSR;
