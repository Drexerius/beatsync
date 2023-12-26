import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery, useGetArtistSongsQuery } from "../redux/services/shazam";

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails, error: errorDetails } = useGetArtistDetailsQuery(artistId);
  const { data: artistSongs, isFetching: isFetchingArtistSongs, error: errorSongs} = useGetArtistSongsQuery(artistId);

  if (isFetchingArtistDetails || isFetchingArtistSongs) return <Loader title="Loading artits details..." />
  if (errorSongs || errorDetails) return <Error />
  
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData.data[0]} />
      
      <RelatedSongs
        data={artistSongs}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />

    </div>
  )

}

export default ArtistDetails;
