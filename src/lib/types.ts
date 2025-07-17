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
    demoIndex: string
    voip: boolean
    autobalance: boolean
    friendlyfire: boolean
    variables: Record<string, string>
    noVehicles: boolean
    joinLink: string | null
    teams: Team[]
    players: Player[]
}

export type Team = {
    index: number
    label: string
}

export type Player = {
    pid: number
    name: string
    tag: string
    score: number
    kills: number
    deaths: number
    ping: number
    team: number
    teamLabel: string
    aibot: boolean
}

export type Buddy = Pick<Player, 'pid' | 'name' | 'tag'>
