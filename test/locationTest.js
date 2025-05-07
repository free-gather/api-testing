import { describe, it } from "node:test";
import assert from "node:assert";
import 'dotenv/config';

function getCityListUrl(locationGroup){
  let url = process.env.API_ROOT + '/listCities';
  if(locationGroup){
    url += `?area=${locationGroup}`;
  }
  return url;
}

describe("City list tests",()=>{
  it("Test city list endpoint returns results", async()=>{
    const response = await fetch(getCityListUrl());
    assert.strictEqual(response.status,200, response.status);

    const result = await response.json();
    assert.strictEqual(result.length >0, true);
  })

  it("Test city list endpoint returns no results when invalid location group is used", async()=>{
    const response = await fetch(getCityListUrl("antarctica"));
    assert.strictEqual(response.status,200, response.status);

    const result = await response.json();
    assert.strictEqual(result.length, 0);
  })

  it("Test city list endpoint returns  results when valid location group is used", async()=>{
    const response = await fetch(getCityListUrl("dmv"));
    assert.strictEqual(response.status,200, response.status);

    const result = await response.json();
    assert.strictEqual(result.length > 0, true);
  })
})