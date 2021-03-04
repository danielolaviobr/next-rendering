import { createClient } from "pexels";

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
  const response = await client.photos.curated({ per_page: 30, page });
  const photos = response.photos.map((data) => data.src.medium);

  return {
    props: {
      photos,
    },
  };
}

const SSG = (props) => {
  if (props.photos.length === 0) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div className="grid grid-flow-col grid-cols-6 grid-rows-5 gap-6 p-4">
      {props.photos.map((photo) => (
        <img key={photo} src={photo} className="rounded" />
      ))}
    </div>
  );
};

export default SSG;
