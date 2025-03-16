import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// 購入履歴の保存
export async function POST(req: Request, res: Response) {

    const {sessionId} = await req.json();

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        const existingPurcahse = await prisma.purchase.findFirst({
            where: {
                userId: session.client_reference_id!,
                bookId: session.metadata?.bookId!,
            }
        });

        if(!existingPurcahse) {
            const purchase = await prisma.purchase.create({
                data: {
                    userId: session.client_reference_id!,
                    bookId: session.metadata?.bookId!,
                }
            });

            return NextResponse.json({purchase});
        } else {
            return NextResponse.json({message: "既に購入済みです"});
        }
        

        
    } catch (err) {
        return NextResponse.json(err)
    }
}