import Link from "next/link";
import { useRouter } from "next/router";
import { createClient } from "pexels";
import { useCallback, useEffect, useState } from "react";

const client = createClient(process.env.NEXT_PUBLIC_API_KEY);

const CSR = () => {
	const [photos, setPhotos] = useState([]);
	const [page, setPage] = useState<number>(1);

	const loadImages = async (pageToLoad: number) => {
		const response = await client.photos.curated({
			per_page: 30,
			page: pageToLoad,
		});
		if (response["error"]) {
			console.error(response["error"]);
			return;
		}
		const photosUrls = response["photos"].map((data) => data.src.medium);
		setPhotos(photosUrls);
	};

	const handleNextPage = async () => {
		setPhotos([]);
		const nextPage = page + 1;
		setPage(nextPage);
		await loadImages(nextPage);
	};

	useEffect(() => {
		loadImages(page);
	}, []);

	return photos.length === 0 ? (
		<main className="flex items-center justify-center min-h-screen">
			<h1 className="self-center text-2xl font-bold">Carregando...</h1>
		</main>
	) : (
		<main>
			<section className="flex items-center justify-center flex-1 w-screen">
				<button
					className="flex self-center px-6 py-1 my-8 mb-4 mr-6 text-lg font-bold text-white bg-blue-500 rounded shadow hover:bg-blue-600"
					onClick={handleNextPage}>
					Próxima pagina
				</button>
				<Link href="/">
					<a className="flex self-center px-6 py-1 my-8 mb-4 text-lg font-bold text-white bg-blue-500 rounded shadow hover:bg-blue-600">
						Home
					</a>
				</Link>
			</section>
			<section className="grid grid-flow-col grid-cols-6 grid-rows-5 gap-6 p-4">
				{photos.map((photo) => (
					<img key={photo} src={photo} className="rounded" />
				))}
			</section>
		</main>
	);
};

export default CSR;
