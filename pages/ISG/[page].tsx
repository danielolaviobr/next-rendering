import Link from "next/link";
import { createClient } from "pexels";
import { Props } from "../../types/props";

const client = createClient(process.env.NEXT_PUBLIC_API_KEY);

export async function getStaticPaths() {
	return {
		paths: [
			{ params: { page: "1" } },
			{ params: { page: "2" } },
			{ params: { page: "3" } },
		],
		fallback: "blocking",
	};
}

export async function getStaticProps(context) {
	const { page } = context.params;
	const response = await client.photos.curated({
		per_page: 30,
		page,
	});
	if (response["error"]) {
		console.error(response["error"]);
		return { props: { photos: [] } };
	}
	const photos = response["photos"].map((data) => data.src.medium);

	return {
		props: {
			photos,
			page,
		},
	};
}

const SSG = ({ photos, page }: Props) => {
	return photos.length === 0 ? (
		<main className="flex items-center justify-center min-h-screen">
			<h1 className="self-center text-2xl font-bold">Carregando...</h1>
		</main>
	) : (
		<main>
			<Link href={`/ISG/${Number(page) + 1}`}>
				<a className="flex items-center justify-center">
					<div className="px-6 py-1 my-8 mb-4 text-lg font-bold text-white bg-blue-500 rounded shadow hover:bg-blue-600">
						Próxima pagina
					</div>
				</a>
			</Link>
			<section className="grid grid-flow-col grid-cols-6 grid-rows-5 gap-6 p-4">
				{photos.map((photo) => (
					<img key={photo} src={photo} className="rounded" />
				))}
			</section>
		</main>
	);
};

export default SSG;
