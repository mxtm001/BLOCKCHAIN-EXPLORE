import { ChevronLeft } from "lucide-react"
import Link from "next/link"

interface Transaction {
  hash: string
  from: string
  to: string
  value: string
  status: string
  gas: string
  time: string
  network: string
  symbol: string
  confirmations: number
  blockNumber: string
}

async function getTransaction(hash: string): Promise<Transaction | null> {
  try {
    const decodedHash = decodeURIComponent(hash)
    const res = await fetch(`/api/transactions?search=${decodedHash}`, {
      cache: "no-store",
    })
    if (res.ok) {
      const data = await res.json()
      console.log("[v0] Found transaction:", data)
      return data && data.length > 0 ? data[0] : null
    }
  } catch (error) {
    console.error("Error fetching transaction:", error)
  }
  return null
}

export default async function TransactionDetailsPage({ params }: { params: { hash: string } }) {
  const { hash } = params
  console.log("[v0] Received hash:", hash)
  const transaction = await getTransaction(hash)

  const networkColors: Record<string, string> = {
    Ethereum: "bg-blue-500/20 text-blue-400 border-blue-500/50",
    Polygon: "bg-purple-500/20 text-purple-400 border-purple-500/50",
    Bitcoin: "bg-orange-500/20 text-orange-400 border-orange-500/50",
  }

  const statusColors: Record<string, string> = {
    Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
    Confirmed: "bg-green-500/20 text-green-400 border-green-500/50",
    Failed: "bg-red-500/20 text-red-400 border-red-500/50",
  }

  if (!transaction) {
    return (
      <main className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-accent hover:text-accent/80 mb-8 w-fit">
            <ChevronLeft size={20} />
            Back to Transactions
          </Link>
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <div className="text-lg text-muted-foreground">Transaction not found</div>
            <p className="text-sm text-muted-foreground mt-2">Hash: {hash}</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-accent hover:text-accent/80 mb-8 w-fit">
          <ChevronLeft size={20} />
          Back to Transactions
        </Link>

        {/* Header */}
        <div className="bg-card border border-border rounded-lg p-6 md:p-8 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Transaction Details</h1>

          {/* Transaction Hash */}
          <div className="flex items-center gap-3 mb-6 p-4 bg-muted rounded-lg">
            <span className="font-mono text-sm md:text-base break-all text-foreground">{transaction.hash}</span>
          </div>

          {/* Status, Network and Confirmations */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-3 flex-wrap">
              <span className={`px-3 py-1 rounded-lg text-sm font-semibold border ${statusColors[transaction.status]}`}>
                {transaction.status}
              </span>
              <span
                className={`px-3 py-1 rounded-lg text-sm font-semibold border ${networkColors[transaction.network]}`}
              >
                {transaction.network}
              </span>
              <span className="px-3 py-1 rounded-lg text-sm font-semibold border bg-green-500/20 text-green-400 border-green-500/50 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                {transaction.confirmations} Confirmations
              </span>
            </div>
            <div className="text-muted-foreground text-sm">{transaction.time}</div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* From Address */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">From Address</h3>
            <div className="flex items-start gap-3">
              <span className="font-mono text-sm break-all text-foreground">{transaction.from}</span>
            </div>
          </div>

          {/* To Address */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">To Address</h3>
            <div className="flex items-start gap-3">
              <span className="font-mono text-sm break-all text-foreground">{transaction.to}</span>
            </div>
          </div>

          {/* Amount */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Amount</h3>
            <div className="text-2xl font-bold text-foreground">
              {transaction.value} <span className="text-lg text-accent">{transaction.symbol}</span>
            </div>
          </div>

          {/* Gas Fee */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Gas Fee</h3>
            <div className="text-2xl font-bold text-foreground">{transaction.gas}</div>
          </div>

          {/* Block Number */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Block Number</h3>
            <div className="text-lg font-mono text-foreground">{transaction.blockNumber}</div>
          </div>

          {/* Live Confirmations */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Live Confirmations
            </h3>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-green-400">{transaction.confirmations}</div>
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-semibold">{transaction.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Network:</span>
              <span className="font-semibold">{transaction.network}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time:</span>
              <span className="font-semibold">{transaction.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-semibold">
                {transaction.value} {transaction.symbol}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Live Confirmations:</span>
              <span className="font-semibold text-green-400 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                {transaction.confirmations}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
