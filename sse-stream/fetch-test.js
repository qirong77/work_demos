const PATH = "https://kwaibi.corp.kuaishou.com/dp/tgllm/sqltool/continue_write/stream";
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
      Cookie:
        "userToken=T5WI0tWX2FMxhsfqIFpUlw==-linqirong; tiangong_user_id=linqirong; _did=web_101312503E23F0EE; idp_theme_change_identification=2; $$$$idp_theme_change_identificationcopy_test=2; hdige2wqwoino=7MsaBHGpXDtXkfNBdfyxyzETMDf4Eb842f883ce0; _data_proxy_user=lixinghua03; userName=linqirong; ksCorpDeviceid=ddfb8904-d8a9-492d-b249-6cde2f4ff2b2; _ga_H896PJ54TF=GS1.1.1716949761.3.1.1716949888.0.0.0; apdid=fb88587b-d10b-4b03-b301-1c6c36fd7f5c868fd17b6d03f84fb73570c3b793ac9e:1717067198:1; _gid=GA1.2.1475283622.1717394005; accessproxy_session=df7b6251-c295-4d69-8a58-21e9bec33dcf; user=linqirong; kwaibi-user-token=eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJrd2FpYmkiLCJhdWQiOiJsaW5xaXJvbmciLCJpYXQiOjE3MTc0NzM2NzMsImV4cCI6MTcxNzU2MDA3MywianRpIjoiMmQ3MzIyMTAtODQ0MC00MzA2LWIxNjktOWQzZmUwNWM0YjgxIn0.SX7MxNl7Gd7Z7dqB5D_7W0mVn_1p3HwbNtIMWTGR03Y; dp_user_name=linqirong; ticket=nG+PGB2atSUplpEp4Ej2fvJgDdOSbvQaFj6FWM39qub+xP7plPnOYSllwcKx/3MVdxcG1G79zhCLXQhfNL37LA==; time=1717473673321; tag=U1QtMTI4OTcyNy1Bc3Q1OGxjSy16MXktb2VRc3IzVFM2aExmRFEta3Nzc29ncmF5; bi-admin-token=s%3Am_7kKSiEhrAsX09p01DDN3cAX_YpYi9_.1TtnRdWNxvGmzSLdUKwpnh4Ici3ijeopx4prhIRvqkM; ehid=1u2LDD_4Xsm5VsS6rv4DX9tHEpjbsSEM-Clu1; _ga=GA1.2.1722517525.1715137728; _ga_F6CM1VE30P=GS1.1.1717492856.14.1.1717492909.0.0.0; JSESSIONID=07516F8B9E8E83248EECFC7B0EFE60F1; router_full_path=https://tg.corp.kuaishou.com/develop/#/data-search/hive?groupId=266&groupName=%E6%95%B0%E6%8D%AE%E5%B7%A5%E5%8E%82&nodeId=4762498",
    },
    body: JSON.stringify(customConfig),
  }).then((res) => {
    console.log(res)
    // 创建一个 ReadableStreamDefaultReader 去读取字节流数据
    const reader = res.body.getReader();
    const processHandle = ({ value }) => {
      console.log(value)
      if (value === undefined) return;
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
