
import EventHandlerInterface from "../../../@shared/eventHandler.interface";
import CustomerChangeAddressEvent from "../customerChangeAddressEvent.event";


export default class CustomerChangeAddressHandler implements EventHandlerInterface<CustomerChangeAddressEvent> {
    handle(event: CustomerChangeAddressEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address.city},${event.eventData.address.street},${event.eventData.address.number},${event.eventData.address.zip}`);
    }
}