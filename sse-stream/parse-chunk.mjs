/* 
last-chunk data:{"code":",p_date,p_hourmin,total_task_count,successful_task_count,task_success_rate ","extra":"{\"modelVersion\":\"1\",\"modelType\":\"DEEPSEEK_SQL\"}"}
*/
/* 
last-chunk data:{"code":"type","extra":"{\"modelVersion\":\"1\",\"modelType\":\"DEEPSEEK_SQL\"}"}
data:{"code":",cluster_name,cluster_type,cluster_type_name,cluster_type_id,cluster_type_name_id,cluster_type","extra":"{\"modelVersion\":\"1\",\"modelType\":\"DEEPSEEK_SQL\"}"}
*/
export const parseChunk = (
  str = `data:{"code":"type","extra":"{\"modelVersion\":\"1\",\"modelType\":\"DEEPSEEK_SQL\"}"}`
) => {
  str = str.split('\n')[0]
  const startStr = `data:{"code":"`;
  const end = str.indexOf(`","extra":"{\"modelVersion\"`);
  const results = str.slice(startStr.length, end);
  console.log(results)
  return results;
};
parseChunk();
