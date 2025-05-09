export interface TableProp<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
}
