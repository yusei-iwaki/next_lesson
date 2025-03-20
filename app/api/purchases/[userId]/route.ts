import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { User } from "@/app/types/types";

// 購入履歴検索用のAPI
export async function GET(req: Request, {params}: {params: {userId: User}}) {
    const {userId} = params;
    try {
        const purchases = await prisma.purchase.findMany({
            where: {
                userId: userId.id // Assuming 'id' is the string property of 'User'
            }
        });

        return NextResponse.json(purchases);
    } catch(err) {
        return NextResponse.json(err);
    }
};