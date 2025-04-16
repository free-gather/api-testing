import { describe, it } from "node:test";
import assert from "node:assert";

import 'dotenv/config';
import {countGroups} from "./searchResponseUtils.js";


function getEventSearchUrl(paramMap){
  let url = process.env.API_ROOT + '/searchEvents';

  if (paramMap && Object.keys(paramMap).length >0) {
    let queryString = "?"

    let params = [];
    Object.keys(paramMap).forEach(function(param){
      params.push(param+"="+paramMap[param])
    })
    queryString += params.join("&");
    url+=queryString;

  }
  return url;
}

function getLocationSearchUrl(){
  return process.env.API_ROOT + '/searchLocations'
}

describe('"Event search tests', () => {

  it("Test event search returns results",async ()=>{

    const response = await fetch(getEventSearchUrl())
    assert.strictEqual(response.status,200,response.status);

    const result = await response.json();
    assert.strictEqual(countGroups(result) > 0, true);

  })

  it("Test event search returns correct result when city and day are parameters", async()=>{

    const city = "Alexandria";
    const day = "Monday"
    const url = getEventSearchUrl({
      city: city,
      day: day
    })
    const response = await fetch(url)
    assert.strictEqual(response.status,200,response.status);

    const result = await response.json();
    assert.strictEqual(countGroups(result) > 0, true);

    const groups = result.groupData;
    Object.keys(groups).forEach(function(groupId){
      const group = groups[groupId];

      if(group.events){
        Object.keys(group.events).forEach(function(eventId){
          const eventLocation = group.events[eventId].location;

          const validGroup = eventLocation && eventLocation.length > 0 ?
            eventLocation.split(',')[1].trim() === city:
            group.cities.includes(city)

          assert.strictEqual(validGroup, true);
        })
      }

    })
  })


  it("Test search returns bad request error result when city and invalid option for day are parameters", async()=>{
    const url = getEventSearchUrl({
      city: "Alexandria",
      day: "Test"
    })
    const response = await fetch(url)
    assert.strictEqual(response.status,400,response.status);
  })

});

describe("Location search tests,",()=>{
  it("Test location search returns correct results", async()=>{
    const url = getLocationSearchUrl();
    const response = await fetch(url);

    assert.strictEqual(response.status,200,response.status);

    const result = await response.json();

    console.log("Location search result:"+JSON.stringify(response))
    assert.strictEqual(Object.keys(result.conventions).length >= 0 , true);
    assert.strictEqual(Object.keys(result.gameRestaurants).length >= 0, true);
    assert.strictEqual(Object.keys(result.gameStores).length >= 0, true);
  })
})



