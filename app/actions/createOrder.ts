"use server"

import { prisma } from "@/prisma/prismaAdapter"
import { OrderSchema } from "@/src/schema"

export const createOrder = async (data: unknown) => {
    
    try {
        const result = OrderSchema.safeParse(data)
        if (!result.success) {
            return {
                errors: result.error.issues
            }
        }
        await prisma.order.create({
            data: {
                clientName: result.data.name,
                total: result.data.total,
                orderProducts: {
                    create: result.data.order.map((product) => {
                        return {
                            productId: product.id,
                            quantity: product.quantity
                        }
                    })
                }
            }
        })
        return { success: true, message: "La orden se ha creado correctamente" }

    } catch (error) {
        console.log(error);
        return { success: false, message: "Error al crear la orden" }
    }

}