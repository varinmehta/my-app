import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ShareItemProps {
  name: string
  symbol: string
  price: number
  change: number
  onBuy: () => void
  onSell: () => void
}

export function ShareItem({ name, symbol, price, change, onBuy, onSell }: ShareItemProps) {
  const changeColor = change >= 0 ? 'text-green-600' : 'text-red-600'

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name} ({symbol})</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${price.toFixed(2)}</p>
        <p className={`${changeColor}`}>
          {change >= 0 ? '+' : ''}{change.toFixed(2)}%
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={onBuy}>Buy</Button>
        <Button onClick={onSell} variant="outline">Sell</Button>
      </CardFooter>
    </Card>
  )
}

