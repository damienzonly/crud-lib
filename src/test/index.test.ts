import { getter, list, remove, upsert } from "../index";

const dataset = Array.from(Array(10).keys()).map((i) => ({ id: i + 1 }));

test("List with post works", async () => {
  const postEdit = await list({
    list: () => dataset,
    post: (item) => {
      return { changed: item.id };
    },
  });
  postEdit.map((item) => {
    expect(typeof (item as any).changed).toBe("number");
  });
});

test("Delete with post works", async () => {
  const newDataset = await remove({
    action: () => dataset.filter((item) => item.id <= 5),
    post: (item) => item.map((item) => ({ id: item.id * 2 })),
  });
  expect(newDataset.length).toBe(5);
  newDataset.map((item, i) => {
    expect(item.id).toBe((i + 1) * 2);
  });
});

test("Delete without post works", async () => {
  const newDataset = await remove({
    action: () => dataset.filter((item) => item.id <= 5),
  });
  expect(newDataset.length).toBe(5);
  newDataset.map((item, i) => {
    expect(item.id).toBe(i + 1);
  });
});
