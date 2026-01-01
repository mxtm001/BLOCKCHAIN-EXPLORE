export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">⛓</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">BlockExplorer</h1>
        </div>
        <nav className="hidden md:flex gap-6">
          <a href="#" className="text-muted-foreground hover:text-foreground transition">
            Dashboard
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition">
            Transactions
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition">
            Blocks
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition">
            Accounts
          </a>
        </nav>
      </div>
    </header>
  )
}
