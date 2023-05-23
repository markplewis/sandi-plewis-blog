import { WidgetInstance } from "friendly-challenge";
import { useEffect, useRef, type MutableRefObject, type RefObject } from "react";

// See: https://github.com/FriendlyCaptcha/friendly-captcha-examples/tree/main/nextjs
// See: https://docs.friendlycaptcha.com/#/widget_api?id=full-example-in-react-with-react-hooks

const FriendlyCaptcha = ({
  onStarted,
  onReady,
  onSuccess,
  onError
}: {
  onStarted: () => void;
  onReady: () => void;
  onSuccess: (solution: string) => void;
  onError: (err: object) => void;
}) => {
  const container: RefObject<HTMLDivElement> | null = useRef(null);
  const widget: MutableRefObject<WidgetInstance | undefined> = useRef();

  useEffect(() => {
    if (!widget.current && container.current) {
      widget.current = new WidgetInstance(container.current, {
        // You could default to "auto" if you want to start even before interaction
        startMode: "focus",
        startedCallback: onStarted,
        readyCallback: onReady,
        doneCallback: onSuccess,
        errorCallback: onError
      });
    }
    return () => {
      // No need to reset the widget since this isn't a single page app
      // if (widget.current != undefined) widget.current.reset();
    };
  }, [onError, onReady, onStarted, onSuccess, widget]);

  return (
    <div
      ref={container}
      className="frc-captcha"
      data-lang="en"
      data-start="focus"
      data-sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
    />
  );
};

FriendlyCaptcha.displayName = "FriendlyCaptcha";

export default FriendlyCaptcha;
