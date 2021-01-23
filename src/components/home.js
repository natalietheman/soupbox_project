import React, { useState, useEffect, useContext, useCallback } from 'react'
import axios from 'axios'
import Gallery from 'react-photo-gallery'
import { LanguageContext } from '../containers/language'
import SelectedImage from './selectedImage'

const Home = () => {
  // Loop through an array of objects
  const photos = []
  function populatePhotos(data) {
    data.forEach(item => {
      const photo = {
        src: require(`../images/gallery/${item.recipe_id}.JPG`),
        id: item.recipe_id,
        alt: item.name,
        width: item.width,
        height: item.height,
      }
      photos.push(photo)
    })
  }

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState([])
  const { userLanguage } = useContext(LanguageContext)

  const api = {
    url: `${process.env.REACT_APP_API_URL}/gallery/${userLanguage}`,
    method: 'get',
  }

  const fetchData = async () => {
    try {
      setIsError(false)
      setIsLoading(true)
      const result = await axios(api)
      setData(result.data)
      setIsLoading(false)
    } catch (err) {
      setIsError(true)
      console.log(err.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [userLanguage])

  const imageRenderer = useCallback(
    ({ index, key, photo }) => (
      <SelectedImage key={key} index={index} photo={photo} />
    ),
    [],
  )

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <div>
          {populatePhotos(data)}
          <Gallery photos={photos} renderImage={imageRenderer} margin={0} />
        </div>
      )}
    </div>
  )
}

export default Home
