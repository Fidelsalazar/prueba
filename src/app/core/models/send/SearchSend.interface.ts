export interface SearchSend{
  "pageNo" : number | null | undefined;
  "pageSize": number | null | undefined;
  "filters" : { Alias: string; Value: string; }[] | null;
}