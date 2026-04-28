import Image from "next/image"

const heroes = [
  {
    badge: "It\u2019s Done",
    title: "Phone Notification",
    subtitle: "Glance, confirm, back to life",
    image: "/heroes/agent-1.png",
  },
  {
    badge: "Here\u2019s What\u2019s Next",
    title: "Web Dashboard",
    subtitle: "Review when ready, drill down if curious",
    image: "/heroes/agent-2.png",
  },
  {
    badge: "Just Handle It",
    title: "Voice Conversation",
    subtitle: "Talk, confirm, back to work",
    image: "/heroes/agent-3.png",
  },
]

export function HeroScreens() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      {heroes.map((hero) => (
        <div key={hero.title} className="flex flex-col items-center gap-4">
          <div className="text-center">
            <span className="inline-block rounded-full bg-[#0d47a1]/10 text-[#0d47a1] text-xs font-semibold px-3 py-1 mb-2">
              {hero.badge}
            </span>
            <h2 className="text-lg font-bold text-foreground">{hero.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{hero.subtitle}</p>
          </div>
          <Image
            src={hero.image}
            alt={hero.title}
            width={400}
            height={800}
            className="rounded-2xl shadow-lg"
          />
        </div>
      ))}
    </div>
  )
}
