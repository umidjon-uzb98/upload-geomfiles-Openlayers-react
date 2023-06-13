import {message} from "antd";
import toGeoJSON from "togeojson";
import JSZip from "jszip";

export const kmzFileToKml = async (file,) => {
    try {
        if (file) {
            return getKmlDom(file).then((kmlDom) => {
                    let geoJsonObject = toGeoJSON.kml(kmlDom);
                    return JSON.stringify(geoJsonObject);
                })
        }
    } catch (e) {
        message.error("Error catch kmzFileToKml")
    }
}

export const getDom = (xml) => new DOMParser().parseFromString(xml, 'text/xml');

export const getExtension = (fileName) => fileName.split('.').pop();

export const getKmlDom = (kmzFile) => {
    let zip = new JSZip();
    return zip.loadAsync(kmzFile).then((zip) => {
        let kmlDom = null;
        zip.forEach((relPath, file) => {
            if (getExtension(relPath) === 'kml' && kmlDom === null) {
                kmlDom = file.async('string').then(getDom);
            }
        });
        return kmlDom || Promise.reject('No KML file found');
    });
};