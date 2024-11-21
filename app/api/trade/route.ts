import { NextRequest, NextResponse } from 'next/server'

// Mock user portfolio
let portfolio: Record<string, number> = {}

export async function POST(req: NextRequest) {
  const { type, symbol, quantity } = await req.json()

  const shareIndex = shares.findIndex(share => share.symbol === symbol)
  if (shareIndex === -1) {
    return NextResponse.json({ error: 'Share not found' }, { status: 404 })
  }

  const share = shares[shareIndex]
  const totalPrice = share.price * quantity

  if (type === 'buy') {
    // Simulate buying shares
    portfolio[symbol] = (portfolio[symbol] || 0) + quantity
    // Update share price (simplified simulation)
    shares[shareIndex].price *= (1 + Math.random() * 0.05)
    shares[shareIndex].change = ((shares[shareIndex].price / share.price) - 1) * 100
  } else if (type === 'sell') {
    // Check if user has enough shares to sell
    if (!portfolio[symbol] || portfolio[symbol] < quantity) {
      return NextResponse.json({ error: 'Not enough shares to sell' }, { status: 400 })
    }
    // Simulate selling shares
    portfolio[symbol] -= quantity
    // Update share price (simplified simulation)
    shares[shareIndex].price *= (1 - Math.random() * 0.05)
    shares[shareIndex].change = ((shares[shareIndex].price / share.price) - 1) * 100
  } else {
    return NextResponse.json({ error: 'Invalid trade type' }, { status: 400 })
  }

  return NextResponse.json({ message: 'Trade successful', portfolio, share: shares[shareIndex] })
}

