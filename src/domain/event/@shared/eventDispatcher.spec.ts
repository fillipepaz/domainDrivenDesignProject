import Address from "../../entity/address";
import Customer from "../../entity/custumer";
import CustomerChangeAddressEvent from "../customer/customerChangeAddressEvent.event";
import CustomerCreatedEvent from "../customer/customerCreatedEvent.event";
import CustomerCreatedHandler1 from "../customer/handler/enviaConsoleLog1Handler";
import CustomerCreatedHandler2 from "../customer/handler/enviaConsoleLog2Handler";
import CustomerChangeAddressHandler from "../customer/handler/enviaConsoleLogHandler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/sendEmailWhenProductIsCreated";
import ProductCreatedEvent from "../product/productCreated.event";
import EventDispatcher from "./eventDispatcher";

describe("Domain Events Tests", () => {
    it("should register an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
      eventDispatcher.register("ProductCreatedEvent", eventHandler);

      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined;
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);


      
    });
    it("should unregister an event handler", () => {

      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
      eventDispatcher.register("ProductCreatedEvent", eventHandler);

      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

      eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);

    });

    it("Should unregister all events", () => {

      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
      eventDispatcher.register("ProductCreatedEvent", eventHandler);

      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

      eventDispatcher.unregisterAll();
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });

    it("it should notify all handlers associated to event", () => {

      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
      const spyEventHandler = jest.spyOn(eventHandler, "handle")

      eventDispatcher.register("ProductCreatedEvent", eventHandler);

      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
      const productCreatedEvent = new ProductCreatedEvent({
        name:"product test",
        description:"My test product",
        price: 10,
        quantity: 10
      })
      eventDispatcher.notify(productCreatedEvent)
      expect(spyEventHandler).toHaveBeenCalled();
    });

    it("it should notify when a address have been changed", () => {
      const customer = new Customer("123","John");
      const address = new Address("rua a", 45, "alag", "45844555554")
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new CustomerChangeAddressHandler();
      const spyEventHandler = jest.spyOn(eventHandler, "handle")
      eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);
      customer.changeAddress(address)
      const customerChangeAddressEvent = new CustomerChangeAddressEvent({address: address, id: customer.id, name: customer.name})
      eventDispatcher.notify(customerChangeAddressEvent)
      expect(spyEventHandler).toHaveBeenCalled();
      })

      it("Should notify when Customer is created", () => { 
        
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new CustomerCreatedHandler1()
        const eventHandler2 = new CustomerCreatedHandler2()
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle")
        const spyEventHandler2 = jest.spyOn(eventHandler1, "handle")
        eventDispatcher.register("CustomerCreatedEvent", eventHandler1)
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2)
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        
        const customerEvent = new CustomerCreatedEvent({id:1, name: "user test"})
        eventDispatcher.notify(customerEvent)
        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();


      
      })
    
      
   
})