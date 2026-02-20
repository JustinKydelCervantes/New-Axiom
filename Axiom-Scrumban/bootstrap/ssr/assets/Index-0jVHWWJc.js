import { unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CX3PLwGb.js";
import { Head } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    logs: Object
  },
  setup(__props) {
    const actionLabel = (action) => ({
      created: "✅ Created",
      updated: "✏️ Updated",
      deleted: "🗑️ Deleted",
      status_changed: "🔄 Status Changed",
      time_logged: "⏱️ Time Logged"
    })[action] || action;
    const subjectLabel = (type) => type?.split("\\").pop() || "Unknown";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Activity Log" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"${_scopeId}>Activity Log</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight" }, "Activity Log")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-5xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg overflow-hidden"${_scopeId}>`);
            if (__props.logs.data.length === 0) {
              _push2(`<div class="p-6 text-center text-gray-500"${_scopeId}> No activity recorded yet. </div>`);
            } else {
              _push2(`<div class="divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><!--[-->`);
              ssrRenderList(__props.logs.data, (log) => {
                _push2(`<div class="p-4 flex items-start gap-4"${_scopeId}><div class="flex-shrink-0 text-lg"${_scopeId}>${ssrInterpolate(actionLabel(log.action).split(" ")[0])}</div><div class="flex-1"${_scopeId}><p class="text-sm text-gray-900 dark:text-gray-100"${_scopeId}><span class="font-medium"${_scopeId}>${ssrInterpolate(log.user?.name || "System")}</span> ${ssrInterpolate(actionLabel(log.action).split(" ").slice(1).join(" "))} <span class="text-indigo-600"${_scopeId}>${ssrInterpolate(subjectLabel(log.subject_type))}</span>`);
                if (log.changes?.name) {
                  _push2(`<span${_scopeId}> &quot;${ssrInterpolate(log.changes.name)}&quot;</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</p><p class="text-xs text-gray-500 mt-1"${_scopeId}>${ssrInterpolate(log.created_at)}</p></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div>`);
            if (__props.logs.last_page > 1) {
              _push2(`<div class="mt-4 flex justify-center gap-1"${_scopeId}><!--[-->`);
              ssrRenderList(__props.logs.links, (link) => {
                _push2(`<a${ssrRenderAttr("href", link.url || "#")} class="${ssrRenderClass([link.active ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-300 text-gray-600 hover:bg-gray-50", "px-3 py-1 text-sm rounded border"])}"${_scopeId}>${link.label ?? ""}</a>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-5xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg overflow-hidden" }, [
                    __props.logs.data.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-6 text-center text-gray-500"
                    }, " No activity recorded yet. ")) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "divide-y divide-gray-200 dark:divide-gray-700"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.logs.data, (log) => {
                        return openBlock(), createBlock("div", {
                          key: log.id,
                          class: "p-4 flex items-start gap-4"
                        }, [
                          createVNode("div", { class: "flex-shrink-0 text-lg" }, toDisplayString(actionLabel(log.action).split(" ")[0]), 1),
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("p", { class: "text-sm text-gray-900 dark:text-gray-100" }, [
                              createVNode("span", { class: "font-medium" }, toDisplayString(log.user?.name || "System"), 1),
                              createTextVNode(" " + toDisplayString(actionLabel(log.action).split(" ").slice(1).join(" ")) + " ", 1),
                              createVNode("span", { class: "text-indigo-600" }, toDisplayString(subjectLabel(log.subject_type)), 1),
                              log.changes?.name ? (openBlock(), createBlock("span", { key: 0 }, ' "' + toDisplayString(log.changes.name) + '"', 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("p", { class: "text-xs text-gray-500 mt-1" }, toDisplayString(log.created_at), 1)
                          ])
                        ]);
                      }), 128))
                    ]))
                  ]),
                  __props.logs.last_page > 1 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-4 flex justify-center gap-1"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.logs.links, (link) => {
                      return openBlock(), createBlock("a", {
                        key: link.label,
                        href: link.url || "#",
                        class: ["px-3 py-1 text-sm rounded border", link.active ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-300 text-gray-600 hover:bg-gray-50"],
                        innerHTML: link.label
                      }, null, 10, ["href", "innerHTML"]);
                    }), 128))
                  ])) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Activity/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
