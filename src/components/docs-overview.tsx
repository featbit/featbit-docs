import Link from "next/link";
import { ArrowRight, ExternalLink, Flag } from "lucide-react";

const paths = [
  {
    title: "Build & release",
    links: [
      {
        title: "Getting Started",
        description: "Create flags and connect your first SDK.",
        href: "/getting-started/create-two-feature-flags",
      },
      {
        title: "Feature Flags",
        description: "Target users, manage variations, and review changes.",
        href: "/feature-flags/the-flag-list",
      },
      {
        title: "SDK",
        description: "Evaluate flags from your application.",
        href: "/sdk/overview",
      },
    ],
  },
  {
    title: "Deploy & operate",
    links: [
      {
        title: "Installation",
        description:
          "Run FeatBit on Docker, Kubernetes, or your infrastructure.",
        href: "/installation/docker-compose",
      },
      {
        title: "Integrations",
        description: "Connect FeatBit to the tools around your workflow.",
        href: "/integrations/observability/opentelemetry",
      },
      {
        title: "IAM & Licenses",
        description: "Manage access, policies, and licensed capabilities.",
        href: "/iam/overview",
      },
    ],
  },
] as const;

const interfaces = [
  {
    label: "Dashboard",
    title: "Manage feature flags",
    description:
      "Configure targeting, variations, segments, and release workflows.",
    linkLabel: "Browse guides",
    href: "/feature-flags/the-flag-list",
  },
  {
    label: "SDKs",
    title: "Evaluate in applications",
    description:
      "Retrieve flag values and deliver the right experience to each user.",
    linkLabel: "View SDK docs",
    href: "/sdk/overview",
  },
  {
    label: "APIs",
    title: "Automate operations",
    description:
      "Integrate with FeatBit REST APIs and flag evaluation endpoints.",
    linkLabel: "Browse API Reference",
    href: "/api-reference",
    secondaryLink: {
      label: "Read API Guides",
      href: "/api-guides/overview",
    },
  },
] as const;

const focusClasses =
  "outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-fd-primary focus-visible:ring-offset-2 focus-visible:ring-offset-fd-background";

export function DocsOverview() {
  return (
    <div className="not-prose">
      <section aria-labelledby="docs-quick-start">
        <Link
          className={`group grid gap-4 rounded-lg border border-fd-border p-5 text-fd-foreground transition-colors hover:bg-fd-muted/50 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-6 ${focusClasses}`}
          href="/getting-started/create-two-feature-flags"
        >
          <Flag aria-hidden="true" className="size-6 text-fd-primary" />
          <div>
            <p className="text-xs font-medium tracking-wide text-fd-muted-foreground uppercase">
              New to FeatBit?
            </p>
            <h2
              id="docs-quick-start"
              className="mt-1 text-lg font-semibold tracking-tight"
            >
              Create your first feature flag
            </h2>
            <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">
              Follow the guided workflow, try targeting, and connect an SDK.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-fd-primary">
            Start getting started
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </span>
        </Link>
      </section>

      <section aria-labelledby="choose-your-path" className="mt-10">
        <h2
          id="choose-your-path"
          className="text-2xl font-semibold tracking-tight"
        >
          Choose your path
        </h2>
        <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
          Start with a workflow, or jump directly to the part of FeatBit you
          need.
        </p>

        <div className="mt-5 overflow-hidden rounded-lg border border-fd-border md:grid md:grid-cols-2">
          {paths.map((group, groupIndex) => (
            <div
              className={
                groupIndex === 1
                  ? "border-t border-fd-border md:contents"
                  : "md:contents"
              }
              key={group.title}
            >
              <h3
                className={`border-b border-fd-border px-5 py-3 text-xs font-medium tracking-wide text-fd-muted-foreground uppercase ${groupIndex === 1 ? "md:border-l" : ""}`}
                style={{ gridColumn: groupIndex + 1, gridRow: 1 }}
              >
                {group.title}
              </h3>
              {group.links.map((item, itemIndex) => (
                <Link
                  className={`group grid min-h-20 grid-cols-[1fr_auto] items-center gap-4 border-b border-fd-border px-5 py-3 text-fd-foreground transition-colors last:border-b-0 hover:bg-fd-muted/50 ${groupIndex === 1 ? "md:border-l" : ""} ${focusClasses}`}
                  href={item.href}
                  key={item.title}
                  style={{ gridColumn: groupIndex + 1, gridRow: itemIndex + 2 }}
                >
                  <span>
                    <span className="block font-medium">{item.title}</span>
                    <span className="mt-1 block text-sm leading-5 text-fd-muted-foreground">
                      {item.description}
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="explore-by-interface" className="mt-10">
        <h2
          id="explore-by-interface"
          className="text-2xl font-semibold tracking-tight"
        >
          Explore by interface
        </h2>
        <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
          Use FeatBit through the dashboard, SDKs, or APIs.
        </p>

        <div className="mt-5 overflow-hidden rounded-lg border border-fd-border md:grid md:grid-cols-3">
          {interfaces.map((item, index) => (
            <div
              className={`flex min-h-48 flex-col p-5 ${index > 0 ? "border-t border-fd-border md:border-t-0 md:border-l" : ""}`}
              key={item.label}
            >
              <p className="text-xs font-medium tracking-wide text-fd-muted-foreground uppercase">
                {item.label}
              </p>
              <h3 className="mt-2 font-semibold text-fd-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                {item.description}
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5">
                <Link
                  className={`inline-flex w-fit items-center gap-2 text-sm font-medium text-fd-primary hover:underline hover:underline-offset-4 ${focusClasses}`}
                  href={item.href}
                >
                  {item.linkLabel}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                {"secondaryLink" in item ? (
                  <Link
                    className={`text-sm text-fd-muted-foreground hover:text-fd-foreground hover:underline hover:underline-offset-4 ${focusClasses}`}
                    href={item.secondaryLink.href}
                  >
                    {item.secondaryLink.label}
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8 border-y border-fd-border py-4">
        <p className="text-xs font-medium tracking-wide text-fd-muted-foreground uppercase">
          Deeper reading
        </p>
        <a
          className={`mt-2 inline-flex items-center gap-2 text-sm font-medium text-fd-primary hover:underline hover:underline-offset-4 ${focusClasses}`}
          href="https://www.featbit.co/whitepapers/featbit-whitepaper.pdf"
          rel="noreferrer"
          target="_blank"
        >
          Download the FeatBit Whitepaper
          <ExternalLink aria-hidden="true" className="size-4" />
        </a>
      </div>
    </div>
  );
}
