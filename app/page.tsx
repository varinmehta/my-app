'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { ShareItem } from '@/components/share-item'
import { TradeForm } from '@/components/trade-form'

// Mock data for available shares
const initialShares = [
  { name: 'Apple Inc.', symbol: 'AAPL', price: 150.25, change: 1.5 },
  { name: 'Microsoft Corporation', symbol: 'MSFT', price: 290.75, change: -0.8 },
  { name: 'Amazon.com Inc.', symbol: 'AMZN', price: 3200.50, change: 2.1 },
  { name: 'Alphabet Inc.', symbol: 'GOOGL', price: 2750.00, change: 0.5 },
]

export default function Home() {
  const [shares, setShares] = useState(initialShares)

  const handleTrade = (type: 'buy' | 'sell', symbol: string, quantity: number) => {
    // In a real application, this would involve API calls and more complex logic
    console.log(`${type} ${quantity} shares of ${symbol}`)
    // For demonstration, we'll just update the price randomly
    setShares(shares.map(share => 
      share.symbol === symbol 
        ? { ...share, price: share.price * (1 + (Math.random() - 0.5) * 0.1) }
        : share
    ))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Available Shares</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {shares.map((share) => (
            <ShareItem
              key={share.symbol}
              {...share}
              onBuy={() => handleTrade('buy', share.symbol, 1)}
              onSell={() => handleTrade('sell', share.symbol, 1)}
            />
          ))}
        </div>
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Trade Shares</h2>
          <TradeForm onTrade={handleTrade} />
        </div>
      </main>
    </div>
  )
}

