type Sort = "asc" | "desc";

interface ExecutePaginationProps {
  limit: number;
  page: number;
  sort: Sort;
  productUrl: string;
  docs: number;
  products: any;
}

export const executePagination = ({
  page,
  limit,
  sort,
  productUrl,
  docs,
  products,
}: ExecutePaginationProps) => {
  const baseUrl: string = `/api/${productUrl}?limit=${limit}&sort=${sort}`;

  const hasPrevPage: boolean = page > 1;
  const hasNextPage: boolean = page < docs;

  const prevPage: number | null = hasPrevPage ? page - 1 : null;
  const nextPage: number | null = hasNextPage ? page + 1 : null;
  const status: number | string = products.length === 0 ? "error" : "success";
  const prevLink: string | null = hasPrevPage
    ? `${baseUrl}&page=${prevPage}`
    : null;
  const nextLink: string | null = hasNextPage
    ? `${baseUrl}&page=${nextPage}`
    : null;

  const totalPages: number = Math.ceil(docs / limit);

  const results = {
    status,
    payload: products,
    page,
    docs,
    totalPages,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    prevLink,
    nextLink,
  };

  if (page >= totalPages) {
    results.hasNextPage = false;
    results.nextPage = null;
    results.nextLink = null;
  }

  return results;
};
