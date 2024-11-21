import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("share_trading")
    const shares = await db.collection("shares").find({}).toArray()
    return NextResponse.json(shares)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch shares' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("share_trading")
    const share = await req.json()
    const result = await db.collection("shares").insertOne(share)
    return NextResponse.json({ id: result.insertedId, ...share })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to create share' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("share_trading")
    const { id, ...updateData } = await req.json()
    const result = await db.collection("shares").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Share not found' }, { status: 404 })
    }
    return NextResponse.json({ id, ...updateData })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to update share' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("share_trading")
    const { id } = await req.json()
    const result = await db.collection("shares").deleteOne({ _id: new ObjectId(id) })
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Share not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Share deleted successfully' })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to delete share' }, { status: 500 })
  }
}

