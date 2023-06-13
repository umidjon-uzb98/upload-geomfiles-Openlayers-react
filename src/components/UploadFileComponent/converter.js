import React, {useState} from 'react';
import JSZip from 'jszip';
import toGeoJSON from 'togeojson';
import useGeoJsonStore from "../zuStore/GeoJsonStore";
import {Button, Divider, Upload} from "antd";

const KMZConverter = () => {
    const {setMapSourceFromFile, removeMapSourceFromFile} = useGeoJsonStore((state) => state);
    const [fileData, setFileData] = useState(null);

    const handleFileChange = (event) => {
        console.log("event")
        console.log(event)

        // const file = event.target.files[0];
        const file = event

        if (file) {
            let geoJson = getKmlDom(file).then((kmlDom) => {
                let geoJsonObject = toGeoJSON.kml(kmlDom);
                return JSON.stringify(geoJsonObject);
            });
            geoJson.then((gj) => {
                setMapSourceFromFile(gj)
                document.getElementById('output').innerText = gj;
            });
        }
    };

    const getDom = (xml) => new DOMParser().parseFromString(xml, 'text/xml');

    const getExtension = (fileName) => fileName.split('.').pop();

    const getKmlDom = (kmzFile) => {
        var zip = new JSZip();
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

    return (
        <>
            <input type="file" accept=".kmz" id="f" onChange={handleFileChange}/><br/>
            <textarea id="output" rows="20" cols="70"></textarea>

            <Divider>
                <Upload onRemove={() => {
                    setFileData(null)
                }}
                        maxCount={1}
                        accept=".json, .geojson, .kml, .kmz"
                    // accept=".geojson, .kml"
                        beforeUpload={(file) => {
                            /*handleFileUpload(file);*/
                            handleFileChange(file);
                            return false; // Prevent default upload behavior

                        }}>
                    <Button>Загрузить</Button>
                </Upload>
                {/*<Divider>Загрузить только *.geojson, *.kml файлы</Divider>*/}
                <Divider>Загрузить только *.json, *.geojson, *.kml, *.kmz файлы</Divider>
            </Divider>
        </>
    );
};

export default KMZConverter;
