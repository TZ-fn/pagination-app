import BASIC_API_URL from "../constants/BASIC_API_URL";

export default async function queryData(searchQuery: number) {
  if (!searchQuery) return {};
  const response = await fetch(`${BASIC_API_URL}?id=${searchQuery}`);
  if (response.ok === false) {
    throw new Error(response.status.toString());
  }
  const data = await response.json();
  return data;
}
