import * as React from 'react';
import {useCallback, useContext, useEffect} from 'react';

export interface ErrorsProps {
    warnings: Error[];
    reportWarning: (warning: Error) => any;
    errors: Error[];
    reportError: (error: Error) => any;
    clear: () => any;
}

const ErrorsContext = React.createContext<ErrorsProps>({
    warnings: [],
    reportWarning: () => {
        // do nothing.
    },
    errors: [],
    reportError: () => {
        // do nothing.
    },
    clear: () => {
        // do nothing.
    },
});


const ErrorsProvider = (props: { children: React.ReactNode }) => {
    const [warnings, setWarnings] = React.useState<Error[]>([]);
    const [errors, setErrors] = React.useState<Error[]>([]);
    const {children} = props;

    useEffect(() => {
        errors.forEach((error) => console.error(error));
    }, [errors]);

    useEffect(() => {
        warnings.forEach((warning) => console.warn(warning));
    }, [warnings]);

    const reportWarning = useCallback((warning: Error) => {
        setWarnings((prev) => [...prev, warning]);
    }, []);

    const reportError = useCallback((error: Error) => {
        setErrors((prev) => [...prev, error]);
    }, []);

    const clear = useCallback(() => {
        setWarnings([]);
        setErrors([]);
    }, []);

    return (
        <ErrorsContext.Provider
            value={{
                warnings,
                reportWarning,
                errors,
                reportError,
                clear,
            }}
        >
            {children}
        </ErrorsContext.Provider>
    );
};

const ErrorsConsumer = ErrorsContext.Consumer;

export {
    ErrorsProvider,
    ErrorsConsumer
}

const useErrors = (): ErrorsProps => useContext<ErrorsProps>(ErrorsContext);

export default useErrors;
