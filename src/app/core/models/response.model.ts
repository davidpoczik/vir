export interface Response {
    success: boolean,
    data: any,
    message: string
}

export interface PaginationResponse {
    page: number,
    limit: number,
    search?: string
}