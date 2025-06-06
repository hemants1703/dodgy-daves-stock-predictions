"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CopyIcon, Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const stockTickerInput = useRef<HTMLInputElement>(null);
  const [stockTickers, setStockTickers] = useState<string[]>([]);
  const [stockTickerEmptyInputError, setStockTickerEmptyInputError] =
    useState<boolean>(false);
  const [stockReport, setStockReport] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
  };

  const handleRemoveStockTickerItem = (index: number) =>
    setStockTickers(stockTickers.filter((_, i) => i !== index));

  const handleReportGeneration = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/fetch-stock-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stockTickers }),
      });
      const data = await response.json();

      if (!data.success) {
        throw Error(data.message);
      }

      const stockData = data.data;

      // Fetch AI stock report
      const aiStockReportResponse = await fetch("/api/fetch-ai-stock-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stockData }),
      });

      const aiStockReportData = await aiStockReportResponse.json();

      if (!aiStockReportData.success) {
        throw Error(aiStockReportData.message);
      }

      setStockReport(aiStockReportData.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate report", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col max-w-2xl mx-auto min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-14 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Dodgy Dave's Stock Predictions</h1>
        {!stockReport ? (
          <>
            <p
              className={cn(
                "text-lg",
                stockTickerEmptyInputError && "text-destructive"
              )}
            >
              {stockTickerEmptyInputError
                ? "You must add at least one ticker. A ticker is a 3 letter or more code for a stock. E.g TSLA for Tesla."
                : "Add up to 3 stock tickers below to get a super accurate stock predictions report👇"}
            </p>
            <div className="flex gap-2 w-full">
              <Input
                ref={stockTickerInput}
                type="text"
                placeholder="Enter a stock ticker here"
                className="uppercase"
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    handleAddStock();
                  }
                }}
              />
              <Button variant={"secondary"} onClick={handleAddStock} >
                <PlusIcon className="size-5" />
              </Button>
            </div>
            <div>
              {stockTickers.length > 0 ? (
                <div className="flex flex-1 flex-wrap gap-2">
                  {stockTickers.map((stockTicker, index) => {
                    return (
                      <Badge key={index}>
                        <button
                          onClick={() => handleRemoveStockTickerItem(index)}
                          className="hover:text-destructive"
                        >
                          <Cross2Icon />
                        </button>
                        {stockTicker}
                      </Badge>
                    );
                  })}
                </div>
              ) : (
                <p>Your stock tickers will appear here</p>
              )}
            </div>
            <Button
              className="w-full"
              disabled={stockTickers.length < 3 || isLoading}
              onClick={handleReportGeneration}
            >
              {isLoading ? "Generating Report..." : "GENERATE REPORT"}
            </Button>
          </>
        ) : (
          <StockReport stockReport={stockReport} />
        )}
      </main>
      <footer className="flex flex-col gap-2 items-center">
        <p className="text-sm text-muted-foreground">
          Always correct 15% of the time
        </p>
        <p className="text-sm text-muted-foreground">
          &copy; This is NOT real financial advice
        </p>
      </footer>
    </div>
  );
}

function StockReport({ stockReport }: { stockReport: string }) {
  if (!stockReport) return null;

  return (
    <div className="flex flex-col gap-6 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <ReactMarkdown>{stockReport}</ReactMarkdown>
      </div>
      <div className="flex justify-end">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            navigator.clipboard.writeText(stockReport);
            toast.success("Report copied to clipboard");
          }}
          className="gap-2"
        >
          <CopyIcon className="size-4" />
          Copy Report
        </Button>
      </div>
    </div>
  );
}
