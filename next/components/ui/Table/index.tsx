import {styled} from "styletron-react";
import {breakpoints} from "../Theme";

const Table = styled("div", {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
});

const FullColumn = styled("div", {
    display: 'block',
    width: '100%'
});
const HalfColumn = styled("div", {
    display: 'block',
    width: '100%',

    [breakpoints.TABLET]: {
        width: '50%'
    }
});
const QuarterColumn = styled("div", {
    display: 'block',
    width: '50%',

    [breakpoints.TABLET]: {
        width: '25%'
    }
});
export {
    FullColumn,
    HalfColumn,
    QuarterColumn
}
export default Table;
