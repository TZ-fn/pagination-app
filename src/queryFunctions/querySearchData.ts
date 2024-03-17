const BASIC_API = "https://reqres.in/api/products";

export default async function queryData(searchQuery: number) {
  if (!searchQuery) return {};
  const response = await fetch(`${BASIC_API}?id=${searchQuery}`);
  if (response.ok === false) {
    throw new Error(response.status.toString());
  }
  const data = await response.json();
  return data;
}
