import "./App.css";
import Layers from "./components/layers/Layers";
import {OlTileLayer} from "./components/layers/OlTileLayer";
import {ReMap} from "./components/map/map/ReMap";
import {LayerFromFile, OutlineMapLayer} from "./components/layers/layerFromFile";
import {DragDropFiles} from "./components/interactions/DragDropFiles";
import KMZConverter from "./components/UploadFileComponent/converter";
import {V2LayerFromFile} from "./components/layers/V2layerFromFile";

function App() {
    return (
        <div className='App'>
            <ReMap>
                <Layers>
                    <OlTileLayer/>
                    {/*<LayerFromFile/>*/}
                    <V2LayerFromFile/>
                    <DragDropFiles/>
                </Layers>
            </ReMap>
            {/*<KMZConverter/>*/}
        </div>
    );
}

export default App;
