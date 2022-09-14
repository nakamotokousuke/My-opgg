export const getQuery = (query: string) => {
  let url = new URL(window.location.href); // URLを取得
  let params = url.searchParams; // URLSearchParamsオブジェクトを取得
  const platform = params.get(query);
  return platform;
};
