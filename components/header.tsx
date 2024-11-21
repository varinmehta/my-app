import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Personal Investment Management System</Link>
        <nav>
          <ul className="flex space-x-4">
          </ul>
        </nav>
      </div>
    </header>
  )
}

