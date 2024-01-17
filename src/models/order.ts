
export default interface Order {
    id_order:string,
    order_delivery_date: string;
    total_ordered_price: number | null;
    status: string;
    document_provider: string;
    document_grocer:string;
    products: string[];
}