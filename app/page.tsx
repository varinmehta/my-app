'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { ShareItem } from '@/components/share-item'
import { TradeForm } from '@/components/trade-form'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from "@/components/ui/use-toast"

interface Share {
  _id: string
  name: string
  symbol: string
  price: number
  change: number
}

export default function Home() {
  const [shares, setShares] = useState<Share[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchShares()
  }, [])

  const fetchShares = async () => {
    try {
      const response = await fetch('/api/shares')
      if (!response.ok) throw new Error('Failed to fetch shares')
      const data = await response.json()
      setShares(data)
    } catch (error) {
      console.error('Error fetching shares:', error)
      toast({
        title: "Error",
        description: "Failed to fetch shares. Please try again later.",
        variant: "destructive",
      })
    }
  }

  const handleTrade = async (type: 'buy' | 'sell', symbol: string, quantity: number) => {
    try {
      const response = await fetch('/api/trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, symbol, quantity }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Trade failed')
      }

      const data = await response.json()
      toast({
        title: "Trade Successful",
        description: `${type === 'buy' ? 'Bought' : 'Sold'} ${quantity} shares of ${symbol}`,
      })

      // Update the share in the local state
      setShares(shares.map(share => 
        share.symbol === symbol ? { ...share, ...data.share } : share
      ))
    } catch (error) {
      console.error('Error during trade:', error)
      toast({
        title: "Trade Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Your Portfolio 📈</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {shares.map((share) => (
            <ShareItem
              key={share._id}
              {...share}
              onTrade={(type) => handleTrade(type, share.symbol, 1)}
            />
          ))}
        </div>
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Trade Shares</h2>
          <TradeForm onTrade={handleTrade} />
        </div>
      </main>
      <Toaster />
    </div>
  )
}

