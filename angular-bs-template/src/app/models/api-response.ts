export class CustomApiResponse<T> {
    constructor(public data: T, public meta: Metadata) {}
  }

  export class Metadata {
    constructor(
      public TotalCount: number,
      public PageSize: number,
      public CurrentPage: number,
      public TotalPages: number,
      public HasNextPage: boolean,
      public HasPreviousPage: boolean,
      public NextPageUrl: string,
      public PreviousPageUrl: string
    ) {}
  }
