import mitt from "mitt";
import debug from "debug";

import isSerializable from "./isSerializable";

export namespace Metrics {
  const log = debug("santarepo:metrics");

  function printEvent(event: unknown) {
    log.extend("info")("Event: %o is being queued.", event);
  }

  function pipeEventToObservabilityApi<T = unknown>(event: T) {
    const csrf = (event as any)?.__csrfToken;

    if (!csrf) {
      log.extend("warn")("CSRF token is not set");
      return;
    }

    const eventsAPIEndpoint = process.env.OBSERVABILITY_API_ENDPOINT;

    if (!eventsAPIEndpoint) {
      log.extend("warn")("Observability API endpoint is not set");
      return;
    }

    const canBeSerialized = isSerializable(event);
    if (!canBeSerialized) {
      log.extend("warn")("Event could not be serialized");
      return;
    }

    const data = {
      __timestamp: Date.now(),
      event,
      source: process.env.SANTAREPO_APP_NAME,
    };
    const body = JSON.stringify(data);
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        "Content-Length": body.length.toString(),
        "X-CSRF-Token": csrf,
      },
      body,
    };

    const errlog = log.extend("error");

    fetch(eventsAPIEndpoint, requestOptions)
      .then((response) => {
        if (!response.ok) {
          errlog(
            "Failed to send event to Observability API: Status Code: %s, Message: %s",
            response.status,
            response.statusText,
          );
        }
      })
      .catch((error) => {
        if (error instanceof Error) {
          errlog(
            "An error was thrown while sending event to Observability API: %s",
            error.name,
          );
          errlog(
            "Failed to send event to Observability API: %s",
            error.message,
          );
          errlog(error.stack);
        } else {
          errlog(
            "An error was thrown while sending event to Observability API: %o",
            error,
          );
        }
      });
  }

  function initEmitter() {
    const emitter = mitt();
    emitter.on("*", printEvent);
    emitter.on("*", pipeEventToObservabilityApi);
    return emitter;
  }

  export function getMetricsEmitter<T = unknown>(type: string = "*") {
    const emitter = initEmitter();
    return (event: T) => emitter.emit(type, event);
  }
}
