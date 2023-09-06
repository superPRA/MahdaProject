export type module = {
    [index: string]: (context: context, helpers: helpers) => modReturn;
}[];

export type poolResponse = {
    command: string;
    rowCount: number;
    oid: number | null;
    rows: any[];
    fields: {
        name: string;
        tableID: number;
        columnID: number;
        dataTypeID: number;
        dataTypeSize: number;
        dataTypeModifier: number;
        format: string;
    }[];
};
export type modReturn =
    | true
    | false
    | void
    | undefined
    | string
    | {
          sql: string;
          value?: any[];
          next?: (res: poolResponse) => any;
          onError?: (err: any) => any;
      }
    | {
          "data-provider": {
              [index: string]: any;
          };
          message?: string;
      }
    | {
          error: string;
          message?: string;
      };


export type context = {
    body: {
        [index: string]: any;
    };
    action: {
        [index: string]: any;
    };
    [index: string]: any;
};

export type helpers = {
    getRandomContinusId: () => string;
};
