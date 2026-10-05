"use server"

import { prisma } from "@/prisma/prismaAdapter";
import { OrderIdSchema } from "@/src/schema";
import { revalidatePath } from "next/cache";

export const completeOrder = async (formData: FormData) => {
    try {
        const data = {
            orderId: formData.get("orderId")
        }

        const result = OrderIdSchema.safeParse(data)

        if (result.success) {
            await prisma.order.update({
                where: {
                    id: result.data.orderId
                },
                data: {
                    status: true,
                    orderReadyAt: new Date(Date.now())
                }
            })

            revalidatePath("admin/orders")
        }

    } catch (error) {
        console.log(error);
    }

}
