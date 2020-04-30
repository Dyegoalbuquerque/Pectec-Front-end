import { Options } from 'ng5-slider';

export class SliderOptionBuilder {

    option: Options;
    value: number;
    maxValue: number;

    constructor(ceil: number, floor: number) 
    { 
        this.option = new Options();
        this.option.ceil = ceil;
        this.option.floor = floor;
    }

    addCeil(ceil: number): SliderOptionBuilder {
        this.option.ceil = ceil;
        return this;
    }

    addFloor(floor: number): SliderOptionBuilder {
        this.option.floor = floor;
        return this;
    }

    addShowTicksValues(showTicksValues: boolean): SliderOptionBuilder {
        this.option.showTicksValues = showTicksValues;

        return this;
    }

    addStep(step: number): SliderOptionBuilder {
        this.option.step = step;

        return this;
    }

    addTickValueStep(tickValueStep: number): SliderOptionBuilder {
        this.option.tickValueStep = tickValueStep;

        return this;
    }

    addDisabled(disabled: boolean): SliderOptionBuilder {
        this.option.disabled = disabled;

        return this;
    }

    addTranslate(translate: string): SliderOptionBuilder {
        this.option.translate = (value: number): string => {
            return  `${translate} ${value}`;
        }

        return this;
    }

    addMinRange(min: number): SliderOptionBuilder {
        this.option.minRange = min;

        return this;
    }

    addMaxRange(max: number): SliderOptionBuilder {
        this.option.maxRange = max;

        return this;
    }

    build(): Options{
        return this.option;
    }
}