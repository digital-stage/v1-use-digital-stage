import {Property} from "csstype";


class HSLColor {
    private _hue: number;
    private _saturation: number;
    private _luminance: number;
    private _alpha: number;

    constructor(hue: number, saturation: number = 70, luminance: number = 80, alpha: number = 1) {
        this._hue = hue;
        this._saturation = saturation;
        this._luminance = luminance;
        this._alpha = alpha;
    }

    get h(): number {
        return this._hue;
    }

    get s(): number {
        return this._saturation;
    }

    get l(): number {
        return this._luminance;
    }

    get a(): number {
        return this._alpha;
    }

    hue(hue: number): HSLColor {
        return new HSLColor(hue, this._saturation, this._luminance, this._alpha);
    }

    saturation(saturation: number): HSLColor {
        return new HSLColor(this._hue, saturation, this._luminance, this._alpha);
    }

    luminance(luminance: number): HSLColor {
        return new HSLColor(this._hue, this._saturation, luminance, this._alpha);
    }

    alpha(alpha: number): HSLColor {
        return new HSLColor(this._hue, this._saturation, this._luminance, alpha);
    }

    toProperty(): Property.Color {
        return this.toString();
    }

    toString(): string {
        return "hsla(" + this._hue + "," +
            this._saturation + "%," +
            this._luminance + "%," + this._alpha + ")";
    }
}

export default HSLColor;
