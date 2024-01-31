class CrawlerHandler {
  constructor (service) {
    this._service = service
  }

  async postCrawlWebsiteHandler (req, res) {
    try {
      const { websiteUrl } = req.body

      await this._service.crawlHtmlWebsite({ websiteUrl })
      return res.status(201).json({ message: 'Success' })
    } catch (error) {
      console.error('Error during crawling:', error.message)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default CrawlerHandler
