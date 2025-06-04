import { dates } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const requestBody = await request.json();
    const stockTickers = requestBody.stockTickers;

    const stockData = await Promise.all(stockTickers.map(async (stockTicker: string) => {
        const polygonRequestUrl = `https://api.polygon.io/v2/aggs/ticker/${stockTicker}/range/1/day/${dates.startDate}/${dates.endDate}?apiKey=${process.env.POLYGON_API_KEY}`
        const response = await fetch(polygonRequestUrl);
        const data = await response.text();
        const status = response.status;

        if (status !== 200) {
            return NextResponse.json({
                status: status,
                success: false,
                message: "Failed to fetch stock data"
            });
        } else {
            return data;
        }
    }));

    return NextResponse.json({
        status: 200,
        success: true,
        data: stockData
    });
}