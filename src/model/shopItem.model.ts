export class ShopItem {
    private id: string;
    private name: string;
    private description: string;
    private amount: number;
    private tableName: string;

    public getId(): string {
        return this.id;
    }

    public setId(id: string) {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string) {
        this.description = description;
    }

    public getAmount(): number {
        return this.amount;
    }

    public setAmount(amount: number) {
        this.amount = amount;
    }

    public setTableName(tableName: string) {
        this.tableName = tableName;
    }

    public getTableName() {
        return this.tableName;
    }
}
