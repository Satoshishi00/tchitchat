const myColors = {
    red: "#e84118",
    green: "#44bd32",
    grey: "#535c68"
};

const colors = color => {
    return myColors[color] || "lime";
};

export default colors;