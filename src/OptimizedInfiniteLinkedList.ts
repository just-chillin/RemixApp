export default class InfinitelyPopulatingList<T> {
  private index = 0;
  growthJob = Promise.resolve();
  list: T[] = [];

  /**
   * Gets the current element.
   */
  get cur() {
    return this.list[this.index];
  }

  /**
   *
   * @param generatorFunction A function that returns
   * @param growthFactor A decimal that represents when the list should grow. 0 > growthFactor > 1.
   * @param onGrowth A callback that is called whenever the list grows. Used to update state. Defaults to a no-op.
   */
  constructor(
    private readonly generatorFunction: (() => Promise<T[]>) | (() => T[]),
    private readonly growthFactor: number = 0.75,
    private onGrowth: () => void = () => null
  ) {
    this.growthFactor = growthFactor;
    this.generatorFunction = generatorFunction;
    this.index = 0;
    this.onGrowth = this.onGrowth;
  }

  grow() {
    return this.growthJob = this.growthJob.then(async () => {
      const newVals = await this.generatorFunction();
      this.list.push(...newVals);
    }).then(this.onGrowth);
  }
  /**
   * Gets the next element
   */
  next() {
    if (this.index + 1 / this.list.length >= this.growthFactor) {
      Promise.resolve(this.grow());
    }
    const prev = this.cur;
    this.index++;
    const cur = this.cur;
    return {
      old: prev,
      cur: cur
    };
  }

  /**
   * Gets the previous element.
   */
  prev() {
    if (this.index <= 0) {
      throw new Error(`IndexOutOfBounds: index = ${this.index - 1}`);
    }
    const prev = this.cur;
    this.index--;
    const cur = this.cur;
    return {
      old: prev,
      cur: cur
    };
  }
}
