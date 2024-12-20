import http from 'http'
const server = http.createServer((req, res) => {
  if (req.url === "/sse") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Access-Control-Allow-Origin": "*", // 解决跨域
      Connection: "keep-alive", // 请求完成后依旧保持连接不关闭，不同http版本默认值不同
      "Cache-Control": "no-cache", // 不缓存
    });
    // 业务逻辑 模拟请求
    let count = 0;
    let str =
      "SSE 是指 Server-Sent Events（服务器发送事件），是一种用于在客户端和服务器之间单向实时通信的 Web 技术。通过 SSE，服务器可以向客户端推送数据，而无需客户端发起请求。";
    const timer = setInterval(() => {
      let info = {};
      if (count < str.length) {
        info = { type: "keep-alive", msg: str[count] };
      } else {
        info = { type: "close", msg: "" };
        clearInterval(timer);
      }
      count += 1;
      res.write(`data: ${JSON.stringify(info)}\n\n`);
      /** 测试代码: 会触发 http 自动重连 & 触发onerror */
      // if (count === 10) {
      //   res.end(); // 触发重连
      //   clearInterval(timer);
      // }
    }, 100);
  }
});

server.listen(3000, "localhost", () => {
  console.log("Server is running at 3000");
});
