"use server"
import { prisma } from "@/prisma/prismaAdapter"
import { newProductType, ProductSchema } from "@/src/schema"

export const updateProductAction = async (product: newProductType, id: number) => {
    const result = ProductSchema.safeParse(product)

    if (result.success) {

        await prisma.product.update({
            where: {
                id
            },
            data: product
        })
    } else {
        return {
            errors: result.error.message
        }
    }
}   