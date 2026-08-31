import { AppSidebar } from "@/components/app-sidebar";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 gap-4 overflow-y-auto p-4 scrollbar-gutter-stable">
        {children}
      </div>
    </div>
  );
}