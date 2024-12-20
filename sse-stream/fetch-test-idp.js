const PATH = "https://tg.corp.kuaishou.com/dp/tgllm/sqltool/continue_write/stream";
const customConfig = {
  platform: "IDP", // 平台
  groupId: 0, // 项目组id，非必须
  codeBeforeCursor: `select cluster_id`, // 光标前代码
  codeAfterCursor: `from  ks_xs.a_test_hive_2_druid`, // 光标后代码
  count: 1, // 期望返回条数，默认1
  acceptLastCompletion: true, // 是否接受上次曝光补全，非必要
  lastApplyIntervalMs: 10000, // 上次补全接受间隔，非必要
  lastRejectIntervalMs: 10000, // 上次拒绝间隔，非必要
  maxNewTokens: 32, // 最大新增token数
};

const createFetchSSE = (url) => {
  const decoder = new TextDecoder();
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie:"apdid=bbe01984-f985-40b0-af56-995fb3da72dc961216999ed1ef321c87e0fe8b023a40:1715082593:1; accessproxy_session=f171c1ea-26a3-490f-a7d8-0fce62e4e35c; userToken=T5WI0tWX2FMxhsfqIFpUlw==-linqirong; userName=linqirong; tiangong_user_id=linqirong; _did=web_101312503E23F0EE; idp_theme_change_identification=2; $$$$idp_theme_change_identificationcopy_test=2; hdige2wqwoino=7MsaBHGpXDtXkfNBdfyxyzETMDf4Eb842f883ce0; _ga=GA1.1.1722517525.1715137728; _ga_F6CM1VE30P=GS1.1.1715167270.2.0.1715167579.0.0.0; groupId=266; groupIdForAbtest=266; ksCorpDeviceid=ddfb8904-d8a9-492d-b249-6cde2f4ff2b2; ehid=9JQ9komJi_lhSmMYdY58kxRO4orq6khM-XU_f; router_full_path=https://tg.corp.kuaishou.com/develop/#/data-search/hive?groupId=266&groupName=%E6%95%B0%E6%8D%AE%E5%B7%A5%E5%8E%82&nodeId=4551019&businessType=hiveQuery"
    },
    body: JSON.stringify(customConfig),
  }).then((res) => {
    // console.log(res)
    // 创建一个 ReadableStreamDefaultReader 去读取字节流数据
    const reader = res.body.getReader();
    const processHandle = ({ value }) => {
        if (value === undefined) return;
        console.log(value)
      // value 为 Uint8Array 二进制数组
      const decodeValue = decoder.decode(value);
      console.log("接受的参数值", decodeValue, "\n");
      // 业务代码
      // ...

      // 读取下一个流数据
      return reader.read().then(processHandle);
    };
    reader.read().then(processHandle);
  }).catch(e=>{
    // console.log(e)
  });
};
const sse = createFetchSSE(PATH);
