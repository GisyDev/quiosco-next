"use client"

import Heading from '@/app/components/ui/Heading';
import Logo from '../../components/ui/Logo';
import useSWR from 'swr';
import { OrderWithProducts } from '@/src/types/order';

const OrdersReady = () => {

    const fetcher = () => fetch("/admin/ordersReady/api").then((res) => res.json()).then((data) => data)

    const { data: readyOrders, isLoading, error } = useSWR<OrderWithProducts[]>("/admin/ordersReady/api", fetcher, {
        refreshInterval: 60000,
        revalidateOnFocus: false
    })

    console.log(readyOrders);

    if (readyOrders) return (
        <section className='flex flex-col items-center justify-center w-full'>
            <Heading>
                Ordenes listas
            </Heading>

            <Logo />

            <div className='grid grid-cols-3 gap-5 mt-10'>
                {
                    readyOrders.map((order) => (
                        <div key={order.id} className='p-6 bg-white shadow rounded'>
                            <h1 className='font-semibold mb-4'>Cliente: {order.clientName}</h1>
                            <hr />
                            <div className='mt-4 space-y-2'>
                                {
                                    order.orderProducts.map((product) => (
                                        <div key={product.id} className='text-sm'>
                                            <p><strong>{"("}{product.quantity}{")"}</strong> {product.product.name}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
   
        </section>
    )
}

export default OrdersReady