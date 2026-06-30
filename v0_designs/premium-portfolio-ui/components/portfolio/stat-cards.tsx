import { ArrowUpRight, Mail } from "lucide-react"

export function StatCard() {
  return (
    <section className="flex flex-col justify-between gap-6 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <h2 className="text-sm font-medium uppercase tracking-wide text-gray-400">
        Impact
      </h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-4xl font-semibold tracking-tight text-gray-900">
            9+
          </p>
          <p className="mt-1 text-sm text-gray-500">Years of craft</p>
        </div>
        <div>
          <p className="text-4xl font-semibold tracking-tight text-gray-900">
            40M+
          </p>
          <p className="mt-1 text-sm text-gray-500">Users reached</p>
        </div>
        <div>
          <p className="text-4xl font-semibold tracking-tight text-gray-900">
            120
          </p>
          <p className="mt-1 text-sm text-gray-500">Projects shipped</p>
        </div>
        <div>
          <p className="text-4xl font-semibold tracking-tight text-gray-900">
            12
          </p>
          <p className="mt-1 text-sm text-gray-500">Design awards</p>
        </div>
      </div>
    </section>
  )
}

export function ContactCard() {
  return (
    <section
      id="contact"
      className="group flex flex-col justify-between gap-6 rounded-3xl border border-gray-100 bg-gray-900 p-8 text-white shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
        <Mail className="h-5 w-5" />
      </span>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-balance">
          {"Let's build something great."}
        </h2>
        <p className="text-sm leading-relaxed text-gray-400">
          Open to select freelance and full-time opportunities.
        </p>
      </div>
      <a
        href="mailto:hello@alexrivera.design"
        className="inline-flex items-center gap-2 text-sm font-medium text-white transition-opacity hover:opacity-80"
      >
        hello@alexrivera.design
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </section>
  )
}
