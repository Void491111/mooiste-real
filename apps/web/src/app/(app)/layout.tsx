import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { TOAST_CONFIG } from "@/config/toast.config";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex h-screen gap-4 bg-background p-4">
      <AppSidebar />
      {children}

      <Toaster
        position={TOAST_CONFIG.position}
        duration={TOAST_CONFIG.durationMs}
        richColors
      />
    </div>
  );
}