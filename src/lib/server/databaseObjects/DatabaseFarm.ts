import Database from "$lib/server/Database";
import consoleLog, {LEVEL} from "$lib/server/log";

export default class DatabaseFarm extends Database {
    /**
     * Retrieves information about all farms from the database.
     *
     * @returns A Promise that resolves to an array of farm information objects.
     */
    public static async getAllFarms(): Promise<any> {
        consoleLog("DATABASE LOG: Getting all farms information...", LEVEL.OK)
        return await super.collections["farm-info"].find({}).toArray();
    }

    /**
     * Retrieves information about a single farm by its unique identifier (UID).
     *
     * @param farm_uid - The unique identifier (UID) of the farm to retrieve information for.
     * @returns A Promise that resolves to the farm information object or null if not found.
     */
    public static async getOneFarm(farm_uid: string): Promise<any> {
        consoleLog(`DATABASE LOG: Getting farm {` + farm_uid + `} information...`, LEVEL.OK)
        return await super.collections["farm-info"].findOne({"uid": farm_uid});
    }

    // /**
    //  * Retrieves information about all farm products from the database.
    //  *
    //  * @returns A Promise that will eventually contain the data once the implementation is completed.
    //  */
    // public static async getAllFarmProducts(): Promise<any> {
    //
    // }

    /**
     * Retrieves information about farm products associated with a single farm by its unique identifier (UID).
     *
     * @param farm_uid - The unique identifier (UID) of the farm to retrieve product information for.
     * @returns A Promise that resolves to the farm products information object or null if not found.
     */
    public static async getOneFarmProducts(farm_uid: string): Promise<any> {
        consoleLog(`DATABASE LOG: Getting farm products {` + farm_uid + `} information...`, LEVEL.OK)
        return await super.collections["farm-products"].findOne({"uid": farm_uid});
    }

    /**
     * Retrieves information about a single product by its unique identifier (ID).
     *
     * @param product_id - The unique identifier (ID) of the product to retrieve information for.
     * @returns A Promise that resolves to the product information object or null if not found.
     */
    public static async getOneProduct(product_id: string): Promise<any> {
        consoleLog(`DATABASE LOG: Getting product {` + product_id + `} information...`, LEVEL.OK)
        const result = await super.collections["farm-products"].findOne({'products.id': product_id});
        const products = result.products;
        for (let i: number = 0; i < products.length; i++) {
            if (products[i].id === product_id) {
                return products[i];
            }
        }
        return null;
    }

    public static async placeOrder(order: PaymentObject): Promise<any> {
        consoleLog(`DATABASE LOG:  payment details {` + order + `} ...`, LEVEL.OK)
        return await super.collections["order"].insertOne(order);
    }

    public static async getInstallments(user_id: string): Promise<any> {
        let installments: any;
        consoleLog(`DATABASE LOG:  payment details {` + user_id + `} ...`, LEVEL.OK)
        installments = await super.collections["order"].find({"user_id": user_id}).toArray();
        for (let i: number = 0; i < installments.length; i++) {
            if(installments[i].installment?.total_installment === undefined){
                //pop that element
                installments.splice(i,1);
            }
        }
        console.log(installments);
        return installments;
    }
    public static async getSellingProductCatalog(owner_uid: string): Promise<any> {
        consoleLog(`DATABASE LOG: Getting farm products {` + owner_uid + `} information...`, LEVEL.OK)
        console.log(owner_uid)
        let products = await super.collections["farm-info"].findOne({
                owner_id: owner_uid
            }

        );

        console.log(products);
        return products;
    }


    public static async getCategoryProduct(category: string, farm_id: string) {
        console.log(category)
        console.log(farm_id)
        consoleLog(`DATABASE LOG: Getting farm products {` + category + `} information...`, LEVEL.OK);

        return await super.collections["livestock-products"]
            .find({category: category, farm_id: farm_id})
            .toArray();
    }

    public static async addProduct(newProductObject: any, uid: string): Promise<any> {
        try {
            consoleLog(`DATABASE LOG: Adding new product object to ${uid}...`, LEVEL.OK);
            const result = await super.collections["farm_products"].updateOne(
                { uid: uid },
                { $push: { products: newProductObject } }
            );
            return result;
        } catch (error) {
            console.error("Error adding product object:", error);
            throw new Error("Failed to add product object");
        }
    }

}