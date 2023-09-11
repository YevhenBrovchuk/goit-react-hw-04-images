import axios from 'axios';
axios.defaults.baseURL = `https://pixabay.com/api/`;
const key = `38409266-8e635f5f4e198de922f25f7f9`;
const perPage = 12;
export const fetchImg = async (name, page) => {
  const params = new URLSearchParams({
    q: name,
    page: page,
    key: key,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: perPage,
  });
  const resp = axios.get(
    `?${params}`
    // `https://pixabay.com/api/?q=${name}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );

  return resp;
};
