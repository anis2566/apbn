import ScoutPanelLayout from "@/components/scout/layout";
import { AppKnockProviders } from "@/providers/knock-provider";

export default function DemoLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <AppKnockProviders>
      <ScoutPanelLayout>{children}</ScoutPanelLayout>
    </AppKnockProviders>
  )
}
