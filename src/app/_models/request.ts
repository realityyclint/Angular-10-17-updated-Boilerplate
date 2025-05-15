export interface RequestItem {
    name: string;
    quantity: number;
}

export interface Request {
    id?: number;
    type: string;
    description?: string;
    status?: string;
    employeeId: number;
    items?: RequestItem[]; // Include this to send/receive RequestItems
    createdAt?: string;
    updatedAt?: string;
}
