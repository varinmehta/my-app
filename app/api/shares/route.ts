import { NextResponse } from 'next/server'

// Mock database of shares
let shares = [
  { id: 1, name: 'Apple Inc.', symbol: 'AAPL', price: 150.25, change: 1.5 },
  { id: 2, name: 'Microsoft Corporation', symbol: 'MSFT', price: 290.75, change: -0.8 },
  { id: 3, name: 'Amazon.com Inc.', symbol: 'AMZN', price: 3200.50, change: 2.1 },
  { id: 4, name: 'Alphabet Inc.', symbol: 'GOOGL', price: 2750.00, change: 0.5 },
]

export async function GET() {
  return NextResponse.json(shares)
}

