import BASIC_API_URL from "../constants/BASIC_API_URL";

export default async function queryData(page: number = 1) {
  if (page === 1) {
    const response = await fetch(`${BASIC_API_URL}?page=1`);
    if (response.ok === false) {
      throw new Error(response.status.toString());
    }
    const data = await response.json();
    return { page1: data, page2: { data: [] } };
  } else {
    const response1 = await fetch(`${BASIC_API_URL}?page=${page - 1}`);
    const response2 = await fetch(`${BASIC_API_URL}?page=${page}`);
    if (response1.ok === false || response2.ok === false) {
      const invalidResponseStatus = response1.ok === false ? response1.status : response2.status;
      throw new Error(invalidResponseStatus.toString());
    }
    const data1 = response1.json();
    const data2 = response2.json();
    const allData = await Promise.all([data1, data2]);
    return { page1: allData[0], page2: allData[1] };
  }
}
