import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

import CrawlerHandler from './handlers/crawler/crawler_handler.js'
import CrawlerService from './services/crawler/crawler_service.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const crawlerService = new CrawlerService(path.resolve(__dirname, '../websites'))
const crawlerHandler = new CrawlerHandler(crawlerService)

const router = express.Router()

router.post('/crawler', async (req, res) => {
  await crawlerHandler.postCrawlWebsiteHandler(req, res)
})

export default router
