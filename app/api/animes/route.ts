import { AnimeType, animeList } from "@/animeList";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("nothing");
  console.log(id);
  const animes = animeList;
  return Response.json(animes);
}

export async function POST(request: Request) {
  const animeBody: AnimeType = await request.json();

  animeList.push(animeBody);

  return Response.json({
    status: 200,
    message: "anime added succesfully",
  });
}
