"use client"

import { useEffect, useState } from "react"
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
}

export function TransactionsList() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedNetwork, setSelectedNetwork] = useState<string>("All")
  const [searchHash, setSearchHash] = useState<string>("")

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const url = searchHash ? `/api/transactions?hash=${encodeURIComponent(searchHash)}` : "/api/transactions"
        const res = await fetch(url, {
          cache: "no-store",
        })
        if (res.ok) {
          const data = await res.json()
          setTransactions(data)
        }
      } catch (error) {
        console.error("Error fetching transactions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
    const interval = setInterval(fetchTransactions, 5000)
    return () => clearInterval(interval)
  }, [searchHash])

  const filteredTxs =
    selectedNetwork === "All" ? transactions : transactions.filter((tx) => tx.network === selectedNetwork)

  const networks = ["All", "Ethereum", "Polygon", "Bitcoin"]
  const networkColors: Record<string, string> = {
    Ethereum: "bg-blue-500/20 text-blue-400",
    Polygon: "bg-purple-500/20 text-purple-400",
    Bitcoin: "bg-orange-500/20 text-orange-400",
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-foreground">Latest Transactions</h2>
          <div className="flex gap-2 flex-wrap">
            {networks.map((network) => (
              <button
                key={network}
                onClick={() => setSelectedNetwork(network)}
                className={`px-3 py-1 rounded text-xs font-semibold transition ${
                  selectedNetwork === network
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {network}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search by transaction hash..."
            value={searchHash}
            onChange={(e) => setSearchHash(e.target.value)}
            className="w-full px-3 py-2 bg-muted border border-border rounded text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      {loading && <div className="px-6 py-8 text-center text-muted-foreground">Loading transactions...</div>}

      {!loading && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Tx Hash</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Network</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">From</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">To</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Confirmations</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredTxs.length > 0 ? (
                filteredTxs.map((tx) => (
                  <tr
                    key={tx.hash}
                    className={`border-b border-border hover:bg-muted/50 transition cursor-pointer ${
                      tx.status === "Pending" ? "bg-yellow-500/10" : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-mono text-primary hover:text-accent">
                      <Link href={`/transactions/${tx.hash}`} title={tx.hash} className="hover:underline">
                        {tx.hash.slice(0, 10)}...{tx.hash.slice(-8)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${networkColors[tx.network]}`}>
                        {tx.network}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-muted-foreground">
                      {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-muted-foreground">
                      {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">
                      {tx.value} {tx.symbol}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          tx.status === "Pending" ? "bg-yellow-500/20 text-yellow-400" : "bg-accent/20 text-accent"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        {tx.confirmations} blocks
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{tx.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-muted-foreground">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
