import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { authFetch } from "@studio/lib/auth-fetch";
import { z } from "zod";

export function useStudios() {
  return useQuery({
    queryKey: [api.studios.list.path],
    queryFn: async () => {
      const data = await authFetch(api.studios.list.path);
      return api.studios.list.responses[200].parse(data);
    },
  });
}

export function useStudioAutoEntry() {
  return useQuery({
    queryKey: [api.studios.autoEntry.path],
    retry: false,
    queryFn: async () => {
      const res = await fetch(api.studios.autoEntry.path, { credentials: "include" });
      if (res.status === 404) {
        return { mode: "select", count: 0 } as const;
      }
      if (res.status === 401) {
        throw new Error("Unauthorized");
      }
      if (!res.ok) {
        let message = res.statusText || "Erro ao validar auto-redirecionamento";
        try {
          const body = await res.json();
          if (body?.message) message = body.message;
        } catch {}
        throw new Error(message);
      }
      const body = await res.json();
      return api.studios.autoEntry.responses[200].parse(body);
    },
  });
}

// CORREÇÃO: Melhorado para retornar isLoading e error
export function useStudio(id: string) {
  const { data: studios, isLoading } = useStudios();
  const studio = studios?.find(s => s.id === id);
  
  return {
    studio,
    isLoading,
    error: !studio && !isLoading ? new Error("Studio not found") : null
  };
}

export function useCreateStudio() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: z.infer<typeof api.studios.create.input>) => {
      const data = await authFetch(api.studios.create.path, {
        method: api.studios.create.method,
        body: JSON.stringify(input),
      });
      return api.studios.create.responses[201].parse(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.studios.list.path] });
    },
  });
}
