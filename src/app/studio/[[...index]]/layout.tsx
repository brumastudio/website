export const metadata = {
  title: "Sanity Studio — Bruma Studio",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="sanity"
      style={{
        height: "100vh",
        maxHeight: "100dvh",
        overflowY: "auto",
        width: "100vw",
      }}
    >
      {children}
    </div>
  );
}
