
import { completeOrder } from '@/app/actions/completeOrderAction'
import { Order, OrderProduct, Product } from '@/src/generated/prisma/client'
import { formatPrice } from '@/src/lib/formatPrice'
import React from 'react'

type OrderWithProducts = Order & {
    orderProducts: (OrderProduct & {
        product: Product
    })[]
}


const AdminOrderCard = ({ order }: { order: OrderWithProducts }) => {


    return (
        <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 "
        >
            <div className='flex flex-col flex-1 h-full space-y-4'>
                <p className='text-2xl font-medium text-gray-900'>Cliente: {order.clientName}</p>
                <p className='text-lg font-medium text-gray-900'>Productos Ordenados:</p>
                <div>
                    {order.orderProducts.length != 0 && order.orderProducts.map((product) =>
                        <div
                            key={product.id}
                            className={"flex items-center gap-2 border-t border-gray-200 text-sm py-4 last-of-type:p-0 last-of-type:pt-4"}>
                            <dt>
                                <span>{product.quantity}</span>
                            </dt>

                            <dd>
                                {product.product.name}
                            </dd>
                        </div>
                    )}

                    <dl className="pt-4 space-y-4">
                        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                            <dt className="text-base font-medium text-gray-900">Total a Pagar:</dt>
                            <dd className="text-base font-medium text-gray-900">{formatPrice(order.total)}</dd>
                        </div>
                    </dl>
                </div>

                <form action={completeOrder}>
                    <input
                        type="hidden"
                        value={order.id}
                        name="orderId"
                    />
                    <input
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-2 uppercase font-bold cursor-pointer text-sm"
                        value='Marcar Orden Completada'
                    />
                </form>
            </div>

        </section>
    )
}

export default AdminOrderCard