import { useState, useEffect } from "react";
import { useCallback } from "react";

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
}

interface UseGithubReposReturn {
  repos: GithubRepo[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useGithubRepos = (username: string): UseGithubReposReturn => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRepos = useCallback(async () => {
    if (!username) {
      setError("Username não fornecido");
      setRepos([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      );

      if (!response.ok) {
        throw new Error(`Erro ao buscar repositórios: ${response.status}`);
      }

      const data: GithubRepo[] = await response.json();

      // Filtrar apenas repos públicos e ordenar por data de atualização
      const filteredRepos = data
        .filter((repo) => !repo.name.includes("fork"))
        .sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
        );

      setRepos(filteredRepos);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      console.error("Erro ao buscar repositórios do GitHub:", err);
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return {
    repos,
    isLoading,
    error,
    refetch: fetchRepos,
  };
};
