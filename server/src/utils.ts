class Utils {
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min
  }
}

export const utils = new Utils()
