import { prisma } from "@/prisma/prismaAdapter"

export const GET = async () => {
    const orders = await prisma.order.findMany({
        where: {
            status: false
        },
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })


    return Response.json(await orders)
}