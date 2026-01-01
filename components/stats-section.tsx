export function StatsSection() {
  const stats = [
    { label: "Total Transactions", value: "2,847,392", change: "+12.5%" },
    { label: "Active Addresses", value: "1,247,594", change: "+8.3%" },
    { label: "Average Gas Price", value: "45 Gwei", change: "-3.2%" },
    { label: "Network Hash Rate", value: "184.5 TH/s", change: "+5.1%" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
          <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
          <p className="text-accent text-sm mt-2">{stat.change}</p>
        </div>
      ))}
    </div>
  )
}
