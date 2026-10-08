"use server"
import { prisma } from "@/prisma/prismaAdapter"
import { newProductType, ProductSchema } from "@/src/schema"

export const createProduct = async (product: newProductType) => {
    const result = ProductSchema.safeParse(product)

    if (result.success) {
        await prisma.product.create({
            data: result.data
        })
    } else {
        return {
            errors: result.error.message
        }
    }
}   