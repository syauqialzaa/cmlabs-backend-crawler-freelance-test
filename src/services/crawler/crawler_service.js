import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

class CrawlerService {
  constructor (folder) {
    this._folder = folder

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true })
    }
  }

  async crawlHtmlWebsite ({ websiteUrl }) {
    const browser = await puppeteer.launch({ headless: 'new' })
    const page = await browser.newPage()

    try {
      await page.goto(websiteUrl, { waitUntil: 'networkidle2' })
      const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))
      await timeout(5000)

      const pageContent = await page.content()
      const replaceProtocol = websiteUrl.replace(/^(https?:\/\/)?(www\.)?/, '')
      const domain = replaceProtocol.split('/')[0]

      const filePath = path.join(this._folder, `${domain}.html`)
      await promisify(fs.writeFile)(filePath, pageContent, 'utf-8')

      console.log(`Crawling successful. Result saved in ${domain}.html`)
    } catch (error) {
      console.error('Error during crawling:', error.message)
    } finally {
      await browser.close()
      console.log('Browser closed.')
    }
  }
}

export default CrawlerService
