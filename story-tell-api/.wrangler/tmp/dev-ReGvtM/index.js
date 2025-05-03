var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-eUNd8z/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// node_modules/@cloudflare/ai/dist/index.js
var e;
!function(e2) {
  e2.String = "str", e2.Bool = "bool", e2.Float16 = "float16", e2.Float32 = "float32", e2.Int16 = "int16", e2.Int32 = "int32", e2.Int64 = "int64", e2.Int8 = "int8", e2.Uint16 = "uint16", e2.Uint32 = "uint32", e2.Uint64 = "uint64", e2.Uint8 = "uint8";
}(e || (e = {}));
var t = Object.getPrototypeOf(Uint8Array);
var i;
!function(e2) {
  e2[e2.NONE = 0] = "NONE", e2[e2.CARRY_SYSTEM_INST = 1] = "CARRY_SYSTEM_INST", e2[e2.ABSORB_ROLE = 2] = "ABSORB_ROLE", e2[e2.APPEND_LAST_SYSTEM = 3] = "APPEND_LAST_SYSTEM";
}(i || (i = {}));
var R = { bare: { system: { flag: i.ABSORB_ROLE }, user: { flag: i.APPEND_LAST_SYSTEM }, assistant: { pre: " ", post: " " } }, sqlcoder: { system: { flag: i.ABSORB_ROLE }, user: { flag: i.ABSORB_ROLE }, assistant: { flag: i.ABSORB_ROLE }, global: { template: "### Task\nGenerate a SQL query to answer [QUESTION]{user}[/QUESTION]\n\n### Database Schema\nThe query will run on a database with the following schema:\n{system}\n\n### Answer\nGiven the database schema, here is the SQL query that [QUESTION]{user}[/QUESTION]\n[SQL]" } }, inst: { system: { flag: i.ABSORB_ROLE }, user: { pre: "[INST] ", post: " [/INST]", flag: i.APPEND_LAST_SYSTEM }, assistant: { pre: " ", post: " " } }, llama2: { system: { pre: "[INST] <<SYS>>\n", post: "\n<</SYS>>\n\n" }, user: { pre: "<s>[INST] ", post: " [/INST]", flag: i.CARRY_SYSTEM_INST }, assistant: { pre: " ", post: "</s>" } }, deepseek: { system: { post: "\n" }, user: { pre: "### Instruction:\n", post: "\n" }, assistant: { pre: "### Response:\n", post: "\n" }, global: { post: "### Response:\n" } }, falcon: { system: { post: "\n" }, user: { pre: "User: ", post: "\n" }, assistant: { pre: "Assistant: ", post: "\n" }, global: { post: "Assistant: \n" } }, openchat: { system: { flag: i.ABSORB_ROLE }, user: { pre: "GPT4 User: ", post: "<|end_of_turn|>", flag: i.APPEND_LAST_SYSTEM }, assistant: { pre: "GPT4 Assistant: ", post: "<|end_of_turn|>" }, global: { post: "GPT4 Assistant:" } }, "openchat-alt": { system: { flag: i.ABSORB_ROLE }, user: { pre: "<s>Human: ", post: "<|end_of_turn|>", flag: i.APPEND_LAST_SYSTEM }, assistant: { pre: "Assistant: ", post: "<|end_of_turn|>" }, global: { post: "Assistant: " } }, tinyllama: { system: { pre: "<|system|>\n", post: "</s>\n" }, user: { pre: "<|user|>\n", post: "</s>\n" }, assistant: { pre: "<|assistant|>\n", post: "</s>\n" }, global: { post: "<|assistant|>\n" } }, chatml: { system: { pre: "<|im_start|>system\n", post: "<|im_end|>\n" }, user: { pre: "<|im_start|>user\n", post: "<|im_end|>\n" }, assistant: { pre: "<|im_start|>assistant\n", post: "<|im_end|>\n" }, global: { post: "<|im_start|>assistant\n" } }, "orca-hashes": { system: { pre: "### System:\n", post: "\n\n" }, user: { pre: "### User:\n", post: "\n\n" }, assistant: { pre: "### Assistant:\n", post: "\n\n" }, global: { post: "### Assistant:\n\n" } }, "codellama-instruct": { system: { pre: "[INST] ", post: "\n" }, user: { pre: "[INST] ", post: " [/INST]\n", flag: i.CARRY_SYSTEM_INST }, assistant: { post: "\n" } }, "mistral-instruct": { system: { pre: "<s>[INST] ", post: " " }, user: { pre: "[INST] ", post: " [/INST]", flag: i.CARRY_SYSTEM_INST }, assistant: { pre: " ", post: "</s>" } }, zephyr: { system: { pre: "<s><|system|>\n", post: "</s>\n" }, user: { pre: "<|user|>\n", post: "</s>\n" }, assistant: { pre: "<|assistant|>\n", post: "</s>\n" }, global: { post: "<|assistant|>\n" } } };
var S = class extends Error {
  httpCode;
  constructor(e2, t2) {
    super(e2), this.name = "InferenceUpstreamError", this.httpCode = t2;
  }
};
__name(S, "S");
var N = class {
  binding;
  options;
  logs;
  lastRequestId;
  constructor(e2, t2 = {}) {
    if (!e2)
      throw new Error("Ai binding is undefined. Please provide a valid binding.");
    this.binding = e2, this.options = t2, this.lastRequestId = "";
  }
  async run(e2, t2) {
    const s = { method: "POST", body: JSON.stringify({ inputs: t2, options: { debug: this.options?.debug } }), headers: { ...this.options?.sessionOptions?.extraHeaders || {}, ...this.options?.extraHeaders || {}, "content-encoding": "application/json", "cf-consn-sdk-version": "1.1.0", "cf-consn-model-id": `${this.options.prefix ? `${this.options.prefix}:` : ""}${e2}` } }, n = await this.binding.fetch("http://workers-binding.ai/run?version=2", s);
    if (this.lastRequestId = n.headers.get("cf-ai-req-id"), t2.stream) {
      if (!n.ok)
        throw new S(await n.text(), n.status);
      return n.body;
    }
    {
      if (this.options.debug) {
        let e4 = [];
        try {
          e4 = JSON.parse(atob(n.headers.get("cf-ai-logs")));
        } catch (e5) {
        }
        this.logs = e4;
      }
      if (!n.ok)
        throw new S(await n.text(), n.status);
      const e3 = await new Response(n.body.pipeThrough(new DecompressionStream("gzip")));
      if (!n.headers.get("content-type")) {
        console.log("Your current wrangler version has a known issue when using in local dev mode, please update to the latest.");
        try {
          return await e3.clone().json();
        } catch (t3) {
          return e3.body;
        }
      }
      return "application/json" === n.headers.get("content-type") ? await e3.json() : e3.body;
    }
  }
  getLogs() {
    return this.logs;
  }
};
__name(N, "N");

// src/index.ts
var htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Story and Image Generator</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
</head>
<body class="bg-gray-100">
	<div class="container mx-auto px-4 py-12">
		<h1 class="text-4xl font-bold text-center mb-10 text-blue-600">Interactive Story and Image Generator</h1>

		<div id="generator" class="mb-12">
			<h2 class="text-3xl font-bold mb-4 text-gray-800">Generate Story and Image</h2>
			<div class="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 md:items-center">
				<input type="text" id="input-prompt" placeholder="Enter a prompt for the story and image" class="flex-1 px-4 py-3 border rounded shadow">
				<button id="generate-both" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded shadow-lg">Generate</button>
			</div>
		</div>

		<div id="loader" class="text-center hidden mb-6">
			<p class="text-lg font-semibold">Generating content, please wait...</p>
		</div>

		<div id="story-output-container" class="mb-8 hidden shadow-lg rounded-lg overflow-hidden">
			<h2 class="text-2xl font-bold mb-3 bg-blue-500 text-white p-4">Story Output</h2>
			<div class="flex flex-col md:flex-row md:space-x-4 p-4 bg-gray-100">
				<div id="story-output" class="bg-white p-6 border-t border-gray-200 md:w-1/2" style="height: full; overflow-y: auto;"></div>
				<img id="generated-image" src="https://via.placeholder.com/735x735?text=Generating..." alt="" class="w-full md:w-1/2 rounded-lg shadow-lg">
			</div>
		</div>
	</div>

    <script>
    document.getElementById('generate-both').addEventListener('click', function() {
        const prompt = document.getElementById('input-prompt').value;
        document.getElementById('loader').classList.remove('hidden');

        const storyEventSource = new EventSource('/story?prompt=' + encodeURIComponent(prompt));
        let completeStory = '';

        storyEventSource.onmessage = function(event) {
            if (event.data === '[DONE]') {
                storyEventSource.close();
                document.getElementById('loader').classList.add('hidden');
                return;
            }

            document.getElementById('story-output-container').classList.remove('hidden');
			// Add placehoder image while the actual image is being generated
            const data = JSON.parse(event.data);
            if (data && data.response) {
                document.getElementById('story-output').textContent += data.response;
                completeStory += data.response;
            }
        };

        // Start the first image generation immediately
        fetchImage('/generate-image', prompt, 'generated-image');
    });

    function fetchImage(endpoint, prompt, imageId) {
        fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        })
        .then(response => response.blob())
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            const imageElement = document.getElementById(imageId);
            imageElement.src = imageUrl;
            imageElement.style.display = 'block';
        });
    }
    <\/script>
</body>
</html>
`;
var src_default = {
  async fetch(request, env) {
    const ai = new N(env.AI);
    const url = new URL(request.url);
    if (url.pathname === "/") {
      return new Response(htmlContent, {
        headers: {
          "content-type": "text/html"
        }
      });
    }
    if (url.pathname === "/story") {
      if (request.method === "GET") {
        const userInput = url.searchParams.get("prompt") || "Once upon a time, there was a little llama named Llama-2-13b";
        const messages = [
          { role: "system", content: "Tell a story" },
          { role: "user", content: userInput }
        ];
        const stream = await ai.run("@hf/thebloke/llama-2-13b-chat-awq", {
          messages,
          stream: true
        });
        return new Response(stream, {
          headers: { "content-type": "text/event-stream" }
        });
      } else {
        return new Response("This endpoint expects a GET request.", { status: 400 });
      }
    } else if (url.pathname === "/generate-image") {
      if (request.method === "POST" && request.headers.get("Content-Type") === "application/json") {
        const { prompt } = await request.json();
        const inputs = {
          prompt: prompt || "cyberpunk cat"
        };
        const response = await ai.run("@cf/bytedance/stable-diffusion-xl-lightning", inputs);
        return new Response(response, {
          headers: {
            "content-type": "image/png"
          }
        });
      } else {
        return new Response("This endpoint expects a POST request with JSON payload.", { status: 400 });
      }
    }
    return new Response("Endpoint not found.", { status: 404 });
  }
};

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e2) {
      console.error("Failed to drain the unused request body.", e2);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e2) {
  return {
    name: e2?.name,
    message: e2?.message ?? String(e2),
    stack: e2?.stack,
    cause: e2?.cause === void 0 ? void 0 : reduceError(e2.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e2) {
    const error = reduceError(e2);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-eUNd8z/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-eUNd8z/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
