const BASIC_API = "https://reqres.in/api/products";

export default async function queryData(page: number = 1) {
  if (page === 1) {
    const response = await fetch(`${BASIC_API}?page=1`);
    const data = await response.json();
    return { page1: data, page2: { data: [] } };
  } else {
    const response1 = await fetch(`${BASIC_API}?page=${page - 1}`);
    const response2 = await fetch(`${BASIC_API}?page=${page}`);
    const data1 = await response1.json();
    const data2 = await response2.json();
    return { page1: data1, page2: data2 };
  }
}
