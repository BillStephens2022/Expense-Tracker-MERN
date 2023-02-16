import Auth from './auth';

// async function getUsername() {
//   const token = await Auth.getProfile();
//   console.log(token);
//   const username = token.data.username;
//   console.log(username);
//   return username;
// }

    

export async function getUser() {
  try {
  

    const token = Auth.getProfile();
    console.log(token);
    const username = token.data.username;
    console.log(username);
    const data = await fetch("./api/getUser", {method: 'GET', headers: {username}});

    if (!data.ok) {
      throw new Error("something went wrong!");
    } else {
      
      console.log(data);
    }

    // const getHighLeveldata = await data.json();
    // console.log(getHighLeveldata);
    // return getHighLeveldata;
  } catch (err) {
    console.error(err);
  }
}

export async function getHighLevel() {
  try {
    const token = Auth.getProfile();
    const username = token.data.username;
    console.log('USERNAME getHighLevelRoute: ', username);
    const data = await fetch("./api/sumHighLevel", {method: 'GET', headers: {username}});

    if (!data.ok) {
      console.log("HELLO")
      throw new Error("something went wrong!");
    } else {
      const highLevelData = await data.json;
      console.log("THIS IS MY DATA", highLevelData);
    }

    //const getHighLevelData = await data.json();
    // console.log('USERNAME getHighLevelRoute: ', getHighLevelData);
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function getEssentialTransactions() {
    try {
      const data = await fetch("./api/sumEssentialTransactions");
  
      if (!data.ok) {
        throw new Error("something went wrong!");
      }
  
      const getEssentialData = await data.json();
      console.log(getEssentialData);
      return getEssentialData;
    } catch (err) {
      console.error(err);
    }
  }
