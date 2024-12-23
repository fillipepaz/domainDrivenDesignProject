import EventHandlerInterface from "../../@shared/eventHandler.interface";
import CustomerCreatedEvent from "../customerCreatedEvent.event";


export default class CustomerCreatedHandler2 implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        console.log(`Esse é o segundo console.log do evento: CustomerCreated`);
    }
}