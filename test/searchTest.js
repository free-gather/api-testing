import { describe, it } from "node:test";
import assert from "node:assert";

import 'dotenv/config';
import {countGroups} from "./searchResponseUtils.js";


function getQueryUrl(paramMap){
  const url = process.env.API_ROOT + '/searchEvents';

  return url;
}
describe('"Event search tests', () => {

  it("Test search returns results",async ()=>{

    const response = await fetch(getQueryUrl())
    assert.strictEqual(response.status,200,response.status);

    const result = await response.json();
    assert.strictEqual(countGroups(result) > 0, true);

  })

  it("Test search returns correct result when city and day are parameters", async()=>{

    const url = getQueryUrl({
      city: "Alexandria",
      day: "Monday"
    })
    const response = await fetch(url)
    assert.strictEqual(response.status,200,response.status);

    const result = await response.json();
    assert.strictEqual(countGroups(result) > 0, true);

  })

  /**
   * TODO
   * - Verify correct status and response are set when the user tries to submit a query with an invalid day.
   *
   * Do not duplicate integration tests in API. Consider moving them to API tests.
   */

});

