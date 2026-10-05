import OrderSidebar from "@/app/components/orders/OrderSidebar"
import OrderSummary from '../components/orders/OrderSummary';
import ToastNotification from "../components/ui/ToastNotification";

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