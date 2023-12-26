import { buildCreateApi, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const shazamApi = createApi({
  reducerPath: 'shazamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', 'eba1824048mshf3f16d4bb006ddfp1c7f90jsnc779055575c8')

      return headers;
    }
  }),
  endpoints: (builder) => ({
    getChartsList: builder.query({ query: () => `/charts/list` }),
    getChartTrack: builder.query({ query: () => '/charts/track' }),
    getSongDetails: builder.query({ query: ({ songid }) => `/songs/get-details?key=${songid}` }),
    getSongRelated: builder.query({ query: ({ songid }) => `/songs/get-related-artist?id=${songid}` }),
    getArtistDetails: builder.query({ query: (artistid) => `/artists/get-details?id=${artistid}` }),
    getArtistSongs: builder.query({ query: (artistid) => `/artists/get-top-songs?id=${artistid}` }),
    getSongsByCountry: builder.query({ query: (country) => `/charts/track?listId=ip-country-chart-${country}` }),
    getTopCharts: builder.query({ query: () => `/charts/track?listId=ip-country-chart-JP` }),
    getSongsByGenre: builder.query({ query: (genre) => `/charts/track?listId=${genre}` }),
    getSongsBySearch: builder.query({ query: (searchTerm) => `/search?term=${searchTerm}` }),
  })
})

export const {
  useGetChartsListQuery,
  useGetChartTrackQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetArtistSongsQuery,
  useGetSongsByCountryQuery,
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsBySearchQuery,
} = shazamApi