import * as o from '../utils/gMapsOptions'

const m = window.google.maps

export let map
export let drawingManager

export const init = (container: any) => {
    if (!map && !drawingManager) {
        map = new m.Map(container, o.mapOptions)
        drawingManager = new m.drawing.DrawingManager(o.drawingManagerOptions)
        drawingManager.setMap(map)
    }
}

