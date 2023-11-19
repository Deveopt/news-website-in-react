export const scroll = (direction, ref, padding) => {

    const container = ref.current;

    const scrollAmount = direction === "left" ? container.scrollLeft - (container.offsetWidth + padding || 0) : container.scrollLeft + (container.offsetWidth + padding || 0);

    container.scrollTo({ left: scrollAmount, behavior: "smooth" })

};
