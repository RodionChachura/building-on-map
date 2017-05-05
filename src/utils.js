import store from './store'

const getProperty = (propertyName: string, object: any): any => {
    const parts = propertyName.split('.')
    let property = object
    parts.forEach((p) => {
        property = property[p]
    })

    return property;
}

export const statePropertyChangeListener = (propertyName: string, callback: Function): void => {
    let prevProperty = getProperty(propertyName, store.getState())
    store.subscribe(() => {
        const newProperty = getProperty(propertyName, store.getState())
        if (prevProperty !== newProperty) {
            prevProperty = newProperty
            callback(newProperty)
        }
    })
}
