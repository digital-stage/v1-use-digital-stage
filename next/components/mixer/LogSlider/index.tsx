import React, {useCallback, useEffect, useState} from 'react';
import {convertRangeToDbMeasure, formatDbMeasure} from './utils';
import VerticalSlider from "./VerticalSlider";

export type RGBColor = [number, number, number];

/**
 * Base for the logarithmic ratio below 0db
 */
const LOWER_BASE = 1.1;
/**
 * Base for the exponential ratio above 0db
 */
const UPPER_BASE = 3;

/**
 * Range input settings
 */
const MIN = 0;
const MAX = 100;
const STEP = 5;
const NULL_VALUE = 70;

function getBaseLog(x: number, y: number): number {
    return Math.log(y) / Math.log(x);
}

const LogSlider = (props: {
    volume: number;
    min: number;
    middle: number;
    max: number;
    color: RGBColor;
    onChange?: (volume: number) => any;
    onEnd?: (volume: number) => any;
    width: number;
    className?: string;
    alignLabel?: "left" | "right";
}) => {
    const {volume, min, middle, max, color, onChange, onEnd, width, className, alignLabel} = props;
    const [value, setValue] = useState<number>();
    const [dbValue, setDbValue] = useState<number>(volume);

    const convertLinearToLog = useCallback((value: number): number => {
        if (value > NULL_VALUE) {
            const y = (value - NULL_VALUE) / (MAX - NULL_VALUE);
            return (Math.pow(y, UPPER_BASE) * (max - middle)) + middle;
        } else {
            const y = ((value / NULL_VALUE) * (LOWER_BASE - 1)) + 1;
            return getBaseLog(LOWER_BASE, y);
        }
    }, [middle, max]);

    const convertLogToLinear = useCallback((value: number): number => {
        if (value > middle) {
            return Math.round(Math.pow(((value - middle) / (max - middle)), (1 / UPPER_BASE)) * (MAX - NULL_VALUE)) + NULL_VALUE;
        } else {
            return Math.round(((Math.pow(LOWER_BASE, value) - 1) / (LOWER_BASE - 1)) * NULL_VALUE);
        }
    }, [middle, max]);

    useEffect(() => {
        setValue(convertLogToLinear(volume));
        setDbValue(convertRangeToDbMeasure(volume));
    }, [volume, convertLogToLinear])

    const handleSliderChange = useCallback((value: number) => {
        if (onChange) {
            const volume = convertLinearToLog(value);
            onChange(volume);
        }
    }, [onChange, convertLinearToLog])

    const handleFinalSliderChange = useCallback((value: number) => {
        if (onEnd) {
            const volume = convertLinearToLog(value);
            onEnd(volume);
        }
    }, [onEnd, convertLinearToLog])

    return (
        <VerticalSlider
            className={className}
            min={MIN}
            max={MAX}
            step={STEP}
            value={value}
            onChange={handleSliderChange}
            onFinalChange={handleFinalSliderChange}
            color={color}
            width={width}
            text={formatDbMeasure(dbValue, true)}
            alignLabel={alignLabel}
            showMarks={true}
            renderMarks={(index) => {
                const value = MAX - (index * STEP);
                const large: boolean = value === MIN || value === MAX || value === NULL_VALUE;
                if (large)
                    return (
                        <h5>{formatDbMeasure(convertRangeToDbMeasure(convertLinearToLog(value)))}</h5>
                    );
            }}
        />
    )
};

export default LogSlider;
