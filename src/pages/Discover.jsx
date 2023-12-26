import { useDispatch, useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
// import { genres } from '../assets/constants';

import { useGetSongsByGenreQuery, useGetChartsListQuery } from "../redux/services/shazam";
import { selectGenreListId } from "../redux/features/playerSlice";

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);
  const { data : ListData, isFetching: isFetchingList, error: errorList } = useGetChartsListQuery();
  const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'genre-global-chart-1');
  
  if (isFetching || isFetchingList) return <Loader title="Loading songs..." />
  if (error) return <Error />
  
  let genres = []
  ListData.global.genres.map((e) => {
    genres.push({title: e.name, value:e.listid})
  })
  
  const genreTitle = genres.find(({value}) => value===genreListId)?.title;
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center
      sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>
        <select 
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || 'Pop'}
          className="bg-black text-gray-300 p-3 text-sm rouned-lg outline-none sm:mt-0 mt-5"
          >
            {genres.map((genre)=><option key={genre.value} value={genre.value}>{genre.title}</option>)}
          </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data.tracks.map((song, i)=> (
          <SongCard 
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data.tracks}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
