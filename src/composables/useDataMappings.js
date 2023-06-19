const roomMapping = {
    title: {
        type: 'string'
    },
    claim: {
        type: 'html'
    },
    exhibits: {
        type: 'array'
    }
}

export function useMapRoomData(room) {
    let mappedRoom = {};
    for (let field in room) {
        if(roomMapping[field]) {
            mappedRoom[field] = room[field]
        }
    }
    return mappedRoom;
}
export function useMapHomepageData(data) {
    // just in case ...
    return data;
}