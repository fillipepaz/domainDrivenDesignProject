import EventInterface from "./event.interface";
import EventHandlerInterface from "./eventHandler.interface";

export default interface EventDispatcherInterface {
    notify(event: EventInterface): void;
    register(eventName: string, event: EventHandlerInterface): void;
    unregister(eventName: string, event: EventHandlerInterface): void;
    unregisterAll():void;
}