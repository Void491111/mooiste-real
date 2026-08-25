import { AppSidebar } from "@/features/pos/components/pos-sidebar";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex h-screen gap-4 bg-background p-4">
      <AppSidebar />
      {children}
    </div>
  );
}