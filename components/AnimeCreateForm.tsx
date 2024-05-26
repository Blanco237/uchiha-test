"use client";
import { AnimeType } from "@/animeList";
import { apiUrl } from "@/constants";
import { Button } from "@mui/material";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

export function AnimeCreateForm() {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        console.log("newList");
      }}
    >
      click
    </Button>
  );
}
