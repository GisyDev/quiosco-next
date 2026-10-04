// src/stores/counter-store.ts
import { create } from 'zustand'
import { OrderItem } from '../types/order'
import { Product } from '../generated/prisma/client'

export type Store = {
    order: OrderItem[]
    clearOrder: () => void
    addToCart: (product: Product) => void
    removeProduct: (idProduct: Product["id"]) => void
    increaseQuantity: (idProduct: Product["id"]) => void
    decreaseQuantity: (idProduct: Product["id"]) => void
}


export const useStore = create<Store>((set, get) => ({
    order: [],
    clearOrder: () => {
        set(() => ({
            order: []
        }))
    },
    addToCart: (product: Product) => {
        const { categoryId, image, ...data } = product

        const isProductExist = get().order.find((product) => product.id == data.id)

        let item = []

        if (isProductExist) {
            item = get().order.map((product) => {

                if (isProductExist.id === product.id) {
                    return {
                        ...product,
                        quantity: product.quantity + 1
                    }
                }

                return product
            })
        } else {
            item = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }

        set(() => ({
            order: item
        }))
    },

    removeProduct: (idProduct: Product["id"]) => {
        set((state) => ({
            order: state.order.filter((product) => product.id != idProduct)
        }))
    },

    increaseQuantity: (idProduct: Product["id"]) => {
        const item = get().order.find((p) => p.id == idProduct)
        if (item && item.quantity < 10) {
            set((state) => ({
                order: state.order.map((product) => {

                    if (idProduct === product.id) {
                        return {
                            ...product,
                            quantity: product.quantity + 1,
                            subtotal: product.price * (product.quantity + 1)
                        }
                    }

                    return product
                })
            }))
        }
    },
    decreaseQuantity: (idProduct: Product["id"]) => {
        const item = get().order.find((p) => p.id == idProduct)
        if (item && item.quantity > 1) {
            set((state) => ({
                order: state.order.map((product) => {

                    if (idProduct === product.id) {
                        return {
                            ...product,
                            quantity: product.quantity - 1,
                            subtotal: product.price * (product.quantity - 1)
                        }
                    }

                    return product
                })
            }))
        }
    }
}))
    