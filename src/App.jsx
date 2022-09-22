import { useEffect, useState } from "react";

import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto">
      {isLoading ? (
        <h1 className="text-center text-6xl">Loading...</h1>
      ) : (
        <>
          <div className="text-3xl text-center pt-5 border-none">
            <ImageSearch searchTerm={setTerm} />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {console.log(images)}
            {images.length === 0 ? (
              <p className="col-start-2 text-center">No images found</p>
            ) : (
              images.map((image) => {
                return <ImageCard key={image.id} image={image} />;
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
