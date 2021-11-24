import React, { useEffect, useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from './components/Modal';



function App() {
  const [activeItem, setActiveItem] = useState({
    title: "",
    artist: "",
    rating: 1
  });
  const [albumList, setAlbumList] = useState([]);
  const [modal, setModal] = useState(false);

  async function djangoFetch() {
    try {
      const res = await fetch('http://localhost:8000/api/albums/');
      const albumListRes = await res.json();
      setAlbumList(albumListRes)
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    djangoFetch()
  }, [albumList]);

  const toggle = () => {
    setModal(!modal)
  }

  const handleSubmit = item => {
    toggle();

    if (item.id) {
      axios.put(
        `http://localhost:8000/api/albums/${item.id}`,
        item
      )
      .then(
        djangoFetch()
      )
    } else {
      axios.post(
        'http://localhost:8000/api/albums/',
        item
      )
      .then(
        djangoFetch()
      )
    }
  };

  const createItem = () => {
    const item = {title: "", artist: "", rating: 1};
    setActiveItem(item);
    setModal(!modal);
  };

  const renderItems = (
    <div>
      <div className="text-center">
      <h2>My Albums</h2>
      </div>
      {albumList.map(album => (
        <li
          key={album.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span
            className="album-title mr-2"
          >
            <strong>{album.title}</strong><br/>
            <em>by {album.artist}</em><br/>
            rating: {album.rating}/5
          </span>
        </li>
      ))}
    </div>
  );


  return (
    <main className="content">
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <ul className="list-group list-group-flush">
                {renderItems}
              </ul>
              <div className="mx-auto p-2">
                <button onClick={createItem} className="btn btn-success">Add Album</button>
              </div>
            </div>
          </div>
        </div>
        {modal ? (
          <Modal
            currentItem={activeItem}
            toggle={toggle}
            onSave={handleSubmit}
          />
        ): null}
      </main>
      );
}

export default App;
