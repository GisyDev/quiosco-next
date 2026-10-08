"use client"

import { useStore } from '@/src/store/store'
import { formatPrice } from '@/src/lib/formatPrice';
import SummaryCard from './SummaryCard';
import { createOrder } from '@/app/actions/createOrder';
import { OrderSchema } from '@/src/schema';
import { toast } from 'react-toastify';



const OrderSummary = () => {
  const productCart = useStore((state) => state.order)
  const subTotal = productCart.reduce((acumulador, actual) => acumulador + actual.subtotal, 0);

  const clearOrder = useStore((state) => state.clearOrder)

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      total: subTotal,
      order: productCart
    }

    const result = OrderSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.forEach((issue) => toast.error(issue.message))
      return
    }

    const response = await createOrder(result.data)


    if (response) {
      if (response.errors && !response.success) {
        response.errors.forEach((e) => toast.error(e.message))
        return
      }
      toast.success(response.message)
      clearOrder()
    }
  }

  return (
    <aside className='h-screen overflow-y-scroll w-[32%] md:w-[25%] p-3 space-y-4'>
      <h1 className='text-center font-black text-3xl mt-3'>Mi pedido</h1>

      <div className='mt-3'>

        <div>
          {
            productCart.length != 0 ?

              <div>
                <div>
                  {
                    productCart.map((product) => (
                      <SummaryCard key={product.id} product={product} />
                    ))
                  }
                </div>

                <div className='flex flex-col items-center justify-center mt-15 gap-5 w-full '>
                  <p>Total a pagar: <strong>{formatPrice(subTotal)}</strong></p>
                  <form action={handleCreateOrder} className='w-full space-y-3'>
                    <input type="text" placeholder='Tu nombre' className='bg-white p-2 text-xs w-full placeholder:text-gray-100 border border-gray-200' name='name' />
                    <input type="submit" value={"Confirmar pedido"}
                      className='w-full font-bold bg-black text-white uppercase p-2 text-xs cursor-pointer'
                    />
                  </form>
                </div>
              </div>

              : <p className='text-center text-gray-500 mt-3 text-sm'>No hay nada en el carrito</p>
          }
        </div>



      </div>




    </aside>
  )
}

export default OrderSummary