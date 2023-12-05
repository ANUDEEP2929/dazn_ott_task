export class PaginatedResponseDto<T> {
  docs: T[];
  totalRows: number;
  currentPage: number;
  totalPages: number;
}
