import Address from "../value-object/address";
import CustomerFactory from "./customer.factory"

describe("Product factory unit test", () => {

    it("Should create a customer", ()=>{ 
        const customer = CustomerFactory.create("armino")
        expect(customer.name).toBe("armino")
        expect(customer.id).toBeDefined()


    });

    it("Should create a customer with address", ()=>{ 
        const address = new Address("rua a", 10, "aracaf", "10101010")
        const customer = CustomerFactory.createWithAddress("armino", address)
        expect(customer.name).toBe("armino")
        expect(customer.id).toBeDefined()
        expect(customer.Address).toBe(address)


    });
})