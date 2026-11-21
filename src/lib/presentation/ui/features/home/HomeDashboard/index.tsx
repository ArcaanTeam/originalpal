import Link from "next/link";
import { ChevronLeft, LayoutGrid } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/presentation/ui/components/ui/card";

export type HomeDashboardNavItemView = {
  href: string;
  title: string;
  description: string;
};

export interface HomeDashboardUIProps {
  translations: {
    title: string;
    tagline: string;
    welcome: string;
    sectionTitle: string;
  };
  navItems: HomeDashboardNavItemView[];
}

export default function HomeDashboardUI(props: HomeDashboardUIProps) {
  return (
    <main className="relative flex min-h-full flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-10 sm:px-6 sm:py-16">
        <header className="space-y-2 text-center sm:text-start">
          <p className="text-xs font-medium tracking-wide text-brand">
            {props.translations.title}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {props.translations.welcome}
          </h1>
          <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
            {props.translations.tagline}
          </p>
        </header>

        <section className="mt-10 sm:mt-12" aria-labelledby="home-nav-heading">
          <h2
            id="home-nav-heading"
            className="text-sm font-medium text-muted-foreground"
          >
            {props.translations.sectionTitle}
          </h2>
          <ul className="mt-4 grid gap-3">
            {props.navItems.map((item) => (
              <li key={item.href}>
                <HomeNavCard item={item} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

function HomeNavCard({ item }: { item: HomeDashboardNavItemView }) {
  return (
    <Card className="group p-0 shadow-sm transition-[box-shadow,border-color] hover:border-primary/25 hover:shadow-md">
      <Link
        href={item.href}
        className="flex items-start gap-4 rounded-xl p-5 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:p-6"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-icon-surface text-foreground">
          <LayoutGrid className="size-5" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1 text-start">
          <CardHeader className="gap-1 p-0">
            <CardTitle className="text-base">{item.title}</CardTitle>
            <CardDescription className="leading-relaxed text-pretty">
              {item.description}
            </CardDescription>
          </CardHeader>
        </span>
        <ChevronLeft
          className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </Card>
  );
}
