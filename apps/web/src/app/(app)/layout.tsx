import { AppSidebar } from "@/components/app-sidebar";
import { RoleGuard } from "@/components/role-guard";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      <RoleGuard>
        <div className="flex min-w-0 flex-1 gap-4 overflow-y-auto p-4 scrollbar-gutter-stable">
          {children}
        </div>
      </RoleGuard>
    </div>
  );
}