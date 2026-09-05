import { AppSidebar } from "@/components/app-sidebar";
import { RoleGuard } from "@/components/role-guard";
import { OrderAlertsWatcher } from "@/features/notifications/components/order-alerts-watcher";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      <RoleGuard>
        <OrderAlertsWatcher />
        <div className="flex min-w-0 flex-1 gap-4 overflow-y-auto p-4 scrollbar-gutter-stable">
          {children}
        </div>
      </RoleGuard>
    </div>
  );
}