// colyseus
import { Client, Room } from "colyseus.js";

export class Network {
  public _client: Client;

  constructor(port: number | string) {
    // create colyseus client
    let url = "wss://" + window.location.hostname;
    if (isLocal()) {
      url = "ws://localhost:" + port;
    }
    this._client = new Client(url);
  }

  public async joinRoom(roomId: string, token: string, character_id: string): Promise<any> {
    return await this._client.joinById(roomId, {
      token,
      character_id,
    });
  }

  // public async joinChatRoom(data): Promise<any> {
  //     return await this._client.joinOrCreate("chat_room", data);
  // }

  public async findCurrentRoom(currentRoomKey: string): Promise<any> {
    return new Promise(async (resolve: any, reject: any) => {
      let rooms = await this._client.getAvailableRooms("game_room");
      if (rooms.length > 0) {
        rooms.forEach((room) => {
          if (room.metadata.location === currentRoomKey) {
            resolve(room);
          }
        });
      }
      resolve(false);
    });
  }

  public async joinOrCreateRoom(location: string, token: string, character_id: string): Promise<any> {
    // find all exisiting rooms
    let rooms = await this._client.getAvailableRooms("game_room");

    // rooms exists
    if (rooms.length > 0) {
      // do we already have a room for the specified location
      let roomIdFound: boolean | string = false;
      rooms.forEach((room) => {
        if (room.metadata.location === location) {
          roomIdFound = room.roomId;
        }
      });

      // if so, let's join it
      if (roomIdFound !== false) {
        return await this.joinRoom(roomIdFound, token, character_id);
      }
    }

    // else create a new room for that location
    return await this._client.create("game_room", {
      location,
      token,
      character_id,
    });
  }
}

const isLocal = function () {
  return window.location.host === "localhost:8080";
};