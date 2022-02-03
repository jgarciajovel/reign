import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NewsService } from './news/news.service';
const CronJob = require('cron').CronJob;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log(`:: 💥  Cron Job Every Hour`);

  let populate = new CronJob('0 * * * *', function() {
    console.log(`:: 📰  Populate News`);

    const response = app.get(NewsService);
    response.forcePopulate();

  }, null, true, 'America/El_Salvador');

  populate.start();

  await app.listen(3000);
}
bootstrap();
