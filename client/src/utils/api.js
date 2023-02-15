export async function getHighLevel() {
  try {
    const data = await fetch("./api/sumHighLevel");

    if (!data.ok) {
      throw new Error("something went wrong!");
    }

    const getHighLeveldata = await data.json();
    console.log(getHighLeveldata);
    return getHighLeveldata;
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
