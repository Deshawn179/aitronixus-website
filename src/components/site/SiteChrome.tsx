import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { ScrollProgress, CursorAura } from "@/components/fx/Ambient";
import { MotionGuard } from "@/components/fx/MotionGuard";

/** Persistent shell: skip link, progress, navigation, content, footer. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <MotionGuard />
      <ScrollProgress />
      <CursorAura />
      <SiteNav />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
