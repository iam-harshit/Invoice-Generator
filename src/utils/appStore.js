import { configureStore } from "@reduxjs/toolkit";
import invoiceSlice from "./invoiceSlice";

const appStore = configureStore({
    reducer: {
        invoice: invoiceSlice
    }
});

export default appStore;