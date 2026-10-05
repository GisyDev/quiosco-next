import AdminOrderCard from '@/app/components/admin/order/AdminOrderCard'
import Heading from '@/app/components/ui/Heading'
import { prisma } from '@/prisma/prismaAdapter'
import React from 'react'

const getPendingOrders = async () => {
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

    return orders
}


const AdminOrdersPage = async () => {

    const orders = await getPendingOrders()


    return (
        <div >
            <Heading>
                Administrar Ordenes
            </Heading>
            
            <div >
                {
                    orders.length != 0 ? (
                        <div className='grid md:grid-cols-3 gap-5'>
                            {orders.map((order) => (
                                <AdminOrderCard key={order.id} order={order}/>
                            ))}
                        </div>
                    ) : <p>No hay ordenes pendientes</p>
                }
            </div>

        </div>
    )
}

export default AdminOrdersPage