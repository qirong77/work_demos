// // jest.test.js


const { produce } = require("immer");

test('测试更改数组',()=>{
  const before = [{},{}]
  const after = produce(before,draft=>{
    draft[0] = 1
  })
  console.log(after)
  expect(after[0]).toBe(1)
  expect(after[1]).toBe(before[1])
})
test('测试更改数组splice',()=>{
  const before = [{},{}]
  const after = produce(before,draft=>{
    before.splice(0,1)
  })
  expect(before.length).toBe(1)
})
test('produce,splice',()=>{
  const before = [{},{}]
  const after = produce(before,draft=>{
    draft.splice(0,1)
  })
  expect(before.length).toBe(2)
})

test("测试对象修改",()=>{
  const o1 = {
    name:'o'
  }
  const o2 = produce(o1,()=>{
    o1.age = 2
  })
  const o3 = produce(o2,draft=>{
    draft.name = 'x'
  })
  expect(o2.age).toBe(2)
  expect(o3.name).toBe('x')
})

test("测试对象修改",()=>{

  const obj1 = {
    name: 'John',
    age: 30,
  };
  
  const obj2 = {
    profession: 'Engineer',
  };
  
  const mergedObject = produce(obj1, draft => {
    Object.assign(draft, obj2);
  });
  
  console.log(mergedObject);
  
})