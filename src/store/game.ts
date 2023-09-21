import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export const enum ChessMark {
  UNUSED = "",
  RED = "o",
  BLACK = "x",
}

export interface IChess {
  id: number;
  mark: ChessMark;
  isUsed: boolean;
}

export interface IPlayer {
  id: number;
  playerName: string;
  tapTotal: number;
  mark: ChessMark;
  isActived: boolean;
}

export const useGameStore = defineStore("game", () => {
  const players = reactive<IPlayer[]>([
    {
      id: 1001,
      playerName: "红方",
      mark: ChessMark.RED,
      tapTotal: 0,
      isActived: true, // 默认红方先手
    },
    {
      id: 1002,
      playerName: "黑方",
      mark: ChessMark.BLACK,
      tapTotal: 0,
      isActived: false,
    },
  ]);

  const activedPlayer = computed(() => {
    const [p1, p2] = players;
    return p1.isActived ? p1 : p2;
  });

  function setActivePlayer(id: number) {
    for (let i = 0; i < players.length; i++) {
      const item = players[i];
      if (item.id === id) {
        item.isActived = true;
      } else {
        item.isActived = false;
      }
    }
  }

  function switchPlayersToPlay() {
    const [p1, p2] = players;
    if (p1.isActived) {
      setActivePlayer(p2.id);
    } else {
      setActivePlayer(p1.id);
    }
  }

  const chesses = reactive<IChess[]>(initChesses());
  function createChceker(id: number): IChess {
    return {
      id,
      mark: ChessMark.UNUSED,
      isUsed: false,
    };
  }

  function initChesses() {
    const items = [];
    for (let i = 0; i < 9; i++) {
      items.push(createChceker(i));
    }
    return items;
  }

  function tapTheChess(id: number): void {
    const player = activedPlayer;
    const chess = chesses.find((item) => item.id === id)!;
    chess.isUsed = true;
    chess.mark = player.value.mark;
    player.value.tapTotal += 1;
  }

  function getChessById(id: number): IChess {
    // return chesses.find(item.id === id)
    return chesses[id];
  }

  const playersTapTotal = computed(() => {
    let total = 0;
    for (let i = 0; i < players.length; i++) {
      total += players[i].tapTotal;
    }
    return total;
  });

  return {
    chesses,
    players,
    activedPlayer,
    setActivePlayer,
    switchPlayersToPlay,
    tapTheChess,
    playersTapTotal,
    getChessById,
  };
});
