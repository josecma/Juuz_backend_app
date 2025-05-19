import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class WebCrawlerService {
  constructor() {}

  async findDownloadLink(url: string): Promise<string> {
    try {
      const response = await axios.get(url);
      const data = response.data;
     
      const $ = cheerio.load(data);

      const textContent = $('p').text();
      const dateMatch = textContent.match(/updated on (\d{2}\/\d{2}\/\d{4})/);
      const updateDate = dateMatch ? dateMatch[1] : 'No date found';
      
      const downloadLink = $('a.btn.btn-info').attr('href');

      return downloadLink;
    } catch (error) {
      console.error('Error fetching or parsing the page:', error);
      throw error;
    }
  }
}
