const BASIC_API = "https://reqres.in/api/products";

export default async function queryData(page: number = 1) {
  if (page === 1) {
    const response = await fetch(`${BASIC_API}?page=1`);
    const data = await response.json();
    return { page1: data, page2: { data: [] } };
  } else {
    const response1 = await fetch(`${BASIC_API}?page=${page - 1}`);
    const response2 = await fetch(`${BASIC_API}?page=${page}`);
    const data1 = response1.json();
    const data2 = response2.json();
    const allData = await Promise.all([data1, data2]);
    return { page1: allData[0], page2: allData[1] };
  }
}
