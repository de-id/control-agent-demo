import { ChatMode } from "@d-id/client-sdk";
import type { Configurations, Props } from "@d-id/agent-client";
import { getAuth, init, testMode } from "@d-id/agent-client";
import { startButtonCreation } from "./buttonManager";

const scriptTag = document.querySelector('script[data-name="did-agent"]')!;

const params = new URLSearchParams(testMode === "true" ? window.location.search : "");

const mode = (params.get("mode") || (scriptTag.getAttribute("data-mode") ?? "fabio")) as
  | "fabio"
  | "full";
const target = scriptTag.getAttribute("data-target-id");
const agentId = params.get("agent_id") || scriptTag.getAttribute("data-agent-id");
const didApiUrl = scriptTag.getAttribute("data-api-url");
const token = scriptTag.getAttribute("data-token");
const username = scriptTag.getAttribute("data-username");
const password = scriptTag.getAttribute("data-password");
const clientKey = params.get("key") || scriptTag.getAttribute("data-client-key");
const track = scriptTag.getAttribute("data-track") !== "false";
const monitor = scriptTag.getAttribute("data-monitor") !== "false";
const position = (scriptTag.getAttribute("data-position") ?? "right") as Configurations["position"];
const orientation = (scriptTag.getAttribute("data-orientation") ??
  "vertical") as Configurations["orientation"];

if (!agentId) {
  throw new Error("No agent id");
}

const props: Props = {
  didApiUrl: didApiUrl!,
  monitor,
  callbacks: {
    onStreamCreated: (event) => {
      console.log("Stream created: ", event);
      startButtonCreation();
    },
    onSttEnd: (event) => console.log("User speak result: ", event.result.text),
  },
};

const configs: Partial<Configurations> = {
  mode,
  targetElement: target,
  auth: getAuth({ token, username, password, clientKey }),
  agentId,
  track,
  chatMode: ChatMode.Off,
  position,
  orientation,
  showChatToggle: false,
};

init({ ...configs, ...props });
