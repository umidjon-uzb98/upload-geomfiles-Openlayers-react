import {useEffect} from "react";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {DragAndDrop} from "ol/interaction";
import {GeoJSON, GPX, IGC, KML, MVT, TopoJSON} from "ol/format";
import {getCenter, getHeight, getWidth} from 'ol/extent'
import useMapStore from "../zuStore/mapStore";

export const DragDropFiles = () => {
    const {map, setDragLayerId, setReRenderModify} = useMapStore((state) => state);

    useEffect(() => {
        if (!map) return;

        // const extractStyles = document.getElementById('map');
        let dragAndDropInteraction;

        function setInteraction() {
            if (dragAndDropInteraction) {
                map.removeInteraction(dragAndDropInteraction);
            }
            dragAndDropInteraction = new DragAndDrop({
                formatConstructors: [
                    GPX,
                    GeoJSON,
                    IGC,
                    TopoJSON,
                    KML,MVT
                ],
            });
            dragAndDropInteraction.on('addfeatures', function (event) {
                const vectorSource = new VectorSource({
                    features: event.features,
                });
                let layer = new VectorLayer({
                    source: vectorSource,
                })
                Object.assign(layer, {id: "dragAndDropLayer"})
                setDragLayerId("dragAndDropLayer");
                setReRenderModify()
                map.addLayer(
                    layer
                )

                let extend = layer.getSource().getExtent();
                let view = map.getView();
                const w = getWidth(extend)
                const h = getHeight(extend)
                const resolution = Math.max(w / map.getSize()[0], h / map.getSize()[1]);
                const zoom = Math.log2(360 / (resolution * 256));
                view.animate({
                    zoom: zoom,
                    center: getCenter(extend),
                    duration: 3000
                })
            });
            map.addInteraction(dragAndDropInteraction);
        }

        setInteraction();

        return () => map.removeInteraction(dragAndDropInteraction);
    }, [map]);
    return null;
}

