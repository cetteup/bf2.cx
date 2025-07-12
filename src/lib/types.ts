export type Provider = 'bf2hub.com' | 'playbf2.ru' | 'openspy.net'

export type Server = {
    guid: string
    ip: string
    port: number
    name: string
    numPlayers: number
    maxPlayers: number
    mapName: string
    mapSize: number
    password: boolean
    gameVariant: string
    ranked: boolean
    battlerecorder: boolean
    voip: boolean
    variables: Record<string, string>
    joinLink: string | null
    players: Player[]
}

export type Player = {
    name: string
    score: number
    kills: number
    deaths: number
    ping: number
    aibot: boolean
}
