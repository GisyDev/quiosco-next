import OrderSidebar from "@/app/components/order/OrderSidebar"
import OrderSummary from '../components/order/OrderSummary';
const OrderLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <>
            <div className="flex justify-between">
                <OrderSidebar />

                {children}

                <OrderSummary/>
            </div>
        </>
    )
}

export default OrderLayout