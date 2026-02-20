import { ref, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CX3PLwGb.js";
import { Head, Link } from "@inertiajs/vue3";
import { K as KanbanBoard } from "./KanbanBoard-BmM91TGQ.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vuedraggable";
import "axios";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    tasks: Array
  },
  setup(__props) {
    const viewMode = ref("list");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Dashboard" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"${_scopeId}> Dashboard </h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200" }, " Dashboard ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800"${_scopeId}><div class="p-6 text-gray-900 dark:text-gray-100"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><h3 class="text-lg font-medium"${_scopeId}>My Tasks</h3><div class="bg-gray-200 dark:bg-gray-700 rounded-lg p-1 flex"${_scopeId}><button class="${ssrRenderClass([viewMode.value === "list" ? "bg-white dark:bg-gray-600 shadow" : "text-gray-600 dark:text-gray-400 hover:text-gray-900", "px-3 py-1 rounded-md text-sm font-medium transition-colors"])}"${_scopeId}> List </button><button class="${ssrRenderClass([viewMode.value === "kanban" ? "bg-white dark:bg-gray-600 shadow" : "text-gray-600 dark:text-gray-400 hover:text-gray-900", "px-3 py-1 rounded-md text-sm font-medium transition-colors"])}"${_scopeId}> Kanban </button></div></div>`);
            if (__props.tasks.length === 0) {
              _push2(`<div class="text-gray-500"${_scopeId}> You have no pending tasks. `);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("projects.index"),
                class: "text-indigo-600 hover:underline"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`View Projects`);
                  } else {
                    return [
                      createTextVNode("View Projects")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (viewMode.value === "list") {
              _push2(`<div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"${_scopeId}>Task</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"${_scopeId}>Project</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"${_scopeId}>Status</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"${_scopeId}>Due Date</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"${_scopeId}>Action</th></tr></thead><tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><!--[-->`);
              ssrRenderList(__props.tasks, (task) => {
                _push2(`<tr${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}>${ssrInterpolate(task.title)}</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}>${ssrInterpolate(task.project?.name)}</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><span class="${ssrRenderClass([{
                  "bg-gray-100 text-gray-800": task.status === "not_started",
                  "bg-yellow-100 text-yellow-800": task.status === "in_progress",
                  "bg-red-100 text-red-800": task.status === "blocked"
                }, "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(task.status.replace("_", " "))}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(task.due_date || "-")}</td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("tasks.edit", task.id),
                  class: "text-indigo-600 hover:text-indigo-900"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Edit`);
                    } else {
                      return [
                        createTextVNode("Edit")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            } else if (viewMode.value === "kanban") {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(KanbanBoard, { tasks: __props.tasks }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800" }, [
                    createVNode("div", { class: "p-6 text-gray-900 dark:text-gray-100" }, [
                      createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                        createVNode("h3", { class: "text-lg font-medium" }, "My Tasks"),
                        createVNode("div", { class: "bg-gray-200 dark:bg-gray-700 rounded-lg p-1 flex" }, [
                          createVNode("button", {
                            onClick: ($event) => viewMode.value = "list",
                            class: ["px-3 py-1 rounded-md text-sm font-medium transition-colors", viewMode.value === "list" ? "bg-white dark:bg-gray-600 shadow" : "text-gray-600 dark:text-gray-400 hover:text-gray-900"]
                          }, " List ", 10, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => viewMode.value = "kanban",
                            class: ["px-3 py-1 rounded-md text-sm font-medium transition-colors", viewMode.value === "kanban" ? "bg-white dark:bg-gray-600 shadow" : "text-gray-600 dark:text-gray-400 hover:text-gray-900"]
                          }, " Kanban ", 10, ["onClick"])
                        ])
                      ]),
                      __props.tasks.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-gray-500"
                      }, [
                        createTextVNode(" You have no pending tasks. "),
                        createVNode(unref(Link), {
                          href: _ctx.route("projects.index"),
                          class: "text-indigo-600 hover:underline"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("View Projects")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])) : viewMode.value === "list" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "overflow-x-auto"
                      }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200 dark:divide-gray-700" }, [
                          createVNode("thead", null, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" }, "Task"),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" }, "Project"),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" }, "Status"),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" }, "Due Date"),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" }, "Action")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.tasks, (task) => {
                              return openBlock(), createBlock("tr", {
                                key: task.id
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, toDisplayString(task.title), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, toDisplayString(task.project?.name), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("span", {
                                    class: ["px-2 inline-flex text-xs leading-5 font-semibold rounded-full", {
                                      "bg-gray-100 text-gray-800": task.status === "not_started",
                                      "bg-yellow-100 text-yellow-800": task.status === "in_progress",
                                      "bg-red-100 text-red-800": task.status === "blocked"
                                    }]
                                  }, toDisplayString(task.status.replace("_", " ")), 3)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400" }, toDisplayString(task.due_date || "-"), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium" }, [
                                  createVNode(unref(Link), {
                                    href: _ctx.route("tasks.edit", task.id),
                                    class: "text-indigo-600 hover:text-indigo-900"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Edit")
                                    ]),
                                    _: 1
                                  }, 8, ["href"])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ])) : viewMode.value === "kanban" ? (openBlock(), createBlock("div", { key: 2 }, [
                        createVNode(KanbanBoard, { tasks: __props.tasks }, null, 8, ["tasks"])
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
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
