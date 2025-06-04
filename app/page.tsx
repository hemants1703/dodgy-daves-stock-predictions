"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const stockTickerInput = useRef<HTMLInputElement>(null);
  const [stockTickers, setStockTickers] = useState<string[]>([]);
  const [stockTickerEmptyInputError, setStockTickerEmptyInputError] = useState<boolean>(false);

  const handleAddStock = () => {
    if (stockTickerInput.current) {
      const value = stockTickerInput.current.value.toUpperCase();
      if (value) {
        setStockTickers([...stockTickers, value]);
        stockTickerInput.current.value = "";
        setStockTickerEmptyInputError(false);
      } else {
        setStockTickerEmptyInputError(true);
      }
    }
  }

  const handleRemoveStockTickerItem = (index: number) => (setStockTickers(stockTickers.filter((_, i) => i !== index)));

  const handleReportGeneration = async () => {
    try {
      const response = await fetch("/api/fetch-stock-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stockTickers })
      });
      const data = await response.json();
      
      if (data.status !== 200) {
        throw Error(data.message);
      }
      
      const stockData = data.data;

      console.log(stockData);

    } catch (error) {
      console.error(error);
      toast.error("Failed to generate report", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return (
    <div className="flex flex-col max-w-2xl mx-auto min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-14 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Dodgy Dave's Stock Predictions</h1>
        <p className={cn("text-lg", stockTickerEmptyInputError && "text-destructive")}>{stockTickerEmptyInputError ? "You must add at least one ticker. A ticker is a 3 letter or more code for a stock. E.g TSLA for Tesla." : "Add up to 3 stock tickers below to get a super accurate stock predictions report👇"}</p>
        <div className="flex gap-2 w-full">
          <Input ref={stockTickerInput} type="text" placeholder="Enter a stock ticker here" className="uppercase" />
          <Button variant={"secondary"} onClick={handleAddStock}><PlusIcon className="size-5" /></Button>
        </div>
        <div>  
          {stockTickers.length > 0 ? (
            <div className="flex flex-1 flex-wrap gap-2">
            {stockTickers.map((stockTicker, index) => {
              return (
                <Badge key={index}>
                  <button onClick={() => handleRemoveStockTickerItem(index)} className="hover:text-destructive">
                    <Cross2Icon />
                  </button>
                  {stockTicker}
                </Badge>
              )
            })}
          </div>
        ) : (
        <p>Your stock tickers will appear here</p>
        )}
        </div>
        <Button className="w-full" disabled={stockTickers.length === 0} onClick={handleReportGeneration}>GENERATE REPORT</Button>
      </main>
      <footer className="flex flex-col gap-2 items-center">
        <p className="text-sm text-muted-foreground">Always correct 15% of the time</p>
        <p className="text-sm text-muted-foreground">&copy; This is NOT real financial advice</p>
      </footer>
    </div>
  );
}
