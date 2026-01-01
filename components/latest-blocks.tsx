export function LatestBlocks() {
  const blocks = [
    { number: "19384729", miner: "0x1234...5678", txCount: 147, time: "1 min ago" },
    { number: "19384728", miner: "0x2345...6789", txCount: 182, time: "12 secs ago" },
    { number: "19384727", miner: "0x3456...7890", txCount: 156, time: "34 secs ago" },
    { number: "19384726", miner: "0x4567...8901", txCount: 163, time: "1 min ago" },
    { number: "19384725", miner: "0x5678...9012", txCount: 171, time: "2 mins ago" },
  ]

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">Latest Blocks</h2>
      </div>
      <div className="divide-y divide-border">
        {blocks.map((block) => (
          <div key={block.number} className="px-6 py-4 hover:bg-muted/50 transition cursor-pointer">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono font-semibold text-primary hover:text-accent">Block #{block.number}</p>
                <p className="text-xs text-muted-foreground mt-1">Miner: {block.miner}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{block.txCount} txs</p>
                <p className="text-xs text-muted-foreground">{block.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
