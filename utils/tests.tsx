import React from "react";

export function composeWrappers(...wrappers: React.ComponentType[]) {
  return ({ children }: { children: JSX.Element }): JSX.Element => {
    return wrappers.reduceRight(
      (
        PrevWrapper: JSX.Element,
        NextWrapper: React.ComponentType
      ): JSX.Element => {
        return <NextWrapper>{PrevWrapper}</NextWrapper>;
      },
      children
    );
  };
}
