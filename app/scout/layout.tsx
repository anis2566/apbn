import ScoutPanelLayout from "@/components/scout/layout";

export default function DemoLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <ScoutPanelLayout>{children}</ScoutPanelLayout>;
}