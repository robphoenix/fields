import React from 'react';

export interface BoxOwnProps<E extends React.ElementType = React.ElementType> {
  as?: E;
}

export type BoxProps<E extends React.ElementType> = BoxOwnProps<E> &
  Omit<PropsOf<E>, keyof BoxOwnProps>;

const defaultElement = 'div';

export const Box = React.forwardRef(
  (props: BoxOwnProps, ref: React.Ref<Element>) => {
    const Element = props.as || defaultElement;
    return <Element ref={ref} {...props} as={undefined} />;
  }
) as <E extends React.ElementType = typeof defaultElement>(
  props: BoxProps<E>
) => JSX.Element;

// Source: https://github.com/emotion-js/emotion/blob/master/packages/styled-base/types/helper.d.ts
type PropsOf<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>;

type PolymorphicComponentProps<E extends React.ElementType, P> = P &
  BoxProps<E>;

export type PolymorphicComponent<P, D extends React.ElementType = 'div'> = <
  E extends React.ElementType = D
>(
  props: PolymorphicComponentProps<E, P>
) => JSX.Element;
