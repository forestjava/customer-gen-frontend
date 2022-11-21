const endpoint: string = import.meta.env.VITE_API_ENDPOINT;
const secret: string = import.meta.env.VITE_API_SECRET;

const requestInit: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
    'x-bag-secret': secret,
  },
};

export function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    // common 200 `errors` handler could be here
    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
