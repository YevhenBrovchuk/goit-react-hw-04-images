import { useEffect, useState } from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Button } from './button/Buutton';
import { fetchImg } from 'helperApi';
import { Loader } from './loader/Loader';
import { ModalImg } from './modal/Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState('');
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');
  // const [randomId, setRandomId] = useState('');

  const handleSubmit = evt => {
    setQuery(evt);
    setImages([]);
    setPage(1);
    // setRandomId(Date.now());
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = evt => {
    setIsOpen(true);
    setModalImg(evt);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalImg('');
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    async function addImg() {
      try {
        setLoading(true);
        setError(false);
        const img = await fetchImg(query, page);

        const imghelper = img.data.hits.map(item => ({
          id: item.id,
          webformatURL: item.webformatURL,
          largeImageURL: item.largeImageURL,
        }));

        setImages(prevState => [...prevState, ...imghelper]);

        setShowBtn(Math.ceil(img.data.totalHits / 12));
      } catch (error) {
        // setError(true);
      } finally {
        setLoading(false);
      }
    }

    addImg();
  }, [query, page]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onAdd={handleSubmit}></Searchbar>

      {images.length > 0 && (
        <ImageGallery items={images} openModalImg={openModal} />
      )}

      {showBtn && images.length > 0 && (
        <Button onClickBtn={handleLoadMore}></Button>
      )}

      {loading && <Loader />}
      {isOpen && (
        <ModalImg
          imgItem={modalImg}
          isOpen={isOpen}
          onRequestClose={closeModal}
        />
      )}
    </div>
  );
};
