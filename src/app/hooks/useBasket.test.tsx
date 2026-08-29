import React from "react";
import { render, act } from "@testing-library/react";
import useBasket from "./useBasket";
import { CartItem } from "../../lib/types/search";

const mockItem: CartItem = {
  _id: "product-1",
  quantity: 1,
  name: "Test Product",
  price: 10,
  image: "test.png",
};

const otherItem: CartItem = {
  _id: "product-2",
  quantity: 1,
  name: "Other Product",
  price: 20,
  image: "other.png",
};

// Small harness component that exposes the hook's state/handlers through
// the DOM so it can be driven with fireEvent (this codebase's
// @testing-library/react version does not ship `renderHook`).
const TestHarness = ({
  onReady,
}: {
  onReady: (basket: ReturnType<typeof useBasket>) => void;
}) => {
  const basket = useBasket();
  onReady(basket);
  return (
    <pre data-testid="cart-items">{JSON.stringify(basket.cartItems)}</pre>
  );
};

const setup = () => {
  let basket!: ReturnType<typeof useBasket>;
  const utils = render(
    <TestHarness onReady={(current) => (basket = current)} />
  );
  return {
    ...utils,
    getBasket: () => basket,
  };
};

describe("useBasket", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("adds a new item to an empty basket", () => {
    const { getBasket, getByTestId } = setup();

    act(() => {
      getBasket().onAdd(mockItem);
    });

    expect(getBasket().cartItems).toEqual([{ ...mockItem }]);
    expect(JSON.parse(getByTestId("cart-items").textContent as string)).toEqual([
      { ...mockItem },
    ]);
  });

  it("increments the quantity instead of duplicating an existing item", () => {
    const { getBasket } = setup();

    act(() => {
      getBasket().onAdd(mockItem);
    });
    act(() => {
      getBasket().onAdd(mockItem);
    });

    expect(getBasket().cartItems).toHaveLength(1);
    expect(getBasket().cartItems[0]).toEqual({ ...mockItem, quantity: 2 });
  });

  it("decrements the quantity when removing an item with quantity > 1", () => {
    const { getBasket } = setup();

    act(() => {
      getBasket().onAdd(mockItem);
    });
    act(() => {
      getBasket().onAdd(mockItem);
    });
    act(() => {
      getBasket().onRemove(mockItem);
    });

    expect(getBasket().cartItems).toHaveLength(1);
    expect(getBasket().cartItems[0]).toEqual({ ...mockItem, quantity: 1 });
  });

  it("removes the item entirely when its quantity reaches zero", () => {
    const { getBasket } = setup();

    act(() => {
      getBasket().onAdd(mockItem);
    });
    act(() => {
      getBasket().onRemove(mockItem);
    });

    expect(getBasket().cartItems).toEqual([]);
  });

  it("does nothing when removing an item that is not in the basket", () => {
    const { getBasket } = setup();

    act(() => {
      getBasket().onAdd(mockItem);
    });
    act(() => {
      getBasket().onRemove(otherItem);
    });

    expect(getBasket().cartItems).toEqual([{ ...mockItem }]);
  });

  it("falls back to an empty basket when localStorage data is corrupted", () => {
    window.localStorage.setItem("cartData", "{not valid json");

    expect(() => setup()).not.toThrow();

    const { getBasket } = setup();
    expect(getBasket().cartItems).toEqual([]);
  });

  it("persists basket changes to localStorage", () => {
    const { getBasket } = setup();

    act(() => {
      getBasket().onAdd(mockItem);
    });

    expect(JSON.parse(window.localStorage.getItem("cartData") as string)).toEqual([
      { ...mockItem },
    ]);

    act(() => {
      getBasket().onDeleteAll();
    });

    expect(window.localStorage.getItem("cartData")).toBeNull();
    expect(getBasket().cartItems).toEqual([]);
  });
});
