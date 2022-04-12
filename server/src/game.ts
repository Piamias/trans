import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { msg } from "libs/socket/message";
import { WebSocket } from "ws";

export class Game {
  constructor(
    readonly alpha: WebSocket,
    readonly beta: WebSocket
  ) { }

  tick() {

  }

  close() {

  }
}

@WebSocketGateway({ path: "/game" })
export class GameController {
  private waiting: WebSocket = undefined

  readonly allSockets = new Set<WebSocket>()
  readonly allGames = new Set<Game>()

  readonly gamesBySocket = new Map<WebSocket, Game>()

  @SubscribeMessage("hello")
  onhello(socket: WebSocket, data: {}) {
    socket.addEventListener("close",
      () => this.onclose(socket))
    this.allSockets.add(socket)
  }

  onclose(socket: WebSocket) {
    if (socket === this.waiting)
      delete this.waiting
    if (this.gamesBySocket.has(socket))
      this.gamesBySocket.get(socket).close()
    this.allSockets.delete(socket)
  }

  /**
   * Automatic match making
   * @param socket 
   * @param data 
   * @returns 
   */
  @SubscribeMessage("wait")
  onwait(socket: WebSocket, data: {}) {
    if (!this.allSockets.has(socket))
      throw new Error("Did not say hello")
    if (this.gamesBySocket.get(socket))
      throw new Error("Already in a game")
    if (socket === this.waiting)
      throw new Error("Already waiting")

    if (!this.waiting) {
      this.waiting = socket
      socket.send(msg("wait", "waiting"))
      return
    }

    const other = this.waiting
    delete this.waiting

    const game = new Game(socket, other)

    this.allGames.add(game)
    this.gamesBySocket.set(socket, game)
    this.gamesBySocket.set(other, game)

    const json = msg("wait", "joined")

    socket.send(json)
    other.send(json)
  }

  /**
   * Create invite room
   * @param socket 
   * @param data 
   */
  @SubscribeMessage("create")
  oncreate(socket: WebSocket, data: {}) {
    if (!this.allSockets.has(socket))
      throw new Error("Did not say hello")
    // todo
  }

  /**
   * Join invite room
   * @param socket 
   * @param data 
   */
  @SubscribeMessage("join")
  onjoin(socket: WebSocket, data: {
    channel: string
  }) {
    if (!this.allSockets.has(socket))
      throw new Error("Did not say hello")
  }

}