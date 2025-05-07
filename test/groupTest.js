import { describe, it } from "node:test";
import assert from "node:assert";
import 'dotenv/config';

function getGroupDataUrl(params){
  let url = process.env.API_ROOT + '/groups/';

  if(params){
    let items = []
    Object.keys(params).forEach(function(param){
      items.push(`${param}=${params[param]}`);
    })
    url += `?${items.join('&')}`
  }
  return url;
}

describe('Group data tests', ()=>{
  it('Test group is returned when a valid name and valid area are parameters', async()=>{
    const response = await fetch(getGroupDataUrl({
      name: 'Alexandria_Board_Game_Group',
      arae: 'dmv'
    }))

    assert.strictEqual(response.status, 200, response.status);

    const result = await response.json();
    assert.strictEqual(result.name.length>0, true);
    assert.strictEqual(result.url.length>0, true);
    assert.strictEqual(result.summary.length>0, true);
  })

  it('Test response when a parameter is not valid', async()=>{
    const response = await fetch(getGroupDataUrl({
      name: 'test',
      arae: 'dmv'
    }))

    assert.strictEqual(response.status, 404, response.status);
  })
})