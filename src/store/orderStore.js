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

    // Cancel entire order
    cancelOrder: (orderId) => {
        const order = get().orders.find((o) => o.id === orderId);
        if (order) {
            set((state) => ({
                orders: state.orders.filter((o) => o.id !== orderId),
                cancellations: [
                    ...state.cancellations,
                    { 
                        ...order, 
                        status: "Cancelled",
                        cancelledAt: new Date().toISOString(),
                        cancellationType: "full_order"
                    },
                ],
            }));
        }
    },

    // Cancel partial quantity of a specific item
    cancelItemQuantity: (orderId, itemId, cancelQuantity) => {
        const state = get();
        const order = state.orders.find((o) => o.id === orderId);
        
        if (!order) return;

        const item = order.items.find((item) => item.id === itemId);
        if (!item || cancelQuantity <= 0 || cancelQuantity > item.quantity) return;

        // Calculate the amount being cancelled
        const cancelledAmount = item.price * cancelQuantity;

        // Create cancelled item record
        const cancelledItem = {
            ...item,
            quantity: cancelQuantity,
            totalPrice: cancelledAmount,
            orderId: orderId,
            cancelledAt: new Date().toISOString(),
            cancellationType: "partial_item"
        };

        set((state) => ({
            orders: state.orders.map((o) => {
                if (o.id === orderId) {
                    const updatedItems = o.items.map((orderItem) => {
                        if (orderItem.id === itemId) {
                            const newQuantity = orderItem.quantity - cancelQuantity;
                            return newQuantity > 0 
                                ? { ...orderItem, quantity: newQuantity }
                                : null;
                        }
                        return orderItem;
                    }).filter(Boolean);

                    // Recalculate subtotal
                    const newSubtotal = updatedItems.reduce((sum, item) => 
                        sum + (item.price * item.quantity), 0
                    );

                    // If no items left, move entire order to cancelled
                    if (updatedItems.length === 0) {
                        return null;
                    }

                    return {
                        ...o,
                        items: updatedItems,
                        subtotal: newSubtotal
                    };
                }
                return o;
            }).filter(Boolean),
            cancellations: [
                ...state.cancellations,
                {
                    id: `cancel_${orderId}_${itemId}_${Date.now()}`,
                    orderId: orderId,
                    originalOrder: order,
                    cancelledItem: cancelledItem,
                    status: "Cancelled",
                    cancelledAt: new Date().toISOString(),
                    cancellationType: "partial_item",
                    cancelledAmount: cancelledAmount
                }
            ]
        }));
    },

    getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
    },

    getCancellationsByOrderId: (orderId) => {
        return get().cancellations.filter((cancellation) => 
            cancellation.orderId === orderId || cancellation.id === orderId
        );
    },

    getAllCancellations: () => {
        return get().cancellations;
    }
}));

export default useOrderStore;