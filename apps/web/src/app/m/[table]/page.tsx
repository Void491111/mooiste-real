import { GuestScreen } from "@/features/guest/components/guest-screen";

export default async function GuestTablePage({
  params,
}: PageProps<"/m/[table]">) {
  const { table } = await params;

  return <GuestScreen tableNumber={table} />;
}