import { useState, memo } from "react";
import {
  useProductions, useCreateProduction, useUpdateProduction
} from "@studio/hooks/use-productions";
import { useCharacters, useCreateCharacter } from "@studio/hooks/use-characters";
import { useQuery } from "@tanstack/react-query";
import { authFetch } from "@studio/lib/auth-fetch";
import { Button } from "@studio/components/ui/button";
import { Input } from "@studio/components/ui/input";
import { Textarea } from "@studio/components/ui/textarea";
import {
  Plus, Film, Search, MoreVertical, Upload, UserPlus,
  Settings2, FileJson, Download, Loader2, Trash2, Save,
  Clock, MessageSquare, ClipboardPaste
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@studio/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@studio/components/ui/dropdown-menu";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@studio/components/ui/select";
import { useToast } from "@studio/hooks/use-toast";
import {
  PageSection, PageHeader, EmptyState, StatusBadge, FieldGroup, GridSkeleton
} from "@studio/components/ui/design-system";
import { useStudioRole } from "@studio/hooks/use-studio-role";
import { pt } from "@studio/lib/i18n";
import { parseUniversalTimecodeToSeconds } from "@studio/lib/timecode";

interface ScriptLine {
  character: string;
  start: string;
  tempo?: string;
  tempoEmSegundos?: number;
  text: string;
  notes?: string;
}

const Productions = memo(function Productions({ studioId }: { studioId: string }) {
  // CORREÇÃO 1: Adicionar isLoading
  const { data: productions, isLoading } = useProductions(studioId);
  const createProd = useCreateProduction(studioId);
  const { toast } = useToast();
  const { canCreateProductions } = useStudioRole(studioId);

  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsOpen] = useState(false);
  const [selectedProdId, setSelectedProdId] = useState<string | null>(null);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", videoUrl: "" });

  // CORREÇÃO 2: Usar nullish coalescing
  const filtered = (productions ?? []).filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async () => {
    if (!formData.name) return;
    await createProd.mutateAsync({ ...formData, status: "planned", scriptJson: undefined });
    setIsOpen(false);
    setFormData({ name: "", description: "", videoUrl: "" });
    toast({ title: "Producao criada" });
  };

  return (
    <PageSection>
      <PageHeader
        title={pt.productions.title}
        subtitle="Gerencie seus projetos de dublagem"
        action={canCreateProductions ? (
          <Dialog open={isCreateOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1.5 press-effect">
                <Plus className="w-3.5 h-3.5" />
                {pt.productions.newProduction}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Producao</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <FieldGroup label={pt.productions.name}>
                  <Input
                    placeholder="ex: Episodio 1 — Dragao"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    data-testid="input-production-name"
                  />
                </FieldGroup>
                <FieldGroup label={pt.productions.description}>
                  <Textarea
                    placeholder="Detalhes da producao..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="resize-none"
                    rows={3}
                    data-testid="input-production-description"
                  />
                </FieldGroup>
                <FieldGroup label={pt.productions.videoUrl}>
                  <Input
                    placeholder="https://..."
                    value={formData.videoUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                    data-testid="input-production-url"
                  />
                </FieldGroup>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleCreate}
                  disabled={!formData.name || createProd.isPending}
                  className="press-effect"
                  data-testid="button-create-production"
                >
                  {createProd.isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                  {createProd.isPending ? pt.productions.creating : pt.productions.create}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : undefined}
      />

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          className="pl-10 h-10"
          placeholder={pt.productions.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-testid="input-search-productions"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <GridSkeleton count={6} />
        ) : filtered?.map(prod => (
          <div
            key={prod.id}
            className="vhub-card-clickable p-5 group"
            data-testid={`card-production-${prod.id}`}
            role="button"
            tabIndex={0}
            onClick={() => { setSelectedProdId(prod.id); setIsManageOpen(true); }}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedProdId(prod.id); setIsManageOpen(true); } }}
          >
            <div className="relative mb-4 h-32 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-200">
              {prod.videoUrl ? (
                <img src={prod.videoUrl} alt={prod.name} className="w-full h-full object-cover" />
              ) : (
                <Film className="w-8 h-8 text-muted-foreground/30" />
              )}
            </div>
            <h3 className="font-semibold text-foreground truncate">{prod.name}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{prod.description || "Sem descricao"}</p>
          </div>
        )) : (
          <EmptyState
            icon={Film}
            title="Nenhuma producao"
            description="Crie uma producao para comecara gravar."
            action={canCreateProductions ? (
              <Dialog open={isCreateOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-1.5">
                    <Plus className="w-3.5 h-3.5" />
                    {pt.productions.newProduction}
                  </Button>
                </DialogTrigger>
              </Dialog>
            ) : undefined}
          />
        )}
      </div>
    </PageSection>
  );
});

export default Productions;
