import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface TradeFormProps {
  onTrade: (type: 'buy' | 'sell', symbol: string, quantity: number) => void
}

export function TradeForm({ onTrade }: TradeFormProps) {
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy')
  const [symbol, setSymbol] = useState('')
  const [quantity, setQuantity] = useState(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onTrade(tradeType, symbol, quantity)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <RadioGroup value={tradeType} onValueChange={(value) => setTradeType(value as 'buy' | 'sell')}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="buy" id="buy" />
          <Label htmlFor="buy">Buy</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="sell" id="sell" />
          <Label htmlFor="sell">Sell</Label>
        </div>
      </RadioGroup>

      <div className="space-y-2">
        <Label htmlFor="symbol">Stock Symbol</Label>
        <Input
          id="symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="e.g., AAPL"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          required
        />
      </div>

      <Button type="submit">
        {tradeType === 'buy' ? 'Buy Shares' : 'Sell Shares'}
      </Button>
    </form>
  )
}

