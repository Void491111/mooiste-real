"use client";

import { useState } from "react";

export function useCartDrawer() {
    const [isOpen, setIsOpen] = useState(false);

    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }

    return { isOpen, open, close };
}