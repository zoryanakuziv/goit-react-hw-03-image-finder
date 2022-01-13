const KEY = "21953408-9a5de6ff69ebf5e97d9ab4bfd";
const BASE_URL = "https://pixabay.com/api/";

function getImages(query, page = 1) {
  return fetch(
    `${BASE_URL}?key=${KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`No results for ${query}`));
  });
}
const api = { getImages };

export default api;
