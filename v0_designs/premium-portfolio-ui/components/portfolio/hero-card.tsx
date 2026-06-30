import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

export function HeroCard() {
  return (
    <section className="group relative flex flex-col justify-between gap-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md md:col-span-2 md:row-span-2 md:p-10">
      <div className="flex items-start justify-between gap-6">
        <div className="relative">
          <div className="relative h-20 w-20 overflow-hidden rounded-full ring-1 ring-gray-100 md:h-24 md:w-24">
            <Image
              src="/avatar.png"
              alt="Portrait of Alex Rivera"
              fill
              sizes="96px"
              className="object-cover"
              priority
            />
          </div>
          <span className="absolute -right-1 bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
            </span>
          </span>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Available for work
        </span>
      </div>

      <div className="space-y-4">
        <h1 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">
          {"Hi, I'm Alex Rivera."}
        </h1>
        <p className="max-w-md text-pretty text-lg leading-relaxed text-gray-500">
          A product designer & engineer crafting clean, human-centered digital
          products that feel effortless to use.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          Get in touch
          <ArrowUpRight className="h-4 w-4" />
        </a>
        <a
          href="#work"
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          View work
        </a>
      </div>
    </section>
  )
}
