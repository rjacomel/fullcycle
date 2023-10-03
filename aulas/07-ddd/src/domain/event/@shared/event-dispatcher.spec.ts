import CustomerAddressChangedEvent from "../customer/customer-address-changed.event copy";
import CustomerCreatedEvent from "../customer/customer-created.event";
import EnviaConsoleLog1Handler from "../customer/handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "../customer/handler/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "../customer/handler/envia-console-log.handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const eventHandlerCustomerCreated1 = new EnviaConsoleLog1Handler();
    const eventHandlerCustomerCreated2 = new EnviaConsoleLog2Handler();
    const evendHanlerCustomerAddressChanged = new EnviaConsoleLogHandler();

    eventDispatcher.register(
      "CustomerCreatedEvent",
      eventHandlerCustomerCreated1
    );
    eventDispatcher.register(
      "CustomerCreatedEvent",
      eventHandlerCustomerCreated2
    );
    eventDispatcher.register(
      "CustomerAddressChangedEvent",
      evendHanlerCustomerAddressChanged
    );

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(2);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandlerCustomerCreated1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandlerCustomerCreated2);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
    ).toMatchObject(evendHanlerCustomerAddressChanged);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );

    const eventHandlerCustomerCreated1 = new EnviaConsoleLog1Handler();
    const eventHandlerCustomerCreated2 = new EnviaConsoleLog2Handler();
    const evendHanlerCustomerAddressChanged = new EnviaConsoleLogHandler();

    eventDispatcher.register(
      "CustomerCreatedEvent",
      eventHandlerCustomerCreated1
    );
    eventDispatcher.register(
      "CustomerCreatedEvent",
      eventHandlerCustomerCreated2
    );
    eventDispatcher.register(
      "CustomerAddressChangedEvent",
      evendHanlerCustomerAddressChanged
    );

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandlerCustomerCreated1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandlerCustomerCreated2);
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
    ).toMatchObject(evendHanlerCustomerAddressChanged);

    eventDispatcher.unregister(
      "CustomerCreatedEvent",
      eventHandlerCustomerCreated1
    );
    eventDispatcher.unregister(
      "CustomerCreatedEvent",
      eventHandlerCustomerCreated2
    );
    eventDispatcher.unregister(
      "CustomerAddressChangedEvent",
      evendHanlerCustomerAddressChanged
    );

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(0);
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length
    ).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();

    const eventHandlerCustomerCreated1 = new EnviaConsoleLog1Handler();
    const eventHandlerCustomerCreated2 = new EnviaConsoleLog2Handler();
    const evendHanlerCustomerAddressChanged = new EnviaConsoleLogHandler();

    eventDispatcher.register(
      "CustomerCreatedEvent",
      eventHandlerCustomerCreated1
    );
    eventDispatcher.register(
      "CustomerCreatedEvent",
      eventHandlerCustomerCreated2
    );
    eventDispatcher.register(
      "CustomerAddressChangedEvent",
      evendHanlerCustomerAddressChanged
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandlerCustomerCreated1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandlerCustomerCreated2);
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
    ).toMatchObject(evendHanlerCustomerAddressChanged);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeUndefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();

    const eventHandlerCustomerCreated1 = new EnviaConsoleLog1Handler();
    const eventHandlerCustomerCreated2 = new EnviaConsoleLog2Handler();
    const evendHanlerCustomerAddressChanged = new EnviaConsoleLogHandler();

    const spyEventHandlerCustomerCreated1 = jest.spyOn(
      eventHandlerCustomerCreated1,
      "handle"
    );
    const spyEventHandlerCustomerCreated2 = jest.spyOn(
      eventHandlerCustomerCreated2,
      "handle"
    );
    const spyEventHandlerCustomerAddressChanged = jest.spyOn(
      eventHandler,
      "handle"
    );

    eventDispatcher.register(
      "CustomerCreatedEvent",
      eventHandlerCustomerCreated1
    );
    eventDispatcher.register(
      "CustomerCreatedEvent",
      eventHandlerCustomerCreated2
    );
    eventDispatcher.register(
      "CustomerAddressChangedEvent",
      evendHanlerCustomerAddressChanged
    );

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandlerCustomerCreated1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandlerCustomerCreated2);
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
    ).toMatchObject(evendHanlerCustomerAddressChanged);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 1",
      address: "Street A, 123",
      id: 42,
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandlerCustomerCreated1).toHaveBeenCalled();
    expect(spyEventHandlerCustomerCreated2).toHaveBeenCalled();

    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      name: "Customer 1",
      address: "Rua B, 456",
      id: 42,
    });

    eventDispatcher.notify(customerAddressChangedEvent);
    expect(spyEventHandlerCustomerAddressChanged).toHaveBeenCalled;
  });
});
