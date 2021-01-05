import {useIntl} from "react-intl";
import React from "react";

const Logo = (props: {
    className?: string;
}) => {
    const {className} = props;
    const {formatMessage} = useIntl();
    const f = id => formatMessage({id});

    return (
        <img className={className} src="/static/welcome_icon.png" alt={f('projectName')}/>
    )
};
export default Logo;
