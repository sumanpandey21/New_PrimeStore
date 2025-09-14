import { create } from "zustand";

const useOrderStore = create((set, get) => ({
    orders: [],
    cancellations: [],
    addOrder: (order) =>
        set((state) => ({
            orders: [...state.orders, order],
        })),


    updateOrderStatus: (orderId, status) =>
        set((state) => ({
            orders: state.orders.map((order) =>
                order.id === orderId ? { ...order, status } : order
            ),
        })),

    updatePaymentStatus: (orderId, paymentStatus) =>
        set((state) => ({
            orders: state.orders.map((order) =>
                order.id === orderId ? { ...order, paymentStatus } : order
            ),
        })),

    removeOrder: (orderId) =>
        set((state) => ({
            orders: state.orders.filter((order) => order.id !== orderId),
        })),

    cancelOrder: (orderId) => {
        const order = get().orders.find((o) => o.id === orderId);
        if (order) {
            set((state) => ({
                orders: state.orders.filter((o) => o.id !== orderId),
                cancellations: [
                    ...state.cancellations,
                    { ...order, status: "Cancelled" },
                ],
            }));
        }
    },

    getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
    },
}));

export default useOrderStore;
