import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { StatsSection } from "@/components/stats-section"
import { TransactionsList } from "@/components/transactions-list"
import { LatestBlocks } from "@/components/latest-blocks"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <SearchBar />
        <StatsSection />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <TransactionsList />
          </div>
          <div>
            <LatestBlocks />
          </div>
        </div>
      </div>
    </main>
  )
}
