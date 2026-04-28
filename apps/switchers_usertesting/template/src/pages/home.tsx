export function HomePage() {
  return (
    <main className="bg-background flex min-h-[calc(100vh-var(--header-height,0px))] flex-col">
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8">
            <span className="text-6xl">🤖</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Prototype template
          </h1>
          <p className="text-muted-foreground text-lg">
            Describe what you want to build and start prompting — your prototype
            will take shape right on this page.
          </p>
        </div>
      </div>
    </main>
  );
}
