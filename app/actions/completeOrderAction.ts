"use server"

import { prisma } from "@/prisma/prismaAdapter";
import { OrderIdType } from "@/src/schema";
import { revalidatePath } from "next/cache";

export const completeOrder = async (data: OrderIdType) => {

    const { orderId } = data

    if (orderId) {
        await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                status: true,
                orderReadyAt: new Date(Date.now())
            }
        })
                       revalidatePath("/admin/orders")
        
        return {
            sucess: true
        }
    } else {
        return {
            sucess: false
        }
    }

}
