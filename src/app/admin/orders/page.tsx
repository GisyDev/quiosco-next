"use client"

import OrderCard from '@/components/admin/order/OrderCard';
import Heading from '@/components/ui/Heading'
import { OrderWithProducts } from '@/types/order';
import useSWR from 'swr';




const AdminOrdersPage = () => {

    const fetcher = () => fetch("/admin/orders/api").then((result) => result.json()).then((data) => data)
    const { data: orders, error, isLoading } = useSWR<OrderWithProducts[]>("/admin/orders/api", fetcher, {
        refreshInterval: 20000,
        revalidateOnFocus: false
    });


    if (orders) return (
        <div >
            <Heading>
                Administrar Ordenes
            </Heading>

            <div >
                {
                    <div className='grid md:grid-cols-3 gap-5'>
                        {orders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>

                }
            </div>

        </div>
    )
}

export default AdminOrdersPage