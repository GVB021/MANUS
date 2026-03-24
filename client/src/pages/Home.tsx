import { BannerCarousel } from "@/components/BannerCarousel";
import {
  Award,
  BookOpen,
  ChevronRight,
  Clock,
  Mic,
  Play,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "wouter";

const MODULES = [
  {
    num: "01",
    slug: "iniciante",
    title: "MÓDULO INICIANTE",
    teacher: "Prof. Vitor Paranhos",
    duration: "4 meses",
    desc: "Fundamentos da voz, técnicas de respiração, leitura de roteiro e primeiros passos na dublagem profissional.",
    icon: Mic,
  },
  {
    num: "02",
    slug: "intermediario",
    title: "MÓDULO INTERMEDIÁRIO",
    teacher: "Prof. Daniel Ávila",
    duration: "4 meses",
    desc: "Sincronização labial, criação de personagens, emoção na voz e técnicas avançadas de interpretação.",
    icon: Play,
  },
  {
    num: "03",
    slug: "avancado",
    title: "MÓDULO AVANÇADO",
    teacher: "Prof. Ettore Zuim",
    duration: "6 meses",
    desc: "Produção profissional, gravação em estúdio, mercado de trabalho e construção de portfólio.",
    icon: Award,
  },
];

const TEACHERS = [
  {
    name: "Vitor Paranhos",
    role: "Módulo Iniciante",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop",
    specialties: ["Técnica Vocal", "Respiração", "Roteiro"],
  },
  {
    name: "Daniel Ávila",
    role: "Módulo Intermediário",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop",
    specialties: ["Sincronização", "Personagens", "Emoção"],
  },
  {
    name: "Ettore Zuim",
    role: "Módulo Avançado",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500&auto=format&fit=crop",
    specialties: ["Estúdio", "Mercado", "Portfólio"],
  },
];

const LEARNINGS = [
  "Técnicas profissionais de voz e respiração",
  "Sincronização labial precisa",
  "Criação e interpretação de personagens",
  "Gravação em estúdio profissional",
  "Leitura e interpretação de roteiros",
  "Construção de portfólio profissional",
  "Mercado de trabalho em dublagem",
  "Técnicas de emoção e expressividade",
  "Produção de áudio para animações",
  "Técnicas de narração e locução",
  "Gerenciamento de carreira artística",
  "Networking no setor audiovisual",
];

export default function Home() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Mic className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <span className="text-foreground">Escola</span>{" "}
              <span className="text-primary">Dublagem</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#modulos" className="text-muted-foreground hover:text-primary transition-colors">Módulos</a>
            <a href="#professores" className="text-muted-foreground hover:text-primary transition-colors">Professores</a>
            <a href="#aprendizado" className="text-muted-foreground hover:text-primary transition-colors">O que você aprende</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="http://localhost:3001" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Login
            </a>
            <a href="http://localhost:3001" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
              Cadastro
            </a>
          </div>
        </div>
      </header>

      {/* Banner Carousel (Hero) */}
      <section className="pt-16">
        <BannerCarousel />
      </section>

      {/* Info Bar */}
      <div className="bg-primary/10 border-y border-primary/20 py-4">
        <div className="container flex flex-wrap justify-center gap-8">
          {[
            { icon: Clock, text: "14 meses de duração" },
            { icon: Users, text: "Turmas de 4 a 8 alunos" },
            { icon: Star, text: "Professores profissionais" },
            { icon: Award, text: "Certificado ao concluir" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="w-4 h-4 text-primary" />
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Modules - Banner Style */}
      <section id="modulos" className="py-0">
        <div className="space-y-0">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            const moduleImages = [
              "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
            ];
            const isEven = i % 2 === 0;
            return (
              <div
                key={mod.slug}
                className="relative w-screen h-[500px] md:h-[600px] overflow-hidden group -mx-[calc((100vw-100%)/2)]"
              >
                {/* Banner Image */}
                <img
                  src={moduleImages[i]}
                  alt={mod.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: i === 2 ? 'right center' : 'center center' }}
                />
                {/* Filtro fumê */}
                <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                <div className="absolute inset-0" style={{ background: 'rgba(20, 20, 30, 0.55)', backdropFilter: 'contrast(0.85) brightness(0.75) saturate(0.7)' }} />
                <div className={`absolute inset-0 ${
                  i === 1
                    ? 'bg-gradient-to-l from-black/90 via-black/60 to-black/30'
                    : 'bg-gradient-to-r from-black/90 via-black/60 to-black/30'
                }`} />

                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-20">
                    <div className={`max-w-2xl ${
                      i === 1 ? 'ml-auto text-right' : ''
                    }`}>
                      <div className={`flex items-center gap-4 mb-6 ${
                        i === 1 ? 'flex-row-reverse justify-start' : ''
                      }`}>
                        <span className="text-7xl md:text-8xl font-extrabold text-primary/30" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          {mod.num}
                        </span>
                        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {mod.title}
                      </h3>
                      <p className="text-primary text-lg font-semibold mb-2">{mod.teacher}</p>
                      <p className={`text-white/80 text-lg mb-6 flex items-center gap-2 ${
                        i === 1 ? 'justify-end' : ''
                      }`}>
                        {i === 1 && mod.duration}
                        <Clock className="w-5 h-5" />
                        {i !== 1 && mod.duration}
                      </p>
                      <p className="text-white/90 text-xl leading-relaxed mb-8 max-w-xl">
                        {mod.desc}
                      </p>
                      <a href="http://localhost:3001" className={i === 1 ? 'flex justify-end' : 'block'}>
                        <button className="px-10 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-lg font-bold transition-all hover:scale-105 shadow-lg shadow-primary/30">
                          Matricular neste módulo
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Teachers */}
      <section id="professores" className="py-20 bg-card/30">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Corpo Docente</p>
            <h2 className="text-4xl font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              NOSSOS PROFESSORES
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TEACHERS.map((teacher) => (
              <div key={teacher.name} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all group">
                <div className="relative">
                  <img
                    src={teacher.photo}
                    alt={teacher.name}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {teacher.name}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-3">{teacher.role}</p>
                  <div className="flex flex-wrap gap-2">
                    {teacher.specialties.map((spec) => (
                      <span key={spec} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section id="aprendizado" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Desenvolvimento</p>
            <h2 className="text-4xl font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              O QUE VOCÊ APRENDE
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEARNINGS.map((learning) => (
              <div key={learning} className="flex items-start gap-3 p-4 bg-card/50 rounded-lg border border-border hover:border-primary/50 transition-all">
                <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground">{learning}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10 border-y border-primary/20">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Pronto para começar sua jornada?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Inscreva-se agora e junte-se a uma comunidade de profissionais da dublagem.
          </p>
          <a href="http://localhost:3001">
            <button className="px-12 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-lg font-bold transition-all hover:scale-105 shadow-lg shadow-primary/30">
              Matricule-se Agora
            </button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Mic className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Escola Dublagem
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Formação profissional em dublagem online.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navegação</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#modulos" className="hover:text-primary transition-colors">Módulos</a></li>
                <li><a href="#professores" className="hover:text-primary transition-colors">Professores</a></li>
                <li><a href="#aprendizado" className="hover:text-primary transition-colors">Aprendizado</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Termos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Termos de Uso</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Escola de Dublagem. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
