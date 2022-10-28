import React, { useEffect, useState } from "react";
import Sportsbook from "../../src/components/Sportsbook";
import axios from "axios";
import {
  useGetMLBQuery,
  useGetNBAQuery,
  useGetNFLQuery,
  useGetNHLQuery,
} from "../../src/redux/slices/apiSlice";
import Loader from "../../src/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { allLogos } from "../../public/teamLogos";
import {
  clearLocalGames,
  setLocalGames,
} from "../../src/redux/slices/localGames-slice";

function Index() {
  const { data: mlb, isSuccess: gotMLB } = useGetMLBQuery();
  const { data: nba, isSuccess: gotNBA } = useGetNBAQuery();
  const { data: nfl, isSuccess: gotNFL, isLoading } = useGetNFLQuery();
  const { data: nhl, isSuccess: gotNHL } = useGetNHLQuery();

  const [status, setStatus] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLng] = useState("");
  const [city, setCity] = useState("");

  const { localGames } = useSelector((state) => state.localGames);

  const dispatch = useDispatch();

  useEffect(() => {
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
      dispatch(clearLocalGames());
      await Promise.all([nba, mlb, nhl, nfl]).then((values) => {
        values.forEach(async (v) => {
          v.length > 0 &&
            (await dispatch(
              setLocalGames(
                v.filter(
                  (game) =>
                    game.HomeTeam.includes(city) || game.AwayTeam.includes(city)
                )
              )
            ));
          // FOR BROOKLYN NETS ONLY FOR NYC
          (await v)
            ? city === "New York" &&
              dispatch(
                setLocalGames(
                  v.filter(
                    (game) =>
                      game.HomeTeam.includes("Brooklyn") ||
                      game.AwayTeam.includes("Brooklyn")
                  )
                )
              )
            : null;
        });
      });
    };

    Promise.all([gotMLB, gotNBA, gotNFL, gotNHL]).then((values) => {
      values.every((v) => v) && getGames();
    });
  }, [gotMLB, gotNBA, gotNFL, gotNHL]);

  return isLoading ? (
    <Loader />
  ) : (
    localGames.length > 0 && (
      <Sportsbook
        data={{ data: localGames.flat(), sport: "index" }}
      ></Sportsbook>
    )
  );
}

export default Index;
