"use client"

import { useEffect } from "react";

export default function BootstrapClient () {
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
        import("bootstrap-icons/font/bootstrap-icons.css");
    })
}