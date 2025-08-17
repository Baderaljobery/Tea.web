"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeaCalculator() {
  const [waterAmount, setWaterAmount] = useState("")
  const [results, setResults] = useState<{ sugar: number; tea: number } | null>(null)
  const [error, setError] = useState("")

  const calculateIngredients = () => {
    const water = Number.parseFloat(waterAmount)

    // Input validation
    if (isNaN(water) || water <= 0) {
      setError("يرجى إدخال رقم صحيح موجب لكمية الماء.")
      setResults(null)
      return
    }

    setError("")

    // Formula: For every 675ml water = 25g sugar + 7g tea
    const sugarPerMl = 25 / 675
    const teaPerMl = 7 / 675

    const sugar = Math.round(water * sugarPerMl * 100) / 100 // Round to 2 decimal places
    const tea = Math.round(water * teaPerMl * 100) / 100

    setResults({ sugar, tea })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWaterAmount(e.target.value)
    if (error) setError("") // Clear error when user starts typing
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white" dir="rtl">
      {/* Header with new image */}
      <div className="relative w-full h-64 md:h-80 bg-gradient-to-r from-amber-900 to-amber-700 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-GDShAwtI8fMuothW28ioR9revGW48w.jpeg')`,
          }}
        />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">حاسبة العادزلة لوزنة الشاي </h1>
            <p className="text-lg md:text-xl opacity-90 drop-shadow">احسب الكمية المثالية من السكر والشاي لمشروبك</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card className="shadow-lg border-amber-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-amber-900">أدخل كمية الماء</CardTitle>
            <CardDescription className="text-amber-700">كم كمية الموية في بريقك؟</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="water-input" className="text-sm font-medium text-amber-900">
                كمية الماء (مل)
              </label>
              <Input
                id="water-input"
                type="number"
                placeholder="أدخل كمية الماء بالمليلتر"
                value={waterAmount}
                onChange={handleInputChange}
                className="border-amber-300 focus:border-amber-500 focus:ring-amber-500"
                min="0"
                step="0.1"
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>

            <Button
              onClick={calculateIngredients}
              className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 rounded-lg shadow-md transition-colors"
              size="lg"
            >
              احسب
            </Button>

            {results && (
              <Card className="bg-amber-50 border-amber-200">
                <CardHeader>
                  <CardTitle className="text-xl text-amber-900 text-center">
                    النتائج لـ {waterAmount} مل من الماء
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-200">
                      <div className="text-2xl font-bold text-amber-800">{results.sugar} جم</div>
                      <div className="text-sm text-amber-600 font-medium">سكر</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-200">
                      <div className="text-2xl font-bold text-amber-800">{results.tea} جم</div>
                      <div className="text-sm text-amber-600 font-medium">شاي</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Formula explanation */}
        <Card className="mt-8 bg-amber-50 border-amber-200">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">
              حلالاه ياشربًا من الشاهي المنتاز .... خفيف الورق واللي مسوية منتازِ
            </h3>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-amber-100">© 2025 حاسبة العادزلة لوزنة الشاي. تحضير مثالي بسيط.</p>
        </div>
      </footer>
    </div>
  )
}
