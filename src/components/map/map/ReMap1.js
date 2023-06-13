import './Map.css';
import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import "../../../../node_modules/ol/ol.css";
import useMapStore from "../../zuStore/mapStore";

export const ReMap = ({ children, zoom, center }) => {
  const map = useMapStore((state) => state.map);
  const setMap = useMapStore((state) => state.populateMap);
  const destroyMap = useMapStore((state) => state.removeMap);
  const mapId = useRef();

  useEffect(() => {
    let theMap = new Map({
      target: mapId.current,
      layers: [],
      view: new View({
        projection: "EPSG:4326",
        center: [65.0, 42.312355],
        zoom: 6,
      }),
    });

    Object.assign(theMap, {
      getLayerById: (id) => {
        return theMap?.getAllLayers()?.find(item => item?.id === id)
      },
      layerFindBiyId: (id) => {
        return theMap.getAllLayers().filter(item => item?.id === id)
      },
      removeLayerById: (id) => {
        let layer = theMap.getAllLayers()?.find(item => item?.id === id);
        if (layer) {
          theMap.removeLayer(layer)
        }
      }
    })

    setMap(theMap);
    // Object.assign(window, {theMap})
    return () => {
      if (!theMap) return;
      theMap.setTarget(undefined);
      removeMap();
    }
  }, []);

  return (
    <div ref={mapId} className='map'>
      {children}
    </div>
  );
};
