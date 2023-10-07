import { createSlice } from "@reduxjs/toolkit";

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    items: [],
    invoiceToEdit: null,
    invoiceToView: null,
  },
  reducers: {
    addInvoice: (state, action) => {
      state.items.push(action.payload);
    },
    deleteInvoices: (state, action) => {
      state.items = state.items.filter(
        (item) => item.invoiceNumber !== action.payload
      );
    },
    clearInvoices: (state) => {
      state.items.length = 0;
    },
    editInvoice: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.invoiceNumber === action.payload.invoiceNumber
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setInvoiceToEdit: (state, action) => {
      state.invoiceToEdit = action.payload;
    },
    setInvoiceToView: (state, action) => {
      state.invoiceToView = action.payload;
    },
    clearInvoiceToView: (state) => {
      state.invoiceToView = null;
    },
    copyInvoice: (state, action) => {
      const invoiceToCopy = state.items.find(
        (item) => item.invoiceNumber === action.payload
      );
      if (invoiceToCopy) {
        const newInvoice = {
          ...invoiceToCopy,
          invoiceNumber: `${invoiceToCopy.invoiceNumber} copy`,
        };
        state.items.push(newInvoice);
      }
    },
  },
});

export const {
  addInvoice,
  deleteInvoices,
  clearInvoices,
  editInvoice,
  setInvoiceToEdit,
  setInvoiceToView,
  clearInvoiceToView,
  copyInvoice,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
