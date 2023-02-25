export async function callAPI(question) {
  let apiUrl = `https://10k-backend-fastapi.fly.dev/path/${encodeURI(
    question
  )}`;
  let res = await fetch(apiUrl);

  let data = await res.json();
  return data;
}
