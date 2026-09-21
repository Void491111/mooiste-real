import { GuestStatus } from "@/features/guest/components/guest-status";

export default async function GuestStatusPage({
  params,
}: PageProps<"/m/[table]/status">) {
  const { table } = await params;

  return <GuestStatus tableNumber={table} />;
}