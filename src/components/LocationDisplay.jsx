import React, { useEffect, useState, useRef } from "react";
import { FaImages } from "react-icons/fa";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

const libraries = ["places"];

const LocationDisplay = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);
  const [places, setPlaces] = useState([]);
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API, // 여기에 실제 Google Maps API 키를 입력하세요.
    libraries, // 이미 정의된 libraries 배열 사용
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          if (isLoaded) {
            fetchPlaces(position.coords.latitude, position.coords.longitude);
            fetchAddress(position.coords.latitude, position.coords.longitude);
          }
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, [isLoaded]);

  const fetchPlaces = async (latitude, longitude) => {
    if (!isLoaded) return;

    try {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      const request = {
        location: new window.google.maps.LatLng(latitude, longitude),
        radius: "500",
        type: ["tourist_attraction"],
      };

      const nearbySearch = () =>
        new Promise((resolve, reject) => {
          service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              resolve(results);
            } else {
              reject(status);
            }
          });
        });

      const results = await nearbySearch();
      setPlaces(results.slice(0, 5)); // 3개 추천
    } catch (error) {
      setError(`Error fetching places: ${error}`);
    }
  };

  const fetchAddress = async (latitude, longitude) => {
    if (!isLoaded) return;

    try {
      const geocoder = new window.google.maps.Geocoder();
      const latlng = new window.google.maps.LatLng(latitude, longitude);

      const geocode = () =>
        new Promise((resolve, reject) => {
          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                resolve(results[0].formatted_address);
              } else {
                reject("No results found");
              }
            } else {
              reject(`Geocoder failed due to: ${status}`);
            }
          });
        });

      const address = await geocode();
      console.log(address);
      console.log(typeof address);
      setAddress(address);
    } catch (error) {
      setError(`Error fetching address: ${error}`);
    }
  };

  const onLoadMap = (map) => {
    mapRef.current = map;
    new window.google.maps.Marker({
      position: { lat: location.latitude, lng: location.longitude },
      map,
      title: "현재 위치",
    });
  };

  if (loadError) {
    return <div>Google Maps API를 로드하는 동안 오류가 발생했습니다.</div>;
  }

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">현재 위치</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex flex-col items-center justify-center">
          {location.latitude && location.longitude ? (
            isLoaded ? (
              <>
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "400px" }}
                  center={{
                    lat: location.latitude,
                    lng: location.longitude,
                  }}
                  zoom={15}
                  onLoad={onLoadMap}
                />
                <div className="mt-4">
                  <h2 className="text-xl font-bold mb-2">현재 주소</h2>
                  <p className="text-md mb-4">{address}</p>
                  <h2 className="text-xl font-bold mb-2">추천 명소</h2>
                  {places.length === 0 && <p>주변에 추천 명소가 없습니다.</p>}
                  {places.map((place) => (
                    <div
                      key={place.place_id}
                      className="bg-white shadow-md rounded-lg overflow-hidden my-4 flex flex-row"
                    >
                      <div
                        className="relative w-1/3"
                        style={{ paddingBottom: "33.33%" }}
                      >
                        {place.photos && place.photos[0] ? (
                          <img
                            src={place.photos[0].getUrl()}
                            alt={place.name}
                            className="absolute h-full w-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                            <FaImages size={50} />
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col justify-center w-2/3">
                        <h2 className="text-xl font-bold">{place.name}</h2>
                        <p className="text-md mb-2">{place.vicinity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-gray-700">지도 로딩 중...</p>
            )
          ) : (
            <p className="text-gray-700">위치 정보를 불러오는 중...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationDisplay;
