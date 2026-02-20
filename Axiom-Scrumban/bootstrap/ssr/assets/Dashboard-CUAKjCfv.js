import { withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CX3PLwGb.js";
import { Head } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Gantt Dashboard" }, null, _parent2, _scopeId));
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="bg-white shadow sm:rounded-lg p-6 dark:bg-gray-800"${_scopeId}><h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200"${_scopeId}>Gantt Dashboard</h2><p class="text-gray-500 dark:text-gray-400 mt-2"${_scopeId}>Placeholder page — Gantt dashboard content goes here.</p></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Gantt Dashboard" }),
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white shadow sm:rounded-lg p-6 dark:bg-gray-800" }, [
                    createVNode("h2", { class: "text-xl font-semibold text-gray-800 dark:text-gray-200" }, "Gantt Dashboard"),
                    createVNode("p", { class: "text-gray-500 dark:text-gray-400 mt-2" }, "Placeholder page — Gantt dashboard content goes here.")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Gantt/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
