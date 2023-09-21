import { ChessMark, IPlayer, useGameStore } from "@/store/game";

export function usePlayer() {
  const store = useGameStore();

  // play
  function tap(id: number): void {
    const targetChess = store.getChessById(id);
    if (targetChess.isUsed) {
      alert("该位置已经有棋子了");
      return;
    }

    const player = store.activedPlayer;
    store.tapTheChess(id);
    if (player.tapTotal >= 3 && checkWin(player)) {
      restartGame(`${player.playerName}赢了`);
      return;
    }

    if (store.playersTapTotal === 9) {
      restartGame("平局");
      return;
    }

    store.switchPlayersToPlay();
  }

  function isALineOfCheckers(indexes: number[], mark: ChessMark): boolean {
    return indexes.every((i) => store.chesses[i].mark === mark);
  }

  function checkWin(player: IPlayer): boolean {
    // checker-indexes:
    // 0 1 2
    // 3 4 5
    // 6 7 8
    const wins: number[][] = [
      // horizontal rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      // vertical rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      // inclined rows
      [0, 4, 8],
      [2, 4, 6],
    ];

    return wins.some((indexes) => isALineOfCheckers(indexes, player.mark));
  }

  function restartGame(msg: string) {
    setTimeout(() => {
      alert(msg);
      window.location.reload();
    }, 100);
  }

  return {
    tap,
    checkWin,
    isALineOfCheckers,
  };
}
