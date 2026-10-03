import { prisma } from "@/app/config/prismaAdapter";
import { categories } from "./data/categories"
import { products } from "./data/products"
import "dotenv/config";


async function main() {
    try {
        await prisma.category.createMany({
            data: categories
        })
        await prisma.product.createMany({
            data: products
        })
        console.log("Seed ejecutado correctamente")
    } catch (error) {
        console.log(error);
    }
}

main()
    .then(async() => {
        await prisma.$disconnect()
    })
    .catch(async(e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })