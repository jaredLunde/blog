import tabbable from "@accessible/tabbable";
import { useRouter } from "next/router";
import React from "react";

// TODO: Need to figure out how to know when React has stopped
// suspending
export function useFocusMainContent() {
  const { pathname } = useRouter();

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tabbableEls = tabbable(document.getElementById("main-content")!);

    if (tabbableEls.length) {
      tabbableEls[0].focus({
        preventScroll: true,
      });
    }
  }, [pathname]);
}
