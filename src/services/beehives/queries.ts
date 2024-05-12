export async function getAllBeehives(): Promise<{ documents: Beehive[] }> {
  const body = {
    "collection": "beehives",
    "database": "app",
    "dataSource": "beewary-dev"
  }
  try {
    const response = await fetch(`${process.env.REALM_HOST}/app/${process.env.REALM_APP_ID}/endpoint/data/v1/action/find`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apiKey": process.env.REALM_API_KEY as string
      },
      body: JSON.stringify(body)
    })
    return response.json();
  } catch (e) {
    throw new Error(`Realm Data API returned an error: ${e}`)
  }
}