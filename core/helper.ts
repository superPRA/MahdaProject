export function getRandomContinusId() {
    return (
        new Date().getTime().toString(36) +
        Math.round(Math.random() * 1000000000).toString(36)
    );
}
