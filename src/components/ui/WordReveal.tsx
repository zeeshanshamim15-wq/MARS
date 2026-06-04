import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function WordReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  // Trigger animations when the text enters or leaves the viewport (scrub effect)
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });

  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.215, 0.61, 0.355, 1.0], // Smooth cubic-bezier
      },
    },
  };

  return (
    <motion.span
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-block ${className}`}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-[0.25em] last:mr-0 will-change-[transform,opacity]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
