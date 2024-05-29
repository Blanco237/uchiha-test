"use client";
import { useDeferredValue, useEffect, useState } from "react";
import { AnimeType, animeList } from "@/animeList";
import { AnimeCreateForm } from "@/components/AnimeCreateForm";
import { apiUrl } from "@/constants";
import { Box, Button, Input, Stack } from "@mui/material";
import { getData } from "@/services/animeApi";
import styles from "./animes.module.css";
import AnimeCard from "@/components/AnimeCard";
import { useRouter } from "next/navigation";

export default function Page() {
  const [animes, setAnimes] = useState<Array<AnimeType>>([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<typeof animes>([]);
  const router = useRouter();
  const defferedSearch = useDeferredValue(search);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const data = await getData();
        setAnimes(data);
      } catch {}
    };
    fetchAnimes();
  }, []);

  useEffect(() => {
    if (defferedSearch) {
      const word = defferedSearch.toLowerCase();
      const filteredAnimes = animes.filter((anime) => {
        if (anime.name.toLowerCase().includes(word)) {
          return true;
        }
        if (anime.status.toLowerCase().includes(word)) {
          return true;
        }
        if (anime.type.toLowerCase().includes(word)) {
          return true;
        }

        return false;
      });
      setFiltered(filteredAnimes);
    } else {
      setFiltered(animes);
    }
  }, [animes, defferedSearch]);

  return (
    <div className={styles.body}>
      <section className={styles.actions}>
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          type="button"
          variant="contained"
          onClick={() => router.push("/animes/add")}
        >
          Add
        </Button>
      </section>
      <section className={styles.grid}>
        {filtered.length > 0 ? (
          filtered.map((anime, index) => {
            return <AnimeCard {...anime} key={`anime_${index}`} />;
          })
        ) : (
          <div> No Data</div>
        )}
      </section>
    </div>
  );
}
