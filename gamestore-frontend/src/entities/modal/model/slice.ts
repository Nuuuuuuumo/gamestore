import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {User} from "@/shared/api";

type ModalProps = {
  isLoading?: boolean;
  friends?: User[];
  title?: string;
  onConfirm: (id: string) => void;
}

type ModalState = {
  isOpen: boolean;
  modalType: string | null;
  modalProps?: ModalProps;
};

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
  modalProps: {
    onConfirm: () => {
    },
  },
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ modalType: string; modalProps?: any }>) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps || {};
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
      state.modalProps = {
        onConfirm: () => {
        },
      };
    },
    updateModalProps: (state, action: PayloadAction<{ modalProps: any }>) => {
      state.modalProps = {...state.modalProps, ...action.payload.modalProps};
    },
  },
});

export const {openModal, closeModal, updateModalProps} = modalSlice.actions;
