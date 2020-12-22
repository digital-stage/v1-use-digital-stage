import {Direction, Range} from 'react-range';
import React, {useCallback, useEffect, useState} from 'react';
import {styled, useStyletron} from 'styletron-react';
import {RGBColor} from './index';

const Wrapper = styled("div", {
    boxSizing: "border-box"
});

const VerticalSlider = (props: {
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (value: number) => any;
    onFinalChange?: (value: number) => any;
    color: RGBColor;
    width: number;
    text?: string;
    showMarks?: boolean;
    renderMarks?: (index: number) => React.ReactNode;
    className?: string;
    alignLabel?: "left" | "right";
}) => {
    const {onChange, onFinalChange, min, max, step, value, alignLabel, renderMarks, className, color, width, text, showMarks} = props;
    const [css] = useStyletron();
    const [solidColor, setSolidColor] = useState<string>();

    useEffect(() => {
        setSolidColor(`rgba(${color[0]},${color[1]},${color[2]},0.6)`);
    }, [color])


    const renderSingleMark = useCallback((index: number, style: React.CSSProperties) => {
        const mark = renderMarks(index);
        if (mark) {
            return (
                <div className={css({
                    position: "absolute",
                    top: "-400%",
                    left: alignLabel && alignLabel === "left" ? "140%" : undefined,
                    right: !alignLabel || alignLabel === "right" ? "140%" : undefined,
                })}>
                    {mark}
                </div>
            )
        }
        return undefined;
    }, [renderMarks, alignLabel]);

    const handleChange = useCallback((value: number) => {
        if (onChange) {
            onChange(value)
        }
    }, [onChange])

    const handleFinalChange = useCallback((value: number) => {
        if (onFinalChange) {
            onFinalChange(value)
        }
    }, [onFinalChange]);

    return (
        <Wrapper className={className}>
            <Range
                direction={Direction.Up}
                step={step}
                min={min}
                max={max}
                values={[value]}
                onChange={values => handleChange(values[0])}
                onFinalChange={values => handleFinalChange(values[0])}
                renderMark={showMarks ? ({props: markProps, index}) => (
                    <div
                        {...markProps}
                        key={markProps.key}
                        ref={markProps.ref}
                        className={css({
                            height: index % 2 ? '1px' : '2px',
                            width: index % 2 ? (width / 2) + "px" : width + "px",
                            backgroundColor: index * step > max - value ? solidColor : 'rgba(255,255,255,0.2)'
                        })}
                    >
                        {renderSingleMark(index, markProps.style)}
                    </div>
                ) : null}
                renderTrack={({props, children}) => (
                    <div
                        {...props}
                        style={{
                            flexGrow: 1,
                            display: 'flex',
                            height: '100%',
                            ...props.style
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={(params) => (
                    <div
                        {...params.props}
                        style={{
                            height: width + "px",
                            width: width + "px",
                            borderRadius: '4px',
                            backgroundColor: '#FFF',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            outlineColor: solidColor,
                            boxShadow: '0px 1px 6px #AAA',
                            ...params.props.style

                        }}
                    >
                        {text && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: "0px",
                                    right: alignLabel && alignLabel === "left" ? (width + 4) + "px" : undefined,
                                    left: !alignLabel || alignLabel === "right" ? (width + 4) + "px" : undefined,
                                    color: '#000',
                                    fontWeight: 'bold',
                                    padding: '4px',
                                    borderRadius: '4px',
                                    backgroundColor: solidColor,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {text}
                            </div>
                        )}
                        <div
                            style={{
                                width: '16px',
                                height: '4px',
                                backgroundColor: params.isDragged ? solidColor : '#CCC'
                            }}
                        />
                    </div>
                )}
            />
        </Wrapper>
    );
}
export default VerticalSlider;
