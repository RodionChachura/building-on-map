const url = 'http://overpass-api.de/api/interpreter'

const toRadians = degrees => degrees * Math.PI / 180
const latInKm = 110.574 //km
const lonInKm = lat => 111.320 * Math.cos(toRadians(lat))

const inLat = km => km / latInKm
const inLon = (lat, km) => km / lonInKm(lat)

export const urlForGetAllInsideSquare = (center, km) => {
    const lat = inLat(km)
    const lon = inLon(lat, km)
    const polyline = `${center.lat - lat} ${center.lon + lon} ${center.lat + lat} ${center.lon + lon} ${center.lat + lat} ${center.lon - lon} ${center.lat - lat} ${center.lon - lon}`
    const query = `?data=[out:json];way(poly:"${polyline}")["building"];(._;>;);out body;`
    return url + query
}

export const fromOverpassElementsToBuildings = (elements) => {
    const nodes = []
    const buildings = []
    elements.forEach((v) => {
        if (v.type === 'node') {
            nodes.push(v)
        } else {
            const building = {nodes: []}
            building.nodes = v.nodes.map((id) => {
                const node = nodes.find(t => t.id === id)
                return {lat: node.lat, lon: node.lon}
            })
            buildings.push(building)
        }
    })
    return buildings
}