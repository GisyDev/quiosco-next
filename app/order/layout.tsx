import OrderSidebar from "@/app/components/order/OrderSidebar"
import OrderSummary from '../components/order/OrderSummary';
import ToastNotification from "../ui/ToastNotification";
const OrderLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <>
            <div className="flex justify-between">
                <OrderSidebar />

                {children}

                <OrderSummary/>
            </div>
            <ToastNotification/>
        </>
    )
}

export default OrderLayout