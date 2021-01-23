import React from 'react'
import { Link } from 'react-router-dom'

const SelectedImage = ({ index, photo }) => {
  return (
    <div>
      <Link to={`/recipe/${index + 1}`}>
        <div class="relative z-0">
          <img alt={photo.title} {...photo} />
          <div class="opacity-0 hover:opacity-100 z-10 absolute inset-0 bg-blue-900 bg-opacity-75">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-xl text-center text-white p-4">{photo.alt}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SelectedImage
