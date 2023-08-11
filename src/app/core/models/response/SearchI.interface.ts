export interface SearchResponse{
   pageNo ?: number | null | undefined,
   pageSize ?: number | null | undefined ,
   total ?: number | null | undefined,
   items ?: any| null | undefined,
   success : boolean,
   message ?: string | null | undefined
}