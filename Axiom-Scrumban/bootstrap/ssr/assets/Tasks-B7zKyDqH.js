import { withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CX3PLwGb.js";
import _sfc_main$2 from "./FilterPanel-BFptTb0w.js";
import _sfc_main$3 from "./StatusBadge-Bo8le9cg.js";
import _sfc_main$4 from "./PriorityBadge-DZZ5lc6Q.js";
import _sfc_main$5 from "./ProgressBar-B9HS8ur5.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Tasks",
  __ssrInlineRender: true,
  props: {
    tasks: Array,
    filterOptions: Object,
    filters: Object
  },
  setup(__props) {
    const formatDate = (dateString) => {
      if (!dateString) return "No date";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    };
    const applyFilters = (filters) => {
      router.get("/dashboard/tasks", filters);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> All Tasks </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " All Tasks ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              filterOptions: __props.filterOptions,
              initialFilters: __props.filters,
              onApplyFilters: applyFilters
            }, null, _parent2, _scopeId));
            _push2(`<div class="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-6"${_scopeId}><div class="p-6"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><h3 class="text-lg font-semibold text-gray-900"${_scopeId}> Tasks (${ssrInterpolate(__props.tasks.length)}) </h3><div class="text-sm text-gray-600"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/tasks/create",
              class: "text-blue-600 hover:text-blue-800 font-medium"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` + Create Task `);
                } else {
                  return [
                    createTextVNode(" + Create Task ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="overflow-x-auto"${_scopeId}><table class="w-full"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr class="border-b border-gray-200"${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase"${_scopeId}> Title </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase"${_scopeId}> Project </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase"${_scopeId}> Assignee </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase"${_scopeId}> Status </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase"${_scopeId}> Priority </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase"${_scopeId}> Progress </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase"${_scopeId}> Due Date </th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(__props.tasks, (task) => {
              _push2(`<tr class="border-b border-gray-200 hover:bg-gray-50 transition"${_scopeId}><td class="px-6 py-4"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/tasks/${task.id}`,
                class: "text-blue-600 hover:text-blue-800 font-medium"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(task.title)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(task.title), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              if (task.is_overdue) {
                _push2(`<p class="text-xs text-red-600 mt-1"${_scopeId}>⚠️ Overdue</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-6 py-4 text-sm text-gray-600"${_scopeId}>${ssrInterpolate(task.project_name)}</td><td class="px-6 py-4 text-sm"${_scopeId}>${ssrInterpolate(task.assignee_name)}</td><td class="px-6 py-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                status: task.status
              }, null, _parent2, _scopeId));
              _push2(`</td><td class="px-6 py-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                priority: task.priority
              }, null, _parent2, _scopeId));
              _push2(`</td><td class="px-6 py-4"${_scopeId}><div class="w-24"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$5, {
                percentage: task.progress_percent
              }, null, _parent2, _scopeId));
              _push2(`</div></td><td class="px-6 py-4 text-sm"${_scopeId}><span class="${ssrRenderClass(task.is_overdue ? "text-red-600 font-semibold" : "text-gray-600")}"${_scopeId}>${ssrInterpolate(formatDate(task.due_date))}</span></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (__props.tasks.length === 0) {
              _push2(`<div class="text-center py-12"${_scopeId}><p class="text-gray-500"${_scopeId}>No tasks found</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode(_sfc_main$2, {
                    filterOptions: __props.filterOptions,
                    initialFilters: __props.filters,
                    onApplyFilters: applyFilters
                  }, null, 8, ["filterOptions", "initialFilters"]),
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg mt-6" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-gray-900" }, " Tasks (" + toDisplayString(__props.tasks.length) + ") ", 1),
                        createVNode("div", { class: "text-sm text-gray-600" }, [
                          createVNode(unref(Link), {
                            href: "/tasks/create",
                            class: "text-blue-600 hover:text-blue-800 font-medium"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" + Create Task ")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "w-full" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", { class: "border-b border-gray-200" }, [
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase" }, " Title "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase" }, " Project "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase" }, " Assignee "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase" }, " Status "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase" }, " Priority "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase" }, " Progress "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase" }, " Due Date ")
                            ])
                          ]),
                          createVNode("tbody", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.tasks, (task) => {
                              return openBlock(), createBlock("tr", {
                                key: task.id,
                                class: "border-b border-gray-200 hover:bg-gray-50 transition"
                              }, [
                                createVNode("td", { class: "px-6 py-4" }, [
                                  createVNode(unref(Link), {
                                    href: `/tasks/${task.id}`,
                                    class: "text-blue-600 hover:text-blue-800 font-medium"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(task.title), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["href"]),
                                  task.is_overdue ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "text-xs text-red-600 mt-1"
                                  }, "⚠️ Overdue")) : createCommentVNode("", true)
                                ]),
                                createVNode("td", { class: "px-6 py-4 text-sm text-gray-600" }, toDisplayString(task.project_name), 1),
                                createVNode("td", { class: "px-6 py-4 text-sm" }, toDisplayString(task.assignee_name), 1),
                                createVNode("td", { class: "px-6 py-4" }, [
                                  createVNode(_sfc_main$3, {
                                    status: task.status
                                  }, null, 8, ["status"])
                                ]),
                                createVNode("td", { class: "px-6 py-4" }, [
                                  createVNode(_sfc_main$4, {
                                    priority: task.priority
                                  }, null, 8, ["priority"])
                                ]),
                                createVNode("td", { class: "px-6 py-4" }, [
                                  createVNode("div", { class: "w-24" }, [
                                    createVNode(_sfc_main$5, {
                                      percentage: task.progress_percent
                                    }, null, 8, ["percentage"])
                                  ])
                                ]),
                                createVNode("td", { class: "px-6 py-4 text-sm" }, [
                                  createVNode("span", {
                                    class: task.is_overdue ? "text-red-600 font-semibold" : "text-gray-600"
                                  }, toDisplayString(formatDate(task.due_date)), 3)
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ]),
                      __props.tasks.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-12"
                      }, [
                        createVNode("p", { class: "text-gray-500" }, "No tasks found")
                      ])) : createCommentVNode("", true)
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/Tasks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
