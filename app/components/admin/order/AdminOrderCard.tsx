
import { completeOrder } from '@/app/actions/completeOrderAction'
import { formatPrice } from '@/src/lib/formatPrice'
import { OrderIdSchema } from '@/src/schema'
import { OrderWithProducts } from '@/src/types/order'
import { toast } from 'react-toastify'
import { mutate } from 'swr'

const handleCompleteOrder = async (formData: FormData) => {
    const data = {
        orderId: formData.get("orderId")
    }

    const result = OrderIdSchema.safeParse(data)


    if (result.success) {
        const response = await completeOrder(result.data)

        if (response.sucess) {
            toast.success("Orden Completada")
            mutate("/admin/orders/api")
        } else {
            toast.error("Error al completar la order")
        }
    }

}

const AdminOrderCard = ({ order }: { order: OrderWithProducts }) => {

    return (
        <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 "
        >
            <div className='flex flex-col flex-1 h-full'>
                <div>
                    <p className='text-xl font-bold text-gray-900'>Cliente: {order.clientName}</p>
                    <p className='font-medium text-gray-900 mt-4 mb-2 text-sm'>Productos Ordenados:</p>
                    <div>
                        {order.orderProducts.length != 0 && order.orderProducts.map((product) =>
                            <div
                                key={product.id}
                                className={"flex items-center border-t border-gray-200 text-xs py-4 last-of-type:p-0 last-of-type:py-4 last-of-type:border-b"}>
                                <dt className='flex-1'>
                                    <span>{"( "}{product.quantity}{" )"}</span>
                                </dt>

                                <dd className='flex-8'>
                                    {product.product.name}
                                </dd>
                            </div>
                        )}


                    </div>
                </div>


                <div className='mt-auto'>
                    <dl className="pt-4 space-y-4">
                        <div className="flex items-center justify-between pt-4">
                            <dt className="text-base font-medium text-gray-900">Total a Pagar:</dt>
                            <dd className="text-base font-medium text-gray-900">{formatPrice(order.total)}</dd>
                        </div>
                    </dl>

                    <form action={handleCompleteOrder}>
                        <input
                            type="hidden"
                            value={order.id}
                            name="orderId"
                        />
                        <input
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-600 text-white w-full mt-5 p-2 uppercase font-bold cursor-pointer text-xs"
                            value='Marcar Orden Completada'
                        />
                    </form>

                </div>


            </div>

        </section>
    )
}

export default AdminOrderCard