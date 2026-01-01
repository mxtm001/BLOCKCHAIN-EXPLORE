export const dynamic = "force-dynamic"

interface BlockchainTx {
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

const customTransaction: BlockchainTx = {
  hash: "0xa7c5f2e8b9d4c1f3e6a2b5d8c9e1f4a7b2d5e8c9f1a3b6c9d2e5f8a1c4d7e",
  from: "0xff72f4a08d99b362efd70496836f5efb3ce906d6",
  to: "0xb8c9fE95C6e52eD348774F896c071E246f59c3ff",
  value: "4000000.00",
  status: "Pending",
  gas: "65000",
  time: "Just now",
  network: "Ethereum",
  symbol: "USDT",
  confirmations: 0,
  blockNumber: "Pending",
}

function generateLiveConfirmations(): number {
  // Simulate increasing confirmations for non-pending transactions
  const randomConfirmations = Math.floor(Math.random() * 20) + 1
  return randomConfirmations
}

async function fetchEthereumTxs(): Promise<BlockchainTx[]> {
  try {
    const ethTransactions = Array.from({ length: 3 }, (_, i) => ({
      hash: `0x${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`,
      from: `0x${Math.random().toString(16).slice(2, 10)}`,
      to: `0x${Math.random().toString(16).slice(2, 10)}`,
      value: (Math.random() * 10).toFixed(2),
      status: "Confirmed",
      gas: (21000 + Math.random() * 100000).toFixed(0),
      time: `${i + 1} min ago`,
      network: "Ethereum",
      symbol: "ETH",
      confirmations: generateLiveConfirmations(),
      blockNumber: `${18000000 + Math.floor(Math.random() * 100000)}`,
    }))
    return ethTransactions
  } catch (error) {
    console.error("Error fetching Ethereum txs:", error)
    return []
  }
}

async function fetchPolygonTxs(): Promise<BlockchainTx[]> {
  try {
    const polygonTransactions = Array.from({ length: 3 }, (_, i) => ({
      hash: `0x${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`,
      from: `0x${Math.random().toString(16).slice(2, 10)}`,
      to: `0x${Math.random().toString(16).slice(2, 10)}`,
      value: (Math.random() * 500).toFixed(2),
      status: "Confirmed",
      gas: (35000 + Math.random() * 50000).toFixed(0),
      time: `${i + 2} min ago`,
      network: "Polygon",
      symbol: "MATIC",
      confirmations: generateLiveConfirmations(),
      blockNumber: `${50000000 + Math.floor(Math.random() * 100000)}`,
    }))
    return polygonTransactions
  } catch (error) {
    console.error("Error fetching Polygon txs:", error)
    return []
  }
}

async function fetchBitcoinTxs(): Promise<BlockchainTx[]> {
  try {
    const bitcoinTransactions = Array.from({ length: 2 }, (_, i) => ({
      hash: Math.random().toString(16).slice(2, 66),
      from: `1A${Math.random().toString(16).slice(2, 8)}z7agoat7SFsdLyQGDTviS4v7x24Zjr`,
      to: `1Bv${Math.random().toString(16).slice(2, 8)}MSEY${Math.random().toString(16).slice(2, 8)}wQGDTvi`,
      value: (Math.random() * 2).toFixed(4),
      status: "Confirmed",
      gas: "N/A",
      time: `${i + 5} min ago`,
      network: "Bitcoin",
      symbol: "BTC",
      confirmations: generateLiveConfirmations(),
      blockNumber: `${800000 + Math.floor(Math.random() * 10000)}`,
    }))
    return bitcoinTransactions
  } catch (error) {
    console.error("Error fetching Bitcoin txs:", error)
    return []
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const searchHash = searchParams.get("search") || searchParams.get("hash")

    const [ethereumTxs, polygonTxs, bitcoinTxs] = await Promise.all([
      fetchEthereumTxs(),
      fetchPolygonTxs(),
      fetchBitcoinTxs(),
    ])

    const allTxs = [customTransaction, ...ethereumTxs, ...polygonTxs, ...bitcoinTxs].sort(() => Math.random() - 0.5)

    if (searchHash) {
      const decodedSearch = decodeURIComponent(searchHash).toLowerCase()
      const filtered = allTxs.filter((tx) => {
        const txHash = tx.hash.toLowerCase()
        return txHash === decodedSearch || txHash.includes(decodedSearch)
      })
      console.log("[v0] Search query:", decodedSearch, "Found:", filtered.length)
      return Response.json(filtered, {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      })
    }

    return Response.json(allTxs, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    })
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return Response.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}
