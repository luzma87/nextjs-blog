import {LokaliseApi} from "@lokalise/node-api";

export default async function handler(req, res) {

  console.log("====================== HEADERS ======================")
  console.log(req.headers)

  const payload = req.body
  console.log("====================== BODY ======================")
  console.log(payload)

  if (Array.isArray(payload)) {
    if (payload[0] === "ping") {
      res.status(200)
      return
    } else {
      res.status(400)
      return
    }
  }

  const apiKey = process.env.LOKALISE_API_KEY
  const lokaliseApi = new LokaliseApi({apiKey})

  const projects = await lokaliseApi.projects().list()
  console.log("====================== PROJECTS ======================")
  console.log(projects)

  res.status(200).json({text: 'Hello Lokalise'})
}
