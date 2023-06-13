import create from 'zustand'

const useGeoJsonStore = create((set) => ({

    fileSource: null,
    setFileSource: (data) => set((state) => ({fileSource: data})),
    removeFileSource: () => set({fileSource: null}),

    fileContent: null,
    setFileContent: (data) => set((state) => ({fileContent: data})),
    removeFileContent: () => set({fileContent: null}),

    fileExt: null,
    setFileExt: (data) => set((state) => ({fileExt: data})),
    removeFileExt: () => set({fileExt: null}),

    mapSourceFromFile: null,
    setMapSourceFromFile: (data) => set((state) => ({mapSourceFromFile: data})),
    removeMapSourceFromFile: () => set({mapSourceFromFile: null}),

    gasPElements: null,
    setGasPElements: (data) => set((state) => ({gasPElements: data})),
    removeGasPElements: () => set({gasPElements: null}),

    geoJson: null,
    setGeoJson: (data) => set((state) => ({geoJson: data})),
    removeGeoJson: () => set({geoJson: null}),

    parentCoordinate: null,
    setParentCoordinate: (data) => set((state) => ({parentCoordinate: data})),
    removeParentCoordinate: () => set({parentCoordinate: null}),

    // geomFromFile: null,
    // setgeomFromFile: (data) => set((state) => ({parentCoordinate: data})),
    // removeParentCoordinate: () => set({parentCoordinate: null}),

}));

export default useGeoJsonStore;