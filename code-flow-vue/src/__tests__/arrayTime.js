

test("测试数组时间", () => {
  console.time("1");
  const x = new Array(100000).fill({ x: "1" });
  x.splice(2, 2, 2);
  // 0.05mm
  console.log('执行时间:')
  console.timeEnd("1");
  expect(1).toBe(1)
});
