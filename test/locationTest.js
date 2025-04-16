import { describe, it } from "node:test";
import assert from "node:assert";
import 'dotenv/config';

function getCityListUrl(){
  return process.env.API_ROOT + '/listCities'
}

describe("City list tests",()=>{
  it("Test city list endpoint returns results", async()=>{
    const response = await fetch(getCityListUrl());
    assert.strictEqual(response.status,200, response.status);

    const result = await response.json();
    assert.strictEqual(result.length >0, true);
  })
})