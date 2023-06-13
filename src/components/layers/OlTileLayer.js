import React, { useEffect } from "react";
import TileLayer from "ol/layer/Tile";
import useMapStore from "../zuStore/mapStore";
import {OSM} from "ol/source";

export const OlTileLayer = ({ source, name }) => {
  const map = useMapStore((state) => state.map);

  useEffect(() => {
    if (!map) return;

    let Tlayer = new TileLayer({
      source: new OSM({
        url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
      }),
      name,
    });
    Object.assign(map, {id: "tailLayer"});
    map.addLayer(Tlayer);

    const element = map.getViewport().getElementsByClassName('ol-attribution').item(0).style.display='none'

    return () => map.removeLayer(Tlayer);
  });
  return null;
};
