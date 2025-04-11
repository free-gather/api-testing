import { describe, it } from "node:test";
import assert from "node:assert";

import 'dotenv/config';


function getQueryUrl(paramMap){
  const url = process.env.API_ROOT + '/searchEvents';

  return url;
}
describe('"Event search tests', () => {

  it("Test search returns all results",async ()=>{

    const response = await fetch(getQueryUrl())
    assert.strictEqual(response.status,200,response.status);

    //Verify response
  })

  it("Test search returns correct result when city and day are parameters", async()=>{

    const url = getQueryUrl({
      city: "Alexandria",
      day: "Monday"
    })
    const response = await fetch(url)
    assert.strictEqual(response.status,200,response.status);
  })

  /**
   * TODO
   * - Make sure 200 response is returned when parameters are set with correct data
   * - Verify correct status and response are set when the user tries to submit a query with an invalid day.
   *
   * Do not duplicate integration tests in API. Consider moving them to API tests.
   */

});

