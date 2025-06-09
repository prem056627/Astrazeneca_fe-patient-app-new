import * as Location from "expo-location";
import { useState, useEffect } from "react";

export const useGetCurrentPosition = () => {
  const [coordinates, setCoordinates] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("location", location);
      setCoordinates(location.coords);
    })();
  }, []);

  return { coordinates: coordinates };
};
