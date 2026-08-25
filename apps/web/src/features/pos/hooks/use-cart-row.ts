"use client";


import { useState } from "react";
import { useCartStore } from "../store/cart.store";
import type { CartItem } from "../types";

export function useCartRow(item: CartItem) {
    const setQty = useCartStore((state) => state.setQty);
    const setNote = useCartStore((state) => state.setNote);
    const remove = useCartStore((state) => state.remove);

    const [isEditing, setIsEditing] = useState(false);
    const [draftNote, setDraftNote] = useState(item.note);

    function increase() {
        setQty(item.lineId, item.qty + 1);
    }

    function decrease() {
        setQty(item.lineId, item.qty - 1);
    }

    function removeLine() {
        remove(item.lineId);
    }

    function commitNote() {
        setIsEditing(false);
        setNote(item.lineId, draftNote);
    }

    function toggleEdit() {
        if (isEditing) {
            commitNote();
            return;
        }
        setDraftNote(item.note);
        setIsEditing(true);
    }

    return {
        isEditing,
        draftNote,
        canIncrease: item.qty < item.stock,
        setDraftNote,
        increase,
        decrease,
        removeLine,
        commitNote,
        toggleEdit,
    };
}