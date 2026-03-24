import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";

export function BannerCarousel() {
  const { data: apiBanners = [] } = trpc.banners.list.useQuery();
  const [currentIndex, setCurrentIndex] = useState(0);

  const staticBanners = [
    {
      id: 1,
      title: "Domine a Arte da Dublagem Profissional",
      description: "Aprenda com os melhores profissionais do mercado. Do iniciante ao avançado, em 14 meses de formação completa e online.",
      imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
      linkUrl: "/matricula",
    },
    {
      id: 2,
      title: "Módulos Práticos e Intensivos",
      description: "Técnicas de respiração, sincronização labial e criação de personagens com quem vive a dublagem todos os dias.",
      imageUrl: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=2070&auto=format&fit=crop",
      linkUrl: "#modulos",
    },
    {
      id: 3,
      title: "Certificação Reconhecida",
      description: "Ao final do curso, receba seu certificado e esteja pronto para ingressar nos maiores estúdios do país.",
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
      linkUrl: "/verificar-certificado",
    },
  ] as Array<{ id: number; title: string; description: string; imageUrl: string; linkUrl: string; isPromo?: boolean }>;

  const banners = (apiBanners.length > 0 ? apiBanners : staticBanners) as typeof staticBanners;

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  const currentBanner = banners[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="relative overflow-hidden group w-screen h-[600px] md:h-screen -mx-[calc((100vw-100%)/2)]">
      {/* Banner Image */}
      <div className="absolute inset-0">
        <img
          key={currentBanner.id}
          src={currentBanner.imageUrl}
          alt={currentBanner.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 animate-in fade-in zoom-in-95 duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
      </div>

      {/* Overlay with content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-20">
        <div className="max-w-7xl mx-auto w-full">
          <div key={currentBanner.id} className="max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h3 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {currentBanner.title}
            </h3>
            {currentBanner.description && (
              <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl">
                {currentBanner.description}
              </p>
            )}
            {currentBanner.linkUrl && (
              <a href={currentBanner.linkUrl || '#'}>
                <Button className="px-12 py-8 text-2xl bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-bold transition-all hover:scale-105 shadow-lg shadow-primary/30">
                  Saiba Mais
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <div className="bg-black/50 hover:bg-black/70 p-3 rounded-full text-white">
          <ChevronLeft size={32} />
        </div>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <div className="bg-black/50 hover:bg-black/70 p-3 rounded-full text-white">
          <ChevronRight size={32} />
        </div>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full transition-all ${
              index === currentIndex ? "bg-primary w-8 h-3" : "bg-white/50 w-3 h-3 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
