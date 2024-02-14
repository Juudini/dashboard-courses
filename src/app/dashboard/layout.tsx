export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        <h1>Dashboard LAYOUT</h1>
        <div className="px-6 pt-6">{children}</div>
      </div>
    </>
  );
}
