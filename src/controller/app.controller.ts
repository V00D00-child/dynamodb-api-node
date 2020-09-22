import { Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ItemDto } from 'src/dto/item.dto';
import { ShopItem } from 'src/model/shopItem.model';

@Controller('/api')
export class AppController {

  constructor() {
    AWS.config.update({
      region: 'us-east-2',
    });
  }

  @Get('/getItem')
  async getItem(@Res() res: any) {
    const client: AWS.DynamoDB = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    const itemDto = new ItemDto(client);

    try {
      const result: any = await itemDto.get('1');

      if (result) {
        return res.status(HttpStatus.CREATED).json({
          ok: true,
          result,
        });
      } else {
          return res.status(HttpStatus.BAD_REQUEST).json({
            ok: false,
            message: 'Error trying to get item',
          });
      }

    } catch (error) {
        return res.status(HttpStatus.CREATED).json({
          ok: false,
          message: 'Error trying to get item',
          errors: error,
        });
    }

  }

  @Post('/createItem')
  async createItem(@Res() res: any) {

    // Create DynamoDB client
    const client: AWS.DynamoDB = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    const itemDto = new ItemDto(client);

    // Create new item
    const shopItem: ShopItem = new ShopItem();
    shopItem.setDescription('Power console');
    shopItem.setId('5');
    shopItem.setName('Xbox 720');
    shopItem.setAmount(455);
    shopItem.setTableName('ShopItem');

    try {
      const result: any = await itemDto.put(shopItem);

      if (result) {
        return res.status(HttpStatus.CREATED).json({
          ok: true,
          data: shopItem,
        });
      } else {
          return res.status(HttpStatus.BAD_REQUEST).json({
            ok: false,
            message: 'Error trying to create item',
          });
      }

    } catch (error) {
        return res.status(HttpStatus.CREATED).json({
          ok: false,
          message: 'Error trying to create item',
          errors: error,
        });
    }
  }

}
