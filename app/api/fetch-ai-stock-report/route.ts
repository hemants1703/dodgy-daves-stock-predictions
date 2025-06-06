import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
    const requestBody = await request.json();
    const stockData = requestBody.stockData;

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    try {
        const response = await client.responses.create({
            model: "gpt-4o-mini",
            instructions: "You are a trading guru. Given data on share prices over the past 3 days, write a report of no more than 150 words describing the stocks performance and recommending whether to buy, hold or sell.",
            input: JSON.stringify(stockData),
        })

        return NextResponse.json({
            status: 200,
            success: true,
            message: "Stock report generated successfully",
            data: response.output_text
        })        
    } catch (error) {
        console.error("Error generating stock report from OpenAI: ", error);
        return NextResponse.json({
            status: 500,
            success: false,
            message: error
        })
    }
}