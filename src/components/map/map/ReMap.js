import './Map.css';
import React, {useEffect, useRef} from "react";
import Map from "ol/Map";
import View from "ol/View";
import "../../../../node_modules/ol/ol.css";
import useMapStore from "../../zuStore/mapStore";
import UploadGeomsFile from "../../UploadFileComponent/UploadGeomsFile";
import {Divider} from "antd";
import V2UploadGeomsFile from "../../UploadFileComponent/V2UploadGeomsFile";

export const ReMap = ({children}) => {
    const setMap = useMapStore((state) => state.populateMap);
    const destroyMap = useMapStore((state) => state.removeMap);
    const mapId = useRef();

    useEffect(() => {
        let theMap = new Map({
            layers: [],
            view: new View({
                projection: "EPSG:4326",
                center: [0, 0],
                zoom: 4,
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

        theMap.setTarget(mapId.current);
        setMap(theMap);
        return () => {
            if (!theMap) return;
            theMap.setTarget(undefined);
            destroyMap();
        };
    }, []);

    return (
        <>
            <div ref={mapId} className='map'>
                {children}
            </div>

            <Divider style={{width: "70rem"}}>
                {/*<UploadGeomsFile/>*/}
                <V2UploadGeomsFile/>
            </Divider>
        </>
    );
};
