import { z } from "zod";

export const OrderSchema = z.object({
    name: z.string().min(1, "Tu nombre es obligatorio"),
    total: z.number(),
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        quantity: z.number(),
        subtotal: z.number()
    }))

})


export const OrderIdSchema = z.object({
    orderId: z.string()
        .transform((value) => parseInt(value))
        .refine(value => value > 0, { message: "El orderId no es un número" })
})

export const productSearch = z.object({
    search: z.string()
        .trim()
        .min(1, { message: "Debes buscar con mas de un carácter" })
})

export const ProductSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'El Nombre del Producto no puede ir vacio' }),
    price: z.string()
        .trim()
        .transform((value) => parseFloat(value))
        .refine((value) => value > 0, { message: 'Precio no válido' })
        .or(z.number().min(1, { message: 'La Categoría es Obligatoria' })),
    categoryId: z.string()
        .trim()
        .transform((value) => parseInt(value))
        .refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
        .or(z.number().min(1, { message: 'La Categoría es Obligatoria' })),
    image: z.string().min(1, { message: "La imagen es obligatoria" })
})

export type newProductType = z.infer<typeof ProductSchema>