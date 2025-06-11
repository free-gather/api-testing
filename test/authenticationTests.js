import { describe, it } from "node:test";
import {v4 as uuidv4} from 'uuid';
import assert from "node:assert";
import 'dotenv/config';

function getRegisterUserUrl(){
  let url = process.env.API_ROOT + '/user/register';
  return url;
}

describe('Register user tests', ()=>{
  it('Test register one user ', async()=>{

    const username = "user_"+uuidv4()+"@dmvboardgames.com";
    const userData = {
      email:username,
      password: "a123456b"
    }



    const response = await fetch(getRegisterUserUrl(),{
      method: "POST",
      body: JSON.stringify(userData)
    })

    assert.strictEqual(response.status,200,response.statusText);
    const result = await response.json();


    assert.strictEqual(result.email, username);
    assert.strictEqual(result.createdAt.length > 0, true);
  })
})