import { typingRoles } from "@/lib/data";

/**
 * Kinetic type strip in the dot-matrix face — one continuous loop of
 * the role list. Decorative: screen readers get a static sentence.
 */
export function Marquee() {
  const line = typingRoles.map((r) => r.toUpperCase());

  return (
    <div className="marquee-pause overflow-hidden border-t border-edge py-5">
      <p className="sr-only">{typingRoles.join(", ")}</p>
      <div className="marquee-mask" aria-hidden>
        <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
          {/* Two copies back-to-back so the -50% loop is seamless */}
          {[0, 1].map((copy) => (
            <span key={copy} className="flex items-center gap-8">
              {line.map((role) => (
                <span
                  key={`${copy}-${role}`}
                  className="flex items-center gap-8 font-display text-2xl text-ink-muted sm:text-3xl"
                >
                  {role}
                  <span className="h-2 w-2 bg-accent" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
