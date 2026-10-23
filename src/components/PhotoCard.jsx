import React from "react";

const PhotoCard = ({ photo, isFavourite, onToggleFavourite }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 flex flex-col">
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <img
          src={`https://picsum.photos/id/${photo.id}/500/350`}
          alt={photo.author}
          loading="lazy"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex items-center justify-between mt-auto">
        <p className="text-sm font-medium text-gray-800 truncate pr-2">
          {photo.author}
        </p>

        <button
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={
            isFavourite ? "Remove from favourites" : "Add to favourites"
          }
          className="p-1.5 rounded-full hover:bg-rose-50 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-400"
        >
          <svg
            className={`w-6 h-6 transition-colors duration-200 ${
              isFavourite
                ? "text-rose-500 fill-rose-500"
                : "text-gray-400 fill-transparent hover:text-rose-400"
            }`}
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;
