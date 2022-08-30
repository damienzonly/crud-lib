import { getter, list, writeAction } from "../index";

const dataset = Array.from(Array(10).keys()).map((i) => ({ id: i + 1 }));

const itemPostChanger = item => ({changed: item.id as number});

test("List with post works", async () => {
  const postEdit = await list({
    list: () => dataset,
    post: itemPostChanger,
  });
  postEdit.map((item) => {
    expect(typeof (item as any).changed).toBe("number");
  });
});

test("Delete with post works", async () => {
  const newDataset = await writeAction({
    action: () => dataset.filter((item) => item.id <= 5),
    post: (item) => item.map((item) => ({ id: item.id * 2 })),
  });
  expect(newDataset.length).toBe(5);
  newDataset.map((item, i) => {
    expect(item.id).toBe((i + 1) * 2);
  });
});

test("Delete without post works", async () => {
  const newDataset = await writeAction({
    action: () => dataset.filter((item) => item.id <= 5),
  });
  expect(newDataset.length).toBe(5);
  newDataset.map((item, i) => {
    expect(item.id).toBe(i + 1);
  });
});

test("Getter single item works", async () => {
  const item = await getter({
    action: () => dataset.find(item => item.id === 5),
    pre: () => 1,
  });
  expect(item.id).toBe(5)
});

test("Getter single item works with post", async () => {
  const item = await getter({
    action: () => dataset.find(item => item.id === 5),
    post: itemPostChanger
  });
  expect((item as any).changed).toBe(5)
});

test("Getter single item works with post and pre", async () => {
  const item = await getter({
    pre: () => 42,
    action: (pre) => {
      expect(pre).toBe(42)
      return dataset.find(item => item.id === 5)
    },
    // post: itemPostChanger
  });
  expect(item.changed).toBe(5)
});

test("Upsert should work as insert", async () => {
  const inserted = await writeAction({
    action: (dsa) => dataset.push({id: 42}),
    // pre: () => "dsa",
    post: aasd=>
  });
  expect(inserted).toBe(dataset.length-1)
  expect(dataset[inserted].id).toBe(52);
})


test("Upsert should work as insert with post", async () => {
  const inserted = await writeAction({
    action: () => dataset.push({id: 42}),
    post: itemPostChanger
  });
  expect(inserted).toBe(dataset.length-1)
  expect(inserted.changed).toBe(42)
})