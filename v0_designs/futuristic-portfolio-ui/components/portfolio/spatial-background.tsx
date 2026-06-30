export function SpatialBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* base obsidian wash */}
      <div className="absolute inset-0 bg-[radial-gradient(135%_135%_at_50%_-20%,oklch(0.34_0.13_300)_0%,oklch(0.22_0.08_288)_38%,oklch(0.13_0.04_282)_78%,oklch(0.1_0.02_280)_100%)]" />

      {/* fluid neon mesh blobs */}
      <div className="absolute -left-[12%] top-[-18%] h-[60vw] w-[60vw] animate-mesh rounded-full bg-[radial-gradient(circle,oklch(0.6_0.27_305_/_0.85),transparent_62%)] blur-[110px]" />
      <div className="absolute right-[-14%] top-[4%] h-[52vw] w-[52vw] animate-float-slow rounded-full bg-[radial-gradient(circle,oklch(0.55_0.24_275_/_0.7),transparent_62%)] blur-[110px]" />
      <div className="absolute bottom-[-22%] left-[14%] h-[55vw] w-[55vw] animate-mesh rounded-full bg-[radial-gradient(circle,oklch(0.6_0.18_245_/_0.6),transparent_62%)] blur-[110px] [animation-delay:-8s]" />
      <div className="absolute bottom-[2%] right-[4%] h-[40vw] w-[40vw] animate-breathe rounded-full bg-[radial-gradient(circle,oklch(0.72_0.2_312_/_0.6),transparent_62%)] blur-[100px]" />

      {/* fine grid */}
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(oklch(1_0_0)_1px,transparent_1px),linear-gradient(90deg,oklch(1_0_0)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(110%_110%_at_50%_0%,black_30%,transparent_75%)]" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_130%_at_50%_45%,transparent_50%,oklch(0.07_0.02_280_/_0.8)_100%)]" />
    </div>
  )
}
