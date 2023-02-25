export async function callAPI(question) {
  let apiUrl = `http://10k-backend-fastapi.internal:8080/path/${encodeURI(
    question
  )}`;
  let res = await fetch(apiUrl);

  let data = await res.json();
  return data;
}
