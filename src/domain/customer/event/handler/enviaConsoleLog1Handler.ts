

import EventHandlerInterface from "../../../@shared/eventHandler.interface";
import CustomerCreatedEvent from "../customerCreatedEvent.event";


export default class CustomerCreatedHandler1 implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        console.log(`Esse é o primeiro console.log do evento: CustomerCreated`);
    }
}