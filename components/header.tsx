import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">ShareTrader</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/portfolio" className="hover:underline">Portfolio</Link></li>
            <li><Button variant="outline">Sign In</Button></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

