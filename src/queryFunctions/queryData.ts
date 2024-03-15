const BASIC_API = "https://reqres.in/api/products";

export default async function queryData() {
  const response = await fetch(BASIC_API);
  const data = await response.json();
  return data;
}
