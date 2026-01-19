"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function MobilePlaque() {
    return (
        <div className="relative w-full flex justify-center items-center py-8 lg:hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative"
                style={{
                    width: "280px",
                    height: "350px",
                }}
            >
                <Image
                    src="/images/meritmint_plaque.png"
                    alt="MeritMint Achievement Plaque"
                    fill
                    className="object-contain drop-shadow-xl"
                    priority
                />
            </motion.div>
        </div>
    );
}
