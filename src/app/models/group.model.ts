import { PlayerModel } from "./player.model";

export interface GroupModel {
    id: number;
    name: string;
    players: PlayerModel[];
}