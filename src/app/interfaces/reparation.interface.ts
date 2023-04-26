
export interface Reparation {
    id?: number;
    date: Date,
    status: string;
    type_rep: string;
    reparation: string;
    price: string;
    bill_number?: string;
    users_id?: number;
    cars_id ?: number;
}
