import { createClient } from "pexels";
import { useCallback, useEffect, useState } from "react";

const client = createClient(process.env.NEXT_PUBLIC_API_KEY);

const CSR = () => {
	const [photos, setPhotos] = useState([]);
	const [page, setPage] = useState(1);

	const loadImages = useCallback(async () => {
		const response = await client.photos.curated({ per_page: 30, page });
		if (response["error"]) {
			console.error(response["error"]);
			return;
		}
		const photosUrls = response["photos"].map((data) => data.src.medium);
		setPhotos(photosUrls);
	}, [client, page]);

	const handleNextPage = async () => {
		setPhotos([]);
		setPage(page + 1);
		await loadImages();
	};

	useEffect(() => {
		loadImages();
	}, []);

	return photos.length === 0 ? (
		<main className="flex items-center justify-center min-h-screen">
			<h1 className="self-center text-2xl font-bold">Carregando...</h1>
		</main>
	) : (
		<main>
			<button
				className="flex self-center flex-1 px-6 py-1 mx-auto my-8 mb-4 text-lg font-bold text-white bg-blue-500 rounded shadow hover:bg-blue-600"
				onClick={handleNextPage}>
				Próxima pagina
			</button>
			<section className="grid grid-flow-col grid-cols-6 grid-rows-5 gap-6 p-4">
				{photos.map((photo) => (
					<img key={photo} src={photo} className="rounded" />
				))}
			</section>
		</main>
	);
};

export default CSR;
