import {LokaliseApi} from "@lokalise/node-api";

export default async function handler(req, res) {

  console.log("====================== HEADERS ======================")
  console.log(req.headers)

  const payload = req.body
  console.log("====================== BODY ======================")
  console.log(payload)

  if (Array.isArray(payload)) {
    if (payload[0] === "ping") {
      res.status(200).json({success: true})
      return
    } else {
      res.status(400).json({success: false})
      return
    }
  }

  const apiKey = process.env.LOKALISE_API_KEY
  const lokaliseApi = new LokaliseApi({apiKey})

  const projectId = req.headers["project-id"]
  const event = req.headers["x-event"]
  const webhookId = req.headers["webhook-id"]
  const secret = req.headers["x-secret"]

  const lokaliseSecret = process.env.LOKALISE_SECRET
  if(lokaliseSecret !== secret){
    res.status(403).json({success: false})
    return
  }

  const response = await lokaliseApi.files().download(payload.project.id,
    {
      format: 'json',
      "original_filenames": false,
      "bundle_structure": 'src/literals/dictionaries/%LANG_ISO%.%FORMAT%',
      triggers: ["github"],
      "filter_repositories": ["pavulon10mg/lokalise-testing:main"]
    }
  );

  console.log("====================== BUNDLE URL ======================")
  console.log(response.bundle_url)

  // const projects = await lokaliseApi.projects().list()
  // console.log("====================== PROJECTS ======================")
  // console.log(projects)

  res.status(200).json({text: 'Hello Lokalise'})
}
