import { InternalServerErrorException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ShopItem } from 'src/model/shopItem.model';

export class ItemDto {
     // AmazonDB Client
     private  dynamoDB: AWS.DynamoDB;

    constructor(dynamoDB: AWS.DynamoDB ) {
        this.dynamoDB = dynamoDB;
    }

    public async put(shopItem: ShopItem) {
        const itemMap = {
            id: {S: shopItem.getId()},
            name: {S: shopItem.getName()},
            description: {S: shopItem.getDescription()},
            amount: {N: shopItem.getAmount().toString()},
        };

        try {
            return await this.dynamoDB
            .putItem(
                { Item: itemMap,
                  ReturnConsumedCapacity: 'TOTAL',
                  TableName: shopItem.getTableName(),
                }).promise();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async get(id: string) {
        const keyMap = {
            id: {S: id},
        };

        try {
            return await this.dynamoDB
            .getItem(
                { Key: keyMap,
                  TableName: 'ShopItem',
                }).promise();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

}
