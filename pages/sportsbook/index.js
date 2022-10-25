import React, { useEffect, useState } from "react";
import Sportsbook from "../../src/components/Sportsbook";
import axios from "axios";
import {
  useGetMLBQuery,
  useGetNBAQuery,
  useGetNFLQuery,
  useGetNHLQuery,
} from "../../src/redux/slices/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearGames, setGames } from "../../src/redux/slices/localGames-slice";
import Loader from "../../src/components/Loader";

function Index() {
  const { data: mlb, isSuccess: gotMLB } = useGetMLBQuery();
  const { data: nba, isSuccess: gotNBA } = useGetNBAQuery();
  const { data: nfl, isSuccess: gotNFL } = useGetNFLQuery();
  const { data: nhl, isSuccess: gotNHL } = useGetNHLQuery();

  const [status, setStatus] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLng] = useState("");
  const [city, setCity] = useState("");

  const { localGames } = useSelector((state) => state.localGames);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearGames());
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }

    const getCity = async () => {
      let { data } = await axios.get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
      );
      data.city == "New York City"
        ? await setCity("New York")
        : await setCity(data.city);
    };

    getCity();

    const getGames = async () => {
      await Promise.all([nba, mlb, nhl, nfl]).then((values) => {
        values.forEach((v) => {
          v.length > 0 &&
            dispatch(
              setGames(
                v.filter(
                  (game) =>
                    game.HomeTeam.includes(city) || game.AwayTeam.includes(city)
                )
              )
            );
          // FOR BROOKLYN NETS ONLY FOR NYC
          city === "New York" &&
            dispatch(
              setGames(
                v.filter(
                  (game) =>
                    game.HomeTeam.includes("Brooklyn") ||
                    game.AwayTeam.includes("Brooklyn")
                )
              )
            );
        });
      });
    };

    city &&
      Promise.all([gotMLB, gotNBA, gotNFL, gotNHL]).then((values) => {
        values.every((v) => v) && getGames();
      });

    console.log(localGames);
  }, [gotMLB, gotNBA, gotNFL, gotNHL]);

  return (
    localGames.length > 0 &&
    (isLoading ? <Loader /> : <Sportsbook data={{ data, sport }} />)
  );
}

export default Index;
