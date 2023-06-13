import create from "zustand";

const useMapStore = create((set) => ({
  map: null,
  populateMap: (mapGenerated) => set((state) => ({ map: mapGenerated })),
  removeMap: () => set({ map: null }),


  dragLayerId: undefined,
  setDragLayerId: (data) => set((state) => ({dragLayerId: data})),
  reRenderModify: false,
  setReRenderModify: () => set((state) => ({reRenderModify: !state.reRenderModify})),
}));

export default useMapStore;
