import {useEffect} from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {getCenter, getHeight, getWidth} from 'ol/extent'
import useMapStore from "../zuStore/mapStore";
import useGeoJsonStore from "../zuStore/GeoJsonStore";
import {GeoJSON} from "ol/format";
import {Fill, Stroke, Style} from "ol/style";
import {Circle} from "ol/geom";
import CircleStyle from "ol/style/Circle";

export const LayerFromFile = () => {
    const map = useMapStore((state) => state.map);
    const {mapSourceFromFile, removeMapSourceFromFile} = useGeoJsonStore((state) => state);

    useEffect(() => {
        if (!map || !mapSourceFromFile) return;
        let layer = null;
        let features = new GeoJSON().readFeatures(mapSourceFromFile);
        let source = new VectorSource({
            features: features
        })

        let style = null

        // style = new Style({
        //     fill: new Fill({
        //         color: 'rgba(200, 255, 111, 0.3)'
        //     }),
        //     stroke: new Stroke({
        //         color: 'rgba(120, 255, 0, 1)',
        //         width: 1.5,
        //         lineDash: [4, 10]
        //     }),
        //     image: new CircleStyle({
        //         fill: new Fill({
        //             color: 'rgba(100, 255, 0, 0.6)',
        //         }),
        //         radius: 7,
        //         stroke: new Stroke({
        //             color: 'rgba(100, 255, 0, 1)',
        //             width: 2.5
        //         }),
        //     })
        //
        // })

        layer = new VectorLayer({
            source: source,
        })
        if (layer) {
            Object.assign(layer, {id: "layerMadeFromFile"});
            map?.addLayer(layer);
        }

        let coordinates = features?.map(item => (item.getGeometry().getExtent())).flat()
        const w = getWidth(coordinates)
        const h = getHeight(coordinates)
        const resolution = Math.max(w / map.getSize()[0], h / map.getSize()[1]);
        const zoom = Math.log2(360 / (resolution * 256));

        let view = map.getView();
        view.animate({
            zoom: zoom,
            center: getCenter(coordinates),
            duration: 3000
        })

        return () => {
            removeMapSourceFromFile()
            // map?.removeLayerById("layerMadeFromFile")
        };
    }, [map, mapSourceFromFile]);
    return null;
}

