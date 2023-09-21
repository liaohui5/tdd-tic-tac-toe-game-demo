import { createPinia, setActivePinia } from "pinia";
import { ChessMark, useGameStore } from "./game";

describe("游戏相关数据", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("使用 store 的时候应该初始化玩家数据", () => {
    const store = useGameStore();
    expect(store.players.length).toBe(2);

    const player = store.players[0];
    expect(player).toHaveProperty("id");
    expect(player).toHaveProperty("mark");
    expect(player).toHaveProperty("tapTotal");
    expect(player).toHaveProperty("isActived");
  });

  it("使用 store 的时候应该初始化 棋子数据", () => {
    const store = useGameStore();
    expect(store.chesses.length).toBe(9);

    expect(store.chesses[0]).toHaveProperty("id");
    expect(store.chesses[0]).toHaveProperty("mark");
    expect(store.chesses[0]).toHaveProperty("isUsed");
    expect(store.chesses[0].mark).toBe(ChessMark.UNUSED);
  });

  it("设置 激活玩家, 其他玩家应该设置为非活动玩家(活动状态玩家才可以下棋)", () => {
    const store = useGameStore();
    const [p1, p2] = store.players;
    expect(p1.isActived).toBe(true); // 默认让第一个玩家先手
    expect(p2.isActived).toBe(false);

    store.setActivePlayer(p2.id);
    expect(p1.isActived).toBe(false);
    expect(p2.isActived).toBe(true);
    expect(store.activedPlayer).toBe(p2);

    store.setActivePlayer(p1.id);
    expect(p1.isActived).toBe(true);
    expect(p2.isActived).toBe(false);
    expect(store.activedPlayer).toBe(p1);
  });
});
