import Address from "../../customer/value-object/address";

import EventInterface from "../../@shared/event.interface";

type customerChangeAddressData = {
address: Address,
id: string,
name: string
}

export default class CustomerChangeAddressEvent implements EventInterface {
    dateTimeOccurred: Date;
    eventData: customerChangeAddressData;

    constructor(eventData:customerChangeAddressData){
        this.dateTimeOccurred = new Date();
        this.eventData = eventData
    }
}