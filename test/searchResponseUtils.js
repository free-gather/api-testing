

export function countGroups(responseData){
  return responseData?.groupData ? Object.keys(responseData.groupData).length : 0;
}