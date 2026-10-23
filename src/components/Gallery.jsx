import React, { useState, useReducer, useCallback, useMemo } from "react";
import { useFetchPhotos } from "../hooks/useFetchPhotos";
import {
  favouritesReducer,
  getInitialFavourites,
} from "../reducers/favouritesReducer";
import SearchBar from "./SearchBar";
import PhotoCard from "./PhotoCard";

const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState("");
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    getInitialFavourites,
  );

  // useCallback prevents re-creating the input change handler on every re-render
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // useReducer action dispatcher for toggling favourites
  const handleToggleFavourite = (id) => {
    dispatch({ type: "TOGGLE_FAVOURITE", payload: id });
  };

  // useMemo recomputes the filtered list only when photos or searchTerm changes
  const filteredPhotos = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return photos;
    return photos.filter((photo) => photo.author.toLowerCase().includes(query));
  }, [photos, searchTerm]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Photo Gallery
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Explore curated shots and save your favorites
        </p>
      </header>

      {/* Author Search Bar */}
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      {/* Loading Spinner State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-10 h-10 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-sm text-gray-500">
            Loading gallery photos...
          </p>
        </div>
      )}

      {/* Error Message State */}
      {error && !loading && (
        <div className="max-w-md mx-auto text-center p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 font-medium">Unable to load photos</p>
          <p className="text-xs text-red-500 mt-1">{error}</p>
        </div>
      )}

      {/* Photo Grid: 1 col mobile, 2 col tablet, 4 col desktop */}
      {!loading && !error && (
        <>
          {filteredPhotos.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-sm">
                No photos found matching &quot;{searchTerm}&quot;
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  isFavourite={favourites.includes(photo.id)}
                  onToggleFavourite={handleToggleFavourite}
                />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Gallery;
