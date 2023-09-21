import { usePlayer } from "@/player";
import { useGameStore } from "@/store/game";
import { createPinia, setActivePinia } from "pinia";

vi.spyOn(window, "alert");

describe("井字棋玩法", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("玩家点击后,应该标记棋子为当前激活状态玩家的棋子", () => {
    const store = useGameStore();
    const player = usePlayer();
    const chessId = 0;

    const activePlayer = store.activedPlayer;

    player.tap(chessId);

    expect(store.chesses[chessId].mark).toBe(activePlayer.mark);
  });

  it("玩家点击后, 如果棋子已经被标记了, 就不能再次标记", () => {
    const store = useGameStore();
    const [p1, p2] = store.players;
    const game = usePlayer();
    const chess = store.chesses[0];

    store.setActivePlayer(p1.id);
    game.tap(chess.id);
    expect(chess.mark).toBe(p1.mark);

    store.setActivePlayer(p2.id);
    game.tap(chess.id);

    expect(chess.mark).not.toBe(p2.mark);
    expect(chess.mark).toBe(p1.mark);
  });

  it("玩家点击后, 应该切换玩家来进行游戏", () => {
    const store = useGameStore();
    const [p1, p2] = store.players;

    expect(p1).toBe(store.activedPlayer);

    usePlayer().tap(0);

    expect(p2).toBe(store.activedPlayer);
  });
});
