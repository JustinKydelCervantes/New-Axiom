import { unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CX3PLwGb.js";
import { Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Workload",
  __ssrInlineRender: true,
  props: {
    workload: Array
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Workload Report" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"${_scopeId}>Team Workload</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight" }, "Team Workload")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-5xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-lg shadow-sm p-6 border border-blue-200 dark:border-blue-800 mb-6"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"${_scopeId}><div${_scopeId}><h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-1"${_scopeId}>📊 Advanced Task Monitoring</h3><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}>View real-time dashboards with team workload analysis and task filters</p></div><div class="flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/dashboard-monitor",
              class: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 📈 Dashboard `);
                } else {
                  return [
                    createTextVNode(" 📈 Dashboard ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: "/dashboard/workload",
              class: "inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 👥 Workload `);
                } else {
                  return [
                    createTextVNode(" 👥 Workload ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: "/dashboard/tasks",
              class: "inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 📋 Tasks `);
                } else {
                  return [
                    createTextVNode(" 📋 Tasks ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg overflow-hidden"${_scopeId}><table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><thead class="bg-gray-50 dark:bg-gray-700"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"${_scopeId}>Employee</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"${_scopeId}>Total Tasks</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"${_scopeId}>In Progress</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"${_scopeId}>Overdue</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"${_scopeId}>Load</th></tr></thead><tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><!--[-->`);
            ssrRenderList(__props.workload, (user) => {
              _push2(`<tr${_scopeId}><td class="px-6 py-4 font-medium text-gray-900 dark:text-gray-100"${_scopeId}>${ssrInterpolate(user.name)}</td><td class="px-6 py-4 text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(user.total_tasks)}</td><td class="px-6 py-4 text-yellow-600"${_scopeId}>${ssrInterpolate(user.in_progress_tasks)}</td><td class="px-6 py-4 text-red-600"${_scopeId}>${ssrInterpolate(user.overdue_tasks)}</td><td class="px-6 py-4"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="flex-1 bg-gray-200 rounded-full h-2 max-w-24"${_scopeId}><div class="bg-indigo-500 h-2 rounded-full" style="${ssrRenderStyle({ width: Math.min(user.total_tasks / 10 * 100, 100) + "%" })}"${_scopeId}></div></div><span class="${ssrRenderClass([user.total_tasks > 8 ? "text-red-600 font-bold" : "text-gray-500", "text-xs"])}"${_scopeId}>${ssrInterpolate(user.total_tasks > 8 ? "Overloaded" : user.total_tasks > 5 ? "Busy" : "OK")}</span></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-5xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-lg shadow-sm p-6 border border-blue-200 dark:border-blue-800 mb-6" }, [
                    createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" }, [
                      createVNode("div", null, [
                        createVNode("h3", { class: "font-semibold text-gray-900 dark:text-gray-100 mb-1" }, "📊 Advanced Task Monitoring"),
                        createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, "View real-time dashboards with team workload analysis and task filters")
                      ]),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(unref(Link), {
                          href: "/dashboard-monitor",
                          class: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" 📈 Dashboard ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Link), {
                          href: "/dashboard/workload",
                          class: "inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" 👥 Workload ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Link), {
                          href: "/dashboard/tasks",
                          class: "inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" 📋 Tasks ")
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg overflow-hidden" }, [
                    createVNode("table", { class: "min-w-full divide-y divide-gray-200 dark:divide-gray-700" }, [
                      createVNode("thead", { class: "bg-gray-50 dark:bg-gray-700" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase" }, "Employee"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase" }, "Total Tasks"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase" }, "In Progress"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase" }, "Overdue"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase" }, "Load")
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.workload, (user) => {
                          return openBlock(), createBlock("tr", {
                            key: user.id
                          }, [
                            createVNode("td", { class: "px-6 py-4 font-medium text-gray-900 dark:text-gray-100" }, toDisplayString(user.name), 1),
                            createVNode("td", { class: "px-6 py-4 text-gray-600 dark:text-gray-400" }, toDisplayString(user.total_tasks), 1),
                            createVNode("td", { class: "px-6 py-4 text-yellow-600" }, toDisplayString(user.in_progress_tasks), 1),
                            createVNode("td", { class: "px-6 py-4 text-red-600" }, toDisplayString(user.overdue_tasks), 1),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode("div", { class: "flex-1 bg-gray-200 rounded-full h-2 max-w-24" }, [
                                  createVNode("div", {
                                    class: "bg-indigo-500 h-2 rounded-full",
                                    style: { width: Math.min(user.total_tasks / 10 * 100, 100) + "%" }
                                  }, null, 4)
                                ]),
                                createVNode("span", {
                                  class: ["text-xs", user.total_tasks > 8 ? "text-red-600 font-bold" : "text-gray-500"]
                                }, toDisplayString(user.total_tasks > 8 ? "Overloaded" : user.total_tasks > 5 ? "Busy" : "OK"), 3)
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Reports/Workload.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
