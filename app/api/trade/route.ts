import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

// Mock user portfolio (in a real app, this would be stored in the database)
let portfolio: Record<string, number> = {}

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("share_trading")
    const { type, symbol, quantity } = await req.json()

    const share = await db.collection("shares").findOne({ symbol })
    if (!share) {
      return NextResponse.json({ error: 'Share not found' }, { status: 404 })
    }

    const totalPrice = share.price * quantity

    if (type === 'buy') {
      // Simulate buying shares
      portfolio[symbol] = (portfolio[symbol] || 0) + quantity
      // Update share price (simplified simulation)
      var newqty = share.totquantity
      var newPrice = 0
      if (quantity >= (newqty * 0.2)) {
        newPrice = share.price * (1.2);
      } else {
        newPrice = share.price * (1 + (quantity / newqty));
      }
      newqty = newqty + quantity
      const newChange = ((newPrice / share.price) - 1) * 100
      await db.collection("shares").updateOne(
        { symbol },
        { $set: { price: newPrice, change: newChange, totquantity: newqty } }
      )
    } else if (type === 'sell') {
      // Check if user has enough shares to sell
      // if (!portfolio[symbol] || portfolio[symbol] < quantity) {
      //   console.log("I am here")
      //   return NextResponse.json({ error: 'Not enough shares to sell' }, { status: 400 })
      // }
      // Simulate selling shares
      portfolio[symbol] -= quantity
      // Update share price (simplified simulation)
      var newqty = share.totquantity
      var newPrice = 0
      if (quantity >= (newqty * 0.2)) {
        newPrice = share.price * (0.8);
      } else {
        newPrice = share.price * (1 - (quantity / newqty));
      }
      newqty = newqty - quantity
      const newChange = ((newPrice / share.price) - 1) * 100
      await db.collection("shares").updateOne(
        { symbol },
        { $set: { price: newPrice, change: newChange, totquantity: newqty } }
      )
    } else {
      return NextResponse.json({ error: 'Invalid trade type' }, { status: 400 })
    }

    const updatedShare = await db.collection("shares").findOne({ symbol })
    return NextResponse.json({ message: 'Trade successful', portfolio, share: updatedShare })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to process trade' }, { status: 500 })
  }
}

