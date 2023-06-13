import React, {useEffect, useState} from 'react';
import {Button, Divider, message, Upload} from "antd";
import {KML, GeoJSON, MVT as KMZ} from "ol/format";
import useGeoJsonStore from "../zuStore/GeoJsonStore";
import JSZip from "jszip";
import * as tj from 'togeojson';
import {getKmlDom} from "./fileConvertService";
import toGeoJSON from "togeojson";

function UploadGeomsFile() {
    const [fileData, setFileData] = useState(null);
    const {setMapSourceFromFile, removeMapSourceFromFile} = useGeoJsonStore((state) => state);

    const handleFileUpload = (file) => {
        removeMapSourceFromFile()
        const fileExt = file.name.split('.').pop().toLowerCase();

        const reader = new FileReader();

        reader.onremove = (e) => {
            console.log("click deletebtn", e)
        }
        reader.onload = (e) => {
            const fileContent = e.target.result;
            setFileData(null);

            let features
            let geojson
            if (fileExt === 'kml') {
                features = new KML().readFeatures(fileContent)
                geojson = new GeoJSON().writeFeatures(features);
                setMapSourceFromFile(geojson);
                setFileData(geojson);
            } else if (fileExt === 'geojson') {
                geojson = fileContent
                setMapSourceFromFile(geojson);
                setFileData(geojson);
            } else if (fileExt === "kmz") {
                console.log("KMZ")
                let geoJson = getKmlDom(file).then((kmlDom) => {
                    let geoJsonObject = toGeoJSON.kml(kmlDom);
                    return JSON.stringify(geoJsonObject);
                });
                geoJson.then((gj) => {
                    setMapSourceFromFile(gj)
                });
            } else if (fileExt === 'json') {
                geojson = fileContent
                setMapSourceFromFile(geojson);
                setFileData(geojson);
            }
            message.success('File uploaded successfully!');
        };
        reader.onerror = () => {
            message.error('Error occurred while uploading the file.');
        };
        reader.readAsText(file);
    };

    useEffect(() => {
    }, [fileData, handleFileUpload])

    return (
        <Divider>
            <Upload onRemove={() => {
                setFileData(null)
            }}
                    maxCount={1}
                    accept=".json, .geojson, .kml, .kmz"
                // accept=".geojson, .kml"
                    beforeUpload={(file) => {
                        /*handleFileUpload(file);*/
                        handleFileUpload(file);
                        return false; // Prevent default upload behavior

                    }}>
                <Button>Загрузить</Button>
            </Upload>
            {/*<Divider>Загрузить только *.geojson, *.kml файлы</Divider>*/}
            <Divider>Загрузить только *.json, *.geojson, *.kml, *.kmz файлы</Divider>
        </Divider>
    );
}

export default UploadGeomsFile;