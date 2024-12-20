import { ArrayHelper } from "../editor/ArrayHelper";

test("测试split1", () => {
  const arr = [{ text: "11" }, { text: "22" }];
  const newArr = ArrayHelper.spliteLine(arr, 0, 1);
  expect(newArr[0].text).toBe("1");
  expect(newArr[1].text).toBe('1')
});

test("测试split2", () => {
  const arr = [{ text: "11" }, { text: "22" }];
  const newArr = ArrayHelper.spliteLine(arr, 0, 0);
  expect(newArr[0].text).toBe("");
  expect(newArr[1].text).toBe("11");
  expect(newArr[2].text).toBe("22")
});

test("测试split默认情况", () => {
  const arr = [{ text: "11" }, { text: "22" }];
  const newArr = ArrayHelper.spliteLine(arr, 0);
  expect(newArr[0].text).toBe("11");
  expect(newArr[1].text).toBe("");
  expect(newArr[2].text).toBe("22")
});

test("测试at", () => {
  let at = null;
  expect(at ?? 0).toBe(0);
  expect(0 ?? 1).toBe(0);
});
