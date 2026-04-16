import Link from "next/link";
import { ContentRails, type RailSection } from "@/components/features/home/content-rails";
import { HeroCarousel } from "@/components/features/home/hero-carousel";

const navigationItems = ["Home", "Movies", "TV Shows", "My List"];

const heroItems = [
  {
    eyebrow: "Featured Tonight",
    title: "The Signal Never Dies",
    description:
      "A disgraced systems engineer uncovers a hidden pirate stream broadcasting impossible footage from across the city. One night turns into an obsession.",
    meta: ["2026", "2h 07m", "4K Atmos", "GregFlix Original"],
    nextTitle: "Midnight Relay",
    nextDescription:
      "A courier outruns a citywide shutdown while delivering one final encrypted tape.",
    setupTitle: "Phone Remote Pairing",
    setupDescription:
      "Reserved space for the second-screen control flow you plan to add later.",
    background:
      "bg-[radial-gradient(circle_at_top_right,rgba(229,9,20,0.28),transparent_24%),linear-gradient(135deg,rgba(28,28,28,0.95),rgba(8,8,8,0.92))]",
  },
  {
    eyebrow: "Now Streaming",
    title: "Ghosts Of Meridian",
    description:
      "A salvage crew boards a luxury orbital liner that has been dark for decades and finds the passengers still waiting in the ballroom.",
    meta: ["2025", "1h 54m", "Dolby Vision", "Sci-Fi Horror"],
    nextTitle: "Static Bloom",
    nextDescription:
      "A botanist captures electrical storms inside a greenhouse built over a data center.",
    setupTitle: "Companion Device",
    setupDescription:
      "Future remote controls and search can dock into this panel without changing the home layout.",
    background:
      "bg-[radial-gradient(circle_at_top_right,rgba(94,25,76,0.3),transparent_25%),linear-gradient(135deg,rgba(34,16,36,0.96),rgba(7,7,12,0.94))]",
  },
  {
    eyebrow: "Premiere Event",
    title: "Iron Coast",
    description:
      "A storm-battered port city turns private when a retired captain takes one last smuggling job and drags his family into a shipping war.",
    meta: ["2026", "2h 16m", "4K", "Crime Drama"],
    nextTitle: "Dead Water Ledger",
    nextDescription:
      "Customs agents follow a paper trail that points back to their own command office.",
    setupTitle: "Kiosk Health",
    setupDescription:
      "This support card can later surface connection status, storage space, or playback diagnostics for the Pi.",
    background:
      "bg-[radial-gradient(circle_at_top_right,rgba(173,74,18,0.3),transparent_26%),linear-gradient(135deg,rgba(36,23,15,0.96),rgba(7,7,7,0.94))]",
  },
  {
    eyebrow: "Binge Pick",
    title: "Null District",
    description:
      "An underground courier moves through a city where every camera feed has been replaced by synthetic memories generated in real time.",
    meta: ["Season 1", "8 Episodes", "HDR", "Cyber Thriller"],
    nextTitle: "Blue Archive",
    nextDescription:
      "A memory broker discovers one client has been editing the city itself.",
    setupTitle: "Remote Search",
    setupDescription:
      "This area is a placeholder for synchronized phone search results and quick action prompts.",
    background:
      "bg-[radial-gradient(circle_at_top_right,rgba(31,78,216,0.28),transparent_24%),linear-gradient(135deg,rgba(11,20,41,0.96),rgba(8,8,12,0.94))]",
  },
  {
    eyebrow: "Just Added",
    title: "Velvet Static",
    description:
      "A late-night radio host starts receiving calls from listeners describing tomorrow's disasters with impossible precision.",
    meta: ["2024", "1h 47m", "5.1", "Mystery"],
    nextTitle: "Channel Seven",
    nextDescription:
      "A pirate DJ hijacks the emergency broadcast system to stop a citywide blackout.",
    setupTitle: "Session Pairing",
    setupDescription:
      "The future phone binding flow can live here as a QR code or short session code without redesigning the hero.",
    background:
      "bg-[radial-gradient(circle_at_top_right,rgba(186,30,58,0.3),transparent_24%),linear-gradient(135deg,rgba(40,10,16,0.96),rgba(8,8,8,0.94))]",
  },
];

const trendingTitles = [
  {
    title: "The Last Broadcast",
    subtitle: "Sci-Fi Thriller",
    accent: "from-[#3b0f14] via-[#66131d] to-[#101010]",
    year: "2026",
    runtime: "2h 03m",
    rating: "TV-MA",
    detail:
      "A rogue broadcast engineer discovers a dead public access channel is transmitting crimes before they happen, and every episode points to someone inside city hall.",
    tags: ["Conspiracy", "Noir", "4K"],
  },
  {
    title: "Cold Circuit",
    subtitle: "Cyberpunk Mystery",
    accent: "from-[#0f1f3b] via-[#173566] to-[#101010]",
    year: "2025",
    runtime: "1h 49m",
    rating: "PG-13",
    detail:
      "A black-market robotics tuner traces a string of disappearances to an abandoned climate lab buried beneath the transit grid.",
    tags: ["Future Tech", "Mystery", "Atmos"],
  },
  {
    title: "Black Harbor",
    subtitle: "Crime Drama",
    accent: "from-[#22150f] via-[#5b3218] to-[#101010]",
    year: "2024",
    runtime: "2h 11m",
    rating: "TV-MA",
    detail:
      "At the edge of a freezing port, a union fixer and a customs officer build a fragile alliance against a shipping syndicate.",
    tags: ["Crime", "Harbor City", "New"],
  },
  {
    title: "Neon Run",
    subtitle: "Action",
    accent: "from-[#2a1024] via-[#5e194c] to-[#101010]",
    year: "2026",
    runtime: "1h 56m",
    rating: "R",
    detail:
      "A courier carrying a stolen memory core has one night to cross a locked-down megacity before sunrise erases the evidence.",
    tags: ["Action", "Chase", "HDR"],
  },
];

const recentTitles = [
  {
    title: "Signal Lost",
    subtitle: "New Episode",
    accent: "from-[#11251d] via-[#1d5c4c] to-[#101010]",
    year: "Season 2",
    runtime: "48m",
    rating: "TV-14",
    detail:
      "The crew follows a distress ping into a relay field where every transmission is delayed by exactly twelve hours.",
    tags: ["Series", "Episode 7", "Suspense"],
  },
  {
    title: "North Line",
    subtitle: "Added Yesterday",
    accent: "from-[#251811] via-[#714026] to-[#101010]",
    year: "2026",
    runtime: "1h 42m",
    rating: "PG-13",
    detail:
      "A rail dispatcher uncovers a sealed route that still appears on internal maps despite being shut down after a mass evacuation.",
    tags: ["Thriller", "Transit", "Fresh"],
  },
  {
    title: "Zero Hour",
    subtitle: "New Season",
    accent: "from-[#161627] via-[#303b8a] to-[#101010]",
    year: "Season 3",
    runtime: "10 Episodes",
    rating: "TV-MA",
    detail:
      "With the city grid unstable, a crisis manager discovers the blackouts are timed to cover coordinated data theft across every district.",
    tags: ["Series", "Politics", "4K"],
  },
  {
    title: "Afterglow",
    subtitle: "Just Added",
    accent: "from-[#2b1010] via-[#8a2b2b] to-[#101010]",
    year: "2025",
    runtime: "1h 38m",
    rating: "PG",
    detail:
      "A washed-up stage illusionist returns to the spotlight after learning her final act may have exposed an actual disappearance.",
    tags: ["Drama", "Stage", "New"],
  },
];

const railSections: RailSection[] = [
  {
    title: "Trending Now",
    items: trendingTitles,
    large: true,
  },
  {
    title: "Recently Added",
    items: recentTitles,
  },
];

export function HomeScreen() {
  return (
    <main className="min-h-screen text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-[1920px] flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-5 backdrop-blur-xl sm:px-8 lg:px-12">
          <div className="flex items-center gap-8 lg:gap-12">
            <Link
              href="/"
              className="font-display text-4xl uppercase tracking-[0.18em] text-brand sm:text-5xl"
              aria-label="GregFlix home"
            >
              GregFlix
            </Link>
            <nav aria-label="Primary">
              <ul className="flex items-center gap-4 text-sm font-medium text-zinc-300 sm:gap-6 sm:text-base lg:gap-8 lg:text-lg">
                {navigationItems.map((item) => (
                  <li key={item}>
                    <Link
                      href="/"
                      className="transition-colors duration-200 hover:text-white"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="hidden text-sm uppercase tracking-[0.2em] text-zinc-500 lg:block">
            Kiosk Preview
          </div>
        </header>

        <HeroCarousel items={heroItems} />

        <ContentRails sections={railSections} />
      </div>
    </main>
  );
}
