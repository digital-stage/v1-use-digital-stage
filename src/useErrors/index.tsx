import * as React from 'react';
import { useEffect } from 'react';
import debug from 'debug';

const d = debug('useErrors');
const printWarning = d.extend('warn');
const printError = d.extend('err');

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

export const useErrors = (): ErrorsProps =>
  React.useContext<ErrorsProps>(ErrorsContext);

export const ErrorsProvider = (props: { children: React.ReactNode }) => {
  const [warnings, setWarnings] = React.useState<Error[]>([]);
  const [errors, setErrors] = React.useState<Error[]>([]);
  const { children } = props;

  useEffect(() => {
    errors.forEach((error) => printError(error));
  }, [errors]);

  useEffect(() => {
    warnings.forEach((warning) => printWarning(warning));
  }, [warnings]);

  return (
    <ErrorsContext.Provider
      value={{
        warnings,
        reportWarning: (warning: Error) =>
          setWarnings((prev) => [...prev, warning]),
        errors,
        reportError: (error: Error) => setErrors((prev) => [...prev, error]),
        clear: () => setErrors([]),
      }}
    >
      {children}
    </ErrorsContext.Provider>
  );
};
