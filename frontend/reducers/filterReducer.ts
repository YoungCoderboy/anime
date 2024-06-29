import { Action_interface } from "@/context/productContext";
import { FILTER_PRODUCTS } from "@/utils/actions";

interface Filter_interface {
  text: string;
  type: string;
  count: number;
}

const filter_reducer = (state: Filter_interface, action: Action_interface) => {
  switch (action.type) {
    case FILTER_PRODUCTS:
  }
  return state;
};
